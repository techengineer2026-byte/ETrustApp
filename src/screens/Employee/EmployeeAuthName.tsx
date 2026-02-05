// src/screens/Employee/EmployeeAuthName.tsx

import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    StatusBar
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

// --- COLORS ---
const PRIMARY_COLOR = "#000000";
const BG_GLASS = "rgba(255, 255, 255, 0.85)";

export default function EmployeeAuthName() {
    const navigation = useNavigation<any>();
    const [fullName, setFullName] = useState("");

    const handleNext = () => {
        if (!fullName.trim()) return;
        // Pass name to next screen
        navigation.navigate("EmployeeAuthContact", { fullName });
    };

    return (
        <ImageBackground
            source={require("../../assets/bg.jpg")}
            style={styles.background}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" />
                
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
                            <Icon name="arrow-back" size={24} color="#000" />
                        </TouchableOpacity>
                        <Text style={styles.stepText}>Step 1 of 3</Text>
                    </View>

                    <View style={styles.content}>
                        <View style={styles.titleBlock}>
                            <Text style={styles.title}>What's your name?</Text>
                            <Text style={styles.subtitle}>Enter your full name to get started.</Text>
                        </View>

                        <View style={styles.inputCard}>
                            <Text style={styles.inputLabel}>Full Name</Text>
                            <View style={styles.inputRow}>
                                <Icon name="person-outline" size={20} color="#666" style={{marginRight: 10}}/>
                                <TextInput
                                    style={styles.inputField}
                                    placeholder="e.g. John Doe"
                                    placeholderTextColor="#999"
                                    value={fullName}
                                    onChangeText={setFullName}
                                    autoCapitalize="words"
                                    autoFocus
                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.footer}>
                        <TouchableOpacity
                            style={[styles.mainBtn, !fullName.trim() && styles.mainBtnDisabled]}
                            disabled={!fullName.trim()}
                            onPress={handleNext}
                        >
                            <Text style={styles.mainBtnText}>Next Step</Text>
                            <Icon name="arrow-forward" size={20} color="#fff" style={{ marginLeft: 8 }} />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: { flex: 1 },
    container: { flex: 1 },
    header: { flexDirection: "row", justifyContent: "space-between", alignItems: 'center', paddingHorizontal: 24, paddingTop: 10, marginBottom: 20 },
    iconBtn: { padding: 5 },
    stepText: { fontSize: 12, fontWeight: "700", color: "#666" },
    content: { paddingHorizontal: 24 },
    titleBlock: { marginBottom: 30 },
    title: { fontSize: 32, fontWeight: "800", color: "#000", marginBottom: 5 },
    subtitle: { fontSize: 16, color: "#555" },
    inputCard: { backgroundColor: BG_GLASS, borderRadius: 20, padding: 20, borderWidth: 1, borderColor: "#fff" },
    inputLabel: { fontSize: 12, fontWeight: "700", color: "#333", textTransform: "uppercase", marginBottom: 5 },
    inputRow: { flexDirection: 'row', alignItems: 'center' },
    inputField: { flex: 1, fontSize: 18, fontWeight: "600", color: "#000", paddingVertical: 10 },
    footer: { padding: 24, flex: 1, justifyContent: "flex-end" },
    mainBtn: { backgroundColor: PRIMARY_COLOR, borderRadius: 30, paddingVertical: 18, flexDirection: "row", justifyContent: "center", alignItems: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 5 },
    mainBtnDisabled: { backgroundColor: "#ccc", shadowOpacity: 0, elevation: 0 },
    mainBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});