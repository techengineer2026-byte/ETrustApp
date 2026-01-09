// src/screens/Employee/Setting/Account/KycDocumentsScreen.tsx

// src/screens/Employee/Setting/Account/KycDocumentsScreen.tsx

import React, { useState, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Alert,
    Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// --- TYPES FOR KYC STATUS ---
type KycStatusType = 'Not Started' | 'Pending Review' | 'Verified' | 'Rejected';
type ToastType = 'info' | 'success' | 'error';

interface KycDocument {
    type: string; // e.g., "Aadhar Card", "Passport", "Driving License"
    name: string; // e.g., "aadhar_front.jpg", "passport_scan.pdf"
}

interface KycFlowState {
    status: KycStatusType;
    documentSelected: KycDocument | null;
    otpSent: boolean;
    otpInput: string;
    rejectionReason?: string; // Only if status is 'Rejected'
}

export default function KycDocumentsScreen() {
    const navigation = useNavigation();

    // --- SCREEN STATE ---
    const [kycFlow, setKycFlow] = useState<KycFlowState>({
        status: 'Not Started', // Initial status
        documentSelected: null,
        otpSent: false,
        otpInput: '',
    });

    // --- TOAST STATE & ANIMATION ---
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState<ToastType>("info");
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const showToast = (message: string, type: ToastType = "info") => {
        setToastMessage(message);
        setToastType(type);
        fadeAnim.setValue(0); // Reset animation
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();

        setTimeout(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start(() => setToastMessage(""));
        }, 3000);
    };

    // --- HEADER CONFIGURATION ---
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: 'KYC & Documents',
            // Other header styles are inherited from AccountStack.Navigator
        });
    }, [navigation]);

    // --- KYC FLOW ACTIONS ---

    const handleUploadDocument = () => {
        Alert.alert(
            "Select Document",
            "Simulating document selection. Choose a document type.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Aadhar Card",
                    onPress: () => {
                        setKycFlow(prev => ({
                            ...prev,
                            documentSelected: { type: "Aadhar Card", name: "aadhar_front.jpg" },
                            otpSent: false, // Reset OTP state for new upload
                            otpInput: '',
                        }));
                        showToast("Aadhar Card selected!", "info");
                    }
                },
                {
                    text: "Passport",
                    onPress: () => {
                        setKycFlow(prev => ({
                            ...prev,
                            documentSelected: { type: "Passport", name: "passport_scan.pdf" },
                            otpSent: false,
                            otpInput: '',
                        }));
                        showToast("Passport selected!", "info");
                    }
                },
            ]
        );
        // In a real app, this would use an image picker library:
        // ImagePicker.launchImageLibrary({ mediaType: 'photo' }, (response) => {
        //     if (!response.didCancel && !response.errorMessage) {
        //         setKycFlow(prev => ({ ...prev, documentSelected: { type: 'ID', name: response.fileName } }));
        //         showToast("Document selected!", "success");
        //     }
        // });
    };

    const handleConfirmUpload = () => {
        if (!kycFlow.documentSelected) {
            showToast("Please select a document first.", "error");
            return;
        }

        // Simulate sending OTP
        setKycFlow(prev => ({ ...prev, otpSent: true }));
        showToast("OTP sent to your registered mobile number!", "info");
        // In real app: call API to send OTP
    };

    const handleVerifyOtpAndSubmit = () => {
        if (kycFlow.otpInput.length !== 6) {
            showToast("Please enter a 6-digit OTP.", "error");
            return;
        }

        // Simulate API call to verify OTP and submit documents for review
        // In a real app, this would involve sending document data and OTP to backend.
        setKycFlow(prev => ({ ...prev, status: 'Pending Review', otpSent: false, otpInput: '', documentSelected: null }));
        showToast("Documents submitted for review. Thank you!", "success");
        // For demonstration, let's simulate a rejection after 5 seconds
        // setTimeout(() => {
        //     setKycFlow(prev => ({ ...prev, status: 'Rejected', rejectionReason: 'Document blurry or incomplete.' }));
        //     showToast("Your KYC was rejected. Please review the reason.", "error");
        // }, 5000);
    };

    const handleStartKyc = () => {
        setKycFlow({ status: 'Not Started', documentSelected: null, otpSent: false, otpInput: '' });
    };

    const handleRetryUpload = () => {
        setKycFlow({ status: 'Not Started', documentSelected: null, otpSent: false, otpInput: '' });
        showToast("Please upload your documents again.", "info");
    };

    // --- RENDER HELPERS ---
    const getStatusStyle = (status: KycStatusType) => {
        switch (status) {
            case 'Verified': return { backgroundColor: '#4CAF50', borderColor: '#4CAF50' };
            case 'Pending Review': return { backgroundColor: '#FFC107', borderColor: '#FFC107' };
            case 'Rejected': return { backgroundColor: '#FF5252', borderColor: '#FF5252' };
            case 'Not Started':
            default: return { backgroundColor: '#9E9E9E', borderColor: '#9E9E9E' };
        }
    };

    const getStatusIcon = (status: KycStatusType) => {
        switch (status) {
            case 'Verified': return "check-circle-outline";
            case 'Pending Review': return "timer-sand";
            case 'Rejected': return "close-circle-outline";
            case 'Not Started':
            default: return "information-outline";
        }
    };

    const getToastIcon = (type: ToastType) => {
        switch (type) {
            case 'success': return "check-circle-outline";
            case 'error': return "alert-circle-outline";
            case 'info':
            default: return "information-outline";
        }
    };

    const getToastColor = (type: ToastType) => {
        switch (type) {
            case 'success': return '#4CAF50';
            case 'error': return '#FF5252';
            case 'info':
            default: return '#007AFF'; // Blue
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.contentCard}>
                    <Text style={styles.contentText}>
                        To ensure a secure and compliant experience, we require you to complete your Know Your Customer (KYC) verification. Please upload the necessary identity documents.
                    </Text>

                    {/* --- CURRENT KYC STATUS --- */}
                    <Text style={styles.inputLabel}>Your KYC Status</Text>
                    <View style={[styles.statusBox, getStatusStyle(kycFlow.status)]}>
                        <MaterialCommunityIcons name={getStatusIcon(kycFlow.status)} size={20} color="#fff" />
                        <Text style={styles.statusText}>{kycFlow.status}</Text>
                    </View>

                    {kycFlow.status === 'Rejected' && kycFlow.rejectionReason && (
                        <View style={styles.rejectionReasonBox}>
                            <Text style={styles.rejectionReasonTitle}>Reason for Rejection:</Text>
                            <Text style={styles.rejectionReasonText}>{kycFlow.rejectionReason}</Text>
                        </View>
                    )}


                    {/* --- KYC FLOW LOGIC --- */}

                    {/* Step 1: Not Started or Rejected - Ask to Upload */}
                    {(kycFlow.status === 'Not Started' || kycFlow.status === 'Rejected') && (
                        <>
                            <Text style={styles.inputLabel}>Upload Your Document</Text>
                            {kycFlow.documentSelected ? (
                                <View style={styles.documentSelectedBox}>
                                    <MaterialCommunityIcons name="file-document-outline" size={24} color="#007AFF" />
                                    <Text style={styles.documentSelectedText}>
                                        {kycFlow.documentSelected.type}: {kycFlow.documentSelected.name}
                                    </Text>
                                    <TouchableOpacity onPress={handleUploadDocument}>
                                        <MaterialCommunityIcons name="pencil" size={20} color="#666" />
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <TouchableOpacity
                                    style={styles.uploadButton}
                                    onPress={handleUploadDocument}
                                >
                                    <MaterialCommunityIcons name="cloud-upload-outline" size={24} color="#007AFF" />
                                    <Text style={styles.uploadButtonText}>Tap to Upload Document</Text>
                                </TouchableOpacity>
                            )}

                            {kycFlow.documentSelected && !kycFlow.otpSent && (
                                <TouchableOpacity
                                    style={styles.actionButton}
                                    onPress={handleConfirmUpload}
                                >
                                    <Text style={styles.actionButtonText}>Confirm Upload & Send OTP</Text>
                                </TouchableOpacity>
                            )}
                        </>
                    )}

                    {/* Step 2: OTP Verification */}
                    {kycFlow.otpSent && (
                        <>
                            <Text style={styles.inputLabel}>Enter OTP</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Enter 6-digit OTP"
                                keyboardType="number-pad"
                                value={kycFlow.otpInput}
                                onChangeText={(text) => setKycFlow(prev => ({ ...prev, otpInput: text }))}
                                maxLength={6}
                            />
                            <TouchableOpacity
                                style={styles.actionButtonPrimary}
                                onPress={handleVerifyOtpAndSubmit}
                                disabled={kycFlow.otpInput.length !== 6}
                            >
                                <Text style={styles.actionButtonPrimaryText}>Verify OTP & Submit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.secondaryActionButton}
                                onPress={handleConfirmUpload} // Allow resending OTP
                            >
                                <Text style={styles.secondaryActionButtonText}>Resend OTP</Text>
                            </TouchableOpacity>
                        </>
                    )}

                    {/* Retry / Start KYC if Rejected or Not Started and flow is complete */}
                    {(kycFlow.status === 'Rejected' || kycFlow.status === 'Not Started') &&
                        !kycFlow.documentSelected && !kycFlow.otpSent && (
                        <TouchableOpacity
                            style={[styles.secondaryActionButton, {marginTop: 20}]}
                            onPress={handleStartKyc}
                        >
                            <Text style={styles.secondaryActionButtonText}>Start/Restart KYC Process</Text>
                        </TouchableOpacity>
                    )}

                    {/* If KYC is Verified, offer to view documents (optional) */}
                    {kycFlow.status === 'Verified' && (
                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={() => showToast("Viewing documents is not yet implemented.", "info")}
                        >
                            <Text style={styles.actionButtonText}>View Submitted Documents</Text>
                        </TouchableOpacity>
                    )}

                </View>

                {/* --- VERSION DISPLAY --- */}
                <Text style={styles.versionText}>App Version 1.0.0</Text>

            </ScrollView>

            {/* --- TOAST UI --- */}
            {toastMessage ? (
                <Animated.View style={[styles.toastContainer, { opacity: fadeAnim, backgroundColor: getToastColor(toastType) }]}>
                    <MaterialCommunityIcons name={getToastIcon(toastType)} size={20} color="#fff" />
                    <Text style={styles.toastText}>{toastMessage}</Text>
                </Animated.View>
            ) : null}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f2f2f6',
    },
    container: {
        paddingVertical: 20,
        paddingHorizontal: 0,
    },
    contentCard: {
        backgroundColor: '#ffffff',
        marginHorizontal: 15,
        borderRadius: 12,
        padding: 20,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 3,
    },
    contentText: {
        fontSize: 15,
        color: '#666',
        lineHeight: 22,
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 14,
        color: '#555',
        fontWeight: '600',
        marginBottom: 8,
        marginTop: 15,
    },
    statusBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        marginBottom: 10,
    },
    statusText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    rejectionReasonBox: {
        backgroundColor: '#ffebeb',
        borderColor: '#ff5252',
        borderWidth: 1,
        borderRadius: 8,
        padding: 15,
        marginTop: 10,
        marginBottom: 10,
    },
    rejectionReasonTitle: {
        color: '#d32f2f',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    rejectionReasonText: {
        color: '#d32f2f',
        fontSize: 14,
        lineHeight: 20,
    },
    uploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E3F2FD', // Light blue background
        borderColor: '#BBDEFB',
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: 15,
        marginTop: 10,
        borderStyle: 'dashed', // Dashed border for upload area
    },
    uploadButtonText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#007AFF',
        fontWeight: '600',
    },
    documentSelectedBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        borderColor: '#e0e0e0',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 12,
        marginTop: 10,
        justifyContent: 'space-between',
    },
    documentSelectedText: {
        flex: 1,
        marginLeft: 10,
        fontSize: 15,
        color: '#333',
    },
    textInput: {
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        color: '#333',
    },
    actionButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    actionButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    actionButtonPrimary: {
        backgroundColor: '#4CAF50', // Green for final submission
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    actionButtonPrimaryText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    secondaryActionButton: {
        backgroundColor: 'transparent', // Transparent background
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
        borderColor: '#d0d0d0', // Light border
        borderWidth: 1,
    },
    secondaryActionButtonText: {
        color: '#666',
        fontSize: 16,
        fontWeight: '600',
    },
    versionText: {
        marginTop: 20,
        color: '#aaa',
        fontSize: 12,
        textAlign: 'center',
    },
    // --- TOAST STYLES ---
    toastContainer: {
        position: "absolute",
        top: 60,
        left: 20,
        right: 20,
        borderRadius: 10,
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
        elevation: 10,
        zIndex: 1000,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
    },
    toastText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
        marginLeft: 10,
        flex: 1,
    },
});