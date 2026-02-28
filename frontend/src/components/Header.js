import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from './styles/globalStyles';

export default function Header({ t, revenue, lang, setLang }) {
    return (
        <View style={styles.header}>
            <View style={styles.titleContainer}>
                {/* RESTORED TEXT TITLE */}
                <Text style={styles.headerTitle}>Invora</Text>
                <Text style={styles.revenueText}>{t.rev}: ₹{revenue}</Text>
            </View>

            <View style={styles.langContainer}>
                {['हिं', 'ത', 'EN'].map((l) => (
                    <TouchableOpacity
                        key={l}
                        onPress={() => setLang(l)}
                        style={[styles.langPill, lang === l && styles.activePill]}
                    >
                        <Text style={[styles.pillText, lang === l && styles.activePillText]}>{l}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 2,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9'
    },
    titleContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.textMain,
        letterSpacing: -0.5,
    },
    revenueText: {
        fontSize: 14,
        color: theme.success,
        fontWeight: 'bold',
        marginTop: 2,
    },
    langContainer: {
        flexDirection: 'row',
        backgroundColor: '#F1F5F9',
        borderRadius: 20,
        padding: 4
    },
    langPill: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15
    },
    activePill: {
        backgroundColor: theme.warning
    },
    pillText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: theme.textMuted
    },
    activePillText: {
        color: 'white'
    },
});