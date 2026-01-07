// src/screens/ET-Center/ETname.tsx

import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function ETname() {
    const navigation = useNavigation<any>();

    // --- STATE ---
    const [name, setName] = useState("");

    // --- HANDLERS ---
    const handleNext = () => {
        if (!name.trim()) {
            return Alert.alert("Missing Name", "Please enter your full name.");
        }
        // Navigate to Step 2 with just the name
        navigation.navigate("OfficeAddressET", { name });
    };

    return (
        <ImageBackground
            source={require("../../assets/bg.jpg")}
            style={styles.background}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.safeArea}>
                <StatusBar barStyle="dark-content" />

                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                >
                    <ScrollView
                        contentContainerStyle={styles.scrollContainer}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >

                        {/* Header */}
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                                <Icon name="arrow-left" size={24} color="#1c005e" />
                            </TouchableOpacity>
                            <Text style={styles.stepIndicator}>Step 1 of 3</Text>
                        </View>

                        {/* Progress Bar (33%) */}
                        <View style={styles.progressBarBg}>
                            <View style={[styles.progressBarFill, { width: "33%" }]} />
                        </View>

                        {/* Main Content */}
                        <View style={styles.content}>
                            <View style={styles.iconCircle}>
                                <Icon name="account-details" size={32} color="#fff" />
                            </View>

                            <Text style={styles.title}>Let's Get Started</Text>
                            <Text style={styles.subtitle}>Create your employee account to find jobs.</Text>

                            {/* Name Input */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Full Name</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Ex. Rahul Verma"
                                    placeholderTextColor="#999"
                                    value={name}
                                    onChangeText={setName}
                                    autoCapitalize="words"
                                />
                            </View>
                        </View>

                        {/* Bottom Button */}
                        <View style={styles.footer}>
                            <TouchableOpacity
                                style={styles.nextBtn}
                                onPress={handleNext}
                            >
                                <Text style={styles.nextText}>Next Step</Text>
                                <Icon name="arrow-right" size={20} color="#fff" />
                            </TouchableOpacity>
                        </View>

                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: { flex: 1 },

    safeArea: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
    },
    // --- Header ---
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 15,
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: "#f3e5f5",
        justifyContent: "center",
        alignItems: "center",
    },
    stepIndicator: {
        fontWeight: "700",
        color: "#1d1b25",
        fontSize: 14,
    },
    // --- Progress Bar ---
    progressBarBg: {
        height: 6,
        backgroundColor: "#E0E0E0",
        marginHorizontal: 24,
        borderRadius: 3,
        marginBottom: 20,
    },
    progressBarFill: {
        height: "100%",
        backgroundColor: "#1c005e",
        borderRadius: 3,
    },
    // --- Content ---
    content: {
        paddingHorizontal: 24,
        flex: 1,
    },
    iconCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#1c005e",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15,
        shadowColor: "#1c005e",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
        color: "#1c005e",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        marginBottom: 30,
        lineHeight: 22,
    },
    // --- Inputs ---
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: "700",
        color: "#333",
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 16,
        fontSize: 16,
        color: "#000",
        backgroundColor: "#FAFAFA",
    },
    // --- Footer ---
    footer: {
        padding: 24,
        marginTop: "auto",
    },
    nextBtn: {
        backgroundColor: "#1c005e",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 18,
        borderRadius: 16,
        shadowColor: "#1c005e",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    nextText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        marginRight: 8,
    },
});