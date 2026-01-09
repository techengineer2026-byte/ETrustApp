// src/screens/Employee/EmployeeStep3.tsx

import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    Alert,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function EmployeeStep3() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const prevData = route.params; // { name, phone, email }

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState("");

    const handleNext = () => {
        if (!address.trim() || !city.trim() || !state.trim() || !pincode.trim()) {
            return Alert.alert("Missing Info", "Please fill in all address details.");
        }
        // Pass data to Step 4
        navigation.navigate("EmployeeStep4", { ...prevData, address, city, state, pincode });
    };

    return (
                <ImageBackground
            source={require("../../assets/bg.jpg")}
            style={styles.background}
            resizeMode="cover"
        >
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

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
                        <Text style={styles.stepIndicator}>Step 3 of 4</Text>
                    </View>

                    {/* Progress Bar (75%) */}
                    <View style={styles.progressBarBg}>
                        <View style={[styles.progressBarFill, { width: "75%" }]} />
                    </View>

                    {/* Main Content */}
                    <View style={styles.content}>
                        <View style={styles.iconCircle}>
                            <Icon name="map-marker-radius" size={32} color="#1c005e" />
                        </View>

                        <Text style={styles.title}>Your Address</Text>
                        <Text style={styles.subtitle}>
                            Where are you currently located? This helps find jobs near you.
                        </Text>

                        {/* Address Input (Multiline) */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Full Address</Text>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                placeholder="House No, Street, Landmark..."
                                placeholderTextColor="#999"
                                multiline
                                numberOfLines={3}
                                value={address}
                                onChangeText={setAddress}
                            />
                        </View>

                        {/* Row for City & State */}
                        <View style={styles.rowContainer}>
                            <View style={[styles.inputGroup, styles.halfInput]}>
                                <Text style={styles.label}>City</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Mumbai"
                                    placeholderTextColor="#999"
                                    value={city}
                                    onChangeText={setCity}
                                />
                            </View>
                            <View style={[styles.inputGroup, styles.halfInput]}>
                                <Text style={styles.label}>State</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Maharashtra"
                                    placeholderTextColor="#999"
                                    value={state}
                                    onChangeText={setState}
                                />
                            </View>
                        </View>

                        {/* Pincode Input */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Pin Code</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="400001"
                                placeholderTextColor="#999"
                                keyboardType="number-pad"
                                maxLength={6}
                                value={pincode}
                                onChangeText={setPincode}
                            />
                        </View>

                    </View>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
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
    safeArea: { flex: 1 },
    background: { flex: 1 },

    scrollContainer: { flexGrow: 1 },
    // Header
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
    stepIndicator: { fontWeight: "700", color: "#666", fontSize: 14 },
    // Progress
    progressBarBg: { height: 6, backgroundColor: "#F0F0F0", marginHorizontal: 24, borderRadius: 3, marginBottom: 20 },
    progressBarFill: { height: "100%", backgroundColor: "#1c005e", borderRadius: 3 },
    // Content
    content: { paddingHorizontal: 24, flex: 1 },
    iconCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: "#f3e5f5", justifyContent: "center", alignItems: "center", marginBottom: 15 },
    title: { fontSize: 28, fontWeight: "800", color: "#1c005e", marginBottom: 8 },
    subtitle: { fontSize: 16, color: "#e0e0e0ff", marginBottom: 30, lineHeight: 22 },
    // Inputs
    inputGroup: { marginBottom: 20 },
    label: { fontSize: 14, fontWeight: "700", color: "#333", marginBottom: 8 },
    input: { borderWidth: 1, borderColor: "#E0E0E0", borderRadius: 12, paddingVertical: 14, paddingHorizontal: 16, fontSize: 16, color: "#000", backgroundColor: "#FAFAFA" },
    textArea: { height: 100, textAlignVertical: 'top' },
    // Row Logic
    rowContainer: { flexDirection: 'row', justifyContent: 'space-between' },
    halfInput: { width: '48%' }, // Responsive width for 2-column layout
    // Footer
    footer: { padding: 24, marginTop: "auto" },
    nextBtn: { backgroundColor: "#1c005e", flexDirection: "row", justifyContent: "center", alignItems: "center", paddingVertical: 18, borderRadius: 16, shadowColor: "#1c005e", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
    nextText: { color: "#fff", fontSize: 16, fontWeight: "bold", marginRight: 8 },
});