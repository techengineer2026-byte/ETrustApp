import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Modal,
    Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function ContactSupportScreen() {
    const navigation = useNavigation();

    // Form State
    const [name, setName] = useState('John Doe'); // Pre-fill from user profile
    const [email, setEmail] = useState('john@example.com');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const isFormValid = subject.length > 0 && message.length > 0;

    const handleSubmit = () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setModalVisible(true);
        }, 1500);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Contact Support</Text>
                <View style={{ width: 24 }} />
            </View>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                    <Text style={styles.subtitle}>
                        We're here to help. Fill out the form below and we'll get back to you within 24 hours.
                    </Text>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput style={[styles.input, styles.disabledInput]} value={name} editable={false} />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput style={[styles.input, styles.disabledInput]} value={email} editable={false} />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Subject</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g., Billing Issue, App Bug"
                            placeholderTextColor="#aaa"
                            value={subject}
                            onChangeText={setSubject}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Message</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Describe your issue in detail..."
                            placeholderTextColor="#aaa"
                            multiline
                            textAlignVertical="top"
                            value={message}
                            onChangeText={setMessage}
                        />
                    </View>

                    {/* Attachment Mock */}
                    <TouchableOpacity style={styles.attachmentButton}>
                        <MaterialCommunityIcons name="paperclip" size={20} color="#3B82F6" />
                        <Text style={styles.attachmentText}>Attach Screenshot (Optional)</Text>
                    </TouchableOpacity>

                </ScrollView>

                <View style={styles.footer}>
                    <TouchableOpacity
                        style={[styles.submitButton, !isFormValid && styles.disabledButton]}
                        onPress={handleSubmit}
                        disabled={!isFormValid || isLoading}
                    >
                        {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitText}>Send Message</Text>}
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>

            {/* Success Modal */}
            <Modal transparent visible={modalVisible} animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.successIcon}>
                            <MaterialCommunityIcons name="send-check" size={32} color="#166534" />
                        </View>
                        <Text style={styles.modalTitle}>Message Sent!</Text>
                        <Text style={styles.modalMessage}>Our support team has received your request. Ticket #4829 has been created.</Text>
                        <TouchableOpacity style={styles.modalButton} onPress={handleCloseModal}>
                            <Text style={styles.modalButtonText}>Back to Settings</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#f8f9fa' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#eee' },
    backButton: { padding: 5 },
    headerTitle: { fontSize: 18, fontWeight: '700', color: '#111' },
    container: { padding: 24 },
    subtitle: { fontSize: 14, color: '#666', marginBottom: 24, lineHeight: 20 },
    inputGroup: { marginBottom: 16 },
    label: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8 },
    input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12, paddingHorizontal: 12, height: 50, fontSize: 16, color: '#111' },
    disabledInput: { backgroundColor: '#f3f4f6', color: '#888' },
    textArea: { height: 120, paddingVertical: 12 },
    attachmentButton: { flexDirection: 'row', alignItems: 'center', padding: 10 },
    attachmentText: { color: '#3B82F6', fontWeight: '600', marginLeft: 8 },
    footer: { padding: 20, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#eee' },
    submitButton: { backgroundColor: '#111', padding: 16, borderRadius: 12, alignItems: 'center' },
    disabledButton: { backgroundColor: '#ccc' },
    submitText: { color: '#fff', fontWeight: '700', fontSize: 16 },
    // Modal
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
    modalContent: { backgroundColor: '#fff', width: width - 48, borderRadius: 24, padding: 24, alignItems: 'center' },
    successIcon: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#DCFCE7', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
    modalTitle: { fontSize: 20, fontWeight: '800', color: '#111', marginBottom: 8 },
    modalMessage: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 24, lineHeight: 20 },
    modalButton: { backgroundColor: '#111', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 12, width: '100%', alignItems: 'center' },
    modalButtonText: { color: '#fff', fontWeight: '700' },
});