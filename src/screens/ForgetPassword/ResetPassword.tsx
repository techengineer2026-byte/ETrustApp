import React, { useState, useRef } from "react";
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
    Modal,
    Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const ResetPassword = () => {
    const navigation = useNavigation<any>();
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

    // --- PASSWORD VISIBILITY STATE ---
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    // --- TOAST STATE & ANIMATION ---
    const [toastMessage, setToastMessage] = useState("");
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const showToast = (message: string) => {
        setToastMessage(message);
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

    const handleReset = () => {
        if (!newPass || !confirmPass) {
            showToast("Please fill in both fields.");
            return;
        }
        if (newPass.length < 8) {
            showToast("Password must be at least 8 characters.");
            return;
        }
        if (newPass !== confirmPass) {
            showToast("Passwords do not match.");
            return;
        }
        setShowSuccess(true);
    };

    const handleDone = () => {
        setShowSuccess(false);
        navigation.popToTop();
        navigation.navigate("WelcomeScreen");
    };

    return (
        <ImageBackground
            source={require("../../assets/bg.jpg")}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <SafeAreaView style={styles.safeArea}>

                    {/* Custom Toast */}
                    {toastMessage ? (
                        <Animated.View style={[styles.toastContainer, { opacity: fadeAnim }]}>
                            <Icon name="alert-circle-outline" size={24} color="#fff" />
                            <Text style={styles.toastText}>{toastMessage}</Text>
                        </Animated.View>
                    ) : null}

                    <View style={styles.navBar}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                            <Icon name="arrow-left" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={{ flex: 1 }}
                    >
                        <View style={styles.contentContainer}>
                            <View style={styles.headerTitle}>
                                <Text style={styles.title}>Reset Password</Text>
                                <Text style={styles.subtitle}>
                                    Create a new strong password for your account.
                                </Text>
                            </View>

                            <View style={styles.formContainer}>

                                {/* --- NEW PASSWORD --- */}
                                <Text style={styles.label}>New Password</Text>
                                <View style={styles.inputWrapper}>
                                    <Icon name="lock-outline" size={22} color="#1c005e" style={styles.inputIcon} />
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Min 8 characters"
                                        placeholderTextColor="#999"
                                        value={newPass}
                                        onChangeText={setNewPass}
                                        secureTextEntry={!isPasswordVisible} // Toggle here
                                    />
                                    {/* Eye Icon Button */}
                                    <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                                        <Icon
                                            name={isPasswordVisible ? "eye" : "eye-off"}
                                            size={22}
                                            color="#888"
                                        />
                                    </TouchableOpacity>
                                </View>

                                {/* --- CONFIRM PASSWORD --- */}
                                <Text style={styles.label}>Confirm Password</Text>
                                <View style={styles.inputWrapper}>
                                    <Icon name="lock-check-outline" size={22} color="#1c005e" style={styles.inputIcon} />
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Re-enter password"
                                        placeholderTextColor="#999"
                                        value={confirmPass}
                                        onChangeText={setConfirmPass}
                                        secureTextEntry={!isConfirmPasswordVisible} // Toggle here
                                    />
                                    {/* Eye Icon Button */}
                                    <TouchableOpacity onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}>
                                        <Icon
                                            name={isConfirmPasswordVisible ? "eye" : "eye-off"}
                                            size={22}
                                            color="#888"
                                        />
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity style={styles.btn} onPress={handleReset}>
                                    <Text style={styles.btnText}>RESET PASSWORD</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>

                    {/* Success Modal */}
                    <Modal transparent={true} visible={showSuccess} animationType="fade">
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalContent}>
                                <View style={styles.successIconContainer}>
                                    <Icon name="check-circle" size={60} color="#4CAF50" />
                                </View>
                                <Text style={styles.modalTitle}>Password Changed!</Text>
                                <Text style={styles.modalText}>
                                    Your password has been reset successfully. You can now log in with your new password.
                                </Text>
                                <TouchableOpacity style={styles.modalBtn} onPress={handleDone}>
                                    <Text style={styles.modalBtnText}>BACK TO LOGIN</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

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
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "rgba(255,255,255,0.2)",
        alignItems: "center",
        justifyContent: "center",
    },
    contentContainer: { flex: 1, paddingHorizontal: 25, paddingTop: 30 },
    headerTitle: { marginBottom: 30, alignItems: "center" },
    title: { fontSize: 28, fontWeight: "bold", color: "#fff", marginBottom: 10 },
    subtitle: { fontSize: 15, color: "#e0e0e0", textAlign: "center" },
    formContainer: { width: "100%" },
    label: { color: "#fff", fontSize: 14, fontWeight: "bold", marginBottom: 8, marginLeft: 5 },

    // Input Wrapper modified to support row layout for right icon
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 12,
        height: 55,
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    inputIcon: { marginRight: 10 },
    textInput: { flex: 1, fontSize: 16, color: "#333", height: "100%" },

    btn: {
        backgroundColor: "#fff",
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        width: "100%",
        elevation: 5,
        marginTop: 10,
    },
    btnText: { color: "#1c005e", fontWeight: "800", fontSize: 16 },

    // Toast
    toastContainer: {
        position: "absolute",
        top: 60,
        left: 20,
        right: 20,
        backgroundColor: "#FF5252",
        borderRadius: 10,
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
        elevation: 10,
        zIndex: 1000,
    },
    toastText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
        marginLeft: 10,
        flex: 1,
    },

    // Modal
    modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.7)", justifyContent: "center", alignItems: "center" },
    modalContent: { width: "80%", backgroundColor: "#fff", borderRadius: 20, padding: 25, alignItems: "center", elevation: 10 },
    successIconContainer: { marginTop: -50, backgroundColor: "#fff", borderRadius: 50, padding: 5, elevation: 5, marginBottom: 15 },
    modalTitle: { fontSize: 22, fontWeight: "bold", color: "#333", marginBottom: 10 },
    modalText: { fontSize: 15, color: "#666", textAlign: "center", marginBottom: 25, lineHeight: 22 },
    modalBtn: { backgroundColor: "#1c005e", paddingVertical: 12, width: "100%", borderRadius: 10, alignItems: "center" },
    modalBtnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});

export default ResetPassword;