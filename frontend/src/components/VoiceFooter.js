import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Mic, CircleStop, History } from 'lucide-react-native';
import { theme } from './styles/globalStyles';

export default function VoiceFooter({ recording, transcript, onStart, onStop }) {
    return (
        <View style={styles.footer}>
            {transcript !== "" && (
                <View style={styles.transcriptContainer}>
                    <History size={14} color={theme.primary} />
                    <Text style={styles.transcriptText}>"{transcript}"</Text>
                </View>
            )}
            <TouchableOpacity
                style={[styles.micButton, recording && styles.recordingActive]}
                onPress={recording ? onStop : onStart}
            >
                {recording ? <CircleStop size={32} color="white" /> : <Mic size={32} color="white" />}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    footer: { position: 'absolute', bottom: 0, width: '100%', padding: 20, backgroundColor: 'white', borderTopLeftRadius: 25, borderTopRightRadius: 25, elevation: 20, alignItems: 'center' },
    transcriptContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F7FF', padding: 10, borderRadius: 12, marginBottom: 15, width: '100%' },
    transcriptText: { marginLeft: 8, fontSize: 13, color: theme.primary, fontStyle: 'italic', flex: 1 },
    micButton: { backgroundColor: theme.primary, padding: 18, borderRadius: 50 },
    recordingActive: { backgroundColor: theme.danger },
});