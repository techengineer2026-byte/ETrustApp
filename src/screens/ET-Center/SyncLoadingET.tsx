// src/screens/SyncLoading.tsx

import React, { useEffect, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Animated,
    Image,
    Dimensions,
    StatusBar,
    Platform
} from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import FastImage from "react-native-fast-image";

const { width } = Dimensions.get("window");

// Responsive Font Helper (Same as Splash)
const titleSize = width * 0.07;
const subtitleSize = width * 0.04;

export default function SyncLoadingET() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    // Animation Values
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideUp = useRef(new Animated.Value(30)).current;

    useEffect(() => {
        // 1. Start Animations
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(slideUp, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            })
        ]).start();

        // 2. Wait 4 Seconds then Navigate
        const timer = setTimeout(() => {
            // Reset navigation stack so user cannot go "back" to the loading screen
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: "EtrustBottomNav" }], // Change to your destination screen
                })
            );
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

            <ImageBackground
                source={require("../../assets/bg.jpg")}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                {/* Dark Overlay for Text Contrast */}
                <View style={styles.overlay} />

                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.contentContainer}>

                        <Animated.View
                            style={[
                                styles.animContainer,
                                { opacity: fadeAnim, transform: [{ translateY: slideUp }] }
                            ]}
                        >
                            {/* GIF DISPLAY */}
                            <View style={styles.gifContainer}>
                                <FastImage
                                    source={require("../../assets/handScreen.gif")}
                                    style={styles.gif}
                                    resizeMode="contain"
                                />
                            </View>

                            {/* Main Text */}
                            <Text style={styles.title}>
                                Setting up your profile...
                            </Text>

                            {/* Sub Text */}
                            <Text style={styles.subtitle}>
                                Searching your matching job
                            </Text>

                        </Animated.View>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    /* Ensures overlay covers the entire background */
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.5)", // Dark overlay for readability
    },
    safeArea: {
        flex: 1,
        width: "100%",
    },
    contentContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
    },
    animContainer: {
        alignItems: "center",
        width: "100%",
    },
    gifContainer: {
        width: 200,
        height: 180,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gif: {
        width: "100%",
        height: "100%",
    },
    title: {
        fontSize: titleSize,
        fontWeight: "800",
        color: "#fff",
        textAlign: "center",
        marginBottom: 8,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 6,
    },
    subtitle: {
        fontSize: subtitleSize,
        color: "#E5E7EB", // Light Gray
        fontWeight: "500",
        textAlign: "center",
        letterSpacing: 0.5,
        opacity: 0.9,
    },
});