import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    Image,
    Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    launchImageLibrary,
    ImageLibraryOptions,
} from "react-native-image-picker";

const UploadLogo = ({ navigation }: any) => {
    const [logoUri, setLogoUri] = useState<string | null>(null);

    const pickImage = () => {
        const options: ImageLibraryOptions = {
            mediaType: "photo",
            quality: 1,
            selectionLimit: 1,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) return;

            if (response.errorCode) {
                Alert.alert("Error", response.errorMessage || "Image error");
                return;
            }

            const uri = response.assets?.[0]?.uri;
            if (uri) setLogoUri(uri);
        });
    };

    return (
        <ImageBackground
            source={require("../../assets/bg.jpg")}
            style={styles.background}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Upload Company Logo</Text>
                <Text style={styles.subtitle}>
                    Upload a clear image in JPEG or PNG format.
                </Text>

                {/* Upload Box */}
                <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
                    {logoUri ? (
                        <View style={styles.imageWrapper}>
                            <Image source={{ uri: logoUri }} style={styles.logoImage} />
                            <View style={styles.editOverlay}>
                                <Text style={styles.editText}>Change Logo</Text>
                            </View>
                        </View>
                    ) : (
                        <View style={styles.placeholderContainer}>
                            <View style={styles.iconCircle}>
                                <Text style={styles.plusIcon}>+</Text>
                            </View>
                            <Text style={styles.uploadText}>Tap to Upload</Text>
                            <Text style={styles.formatText}>Supports: JPG, PNG</Text>
                        </View>
                    )}
                </TouchableOpacity>

                {/* Next Button */}
                <TouchableOpacity
                    style={[styles.nextButton, !logoUri && { opacity: 0.5 }]}
                    disabled={!logoUri}
                    onPress={() => {
                        console.log("Selected Logo:", logoUri);
                        navigation.navigate("ContactPersonScreen", { logo: logoUri });
                    }}
                >
                    <Text style={styles.nextText}>Next</Text>
                </TouchableOpacity>

                {/* Skip */}
                <TouchableOpacity
                    style={styles.skipButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.skipText}>Skip for now</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </ImageBackground>
    );
};

export default UploadLogo;

const styles = StyleSheet.create({
    background: { flex: 1 },
    container: { flex: 1, padding: 24 },

    title: { fontSize: 24, fontWeight: "700", marginBottom: 6 },
    subtitle: { color: "#555", marginBottom: 30, fontSize: 14 },

    uploadBox: {
        height: 200,
        width: "100%",
        borderWidth: 2,
        borderColor: "#ccc",
        borderStyle: "dashed",
        borderRadius: 16,
        backgroundColor: "rgba(255,255,255,0.5)",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },

    placeholderContainer: { alignItems: "center" },
    iconCircle: {
        width: 50,
        height: 50,
        backgroundColor: "#eee",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    plusIcon: { fontSize: 24, color: "#555" },
    uploadText: { fontSize: 16, fontWeight: "600" },
    formatText: { fontSize: 12, color: "#888", marginTop: 4 },

    imageWrapper: { width: "100%", height: "100%" },
    logoImage: { width: "100%", height: "100%", resizeMode: "contain" },
    editOverlay: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.6)",
        paddingVertical: 8,
        alignItems: "center",
    },
    editText: { color: "#fff", fontSize: 12, fontWeight: "600" },

    nextButton: {
        backgroundColor: "#000",
        marginTop: 30,
        borderRadius: 25,
        paddingVertical: 16,
        alignItems: "center",
    },
    nextText: { color: "#fff", fontWeight: "600", fontSize: 16 },

    skipButton: { marginTop: 20, alignItems: "center" },
    skipText: { color: "#555" },
});
