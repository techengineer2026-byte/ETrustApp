// src/screens/Employer/EmployerWelcomeDashboard.tsx

import React, { useRef, useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Animated,
    PanResponder,
    Dimensions,
    StatusBar,
    ActivityIndicator
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

// --- COLORS ---
const PRIMARY_COLOR = "#000000"; // Black
const SUCCESS_COLOR = "#10B981"; // Green
const SWIPE_BG = "#e0e0e0";

const BUTTON_WIDTH = Dimensions.get("window").width - 80; 
const SWIPE_THRESHOLD = BUTTON_WIDTH - 60; 

export default function EmployerWelcomeDashboard() {
    const navigation = useNavigation<any>();
    
    // --- ANIMATIONS ---
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0)).current;

    // --- SWIPE LOGIC ---
    const [unlocked, setUnlocked] = useState(false);
    const pan = useRef(new Animated.ValueXY()).current; // x and y values

    // Entry Animation
    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 6,
                useNativeDriver: true,
            })
        ]).start();
    }, []);

    // 1. INTERPOLATE COLOR: Black -> Green based on drag position (pan.x)
    const knobBackgroundColor = pan.x.interpolate({
        inputRange: [0, SWIPE_THRESHOLD],
        outputRange: [PRIMARY_COLOR, SUCCESS_COLOR], // From Black to Green
        extrapolate: 'clamp'
    });

    // 2. INTERPOLATE TEXT OPACITY: Text fades out as you drag
    const textOpacity = pan.x.interpolate({
        inputRange: [0, SWIPE_THRESHOLD / 2],
        outputRange: [1, 0],
        extrapolate: 'clamp'
    });

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gestureState) => {
                // Only allow movement if not unlocked yet
                if (!unlocked && gestureState.dx > 0 && gestureState.dx <= SWIPE_THRESHOLD) {
                    pan.setValue({ x: gestureState.dx, y: 0 });
                }
            },
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dx > SWIPE_THRESHOLD * 0.8) {
                    forceSuccess();
                } else {
                    // Snap back
                    Animated.spring(pan, {
                        toValue: { x: 0, y: 0 },
                        useNativeDriver: false, // Color interpolation needs nativeDriver: false
                    }).start();
                }
            },
        })
    ).current;

    const forceSuccess = () => {
        setUnlocked(true);
        Animated.spring(pan, {
            toValue: { x: SWIPE_THRESHOLD, y: 0 },
            useNativeDriver: false,
        }).start(() => {
            setTimeout(() => {
                navigation.reset({
                    index: 0,
                    routes: [{ name: "PostJobScreen" }],
                });
            }, 500);
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

                <Animated.View style={[
                    styles.card, 
                    { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }
                ]}>
                    
                    <View style={styles.iconCircle}>
                        <Icon name="rocket" size={50} color="#fff" />
                    </View>

                    <Text style={styles.title}>All Set!</Text>
                    <Text style={styles.subtitle}>
                        Your employer profile is complete. {"\n"}
                        You are ready to post jobs and hire talent.
                    </Text>

                    <View style={styles.divider} />

                    <View style={styles.swipeContainer}>
                        
                        {/* Background Text Fades Out */}
                        <Animated.Text style={[styles.swipeText, { opacity: textOpacity }]}>
                            Swipe to Dashboard {'>>'}
                        </Animated.Text>

                        {/* Draggable Knob with Dynamic Color */}
                        <Animated.View
                            {...panResponder.panHandlers}
                            style={[
                                styles.swipeKnob,
                                {
                                    transform: [{ translateX: pan.x }],
                                    backgroundColor: knobBackgroundColor // <--- Dynamic Color
                                }
                            ]}
                        >
                            {unlocked ? (
                                <ActivityIndicator color="#fff" size="small" />
                            ) : (
                                <Icon name="arrow-forward" size={24} color="#fff" />
                            )}
                        </Animated.View>

                    </View>
                </Animated.View>

            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: { flex: 1 },
    container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },

    card: {
        width: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 10,
        borderWidth: 1,
        borderColor: "#fff",
    },

    iconCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: PRIMARY_COLOR,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 25,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
    },

    title: {
        fontSize: 32,
        fontWeight: "900",
        color: "#000",
        marginBottom: 10,
        letterSpacing: -1,
    },
    subtitle: {
        fontSize: 15,
        color: "#555",
        textAlign: "center",
        lineHeight: 22,
        marginBottom: 30,
    },

    divider: {
        height: 1,
        width: 60,
        backgroundColor: "#ddd",
        marginBottom: 40,
    },

    swipeContainer: {
        width: BUTTON_WIDTH,
        height: 60,
        backgroundColor: SWIPE_BG,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden", 
    },
    swipeText: {
        color: "#888",
        fontSize: 10,
        fontWeight: "700",
        textTransform: "uppercase",
        letterSpacing: 1,
        marginLeft: 40 
    },
    swipeKnob: {
        width: 60,
        height: 60,
        borderRadius: 30,
        position: "absolute",
        left: 0,
        top: 0,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
});