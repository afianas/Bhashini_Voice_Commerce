import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globalStyles, theme } from '../src/styles/globalStyles';

export default function TransactionLedger({ t, transactions }) {
    return (
        <View style={globalStyles.card}>
            {transactions.length === 0 ? (
                <Text style={styles.emptyText}>{t.empty}</Text>
            ) : (
                transactions.map(tLog => {
                    const isStockIn = tLog.typeKey === 'IN';
                    const translatedLabel = isStockIn ? t.stockIn : t.stockOut;

                    // 1. Get the ID and make it lowercase (e.g., "Oil" -> "oil")
                    const lookupId = tLog.itemId ? tLog.itemId.toLowerCase().trim() : "";
                    // Inside TransactionLedger.js map function:

                    const displayName = (t.items && t.items[lookupId])
                        ? t.items[lookupId]
                        : tLog.itemId;

                    // This is the fix: It looks up the itemId in the current language's item list
                    // We lowercase it to ensure "Sugar" matches "sugar"

                    return (
                        <View key={tLog.id} style={styles.transRow}>
                            <View style={[styles.dot, { backgroundColor: isStockIn ? theme.success : theme.danger }]} />

                            <View style={{ flex: 1 }}>
                                <Text style={styles.transName}>
                                    {displayName}
                                </Text>
                                <Text style={styles.transType}>{translatedLabel}</Text>
                            </View>

                            <Text style={[styles.transQty, { color: isStockIn ? theme.success : theme.danger }]}>
                                {isStockIn ? '+' : '-'}{tLog.qty}
                            </Text>

                            <Text style={styles.transTime}>{tLog.time}</Text>
                        </View>
                    );
                })
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    transRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9'
    },
    dot: { width: 6, height: 6, borderRadius: 3, marginRight: 12 },
    transName: { fontSize: 14, fontWeight: 'bold', color: '#334155' },
    transType: { fontSize: 10, color: theme.textMuted, textTransform: 'uppercase' },
    transQty: { fontWeight: 'bold', marginRight: 15 },
    transTime: { fontSize: 10, color: theme.textMuted },
    emptyText: { textAlign: 'center', color: '#CBD5E1', padding: 20, fontSize: 12 },
});