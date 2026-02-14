// src/screens/Employer/EmployerAuthPassword.tsx

import React, { useState } from "react";
import {
    View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, KeyboardAvoidingView, Platform,
    Alert
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

const PRIMARY_COLOR = "#000000";
const BG_GLASS = "rgba(255, 255, 255, 0.85)";

export default function EmployerAuthPassword() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const prevData = route.params || {}; 
    // prevData contains: { fullName, contactMode, contactValue }

    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [secure, setSecure] = useState(true);

    const handleRegister = () => {
        if (!password || password.length < 6) return Alert.alert("Password too short");
        if (password !== confirm) return Alert.alert("Passwords do not match");

        const finalData = {
            ...prevData,
            password
        };

        console.log("FINAL Employer DATA:", finalData);
        
        // Go to Login
        navigation.navigate("EmployerWelcomeDashboard");
    };

    return (
        <ImageBackground source={require("../../assets/bg.jpg")} style={styles.background} resizeMode="cover">
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}><Icon name="arrow-back" size={24} color="#000" /></TouchableOpacity>
                    <Text style={styles.stepText}>Step 3 of 3</Text>
                </View>

                <View style={styles.content}>
                    <Text style={styles.title}>Secure your account</Text>
                    <Text style={styles.subtitle}>Create a strong password.</Text>

                    <View style={styles.card}>
                        <View style={styles.inputBox}>
                            <Icon name="lock-closed-outline" size={20} color="#666" style={{marginRight: 10}}/>
                            <TextInput 
                                style={styles.input} 
                                placeholder="Create Password" 
                                secureTextEntry={secure} 
                                value={password} 
                                onChangeText={setPassword}
                            />
                            <TouchableOpacity onPress={() => setSecure(!secure)}>
                                <Icon name={secure ? "eye-off-outline" : "eye-outline"} size={20} color="#999"/>
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.inputBox, {marginTop: 15}]}>
                            <Icon name="lock-closed-outline" size={20} color="#666" style={{marginRight: 10}}/>
                            <TextInput 
                                style={styles.input} 
                                placeholder="Confirm Password" 
                                secureTextEntry={true} 
                                value={confirm} 
                                onChangeText={setConfirm}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity 
                        style={[styles.mainBtn, (!password || password !== confirm) && styles.disabled]} 
                        onPress={handleRegister}
                    >
                        <Text style={styles.btnText}>Create Account</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: { flex: 1 },
    container: { flex: 1 },
    header: { flexDirection: "row", justifyContent: "space-between", alignItems: 'center', padding: 24 },
    stepText: { fontSize: 12, fontWeight: "700", color: "#666" },
    content: { paddingHorizontal: 24 },
    title: { fontSize: 32, fontWeight: "800", color: "#000", marginBottom: 5 },
    subtitle: { fontSize: 16, color: "#555", marginBottom: 30 },
    card: { backgroundColor: BG_GLASS, borderRadius: 20, padding: 20, borderWidth: 1, borderColor: "#fff" },
    inputBox: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 5 },
    input: { flex: 1, fontSize: 16, fontWeight: "600", color: "#000", paddingVertical: 10 },
    footer: { padding: 24, flex: 1, justifyContent: "flex-end" },
    mainBtn: { backgroundColor: PRIMARY_COLOR, borderRadius: 30, paddingVertical: 18, alignItems: 'center' },
    disabled: { backgroundColor: "#ccc" },
    btnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});