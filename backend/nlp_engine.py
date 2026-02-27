# nlp_engine.py

import re
import unicodedata
from rapidfuzz import process, fuzz
from backend.config import PRODUCTS, UNITS, ACTIONS

# -------- Normalize Text --------
def normalize(text):
    text = unicodedata.normalize("NFKC", text)
    return text.lower().strip()


# -------- Reverse Lookup Builder --------
def build_reverse_lookup(dictionary):
    reverse_dict = {}
    for canonical, variations in dictionary.items():
        for word in variations:
            reverse_dict[word.lower()] = canonical
    return reverse_dict


PRODUCT_LOOKUP = build_reverse_lookup(PRODUCTS)
UNIT_LOOKUP = build_reverse_lookup(UNITS)
ACTION_LOOKUP = build_reverse_lookup(ACTIONS)


# -------- Extract Quantity --------
def extract_quantity(text):
    match = re.search(r'\d+', text)
    return int(match.group()) if match else None


# -------- Extract Price --------
def extract_price(text):
    match = re.search(r'(\d+)\s?(rupees|rs|₹)', text)
    if match:
        return int(match.group(1))
    return None


# -------- Extract From Dictionary --------
def extract_from_lookup(text, lookup_dict):
    words = text.split()
    for word in words:
        if word in lookup_dict:
            return lookup_dict[word]
    return None


# -------- Fuzzy Product Matching --------
def fuzzy_product_match(text):
    match, score, _ = process.extractOne(
        text,
        PRODUCT_LOOKUP.keys(),
        scorer=fuzz.partial_ratio
    )
    if score > 75:
        return PRODUCT_LOOKUP[match], score
    return None, 0


# -------- Confidence Score --------
def calculate_confidence(quantity, unit, product_score):
    score = 0
    if quantity:
        score += 0.3
    if unit:
        score += 0.2
    if product_score > 75:
        score += 0.5
    return round(score, 2)


# -------- Main Parser --------
def parse_inventory_command(text):
    text = normalize(text)

    quantity = extract_quantity(text)
    price = extract_price(text)

    unit = extract_from_lookup(text, UNIT_LOOKUP)
    action = extract_from_lookup(text, ACTION_LOOKUP)
    product = extract_from_lookup(text, PRODUCT_LOOKUP)

    product_score = 100

    if not product:
        product, product_score = fuzzy_product_match(text)

    confidence = calculate_confidence(quantity, unit, product_score)

    return {
        "action": action or "UNKNOWN",
        "product": product,
        "quantity": quantity,
        "unit": unit,
        "price": price,
        "confidence": confidence
    }