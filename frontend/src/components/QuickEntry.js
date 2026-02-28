import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Plus, Minus, Check } from 'lucide-react-native';
import { globalStyles, theme } from './styles/globalStyles';

export default function QuickEntry({ productData, setProductData, onAdd }) {
    const [isStockIn, setIsStockIn] = useState(true);
    const unitOptions = ['pcs', 'kg', 'ltr'];

    const handlePress = () => {
        if (!productData.name || !productData.qty) return;

        // Determine the type based on the toggle state
        const type = isStockIn ? 'IN' : 'OUT';
        const finalQty = isStockIn ? productData.qty : `-${productData.qty}`;

        // Pass the name, quantity, price(0), and the selected unit
        onAdd(productData.name, productData.qty, 0, productData.unit || 'pcs', type);
    };

    return (
        <View style={globalStyles.card}>
            <Text style={styles.header}>QUICK ADJUSTMENT</Text>

            <View style={globalStyles.row}>
                {/* Toggle Button */}
                <TouchableOpacity
                    onPress={() => setIsStockIn(!isStockIn)}
                    style={[styles.toggleBtn, { backgroundColor: isStockIn ? theme.success : theme.danger }]}
                >
                    {isStockIn ? <Plus color="white" size={18} /> : <Minus color="white" size={18} />}
                </TouchableOpacity>

                <TextInput
                    placeholder="Item Name"
                    style={[globalStyles.input, { flex: 2, marginLeft: 10 }]}
                    value={productData.name}
                    onChangeText={(t) => setProductData({ ...productData, name: t })}
                />

                <TextInput
                    placeholder="Qty"
                    keyboardType="numeric"
                    style={[globalStyles.input, { flex: 1, marginLeft: 10 }]}
                    value={productData.qty}
                    onChangeText={(t) => setProductData({ ...productData, qty: t })}
                />

                <TouchableOpacity style={styles.submitBtn} onPress={handlePress}>
                    <Check color="white" size={20} />
                </TouchableOpacity>
            </View>

            {/* UNIT SELECTOR ROW */}
            <View style={styles.unitRow}>
                {unitOptions.map((u) => (
                    <TouchableOpacity
                        key={u}
                        style={[
                            styles.unitChip,
                            productData.unit === u && styles.unitChipActive
                        ]}
                        onPress={() => setProductData({ ...productData, unit: u })}
                    >
                        <Text style={[
                            styles.unitText,
                            productData.unit === u && styles.unitTextActive
                        ]}>{u.toUpperCase()}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: { fontSize: 10, fontWeight: 'bold', color: theme.textMuted, marginBottom: 10, textTransform: 'uppercase' },
    toggleBtn: { width: 42, height: 42, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
    submitBtn: { backgroundColor: theme.primary, padding: 12, borderRadius: 10, marginLeft: 10 },
    unitRow: { flexDirection: 'row', marginTop: 15 },
    unitChip: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        backgroundColor: '#F1F5F9',
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#E2E8F0'
    },
    unitChipActive: { backgroundColor: theme.primary, borderColor: theme.primary },
    unitText: { fontSize: 10, color: '#64748B', fontWeight: 'bold' },
    unitTextActive: { color: 'white' }
});