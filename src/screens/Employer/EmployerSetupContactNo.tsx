// src/screens/Employer/EmployerSetupContactNo.tsx

import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    StatusBar,
    TouchableWithoutFeedback,
    Modal,
    ActivityIndicator
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";

// --- CONSTANTS ---
const PRIMARY_COLOR = "#000000";
const BG_GLASS = "rgba(255, 255, 255, 0.85)";
const SUCCESS_COLOR = "#10B981";
const ERROR_COLOR = "#d32f2f";

export default function EmployerSetupContactNo() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    
    // Previous data: { logo, contactPerson }
    const prevData = route.params || {}; 

    // --- STATE ---
    const [phone, setPhone] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // OTP Modal State
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [otp, setOtp] = useState("");
    const [timer, setTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);

    // Timer Logic
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (showOtpModal && timer > 0) {
            interval = setInterval(() => setTimer(t => t - 1), 1000);
        } else if (timer === 0) {
            setCanResend(true);
        }
        return () => clearInterval(interval);
    }, [showOtpModal, timer]);

    // --- ACTIONS ---

    const handleTextChange = (text: string) => {
        // Only allow numbers
        const cleaned = text.replace(/[^0-9]/g, "");
        setPhone(cleaned);
        setIsVerified(false); // Reset verification if changed
        setError(null);
    };

    const handleSendOtp = () => {
        Keyboard.dismiss();
        if (phone.length < 10) {
            setError("Please enter a valid 10-digit number.");
            return;
        }
        
        setLoading(true);
        // Simulate API Call
        setTimeout(() => {
            setLoading(false);
            setTimer(30);
            setCanResend(false);
            setOtp("");
            setShowOtpModal(true);
        }, 1000);
    };

    const handleVerifyOtp = () => {
        if (otp.length !== 4) return;

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            if (otp === "1234") {
                setShowOtpModal(false);
                setIsVerified(true);
                setError(null);
            } else {
                alert("Wrong OTP. Try 1234.");
                setOtp("");
            }
        }, 1000);
    };

    const handleNext = () => {
        if (!isVerified) return;

        // Navigate to Step G: Office Address
        navigation.navigate("EmployerSetupFinalAddress", { 
            ...prevData, 
            contactNo: phone 
        });
    };

    const handleChangeNumber = () => {
        setIsVerified(false);
    };

    return (
        <ImageBackground
            source={require("../../assets/bg.jpg")}
            style={styles.background}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" />
                
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <KeyboardAvoidingView 
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={{ flex: 1 }}
                    >
                        {/* --- HEADER --- */}
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                                <Icon name="arrow-back" size={24} color="#000" />
                            </TouchableOpacity>

                            <View>
                                <Text style={styles.headerTitle}>Profile Setup</Text>
                                <Text style={styles.headerSubtitle}>Official Contact Details</Text>
                            </View>
                            
                            {/* Progress: Step 3 of 7 */}
                            <View style={styles.progressCircle}>
                                <Text style={styles.progressText}>3/4</Text>
                            </View>
                        </View>

                        {/* --- CONTENT --- */}
                        <View style={styles.content}>
                            <View style={styles.titleBlock}>
                                <Text style={styles.title}>Official Number</Text>
                                <Text style={styles.subtitle}>
                                    This number will be displayed to candidates for official communication.
                                </Text>
                            </View>

                            {/* --- INPUT CARD --- */}
                            <View style={[
                                styles.card, 
                                isVerified ? styles.cardSuccess : (error ? styles.cardError : null)
                            ]}>
                                <View style={styles.cardHeader}>
                                    <Text style={styles.inputLabel}>Mobile / Landline</Text>
                                    {isVerified && (
                                        <View style={styles.verifiedBadge}>
                                            <Icon name="checkmark-circle" size={14} color="#fff" />
                                            <Text style={styles.verifiedText}>Verified</Text>
                                        </View>
                                    )}
                                </View>
                                
                                <View style={styles.inputRow}>
                                    <Icon name="call-outline" size={20} color="#666" style={styles.inputIcon} />
                                    <TextInput
                                        style={[styles.inputField, isVerified && { color: "#888" }]}
                                        placeholder="9876543210"
                                        placeholderTextColor="#999"
                                        value={phone}
                                        onChangeText={handleTextChange}
                                        keyboardType="number-pad"
                                        maxLength={10}
                                        editable={!isVerified}
                                    />

                                    {/* Action Button inside Input */}
                                    {isVerified ? (
                                        <TouchableOpacity onPress={handleChangeNumber}>
                                            <Text style={styles.changeLink}>Change</Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity 
                                            style={styles.verifyBtnSmall}
                                            onPress={handleSendOtp}
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <ActivityIndicator size="small" color="#fff" />
                                            ) : (
                                                <Text style={styles.verifyBtnText}>Verify</Text>
                                            )}
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>

                            {error && (
                                <View style={styles.errorRow}>
                                    <Icon name="alert-circle" size={16} color={ERROR_COLOR} />
                                    <Text style={styles.errorText}>{error}</Text>
                                </View>
                            )}
                        </View>

                        {/* --- FOOTER --- */}
                        <View style={styles.footer}>
                            <TouchableOpacity
                                style={[styles.mainBtn, !isVerified && styles.mainBtnDisabled]}
                                onPress={handleNext}
                                disabled={!isVerified}
                            >
                                <Text style={styles.mainBtnText}>Next Step</Text>
                                <Icon name="arrow-forward" size={20} color="#fff" style={{ marginLeft: 8 }} />
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>

                {/* --- OTP MODAL --- */}
                <Modal visible={showOtpModal} transparent animationType="slide" onRequestClose={() => setShowOtpModal(false)}>
                    <View style={styles.modalOverlay}>
                        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <View style={styles.modalIndicator} />
                                
                                <View style={styles.modalHeader}>
                                    <Text style={styles.modalTitle}>Verification</Text>
                                    <TouchableOpacity onPress={() => setShowOtpModal(false)} style={styles.closeModalBtn}>
                                        <Icon name="close" size={24} color="#666" />
                                    </TouchableOpacity>
                                </View>
                                
                                <Text style={styles.modalDesc}>
                                    Enter the 4-digit code sent to <Text style={{fontWeight:'700'}}>{phone}</Text>
                                </Text>

                                <TextInput
                                    style={styles.otpInput}
                                    placeholder="----"
                                    placeholderTextColor="#ccc"
                                    keyboardType="number-pad"
                                    maxLength={4}
                                    autoFocus
                                    value={otp}
                                    onChangeText={setOtp}
                                />

                                <TouchableOpacity 
                                    style={[styles.modalBtn, otp.length !== 4 && { opacity: 0.5 }]} 
                                    onPress={handleVerifyOtp}
                                    disabled={loading || otp.length !== 4}
                                >
                                    {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.modalBtnText}>Confirm Code</Text>}
                                </TouchableOpacity>

                                <View style={styles.resendRow}>
                                    <Text style={styles.resendLabel}>Resend in </Text>
                                    {canResend ? (
                                        <TouchableOpacity onPress={() => { setTimer(30); setCanResend(false); }}>
                                            <Text style={styles.resendLink}>Resend Now</Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <Text style={styles.resendTimer}>00:{timer < 10 ? `0${timer}` : timer}</Text>
                                    )}
                                </View>
                            </View>
                        </KeyboardAvoidingView>
                    </View>
                </Modal>

            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: { flex: 1 },
    container: { flex: 1 },

    // HEADER
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 24,
        paddingTop: 15,
        marginBottom: 20,
    },
    backBtn: { marginRight: 10, padding: 5 },
    headerTitle: { fontSize: 18, fontWeight: "800", color: "#000" },
    headerSubtitle: { fontSize: 12, color: "#666", marginTop: 2 },
    
    progressCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: PRIMARY_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.5)'
    },
    progressText: { fontSize: 12, fontWeight: "700", color: "#000" },

    // CONTENT
    content: { paddingHorizontal: 24, flex: 1, paddingTop: 20 },
    titleBlock: { marginBottom: 30 },
    title: { fontSize: 32, fontWeight: "800", color: "#000", marginBottom: 10 },
    subtitle: { fontSize: 15, color: "#555", lineHeight: 22 },

    // CARD
    card: {
        backgroundColor: BG_GLASS,
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    cardSuccess: { borderColor: SUCCESS_COLOR, backgroundColor: "rgba(16, 185, 129, 0.1)" },
    cardError: { borderColor: ERROR_COLOR },

    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
    verifiedBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: SUCCESS_COLOR, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
    verifiedText: { color: "#fff", fontSize: 10, fontWeight: "700", marginLeft: 4 },

    inputLabel: { fontSize: 12, fontWeight: "700", color: "#333", textTransform: "uppercase" },
    inputRow: { flexDirection: 'row', alignItems: 'center' },
    inputIcon: { marginRight: 10 },
    inputField: { flex: 1, fontSize: 18, fontWeight: "600", color: "#000", paddingVertical: 10 },

    // BUTTONS INSIDE INPUT
    verifyBtnSmall: { backgroundColor: PRIMARY_COLOR, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 },
    verifyBtnText: { color: "#fff", fontWeight: "700", fontSize: 12 },
    changeLink: { color: "#666", fontWeight: "600", fontSize: 12, textDecorationLine: "underline", padding: 5 },

    errorRow: { flexDirection: 'row', alignItems: 'center', marginTop: 15, marginLeft: 5 },
    errorText: { color: ERROR_COLOR, fontSize: 14, fontWeight: "600", marginLeft: 6 },

    // FOOTER
    footer: { padding: 24, paddingBottom: 20 },
    mainBtn: {
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 30,
        paddingVertical: 18,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    mainBtnDisabled: { backgroundColor: "#ccc", shadowOpacity: 0, elevation: 0 },
    mainBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },

    // MODAL
    modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" },
    modalContainer: { width: "100%" },
    modalContent: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        paddingBottom: 40,
        alignItems: "center",
    },
    modalIndicator: { width: 40, height: 4, backgroundColor: "#e0e0e0", borderRadius: 2, marginBottom: 20 },
    modalHeader: { flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
    modalTitle: { fontSize: 22, fontWeight: "800", color: "#000" },
    closeModalBtn: { padding: 5 },
    modalDesc: { fontSize: 15, color: "#666", marginBottom: 30, textAlign: "center" },

    otpInput: {
        width: "100%", height: 60, backgroundColor: "#f9f9f9", borderRadius: 16, borderWidth: 1, borderColor: "#eee",
        fontSize: 28, fontWeight: "700", textAlign: "center", letterSpacing: 12, color: "#000", marginBottom: 20
    },
    modalBtn: { backgroundColor: PRIMARY_COLOR, width: "100%", paddingVertical: 16, borderRadius: 16, alignItems: "center", marginBottom: 20 },
    modalBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
    
    resendRow: { flexDirection: 'row' },
    resendLabel: { color: "#888", fontSize: 14 },
    resendLink: { color: "#000", fontWeight: "700", fontSize: 14, textDecorationLine: "underline" },
    resendTimer: { color: "#888", fontSize: 14, fontWeight: "600" },
});