import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity,ImageBackground, StyleSheet, Modal, Alert, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function EmailScreen() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const prevData = route.params;

    const [email, setEmail] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [otpCode, setOtpCode] = useState("");

    const sendOtp = () => {
        if (!email.includes("@")) {
            Alert.alert("Invalid Email", "Please enter a valid official email.");
            return;
        }
        setShowOtpModal(true);
    };

    const verifyOtp = () => {
        if (otpCode.length !== 4) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setShowOtpModal(false);
            setIsVerified(true);
        }, 1500);
    };

    const handleNext = () => {
        if (!isVerified) return Alert.alert("Verification Required", "Verify email to proceed.");
        navigation.navigate("PhoneScreen", { ...prevData, email });
    };

    return (
                <ImageBackground
      source={require("../../assets/bg.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><Icon name="arrow-left" size={24} color="#0f172a" /></TouchableOpacity>
                <Text style={styles.stepIndicator}>2 of 4</Text>
            </View>
            <View style={styles.progressBarBg}><View style={[styles.progressBarFill, { width: "50%" }]} /></View>

            <View style={styles.content}>
                <View style={styles.iconCircle}><Icon name="email-check-outline" size={32} color="#0f172a" /></View>
                <Text style={styles.title}>Email Verification</Text>
                <Text style={styles.subtitle}>Verify your official work email.</Text>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Official Email ID</Text>
                    <View style={styles.inputRow}>
                        <TextInput
                            style={[styles.input, { flex: 1, borderTopRightRadius: 0, borderBottomRightRadius: 0 }]}
                            placeholder="hr@company.com"
                            placeholderTextColor="#94a3b8"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={(t) => { setIsVerified(false); setEmail(t); }}
                            editable={!isVerified}
                        />
                        <TouchableOpacity
                            style={[styles.verifyBtn, isVerified && styles.verifiedBtn]}
                            onPress={sendOtp}
                            disabled={isVerified}
                        >
                            {isVerified ? <Icon name="check" size={20} color="#fff" /> : <Text style={styles.verifyText}>Send OTP</Text>}
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity style={[styles.nextBtn, !isVerified && styles.disabledBtn]} onPress={handleNext} disabled={!isVerified}>
                    <Text style={styles.nextText}>Next</Text>
                    <Icon name="arrow-right" size={20} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* OTP Modal */}
            <Modal visible={showOtpModal} transparent animationType="slide">
                <View style={styles.modalBg}>
                    <View style={styles.modalCard}>
                        <Text style={styles.modalTitle}>Enter OTP</Text>
                        <Text style={styles.modalSub}>Code sent to {email}</Text>
                        <TextInput style={styles.otpInput} placeholder="1234" keyboardType="number-pad" maxLength={4} value={otpCode} onChangeText={setOtpCode} autoFocus />
                        <TouchableOpacity style={styles.modalVerifyBtn} onPress={verifyOtp}>
                            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.nextText}>Verify</Text>}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setShowOtpModal(false)}><Text style={styles.modalCancel}>Cancel</Text></TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
            background: { flex: 1 },

    container: { flex: 1 },
    header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 20 },
    backBtn: { padding: 5, backgroundColor: '#f1f5f9', borderRadius: 8 },
    stepIndicator: { fontWeight: "bold", color: "#64748B" },
    progressBarBg: { height: 4, backgroundColor: "#E2E8F0", marginHorizontal: 20, borderRadius: 2 },
    progressBarFill: { height: "100%", backgroundColor: "#0f172a", borderRadius: 2 },
    content: { padding: 24, marginTop: 10 },
    iconCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#f1f5f9', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
    title: { fontSize: 26, fontWeight: "800", color: "#0f172a", marginBottom: 5 },
    subtitle: { fontSize: 16, color: "#64748B", marginBottom: 30 },
    inputGroup: { marginBottom: 20 },
    label: { fontSize: 14, fontWeight: "600", color: "#334155", marginBottom: 8 },
    inputRow: { flexDirection: "row" },
    input: { borderWidth: 1, borderColor: "#CBD5E1", borderRadius: 12, padding: 16, fontSize: 16, color: "#0f172a", backgroundColor: "#F8FAFC" },
    verifyBtn: { backgroundColor: "#0f172a", paddingHorizontal: 20, justifyContent: "center", borderTopRightRadius: 12, borderBottomRightRadius: 12 },
    verifiedBtn: { backgroundColor: "#10B981" },
    verifyText: { color: "#fff", fontWeight: "600", fontSize: 13 },
    nextBtn: { backgroundColor: "#0f172a", flexDirection: "row", justifyContent: "center", alignItems: "center", paddingVertical: 18, borderRadius: 12, marginTop: 10 },
    disabledBtn: { opacity: 0.5 },
    nextText: { color: "#fff", fontSize: 16, fontWeight: "bold", marginRight: 10 },
    modalBg: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "center", alignItems: "center" },
    modalCard: { width: "85%", backgroundColor: "#fff", padding: 25, borderRadius: 16, alignItems: "center" },
    modalTitle: { fontSize: 20, fontWeight: "bold", color: "#0f172a", marginBottom: 5 },
    modalSub: { color: "#64748B", marginBottom: 20 },
    otpInput: { borderWidth: 2, borderColor: "#0f172a", width: 140, padding: 10, borderRadius: 8, fontSize: 24, textAlign: "center", letterSpacing: 5, marginBottom: 20 },
    modalVerifyBtn: { backgroundColor: "#0f172a", width: "100%", padding: 14, borderRadius: 8, alignItems: "center" },
    modalCancel: { marginTop: 15, color: "#64748B", fontWeight: "500" }
});