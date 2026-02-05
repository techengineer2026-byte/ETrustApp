// src/screens/Employee/EmployeeAuthContact.tsx

import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    StyleSheet,
    Modal,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    Animated,
    Vibration,
    StatusBar
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
const ERROR_COLOR = "#2c0000";
const SUCCESS_COLOR = "#10B981";
const PRIMARY_COLOR = "#000000";
const BG_GLASS = "rgba(255, 255, 255, 0.85)";
export default function EmployeeAuthContact() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const prevData = route.params || {};
    const [mode, setMode] = useState<"email" | "phone">("email");
    const [email, setEmail] = useState("");
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [phone, setPhone] = useState("");
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [otp, setOtp] = useState("");
    const [timer, setTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);
    const shakeAnim = useRef(new Animated.Value(0)).current;
    const currentInputValue = mode === "email" ? email : phone;
    const isCurrentVerified = mode === "email" ? isEmailVerified : isPhoneVerified;
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (showOtpModal && timer > 0) {
            interval = setInterval(() => setTimer(t => t - 1), 1000);
        } else if (timer === 0) {
            setCanResend(true);
        }
        return () => clearInterval(interval);
    }, [showOtpModal, timer]);
    const triggerError = (msg: string) => {
        setError(msg);
        Vibration.vibrate(50);
        Animated.sequence([
            Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
        ]).start();
    };
    const handleTextChange = (text: string) => {
        setError(null);
        if (mode === "email") {
            setEmail(text);
            setIsEmailVerified(false);
        } else {
            setPhone(text.replace(/[^0-9]/g, ""));
            setIsPhoneVerified(false);
        }
    };
    const validate = () => {
        setError(null);
        if (!currentInputValue.trim()) {
            triggerError(`${mode === "email" ? "Email" : "Phone"} is required.`);
            return false;
        }
        if (mode === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(currentInputValue)) {
                triggerError("Invalid email format.");
                return false;
            }
        } else {
            if (currentInputValue.length !== 10) {
                triggerError("Phone number must be 10 digits.");
                return false;
            }
        }
        return true;
    };
    const handleSendOtp = () => {
        Keyboard.dismiss();
        if (!validate()) return;
        setLoading(true);
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
                setError(null);
                if (mode === "email") setIsEmailVerified(true);
                else setIsPhoneVerified(true);
            } else {
                alert("Wrong OTP (Try 1234)");
                setOtp("");
            }
        }, 1000);
    };
    const handleNext = () => {
        if (!isCurrentVerified) return;
        const payload = { 
            ...prevData, 
            contactMode: mode,
            contactValue: currentInputValue 
        };
        navigation.navigate("EmployeeAuthPassword", payload);
    };
    const switchMode = (newMode: "email" | "phone") => {
        setMode(newMode);
        setError(null); 
    };
    const handleEdit = () => {
        if (mode === "email") setIsEmailVerified(false);
        else setIsPhoneVerified(false);
    };
    return (
        <ImageBackground
            source={require("../../assets/bg.jpg")}
            style={styles.background}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" />
                <KeyboardAvoidingView 
                    behavior={Platform.OS === "ios" ? "padding" : "height"} 
                    style={{ flex: 1 }}
                >
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
                            <Icon name="arrow-back" size={24} color="#000" />
                        </TouchableOpacity>
                        <View style={styles.stepContainer}>
                            <Text style={styles.stepText}>Step 2 of 3</Text>
                            <View style={styles.progressBar}>
                                <View style={[styles.progressFill, { width: "100%" }]} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.titleBlock}>
                            <Text style={styles.title}>Contact Info</Text>
                            <Text style={styles.subtitle}>
                                How should Employer contact you? Verify to proceed.
                            </Text>
                        </View>
                        <View style={styles.tabWrapper}>
                            <TouchableOpacity 
                                style={[styles.tabItem, mode === "email" && styles.tabActive]}
                                onPress={() => switchMode("email")}
                            >
                                <Icon name="mail" size={18} color={mode === "email" ? "#fff" : "#666"} />
                                <Text style={[styles.tabText, mode === "email" && styles.tabTextActive]}>Email</Text>
                                {isEmailVerified && <Icon name="checkmark-circle" size={16} color={SUCCESS_COLOR} style={{marginLeft: 5}} />}
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.tabItem, mode === "phone" && styles.tabActive]}
                                onPress={() => switchMode("phone")}
                            >
                                <Icon name="call" size={18} color={mode === "phone" ? "#fff" : "#666"} />
                                <Text style={[styles.tabText, mode === "phone" && styles.tabTextActive]}>Phone</Text>
                                {isPhoneVerified && <Icon name="checkmark-circle" size={16} color={SUCCESS_COLOR} style={{marginLeft: 5}} />}
                            </TouchableOpacity>
                        </View>
                        <Animated.View style={[
                            styles.inputCard, 
                            { transform: [{ translateX: shakeAnim }] },
                            error ? styles.cardError : (isCurrentVerified ? styles.cardSuccess : {})
                        ]}>
                            <View style={styles.inputHeader}>
                                <Text style={[styles.inputLabel, error && { color: ERROR_COLOR }]}>
                                    {mode === "email" ? "Official Email" : "Mobile Number"}
                                </Text>
                                {isCurrentVerified && (
                                    <View style={styles.badge}>
                                        <Icon name="checkmark-circle" size={14} color="#fff" />
                                        <Text style={styles.badgeText}>Verified</Text>
                                    </View>
                                )}
                            </View>
                            <View style={styles.inputRow}>
                                <TextInput
                                    style={[styles.inputField, isCurrentVerified && { color: "#888" }]}
                                    placeholder={mode === "email" ? "your@gmail.com" : "9876543210"}
                                    placeholderTextColor="#999"
                                    keyboardType={mode === "email" ? "email-address" : "number-pad"}
                                    autoCapitalize="none"
                                    maxLength={mode === "phone" ? 10 : 50}
                                    value={currentInputValue}
                                    onChangeText={handleTextChange}
                                    editable={!isCurrentVerified}
                                />
                                {isCurrentVerified ? (
                                    <TouchableOpacity onPress={handleEdit} style={styles.editBtn}>
                                        <Text style={styles.editText}>Change</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity 
                                        style={styles.verifyBtnSmall} 
                                        onPress={handleSendOtp}
                                        disabled={loading}
                                    >
                                        {loading ? <ActivityIndicator color="#000" size="small" /> : <Text style={styles.verifyText}>Verify</Text>}
                                    </TouchableOpacity>
                                )}
                            </View>
                            {error && (
                                <View style={styles.errorRow}>
                                    <Icon name="alert-circle" size={14} color={ERROR_COLOR} />
                                    <Text style={styles.errorText}>{error}</Text>
                                </View>
                            )}
                        </Animated.View>
                    </View>
                    <View style={styles.footer}>
                        <TouchableOpacity
                            style={[styles.mainBtn, !isCurrentVerified && styles.mainBtnDisabled]}
                            disabled={!isCurrentVerified}
                            onPress={handleNext}
                        >
                            <Text style={styles.mainBtnText}>Continue</Text>
                            <Icon name="arrow-forward" size={20} color="#fff" style={{ marginLeft: 8 }} />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
                <Modal visible={showOtpModal} transparent animationType="slide" onRequestClose={() => setShowOtpModal(false)}>
                    <View style={styles.modalOverlay}>
                        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <View style={styles.modalIndicator} />
                                <View style={styles.modalHeader}>
                                    <Text style={styles.modalTitle}>Enter Code</Text>
                                    <TouchableOpacity onPress={() => setShowOtpModal(false)} style={styles.closeModalBtn}>
                                        <Icon name="close" size={24} color="#666" />
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.modalDesc}>
                                    We sent a 4-digit code to <Text style={{fontWeight: '700', color: '#000'}}>{currentInputValue}</Text>
                                </Text>
                                <View style={styles.otpContainer}>
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
                                </View>
                                <TouchableOpacity 
                                    style={[styles.modalBtn, otp.length !== 4 && { opacity: 0.5 }]} 
                                    onPress={handleVerifyOtp}
                                    disabled={loading || otp.length !== 4}
                                >
                                    {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.modalBtnText}>Confirm Code</Text>}
                                </TouchableOpacity>
                                <View style={styles.resendRow}>
                                    <Text style={styles.resendLabel}>Didn't receive it? </Text>
                                    {canResend ? (
                                        <TouchableOpacity onPress={() => { setTimer(30); setCanResend(false); }}>
                                            <Text style={styles.resendLink}>Resend</Text>
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
        paddingTop: 10,
        marginBottom: 10,
    },
    iconBtn: { padding: 5 },
    stepContainer: { alignItems: 'flex-end' },
    stepText: { fontSize: 12, fontWeight: "600", color: "#666", marginBottom: 4 },
    progressBar: { width: 60, height: 4, backgroundColor: "#e5e5e5", borderRadius: 2 },
    progressFill: { height: "100%", backgroundColor: PRIMARY_COLOR, borderRadius: 2 },
    // CONTENT
    content: { paddingHorizontal: 24, paddingTop: 10 },
    titleBlock: { marginBottom: 25 },
    title: { fontSize: 32, fontWeight: "800", color: "#000", marginBottom: 8, letterSpacing: -0.5 },
    subtitle: { fontSize: 15, color: "#555", lineHeight: 22 },
    // TABS
    tabWrapper: {
        flexDirection: "row",
        backgroundColor: "#f2f2f2",
        padding: 4,
        borderRadius: 14,
        marginBottom: 25,
    },
    tabItem: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        borderRadius: 12,
    },
    tabActive: {
        backgroundColor: PRIMARY_COLOR,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
    },
    tabText: { marginLeft: 6, fontSize: 14, fontWeight: "600", color: "#666" },
    tabTextActive: { color: "#fff" },
    // INPUT CARD
    inputCard: {
        backgroundColor: BG_GLASS,
        borderRadius: 20,
        padding: 20,
        borderWidth: 1.5,
        borderColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    cardError: {
        borderColor: ERROR_COLOR,
        backgroundColor: "rgba(255, 255, 255)", 
    },
    cardSuccess: {
        borderColor: SUCCESS_COLOR,
        backgroundColor: "rgba(16, 185, 129, 0.1)",
    },
    inputHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
    inputLabel: { fontSize: 13, fontWeight: "700", color: "#333", textTransform: "uppercase", letterSpacing: 0.5 },
    badge: { flexDirection: 'row', alignItems: 'center', backgroundColor: SUCCESS_COLOR, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
    badgeText: { color: "#fff", fontSize: 10, fontWeight: "700", marginLeft: 4 },
    inputRow: { flexDirection: 'row', alignItems: 'center', height: 40 },
    inputField: { flex: 1, fontSize: 18, fontWeight: "600", color: "#000", height: '100%' },
    verifyBtnSmall: { backgroundColor: "#eee", paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10 },
    verifyText: { fontSize: 12, fontWeight: "700", color: "#000" },
    // New Edit Button styles
    editBtn: { paddingHorizontal: 10, paddingVertical: 8 },
    editText: { fontSize: 12, fontWeight: "700", color: "#666", textDecorationLine: "underline" },
    errorRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: "rgba(44,0,0,0.1)" },
    errorText: { color: ERROR_COLOR, fontSize: 13, fontWeight: "600", marginLeft: 6 },
    // FOOTER
    footer: { padding: 24, paddingBottom: 20, flex: 1, justifyContent: "flex-end" },
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
    modalTitle: { fontSize: 24, fontWeight: "800", color: "#000" },
    closeModalBtn: { padding: 5 },
    modalDesc: { fontSize: 15, color: "#666", marginBottom: 30, textAlign: "center" },
    otpContainer: { width: "100%", marginBottom: 20 },
    otpInput: {
        width: "100%",
        height: 60,
        backgroundColor: "#f9f9f9",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#eee",
        fontSize: 28,
        fontWeight: "700",
        textAlign: "center",
        letterSpacing: 12,
        color: "#000"
    },
    modalBtn: {
        backgroundColor: PRIMARY_COLOR,
        width: "100%",
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: "center",
        marginBottom: 20,
    },
    modalBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
    resendRow: { flexDirection: 'row' },
    resendLabel: { color: "#888", fontSize: 14 },
    resendLink: { color: "#000", fontWeight: "700", fontSize: 14, textDecorationLine: "underline" },
    resendTimer: { color: "#888", fontSize: 14, fontWeight: "600" },
});
