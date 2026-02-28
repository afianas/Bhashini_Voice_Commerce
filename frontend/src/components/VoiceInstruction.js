import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Info } from 'lucide-react-native';
import { theme } from './styles/globalStyles';

const instructions = {
    EN: {
        add: 'Say: "Add 10 kg Sugar"',
        rem: 'Say: "Remove 5 pcs Milk"',
    },
    हिं: {
        add: 'बोलें: "10 किलो चीनी जोड़ें"',
        rem: 'बोलें: "5 पैकेट दूध निकालें"',
    },
    ത: {
        add: 'പറയുക: "10 കിലോ പഞ്ചസാര ചേർക്കുക"',
        rem: 'പറയുക: "5 പാക്കറ്റ് പാൽ ഒഴിവാക്കുക"',
    }
};

export default function VoiceInstruction({ lang }) {
    const i = instructions[lang] || instructions.EN;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Info size={14} color={theme.primary} />
                <Text style={styles.headerText}>Voice Guide</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.instructionText}>➕ {i.add}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.instructionText}>➖ {i.rem}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        padding: 12,
        borderRadius: 15,
        marginHorizontal: 20,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    headerText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: theme.primary,
        marginLeft: 5,
        textTransform: 'uppercase',
    },
    row: {
        marginVertical: 2,
    },
    instructionText: {
        fontSize: 13,
        color: '#334155',
        fontWeight: '500',
    }
});