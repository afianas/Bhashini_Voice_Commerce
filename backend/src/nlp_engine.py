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
    return int(match.group(1)) if match else None


# -------- Multi-word Lookup --------
def extract_from_lookup(text, lookup_dict):
    for phrase in lookup_dict:
        if phrase in text:
            return lookup_dict[phrase]
    return None


# -------- Better Fuzzy Product Matching --------
def fuzzy_product_match(text):
    words = text.split()

    best_score = 0
    best_product = None

    for word in words:
        match, score, _ = process.extractOne(
            word,
            PRODUCT_LOOKUP.keys(),
            scorer=fuzz.partial_ratio
        )

        if score > best_score:
            best_score = score
            best_product = PRODUCT_LOOKUP.get(match)

    if best_score > 75:
        return best_product, best_score

    return None, 0


# -------- Confidence Score --------
def calculate_confidence(quantity, unit, product_score, action):
    score = 0

    if action and action != "UNKNOWN":
        score += 0.2
    if quantity:
        score += 0.3
    if unit:
        score += 0.2
    if product_score > 75:
        score += 0.3

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

    # If no direct match → fuzzy
    if not product:
        product, product_score = fuzzy_product_match(text)

    # Smart fallback
    if not action and product and quantity:
        action = "ADD"

    confidence = calculate_confidence(
        quantity,
        unit,
        product_score,
        action
    )

    return {
        "action": action or "UNKNOWN",
        "product": product,
        "quantity": quantity,
        "unit": unit,
        "price": price,
        "confidence": confidence
    }