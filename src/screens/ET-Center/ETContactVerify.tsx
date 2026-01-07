// src/screens/ET-Center/ETContactVerify.tsx

import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    StyleSheet,
    Modal,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function ETContactVerify() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    // Merge previous params if any
    const prevData = route.params || {};

    // 'email' or 'phone'
    const [contactMode, setContactMode] = useState<"email" | "phone">("email");
    const [inputValue, setInputValue] = useState("");

    // Verification State
    const [isVerified, setIsVerified] = useState(false);
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [otpCode, setOtpCode] = useState("");

    // Resend Timer State
    const [timer, setTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);

    // Timer Logic for Resend
    useEffect(() => {
        let interval: number | null = null;

        interval = setInterval(() => {
            console.log("running");
        }, 1000);

        clearInterval(interval!);

    }, [showOtpModal, timer]);

    const validateInput = () => {
        if (contactMode === "email") {
            const emailRegex = /\S+@\S+\.\S+/;
            return emailRegex.test(inputValue);
        } else {
            return inputValue.length === 10;
        }
    };

    const handleSendOtp = () => {
        if (!validateInput()) {
            Alert.alert("Invalid Input", `Please enter a valid ${contactMode}.`);
            return;
        }
        // Simulate API Call
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setTimer(30); // Reset timer
            setCanResend(false);
            setShowOtpModal(true);
            setOtpCode(""); // Clear previous OTP
        }, 1000);
    };

    const handleResendOtp = () => {
        setTimer(30);
        setCanResend(false);
        // Logic to resend API would go here
        Alert.alert("OTP Resent", "A new code has been sent.");
    };

    const handleVerifyOtp = () => {
        if (otpCode.length !== 4) return;

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            if (otpCode === otpCode ) { // Mock check
                setShowOtpModal(false);
                setIsVerified(true);
            } else {
                Alert.alert("Error", "Invalid OTP Code");
            }
        }, 1500);
    };

    const handleSubmit = () => {
        if (!isVerified) return;

        // Pass data to next screen
        const payload = {
            ...prevData,
            [contactMode]: inputValue // dynamically sets 'email': val or 'phone': val
        };

        console.log("Submitting:", payload);
        // Navigate to next screen (e.g., Address or Success)
        navigation.navigate("ETpasswordreg", payload);
    };

    const switchMode = (mode: "email" | "phone") => {
        setContactMode(mode);
        setInputValue("");
        setIsVerified(false);
    };

    return (
        <ImageBackground
            source={require("../../assets/bg.jpg")} // Ensure path is correct
            style={styles.background}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <Icon name="arrow-left" size={24} color="#0f172a" />
                    </TouchableOpacity>
                    <Text style={styles.stepIndicator}>Step 1 of 2</Text>
                </View>

                {/* Progress Bar */}
                <View style={styles.progressBarBg}>
                    <View style={[styles.progressBarFill, { width: "50%" }]} />
                </View>

                <View style={styles.content}>
                    <Text style={styles.title}>Contact Verification</Text>
                    <Text style={styles.subtitle}>
                        We need to verify your identity. Choose a method below.
                    </Text>

                    {/* Toggle Tabs */}
                    <View style={styles.tabContainer}>
                        <TouchableOpacity
                            style={[styles.tab, contactMode === "email" && styles.activeTab]}
                            onPress={() => switchMode("email")}
                        >
                            <Icon name="email-outline" size={20} color={contactMode === "email" ? "#fff" : "#64748B"} />
                            <Text style={[styles.tabText, contactMode === "email" && styles.activeTabText]}>Email</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tab, contactMode === "phone" && styles.activeTab]}
                            onPress={() => switchMode("phone")}
                        >
                            <Icon name="cellphone" size={20} color={contactMode === "phone" ? "#fff" : "#64748B"} />
                            <Text style={[styles.tabText, contactMode === "phone" && styles.activeTabText]}>Phone</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Input Section */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>
                            {contactMode === "email" ? "Official Email Address" : "Mobile Number"}
                        </Text>
                        <View style={styles.inputRow}>
                            <TextInput
                                style={[styles.input, { flex: 1, borderTopRightRadius: 0, borderBottomRightRadius: 0 }]}
                                placeholder={contactMode === "email" ? "name@company.com" : "9876543210"}
                                placeholderTextColor="#94a3b8"
                                keyboardType={contactMode === "email" ? "email-address" : "number-pad"}
                                autoCapitalize="none"
                                maxLength={contactMode === "phone" ? 10 : 50}
                                value={inputValue}
                                onChangeText={(t) => {
                                    setIsVerified(false);
                                    setInputValue(contactMode === "phone" ? t.replace(/[^0-9]/g, "") : t);
                                }}
                                editable={!isVerified}
                            />
                            <TouchableOpacity
                                style={[styles.verifyBtn, isVerified && styles.verifiedBtn]}
                                onPress={handleSendOtp}
                                disabled={isVerified}
                            >
                                {loading && !showOtpModal ? (
                                    <ActivityIndicator color="#fff" size="small" />
                                ) : isVerified ? (
                                    <Icon name="check" size={20} color="#fff" />
                                ) : (
                                    <Text style={styles.verifyText}>Send OTP</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Submit Button */}
                    <TouchableOpacity
                        style={[styles.nextBtn, !isVerified && styles.disabledBtn]}
                        onPress={handleSubmit}
                        // disabled={!isVerified}
                    >
                        <Text style={styles.nextText}>Submit & Next</Text>
                        <Icon name="arrow-right" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/* OTP Modal */}
                <Modal visible={showOtpModal} transparent animationType="fade">
                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.modalBg}>
                        <View style={styles.modalCard}>
                            <TouchableOpacity
                                style={styles.closeModal}
                                onPress={() => setShowOtpModal(false)}
                            >
                                <Icon name="close" size={20} color="#64748B" />
                            </TouchableOpacity>

                            <View style={styles.iconCircle}>
                                <Icon name="lock-open-outline" size={28} color="#0f172a" />
                            </View>

                            <Text style={styles.modalTitle}>Enter Verification Code</Text>
                            <Text style={styles.modalSub}>
                                We sent a code to <Text style={{ fontWeight: '700', color: '#000' }}>{inputValue}</Text>
                            </Text>

                            <TextInput
                                style={styles.otpInput}
                                placeholder="0000"
                                placeholderTextColor="#cbd5e1"
                                keyboardType="number-pad"
                                maxLength={4}
                                value={otpCode}
                                onChangeText={setOtpCode}
                                autoFocus
                            />

                            <TouchableOpacity
                                style={styles.modalVerifyBtn}
                                onPress={handleVerifyOtp}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={styles.nextText}>Verify Code</Text>
                                )}
                            </TouchableOpacity>

                            {/* Resend Logic */}
                            <View style={styles.resendContainer}>
                                {canResend ? (
                                    <TouchableOpacity onPress={handleResendOtp}>
                                        <Text style={styles.resendTextActive}>Resend Code</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <Text style={styles.resendTextDisabled}>
                                        Resend code in <Text style={{ fontWeight: 'bold' }}>{timer}s</Text>
                                    </Text>
                                )}
                            </View>

                        </View>
                    </KeyboardAvoidingView>
                </Modal>

            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: { flex: 1 },
    container: { flex: 1 },

    // Header
    header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 24, paddingBottom: 10 },
    backBtn: { padding: 8, backgroundColor: "#f1f5f9", borderRadius: 8 },
    stepIndicator: { fontWeight: "600", color: "#64748B" },
    progressBarBg: { height: 4, backgroundColor: "#E2E8F0", marginHorizontal: 24, borderRadius: 2 },
    progressBarFill: { height: "100%", backgroundColor: "#0f172a", borderRadius: 2 },

    // Content
    content: { padding: 24, marginTop: 10 },
    title: { fontSize: 26, fontWeight: "800", color: "#0f172a", marginBottom: 8 },
    subtitle: { fontSize: 14, color: "#64748B", marginBottom: 24, lineHeight: 22 },

    // Tabs
    tabContainer: { flexDirection: 'row', backgroundColor: '#f1f5f9', borderRadius: 12, padding: 4, marginBottom: 24 },
    tab: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRadius: 10 },
    activeTab: { backgroundColor: '#0f172a', shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
    tabText: { marginLeft: 8, fontWeight: '600', color: '#64748B' },
    activeTabText: { color: '#fff' },

    // Input
    inputGroup: { marginBottom: 30 },
    label: { fontSize: 14, fontWeight: "600", color: "#334155", marginBottom: 8 },
    inputRow: { flexDirection: "row", shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
    input: { borderWidth: 1, borderColor: "#E2E8F0", borderRadius: 12, padding: 16, fontSize: 16, color: "#0f172a", backgroundColor: "#fff" },

    // Buttons
    verifyBtn: { backgroundColor: "#0f172a", paddingHorizontal: 20, justifyContent: "center", borderTopRightRadius: 12, borderBottomRightRadius: 12 },
    verifiedBtn: { backgroundColor: "#10B981" }, // Green
    verifyText: { color: "#fff", fontWeight: "600", fontSize: 13 },

    nextBtn: { backgroundColor: "#0f172a", flexDirection: "row", justifyContent: "center", alignItems: "center", paddingVertical: 18, borderRadius: 30, marginTop: 10 },
    disabledBtn: { opacity: 0.5, backgroundColor: "#94a3b8" },
    nextText: { color: "#fff", fontSize: 16, fontWeight: "700", marginRight: 8 },

    // Modal
    modalBg: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "center", alignItems: "center" },
    modalCard: { width: "85%", backgroundColor: "#fff", padding: 24, borderRadius: 24, alignItems: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.25, shadowRadius: 10, elevation: 10 },
    closeModal: { position: 'absolute', top: 16, right: 16, padding: 4 },

    iconCircle: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },

    modalTitle: { fontSize: 20, fontWeight: "800", color: "#0f172a", marginBottom: 8 },
    modalSub: { color: "#64748B", marginBottom: 24, textAlign: 'center', fontSize: 14 },

    otpInput: { borderWidth: 2, borderColor: "#E2E8F0", width: "100%", paddingVertical: 14, borderRadius: 12, fontSize: 28, textAlign: "center", letterSpacing: 8, marginBottom: 20, color: '#0f172a', fontWeight: '700' },

    modalVerifyBtn: { backgroundColor: "#0f172a", width: "100%", padding: 16, borderRadius: 14, alignItems: "center" },

    resendContainer: { marginTop: 20 },
    resendTextActive: { color: "#0f172a", fontWeight: "700", fontSize: 14 },
    resendTextDisabled: { color: "#94a3b8", fontSize: 14 }
});
