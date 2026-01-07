import React, { useState } from "react";
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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function ContactNumberScreen({ navigation, route }: any) {
    const prevData = route.params || {};
    const [phone, setPhone] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [showOtp, setShowOtp] = useState(false);
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    const sendOtp = () => {
        if (phone.length < 10) return Alert.alert("Error", "Enter valid number");
        setShowOtp(true);
    };

    const verifyOtp = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            if (otp === "1234") {
                setShowOtp(false);
                setIsVerified(true);
            } else {
                Alert.alert("Error", "Invalid OTP");
            }
        }, 1500);
    };

    const handleNext = () => {
        if (!isVerified) return Alert.alert("Required", "Please verify the number first.");
        navigation.navigate("OfficeAddressScreen", { ...prevData, contactNumber: phone });
    };

    return (
        <ImageBackground source={require("../../assets/bg.jpg")} style={styles.background} resizeMode="cover">
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <Icon name="arrow-left" size={24} color="#0f172a" />
                    </TouchableOpacity>
                    <Text style={styles.stepIndicator}>Step 4 of 5</Text>
                </View>

                <View style={styles.content}>
                    <Text style={styles.title}>Contact Number</Text>
                    <Text style={styles.subtitle}>Enter official mobile or landline number.</Text>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Number</Text>
                        <View style={styles.inputRow}>
                            <TextInput
                                style={styles.input}
                                placeholder="9876543210"
                                keyboardType="phone-pad"
                                value={phone}
                                onChangeText={(t) => { setIsVerified(false); setPhone(t); }}
                                editable={!isVerified}
                            />
                            <TouchableOpacity
                                style={[styles.verifyBtn, isVerified && styles.verifiedBtn]}
                                onPress={sendOtp}
                                disabled={isVerified}
                            >
                                {isVerified ? <Icon name="check" size={20} color="#fff" /> : <Text style={styles.verifyText}>Verify</Text>}
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity style={[styles.nextBtn, !isVerified && { opacity: 0.5 }]} onPress={handleNext} disabled={!isVerified}>
                        <Text style={styles.nextText}>Next</Text>
                        <Icon name="arrow-right" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>

                <Modal visible={showOtp} transparent animationType="slide">
                    <View style={styles.modalBg}>
                        <View style={styles.modalCard}>
                            <Text style={styles.modalTitle}>Enter OTP</Text>
                            <TextInput style={styles.otpInput} placeholder="1234" value={otp} onChangeText={setOtp} keyboardType="number-pad" maxLength={4} autoFocus />
                            <TouchableOpacity style={styles.modalBtn} onPress={verifyOtp}>
                                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.nextText}>Submit</Text>}
                            </TouchableOpacity>
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
    header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 24 },
    backBtn: { padding: 8, backgroundColor: "#f1f5f9", borderRadius: 8 },
    stepIndicator: { fontWeight: "600", color: "#64748B" },
    content: { padding: 24, marginTop: 20 },
    title: { fontSize: 26, fontWeight: "800", color: "#0f172a", marginBottom: 8 },
    subtitle: { fontSize: 16, color: "#64748B", marginBottom: 30 },
    inputGroup: { marginBottom: 20 },
    label: { fontSize: 14, fontWeight: "600", color: "#334155", marginBottom: 8 },
    inputRow: { flexDirection: "row", height: 56 },
    input: { flex: 1, backgroundColor: "#fff", borderWidth: 1, borderColor: "#E2E8F0", borderTopLeftRadius: 12, borderBottomLeftRadius: 12, paddingHorizontal: 16, fontSize: 16 },
    verifyBtn: { backgroundColor: "#0f172a", width: 80, justifyContent: "center", alignItems: "center", borderTopRightRadius: 12, borderBottomRightRadius: 12 },
    verifiedBtn: { backgroundColor: "#10B981" },
    verifyText: { color: "#fff", fontWeight: "600" },
    nextBtn: { backgroundColor: "#0f172a", flexDirection: "row", justifyContent: "center", alignItems: "center", paddingVertical: 18, borderRadius: 30, marginTop: 20 },
    nextText: { color: "#fff", fontSize: 16, fontWeight: "700", marginRight: 8 },
    modalBg: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
    modalCard: { width: "80%", backgroundColor: "#fff", padding: 24, borderRadius: 16, alignItems: "center" },
    modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
    otpInput: { borderWidth: 2, borderColor: "#0f172a", width: 120, textAlign: "center", fontSize: 24, padding: 10, borderRadius: 8, marginBottom: 20, letterSpacing: 5 },
    modalBtn: { backgroundColor: "#0f172a", width: "100%", padding: 14, borderRadius: 8, alignItems: "center" },
});