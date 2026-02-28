import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { XCircle, CheckCircle } from 'lucide-react-native';
import { theme } from './styles/globalStyles';

export default function VerificationModal({ visible, productData, onCancel, onConfirm }) {
    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Confirm AI Transaction</Text>
                    <View style={styles.verifyBox}>
                        <Text style={styles.verifyText}>{productData.name}: {Math.abs(productData.qty)} units</Text>
                        <Text style={styles.verifySub}>{parseInt(productData.qty) < 0 ? 'Sale (Removing Stock)' : 'Purchase (Adding Stock)'}</Text>
                    </View>
                    <View style={styles.modalActions}>
                        <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#FEE2E2' }]} onPress={onCancel}>
                            <XCircle size={20} color={theme.danger} />
                            <Text style={{ color: theme.danger, fontWeight: 'bold', marginLeft: 8 }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.modalBtn, { backgroundColor: '#D1FAE5' }]} onPress={onConfirm}>
                            <CheckCircle size={20} color={theme.success} />
                            <Text style={{ color: theme.success, fontWeight: 'bold', marginLeft: 8 }}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
    modalContent: { backgroundColor: 'white', borderRadius: 25, padding: 25 },
    modalTitle: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
    verifyBox: { backgroundColor: '#F8FAFC', padding: 20, borderRadius: 15, alignItems: 'center', marginBottom: 25 },
    verifyText: { fontSize: 20, fontWeight: 'bold', color: theme.textMain },
    verifySub: { fontSize: 12, color: theme.textMuted, marginTop: 5 },
    modalActions: { flexDirection: 'row', justifyContent: 'space-between' },
    modalBtn: { flex: 0.48, flexDirection: 'row', padding: 15, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }
});