import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
// import DocumentPicker, { types } from 'react-native-document-picker'; // Uncomment after installing

type ResumeNavProp = NativeStackNavigationProp<RootStackParamList, "UploadResume">;

export default function UploadResumeScreen() {
    const navigation = useNavigation<ResumeNavProp>();
    const [fileName, setFileName] = useState<string | null>(null);

    const handleDocumentPick = async () => {
        try {
            // Mocking selection for UI demo purposes. 
            // In real app, uncomment below:
            /*
            const result = await DocumentPicker.pickSingle({
              type: [types.pdf, types.doc, types.docx],
            });
            setFileName(result.name);
            */

            // Simulation:
            setFileName("my_cv_final.pdf");

        } catch (err) {
            // if (DocumentPicker.isCancel(err)) { ... } else { ... }
            Alert.alert("Error", "Could not pick file");
        }
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
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Icon name="chevron-back" size={26} color="#000" />
                    </TouchableOpacity>

                    <Text style={styles.title}>Upload Resume</Text>
                    <Text style={styles.desc}>
                        Please upload your CV/Resume in PDF or Word format.
                    </Text>

                    {!fileName ? (
                        <TouchableOpacity style={styles.uploadBox} onPress={handleDocumentPick}>
                            <View style={styles.iconCircle}>
                                <Icon name="cloud-upload-outline" size={30} color="#000" />
                            </View>
                            <Text style={styles.uploadText}>Tap to select file</Text>
                            <Text style={styles.uploadSubText}>Supported: .pdf, .doc, .docx</Text>
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.fileCard}>
                            <View style={styles.fileIconRow}>
                                <Icon name="document-text" size={24} color="#000" />
                                <Text style={styles.fileName}>{fileName}</Text>
                            </View>
                            <TouchableOpacity onPress={handleRemoveFile}>
                                <Icon name="close-circle" size={24} color="#ff3b30" />
                            </TouchableOpacity>
                        </View>
                    )}

                </View>

                <View style={styles.bottomContainer}>
                    <TouchableOpacity
                        style={[styles.nextButton, { opacity: fileName ? 1 : 0.4 }]}
                        disabled={!fileName}
                        onPress={handleNext}
                    >
                        <Text style={styles.nextButtonText}>Next</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1 },
    background: { flex: 1 },
    container: { flex: 1, paddingHorizontal: 24, paddingTop: 10 },
    backButton: { marginBottom: 20 },
    title: { fontSize: 24, fontWeight: "700", color: "#000", marginBottom: 10 },
    desc: { fontSize: 14, color: "#555", marginBottom: 30, lineHeight: 20 },

    // Upload Styles
    uploadBox: {
        borderWidth: 2,
        borderColor: "#000",
        borderStyle: "dashed",
        borderRadius: 15,
        height: 200,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.3)",
    },
    iconCircle: {
        width: 60, height: 60, borderRadius: 30, backgroundColor: "#fff",
        justifyContent: "center", alignItems: "center", marginBottom: 10
    },
    uploadText: { fontSize: 16, fontWeight: "600", color: "#000" },
    uploadSubText: { fontSize: 12, color: "#666", marginTop: 5 },

    // File Card Styles
    fileCard: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    fileIconRow: { flexDirection: "row", alignItems: "center" },
    fileName: { marginLeft: 10, fontSize: 16, color: "#000", fontWeight: "500" },

    bottomContainer: { paddingHorizontal: 24, paddingBottom: 20, alignItems: 'flex-end' },
    nextButton: {
        backgroundColor: "#000",
        borderRadius: 25,
        paddingVertical: 16,
        paddingHorizontal: 30,
        alignItems: "center",
        minWidth: 120,
    },
    nextButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});