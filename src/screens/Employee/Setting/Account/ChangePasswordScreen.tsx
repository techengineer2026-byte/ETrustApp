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

export default function ChangePasswordScreen() {
    const navigation = useNavigation();

    const [currentPass, setCurrentPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalConfig, setModalConfig] = useState({
        type: 'success',
        title: '',
        message: '',
        buttonText: 'OK',
        onAction: () => { }
    });

    const criteria = [
        { label: 'At least 8 characters', met: newPass.length >= 8 },
        { label: 'Contains a number', met: /\d/.test(newPass) },
        { label: 'Contains an uppercase letter', met: /[A-Z]/.test(newPass) },
    ];
    const isStrong = criteria.every((c) => c.met);
    const doPasswordsMatch = newPass === confirmPass && newPass.length > 0;
    const isFormValid = currentPass.length > 0 && isStrong && doPasswordsMatch;

    const showModal = (type: 'success' | 'error', title: string, message: string, onAction?: () => void) => {
        setModalConfig({
            type,
            title,
            message,
            buttonText: type === 'success' ? 'Continue' : 'Try Again',
            onAction: onAction || (() => setModalVisible(false)),
        });
        setModalVisible(true);
    };

    const handleSubmit = () => {
        if (!isFormValid) return;

        if (currentPass === newPass) {
            showModal('error', 'Invalid Password', 'New password cannot be the same as your current password.');
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            showModal(
                'success',
                'Password Updated',
                'Your password has been changed successfully. Please login with your new credentials next time.',
                () => {
                    setModalVisible(false);
                    navigation.goBack();
                }
            );
        }, 2000);
    };

    const handleForgotPassword = () => {
        console.log("Nav to forgot pass");
        
    };

    const renderInput = (
        label: string,
        value: string,
        onChangeText: (text: string) => void,
        isVisible: boolean,
        toggleVisibility: () => void,
        placeholder: string
    ) => (
        <View style={styles.inputGroup}>
            <Text style={styles.label}>{label}</Text>
            <View style={[styles.inputContainer, styles.shadowInput]}>
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor="#aaa"
                    secureTextEntry={!isVisible}
                    autoCapitalize="none"
                />
                <TouchableOpacity onPress={toggleVisibility} style={styles.eyeIcon}>
                    <MaterialCommunityIcons
                        name={isVisible ? "eye-off-outline" : "eye-outline"}
                        size={20}
                        color="#888"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Change Password</Text>
                <View style={{ width: 24 }} />
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

                    <Text style={styles.infoText}>
                        Create a strong password to keep your account secure.
                    </Text>

                    {renderInput("Current Password", currentPass, setCurrentPass, showCurrent, () => setShowCurrent(!showCurrent), "Enter current password")}

                    <View style={styles.divider} />

                    {renderInput("New Password", newPass, setNewPass, showNew, () => setShowNew(!showNew), "Enter new password")}
                    {renderInput("Confirm Password", confirmPass, setConfirmPass, showConfirm, () => setShowConfirm(!showConfirm), "Re-enter new password")}

                    <View style={styles.criteriaContainer}>
                        <Text style={styles.criteriaTitle}>Password Strength</Text>
                        {criteria.map((item, index) => (
                            <View key={index} style={styles.criteriaRow}>
                                <MaterialCommunityIcons
                                    name={item.met ? "check-circle" : "checkbox-blank-circle-outline"}
                                    size={18}
                                    color={item.met ? "#22c55e" : "#ccc"}
                                />
                                <Text style={[styles.criteriaText, item.met && styles.criteriaTextMet]}>
                                    {item.label}
                                </Text>
                            </View>
                        ))}
                        {confirmPass.length > 0 && (
                            <View style={styles.criteriaRow}>
                                <MaterialCommunityIcons
                                    name={doPasswordsMatch ? "check-circle" : "close-circle"}
                                    size={18}
                                    color={doPasswordsMatch ? "#22c55e" : "#ef4444"}
                                />
                                <Text style={[styles.criteriaText, doPasswordsMatch ? styles.criteriaTextMet : { color: '#ef4444' }]}>
                                    {doPasswordsMatch ? "Passwords match" : "Passwords do not match"}
                                </Text>
                            </View>
                        )}
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <TouchableOpacity
                        style={[styles.saveButton, !isFormValid && styles.saveButtonDisabled]}
                        onPress={handleSubmit}
                        disabled={!isFormValid || isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.saveButtonText}>Update Password</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>

            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="fade"
                onRequestClose={() => { }}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={[
                            styles.modalIconContainer,
                            { backgroundColor: modalConfig.type === 'success' ? '#DCFCE7' : '#FEE2E2' }
                        ]}>
                            <MaterialCommunityIcons
                                name={modalConfig.type === 'success' ? "check-bold" : "alert-outline"}
                                size={32}
                                color={modalConfig.type === 'success' ? "#166534" : "#991B1B"}
                            />
                        </View>

                        <Text style={styles.modalTitle}>{modalConfig.title}</Text>
                        <Text style={styles.modalMessage}>{modalConfig.message}</Text>

                        <TouchableOpacity
                            style={[
                                styles.modalButton,
                                { backgroundColor: modalConfig.type === 'success' ? "#166534" : "#111" }
                            ]}
                            onPress={modalConfig.onAction}
                        >
                            <Text style={styles.modalButtonText}>{modalConfig.buttonText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#fff',
    },
    backButton: { padding: 5 },
    headerTitle: { fontSize: 18, fontWeight: '700', color: '#111' },
    container: { padding: 24 },
    infoText: { fontSize: 14, color: '#666', marginBottom: 24, lineHeight: 20 },

    inputGroup: { marginBottom: 16 },
    label: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8 },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 52,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    shadowInput: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    input: { flex: 1, fontSize: 16, color: '#111', height: '100%' },
    eyeIcon: { padding: 8 },

    forgotLink: { alignSelf: 'flex-end', marginBottom: 10 },
    forgotText: { color: '#3B82F6', fontWeight: '600', fontSize: 13 },
    divider: { height: 1, backgroundColor: '#e5e7eb', marginVertical: 20 },

    criteriaContainer: {
        marginTop: 10,
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#eee',
    },
    criteriaTitle: { fontSize: 13, fontWeight: '700', color: '#374151', marginBottom: 10 },
    criteriaRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
    criteriaText: { fontSize: 13, color: '#9CA3AF', marginLeft: 10 },
    criteriaTextMet: { color: '#374151', fontWeight: '500' },

    footer: { padding: 20, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#f0f0f0' },
    saveButton: { backgroundColor: '#111', paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
    saveButtonDisabled: { backgroundColor: '#E5E7EB' },
    saveButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 24,
        width: width - 48,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 10,
    },
    modalIconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#111',
        marginBottom: 8,
        textAlign: 'center',
    },
    modalMessage: {
        fontSize: 15,
        color: '#666',
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 22,
    },
    modalButton: {
        width: '100%',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});