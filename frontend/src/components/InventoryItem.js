import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { ChevronDown, ChevronUp, Plus, Minus } from 'lucide-react-native';
import { theme, globalStyles } from './styles/globalStyles';

export default function InventoryItem({ item, itemName, isExpanded, onToggle, onUpdate, onPriceChange, t }) {
    const [localPrice, setLocalPrice] = useState(item.price.toString());
    const categoryColor = item.category === 'A' ? '#FFD700' : '#C0C0C0';

    useEffect(() => {
        setLocalPrice(item.price.toString());
    }, [item.price]);

    const handlePriceSubmit = () => {
        const newPrice = parseInt(localPrice);
        if (!isNaN(newPrice) && newPrice !== item.price) {
            Alert.alert(
                t.priceTitle,
                `${t.priceMsg} ${itemName}?`,
                [
                    { text: t.cancel, onPress: () => setLocalPrice(item.price.toString()), style: "cancel" },
                    { text: t.ok, onPress: () => onPriceChange(item.id, newPrice) }
                ]
            );
        } else {
            setLocalPrice(item.price.toString());
        }
    };

    return (
        <View style={[styles.itemWrapper, { borderLeftColor: theme.primary }]}>
            <TouchableOpacity style={styles.itemRow} onPress={onToggle}>
                <View style={{ flex: 1 }}>
                    <View style={globalStyles.row}>
                        <Text style={styles.itemName}>{itemName}</Text>
                        <View style={[styles.abcBadge, { backgroundColor: categoryColor }]}>
                            <Text style={styles.badgeText}>{item.category}</Text>
                        </View>
                    </View>
                    <View style={styles.stockBarContainer}>
                        <View style={[styles.stockBar, { width: Math.min((item.qty / 150) * 100, 100) + '%', backgroundColor: item.qty < 15 ? theme.danger : theme.success }]} />
                    </View>
                </View>
                <Text style={[styles.qtyText, item.qty < 15 && { color: theme.danger }]}>{item.qty} {item.unit}</Text>
                {isExpanded ? <ChevronUp size={18} color={theme.textMuted} /> : <ChevronDown size={18} color={theme.textMuted} />}
            </TouchableOpacity>

            {isExpanded && (
                <View style={styles.adjustmentRow}>
                    <TouchableOpacity onPress={() => onUpdate(-1)} style={styles.circleBtn}><Minus size={16} color="#64748B" /></TouchableOpacity>
                    <View style={globalStyles.row}>
                        <Text style={styles.adjText}>₹ </Text>
                        <TextInput
                            style={styles.priceInput}
                            keyboardType="numeric"
                            value={localPrice}
                            onChangeText={setLocalPrice}
                            onBlur={handlePriceSubmit}
                            selectTextOnFocus
                        />
                        <Text style={styles.adjText}>/{item.unit}</Text>
                    </View>
                    <TouchableOpacity onPress={() => onUpdate(1)} style={styles.circleBtn}><Plus size={16} color="#64748B" /></TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    itemWrapper: { backgroundColor: 'white', marginHorizontal: 15, marginBottom: 8, borderRadius: 12, borderLeftWidth: 4 },
    itemRow: { flexDirection: 'row', padding: 16, alignItems: 'center' },
    itemName: { fontSize: 15, fontWeight: 'bold', color: theme.textMain },
    abcBadge: { marginLeft: 8, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
    badgeText: { fontSize: 9, fontWeight: 'bold', color: 'white' },
    stockBarContainer: { height: 4, width: '60%', backgroundColor: '#F1F5F9', borderRadius: 2, marginTop: 8 },
    stockBar: { height: '100%', borderRadius: 2 },
    qtyText: { fontSize: 14, fontWeight: 'bold', color: '#475569', marginRight: 10 },
    adjustmentRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, backgroundColor: '#F8FAFC', borderTopWidth: 1, borderTopColor: '#F1F5F9' },
    adjText: { fontSize: 13, color: theme.textMuted },
    priceInput: { fontSize: 14, fontWeight: 'bold', color: theme.primary, borderBottomWidth: 1, borderBottomColor: theme.textMuted, minWidth: 40, textAlign: 'center' },
    circleBtn: { backgroundColor: '#E2E8F0', padding: 8, borderRadius: 20 },
});