import React, { useState, useRef } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform, Dimensions, StatusBar, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const OTPScreen = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const { email } = route.params || { email: "your email" };

    // 4 Inputs logic
    const [otp, setOtp] = useState(["", "", "", ""]);
    const inputs = useRef<Array<TextInput | null>>([]);

    const handleChangeText = (text: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        // Auto focus next
        if (text && index < 3) {
            inputs.current[index + 1]?.focus();
        }
        // Auto focus prev if delete
        if (!text && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    const handleVerify = () => {
        const code = otp.join("");
        if (code.length < 4) {
            Alert.alert("Invalid Code", "Please enter the full 4-digit code.");
            return;
        }
        console.log("Verifying Code:", code);
        // Navigate to Step 3
        navigation.navigate("ResetPassword");
    };

    return (
        <ImageBackground source={require("../../assets/bg.jpg")} style={styles.background} resizeMode="cover">
            <View style={styles.overlay}>
                <SafeAreaView style={styles.safeArea}>

                    <View style={styles.navBar}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                            <Icon name="arrow-left" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.contentContainer}>
                        <View style={styles.iconCircle}>
                            <Icon name="email-lock" size={40} color="#1c005e" />
                        </View>

                        <Text style={styles.title}>Verification</Text>
                        <Text style={styles.subtitle}>Enter the code sent to {email}</Text>

                        <View style={styles.otpContainer}>
                            {otp.map((digit, index) => (
                                <TextInput
                                    key={index}
                                    ref={(ref) => {
                                        inputs.current[index] = ref;
                                    }}
                                    style={styles.otpBox}
                                    keyboardType="number-pad"
                                    maxLength={1}
                                    value={digit}
                                    onChangeText={(text) => handleChangeText(text, index)}
                                    textAlign="center"
                                />
                            ))}
                        </View>

                        <TouchableOpacity style={styles.btn} onPress={handleVerify}>
                            <Text style={styles.btnText}>VERIFY CODE</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.resendBtn}>
                            <Text style={styles.resendText}>Didn't receive code? <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>Resend</Text></Text>
                        </TouchableOpacity>
                    </View>

                </SafeAreaView>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: { flex: 1 },
    overlay: { flex: 1, backgroundColor: "rgba(0, 0, 0, 0.1)" },
    safeArea: { flex: 1 },
    navBar: { paddingHorizontal: 20, marginTop: 10 },
    backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center" },

    contentContainer: { flex: 1, alignItems: "center", paddingHorizontal: 25, justifyContent: "center", marginTop: -50 },
    iconCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: "#fff", alignItems: "center", justifyContent: "center", marginBottom: 20, elevation: 10 },
    title: { fontSize: 28, fontWeight: "bold", color: "#fff", marginBottom: 10 },
    subtitle: { fontSize: 15, color: "#e0e0e0", textAlign: "center", marginBottom: 40 },

    otpContainer: { flexDirection: "row", justifyContent: "space-between", width: "100%", marginBottom: 30 },
    otpBox: { width: 60, height: 60, borderRadius: 12, backgroundColor: "#fff", fontSize: 24, fontWeight: "bold", color: "#1c005e", borderWidth: 2, borderColor: "rgba(255,255,255,0.5)" },

    btn: { backgroundColor: "#fff", paddingVertical: 16, borderRadius: 12, alignItems: "center", width: "100%", elevation: 5 },
    btnText: { color: "#1c005e", fontWeight: "800", fontSize: 16 },

    resendBtn: { marginTop: 25 },
    resendText: { color: "#fff", fontSize: 14 },
});

export default OTPScreen;