import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    Image,
    Alert,
    StatusBar,
    Platform,
    UIManager,
    LayoutAnimation
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    launchImageLibrary,
    ImageLibraryOptions,
} from "react-native-image-picker";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

// --- CONSTANTS ---
const PRIMARY_COLOR = "#000000";
const BG_GLASS = "rgba(255, 255, 255, 0.85)";

export default function UploadLogoScreen() {
    const navigation = useNavigation<any>();
    
    // State to hold the selected image
    const [logoUri, setLogoUri] = useState<string | null>(null);

    const pickImage = () => {
        const options: ImageLibraryOptions = {
            mediaType: "photo",
            quality: 0.8,
            selectionLimit: 1,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) return;
            if (response.errorCode) {
                Alert.alert("Error", response.errorMessage || "Failed to load image");
                return;
            }

            const uri = response.assets?.[0]?.uri;
            if (uri) {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setLogoUri(uri);
            }
        });
    };

    // --- NAVIGATION LOGIC ---
    // This goes to Step E: Contact Person Name
    const handleNext = () => {
        // Pass the logo URI to the next screen
        navigation.navigate("EmployerSetupContactPerson", { 
            logo: logoUri 
        });
    };

    // If user skips, we send null for the logo
    const handleSkip = () => {
        navigation.navigate("EmployerSetupContactPerson", { 
            logo: null 
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

                {/* --- HEADER: PROFILE SETUP --- */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.headerTitle}>Profile Setup</Text>
                        <Text style={styles.headerSubtitle}>Complete your profile to continue</Text>
                    </View>
                    {/* Visual Progress: Start of the wizard */}
                    <View style={styles.progressCircle}>
                        <Text style={styles.progressText}>1/4</Text>
                    </View>
                </View>

                {/* --- CONTENT --- */}
                <View style={styles.content}>
                    <View style={styles.titleBlock}>
                        <Text style={styles.title}>Company Logo</Text>
                        <Text style={styles.subtitle}>
                            Build trust with candidates by adding your official branding.
                        </Text>
                    </View>

                    {/* --- UPLOAD AREA --- */}
                    <View style={styles.card}>
                        <TouchableOpacity 
                            style={[styles.uploadBox, logoUri && styles.uploadBoxFilled]} 
                            onPress={pickImage}
                            activeOpacity={0.9}
                        >
                            {logoUri ? (
                                <>
                                    <Image source={{ uri: logoUri }} style={styles.logoPreview} />
                                    {/* Edit Badge */}
                                    <View style={styles.editBadge}>
                                        <Icon name="pencil" size={14} color="#fff" />
                                        <Text style={styles.editBadgeText}>Change</Text>
                                    </View>
                                </>
                            ) : (
                                <View style={styles.placeholderContent}>
                                    <View style={styles.iconCircle}>
                                        <Icon name="cloud-upload-outline" size={32} color={PRIMARY_COLOR} />
                                    </View>
                                    <Text style={styles.uploadText}>Tap to Upload Logo</Text>
                                    <Text style={styles.formatText}>PNG, JPG (Max 5MB)</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>

                {/* --- FOOTER --- */}
                <View style={styles.footer}>
                    {/* Main Action: Go to Step E (Contact Person) */}
                    <TouchableOpacity
                        style={[styles.mainBtn, !logoUri && styles.mainBtnDisabled]}
                        disabled={!logoUri}
                        onPress={handleNext}
                    >
                        <Text style={styles.mainBtnText}>Next Step</Text>
                        <Icon name="arrow-forward" size={20} color="#fff" style={{ marginLeft: 8 }} />
                    </TouchableOpacity>

                    {/* Skip Action */}
                    <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
                        <Text style={styles.skipText}>Skip for now</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: { flex: 1 },
    container: { flex: 1 },

    // HEADER (Profile Setup Style)
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 24,
        paddingTop: 15,
        marginBottom: 20,
    },
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
    content: { paddingHorizontal: 24, flex: 1, justifyContent: "center", paddingBottom: 50 },
    titleBlock: { marginBottom: 30, alignItems: 'center' },
    title: { fontSize: 28, fontWeight: "800", color: "#000", marginBottom: 10 },
    subtitle: { fontSize: 15, color: "#555", textAlign: 'center', lineHeight: 22 },

    // CARD
    card: {
        backgroundColor: BG_GLASS,
        borderRadius: 24,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },

    // UPLOAD BOX
    uploadBox: {
        height: 220,
        width: "100%",
        borderWidth: 2,
        borderColor: "#ccc",
        borderStyle: "dashed",
        borderRadius: 18,
        backgroundColor: "rgba(255,255,255,0.4)",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    uploadBoxFilled: {
        borderStyle: "solid",
        borderColor: "#eee",
        backgroundColor: "#fff",
    },

    // PLACEHOLDER STATE
    placeholderContent: { alignItems: "center" },
    iconCircle: {
        width: 60,
        height: 60,
        backgroundColor: "#fff",
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    uploadText: { fontSize: 16, fontWeight: "700", color: "#333", marginBottom: 4 },
    formatText: { fontSize: 12, color: "#888" },

    // FILLED STATE
    logoPreview: { width: "80%", height: "80%", resizeMode: "contain" },
    editBadge: {
        position: "absolute",
        bottom: 10,
        backgroundColor: "rgba(0,0,0,0.7)",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
    },
    editBadgeText: { color: "#fff", fontSize: 11, fontWeight: "700", marginLeft: 4 },

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
        marginBottom: 15,
    },
    mainBtnDisabled: {
        // We might want to allow them to click next even without logo if we treat it as optional,
        // but visually distinguishing it is good.
        opacity: 0.9, 
    },
    mainBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },

    skipBtn: { alignItems: "center", paddingVertical: 10 },
    skipText: { color: "#666", fontSize: 14, fontWeight: "600", textDecorationLine: "underline" },
});