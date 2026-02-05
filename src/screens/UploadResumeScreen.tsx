// src/screens/UploadResumeScreen.tsx

import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    ActivityIndicator
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

type ResumeNavProp = NativeStackNavigationProp<RootStackParamList, "UploadResume">;

export default function UploadResumeScreen() {
    const navigation = useNavigation<ResumeNavProp>();
    
    // State to simulate file selection
    const [fileName, setFileName] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // --- MOCK FUNCTION TO SIMULATE UPLOAD ---
    const handleDocumentPick = () => {
        setLoading(true);
        // Simulate a 1.5 second delay to feel like a real upload
        setTimeout(() => {
            setFileName("My_CV_Final.pdf");
            setLoading(false);
        }, 1500);
    };

    const handleRemoveFile = () => {
        setFileName(null);
    };

    const handleNext = () => {
        if (!fileName) return;
        navigation.navigate("Reference");
    };

    return (
        <ImageBackground
            source={require("../assets/bg.jpg")}
            style={styles.background}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.safe}>
                <View style={styles.container}>
                    
                    {/* Header */}
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Icon name="chevron-back" size={28} color="#000" />
                    </TouchableOpacity>

                    <Text style={styles.title}>Upload Resume</Text>
                    <Text style={styles.desc}>
                        Upload your CV to apply for jobs faster.
                    </Text>

                    {/* --- UPLOAD ZONE --- */}
                    {!fileName ? (
                        <TouchableOpacity 
                            style={styles.uploadBox} 
                            onPress={handleDocumentPick}
                            activeOpacity={0.7}
                            disabled={loading}
                        >
                            {loading ? (
                                <View style={styles.loadingContainer}>
                                    <ActivityIndicator size="large" color="#000" />
                                    <Text style={styles.loadingText}>Uploading...</Text>
                                </View>
                            ) : (
                                <>
                                    <View style={styles.iconCircle}>
                                        <Icon name="cloud-upload-outline" size={40} color="#000" />
                                    </View>
                                    <Text style={styles.uploadText}>Tap to Upload Resume</Text>
                                    <Text style={styles.uploadSubText}>
                                        Supported: PDF, DOC, DOCX
                                    </Text>
                                </>
                            )}
                        </TouchableOpacity>
                    ) : (
                        /* --- FILE SELECTED CARD --- */
                        <View style={styles.fileCard}>
                            <View style={styles.fileIconContainer}>
                                <Icon name="document-text" size={30} color="#fff" />
                            </View>
                            
                            <View style={styles.fileInfo}>
                                <Text style={styles.fileName} numberOfLines={1}>
                                    {fileName}
                                </Text>
                                <Text style={styles.fileSize}>
                                    Success • 2.4 MB
                                </Text>
                            </View>

                            <TouchableOpacity 
                                onPress={handleRemoveFile} 
                                style={styles.removeBtn}
                            >
                                <Icon name="close" size={20} color="#ff3b30" />
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* Security Note */}
                    <View style={styles.infoBox}>
                        <Icon name="lock-closed-outline" size={18} color="#555" />
                        <Text style={styles.infoText}>
                            Your data is secure and only shared with recruiters.
                        </Text>
                    </View>

                </View>

                {/* --- BOTTOM BUTTON --- */}
                <View style={styles.bottomContainer}>
                    <TouchableOpacity
                        style={[
                            styles.nextButton, 
                            { opacity: fileName ? 1 : 0.5 } // Dim if disabled
                        ]}
                        disabled={!fileName}
                        onPress={handleNext}
                    >
                        <Text style={styles.nextButtonText}>Next</Text>
                        <Icon name="arrow-forward" size={20} color="#fff" style={{ marginLeft: 8 }} />
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1 },
    background: { flex: 1 },
    
    container: { 
        flex: 1, 
        paddingHorizontal: 24, 
        paddingTop: 10 
    },
    
    backButton: { marginBottom: 20 },
    title: { fontSize: 28, fontWeight: "800", color: "#000", marginBottom: 8 },
    desc: { fontSize: 15, color: "#444", marginBottom: 30 },

    /* --- UPLOAD BOX --- */
    uploadBox: {
        borderWidth: 2,
        borderColor: "#333",
        borderStyle: "dashed",
        borderRadius: 24,
        height: 240, // Nice and tall
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.5)", // Semi-transparent
        marginBottom: 20,
    },
    iconCircle: {
        width: 80, 
        height: 80, 
        borderRadius: 40, 
        backgroundColor: "#fff",
        justifyContent: "center", 
        alignItems: "center", 
        marginBottom: 16,
        // Shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    uploadText: { fontSize: 18, fontWeight: "700", color: "#000" },
    uploadSubText: { fontSize: 14, color: "#666", marginTop: 6 },

    /* Loading State */
    loadingContainer: { alignItems: 'center' },
    loadingText: { marginTop: 10, fontSize: 14, fontWeight: "600", color: "#000" },

    /* --- FILE CARD --- */
    fileCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#eee",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
        marginBottom: 20,
    },
    fileIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 15,
        backgroundColor: "#000", // Black icon background
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15
    },
    fileInfo: { flex: 1 },
    fileName: { fontSize: 16, color: "#000", fontWeight: "700", marginBottom: 4 },
    fileSize: { fontSize: 13, color: "green", fontWeight: "600" },
    
    removeBtn: {
        padding: 10,
        backgroundColor: "#fff0f0",
        borderRadius: 12,
    },

    /* --- INFO BOX --- */
    infoBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    infoText: { marginLeft: 8, color: "#555", fontSize: 13 },

    /* --- BOTTOM FOOTER --- */
    bottomContainer: { 
        paddingHorizontal: 24, 
        paddingBottom: 10, 
        justifyContent: 'flex-end' 
    },
    nextButton: {
        backgroundColor: "#000",
        borderRadius: 30,
        paddingVertical: 18,
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    nextButtonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});