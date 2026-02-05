import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    StatusBar,
    TouchableWithoutFeedback
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";

// --- CONSTANTS ---
const PRIMARY_COLOR = "#000000";
const BG_GLASS = "rgba(255, 255, 255, 0.85)";
const ERROR_COLOR = "#d32f2f";

export default function EmployerSetupContactPerson() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    
    // Get data from previous Step D (Logo)
    const prevData = route.params || {}; 

    const [name, setName] = useState("");
    const [error, setError] = useState<string | null>(null);

    const validateAndNext = () => {
        if (!name.trim()) {
            setError("Please enter the contact person's name.");
            return;
        }

        if (name.length < 3) {
            setError("Name must be at least 3 characters.");
            return;
        }

        // Pass Logo + Name to Step F
        navigation.navigate("EmployerSetupContactNo", { 
            ...prevData,        // Contains: { logo: uri }
            contactPerson: name // Adds: { contactPerson: "Name" }
        });
    };

    return (
        <ImageBackground
            source={require("../../assets/bg.jpg")}
            style={styles.background}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" />
                
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <KeyboardAvoidingView 
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={{ flex: 1 }}
                    >
                        {/* --- HEADER: PROFILE SETUP --- */}
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                                <Icon name="arrow-back" size={24} color="#000" />
                            </TouchableOpacity>

                            <View>
                                <Text style={styles.headerTitle}>Profile Setup</Text>
                                <Text style={styles.headerSubtitle}>Let's get to know you</Text>
                            </View>
                            
                            {/* Progress: Step 2 of 7 (assuming A-K logic roughly maps to 7 screens) */}
                            <View style={styles.progressCircle}>
                                <Text style={styles.progressText}>2/4</Text>
                            </View>
                        </View>

                        {/* --- CONTENT --- */}
                        <View style={styles.content}>
                            <View style={styles.titleBlock}>
                                <Text style={styles.title}>Contact Person</Text>
                                <Text style={styles.subtitle}>
                                    Who should candidates address when applying for jobs?
                                </Text>
                            </View>

                            {/* --- INPUT CARD --- */}
                            <View style={[styles.card, error ? styles.cardError : null]}>
                                <Text style={styles.inputLabel}>Full Name</Text>
                                
                                <View style={styles.inputRow}>
                                    <Icon name="person-outline" size={20} color="#666" style={styles.inputIcon} />
                                    <TextInput
                                        style={styles.inputField}
                                        placeholder="e.g. John Doe"
                                        placeholderTextColor="#999"
                                        value={name}
                                        onChangeText={(t) => {
                                            setName(t);
                                            setError(null);
                                        }}
                                        autoCapitalize="words"
                                        autoCorrect={false}
                                    />
                                </View>
                            </View>

                            {/* Error Message */}
                            {error && (
                                <View style={styles.errorRow}>
                                    <Icon name="alert-circle" size={16} color={ERROR_COLOR} />
                                    <Text style={styles.errorText}>{error}</Text>
                                </View>
                            )}
                        </View>

                        {/* --- FOOTER --- */}
                        <View style={styles.footer}>
                            <TouchableOpacity
                                style={[styles.mainBtn, !name.trim() && styles.mainBtnDisabled]}
                                onPress={validateAndNext}
                            >
                                <Text style={styles.mainBtnText}>Next Step</Text>
                                <Icon name="arrow-forward" size={20} color="#fff" style={{ marginLeft: 8 }} />
                            </TouchableOpacity>
                        </View>

                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
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
        paddingTop: 15,
        marginBottom: 20,
    },
    backBtn: { marginRight: 10, padding: 5 },
    headerTitle: { fontSize: 18, fontWeight: "800", color: "#000" },
    headerSubtitle: { fontSize: 12, color: "#666", marginTop: 2 },
    
    progressCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: PRIMARY_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.5)'
    },
    progressText: { fontSize: 12, fontWeight: "700", color: "#000" },

    // CONTENT
    content: { paddingHorizontal: 24, flex: 1, paddingTop: 20 },
    titleBlock: { marginBottom: 30 },
    title: { fontSize: 32, fontWeight: "800", color: "#000", marginBottom: 10 },
    subtitle: { fontSize: 15, color: "#555", lineHeight: 22 },

    // CARD
    card: {
        backgroundColor: BG_GLASS,
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    cardError: {
        borderColor: ERROR_COLOR,
    },

    inputLabel: { fontSize: 12, fontWeight: "700", color: "#333", textTransform: "uppercase", marginBottom: 10 },
    inputRow: { flexDirection: 'row', alignItems: 'center' },
    inputIcon: { marginRight: 10 },
    inputField: { flex: 1, fontSize: 18, fontWeight: "600", color: "#000", paddingVertical: 10 },

    errorRow: { flexDirection: 'row', alignItems: 'center', marginTop: 15, marginLeft: 5 },
    errorText: { color: ERROR_COLOR, fontSize: 14, fontWeight: "600", marginLeft: 6 },

    // FOOTER
    footer: { padding: 24, paddingBottom: 20 },
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
    mainBtnDisabled: {
        backgroundColor: "#ccc",
        shadowOpacity: 0,
        elevation: 0,
    },
    mainBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});