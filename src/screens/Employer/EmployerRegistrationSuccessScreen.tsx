import React, { useEffect, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    Animated,
    StatusBar,
    Dimensions
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

// --- CUSTOM COLORS ---
const PRIMARY_COLOR = "#000000"; // Black
const SUCCESS_COLOR = "#10B981"; // Green
const BG_GLASS = "rgba(255, 255, 255, 0.9)"; // Slightly more opaque for the success card

const { width } = Dimensions.get("window");

export default function EmployerRegistrationSuccessScreen() {
    const navigation = useNavigation<any>();

    // --- ANIMATION VALUES ---
    const scaleAnim = useRef(new Animated.Value(0)).current;  // Icon Pop
    const fadeAnim = useRef(new Animated.Value(0)).current;   // Text Fade In
    const slideAnim = useRef(new Animated.Value(50)).current; // Button Slide Up

    // --- START ANIMATION ---
    useEffect(() => {
        Animated.sequence([
            // 1. Pop the Checkmark
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 5,
                tension: 40,
                useNativeDriver: true,
            }),
            // 2. Fade in Text and Slide up Button together
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.spring(slideAnim, {
                    toValue: 0,
                    friction: 6,
                    useNativeDriver: true,
                })
            ])
        ]).start();
    }, []);

    const handleLoginNavigation = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "Employeruser" }],
        });
        // Alternatively: navigation.navigate("Employeruser");
    };

    return (
        <ImageBackground
            source={require("../../assets/bg.jpg")}
            style={styles.background}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" />

                <View style={styles.contentContainer}>
                    
                    {/* --- GLASS CARD --- */}
                    <View style={styles.card}>
                        
                        {/* Animated Checkmark Circle */}
                        <Animated.View style={[styles.iconCircle, { transform: [{ scale: scaleAnim }] }]}>
                            <Icon name="checkmark" size={60} color="#fff" />
                        </Animated.View>

                        {/* Animated Text */}
                        <Animated.View style={{ opacity: fadeAnim, alignItems: 'center' }}>
                            <Text style={styles.title}>Registration Complete!</Text>
                            <Text style={styles.subtitle}>
                                Your employer account has been successfully verified and created.
                            </Text>
                            
                            <View style={styles.divider} />
                            
                            <Text style={styles.instruction}>
                                Please login again to access your dashboard.
                            </Text>
                        </Animated.View>

                        {/* Animated Button */}
                        <Animated.View style={{ 
                            width: '100%', 
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }] 
                        }}>
                            <TouchableOpacity 
                                style={styles.loginBtn} 
                                onPress={handleLoginNavigation}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.loginBtnText}>Login Now</Text>
                                <Icon name="log-in-outline" size={22} color="#fff" style={{ marginLeft: 8 }} />
                            </TouchableOpacity>
                        </Animated.View>

                    </View>

                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: { flex: 1 },
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    
    contentContainer: {
        width: width,
        paddingHorizontal: 24,
        alignItems: "center",
        justifyContent: "center",
    },

    card: {
        backgroundColor: BG_GLASS,
        width: "100%",
        borderRadius: 30,
        paddingVertical: 40,
        paddingHorizontal: 25,
        alignItems: "center",
        // Shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
        borderWidth: 1,
        borderColor: "#fff",
    },

    iconCircle: {
        width: 100,
        height: 100,
        backgroundColor: SUCCESS_COLOR,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 25,
        shadowColor: SUCCESS_COLOR,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },

    title: {
        fontSize: 26,
        fontWeight: "800",
        color: "#000",
        textAlign: "center",
        marginBottom: 10,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 15,
        color: "#555",
        textAlign: "center",
        lineHeight: 22,
        marginBottom: 20,
    },

    divider: {
        height: 1,
        width: 60,
        backgroundColor: "#ddd",
        marginBottom: 20,
    },

    instruction: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
        marginBottom: 30,
        textAlign: "center"
    },

    loginBtn: {
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 20,
        height: 56,
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    loginBtnText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
});