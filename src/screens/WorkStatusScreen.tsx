// src/screens/WorkStatusScreen.tsx

import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation"; 
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

type WorkStatusNavProp = NativeStackNavigationProp<RootStackParamList, "WorkStatus">;

export default function WorkStatusScreen() {
    const navigation = useNavigation<WorkStatusNavProp>();
    const [status, setStatus] = useState<string | null>(null);

    const options = [
        { 
            label: "Working", 
            value: "Working",
            desc: "I am currently employed",
            icon: "briefcase-outline",
            activeIcon: "briefcase"
        },
        { 
            label: "Not Working", 
            value: "Not Working",
            desc: "I am currently unemployed or studying",
            icon: "home-outline", // or "school-outline"
            activeIcon: "home"
        }
    ];

    const handleNext = () => {
        if (!status) return;

        if (status === "Working") {
            navigation.navigate("CurrentCTC"); 
        } else {
            navigation.navigate("LocationSelection");
        }
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

                    <Text style={styles.title}>Current Status</Text>
                    <Text style={styles.desc}>
                        Are you currently employed? This helps us customize your experience.
                    </Text>

                    {/* Beautiful Options Cards */}
                    <View style={styles.optionsContainer}>
                        {options.map((item) => {
                            const isSelected = status === item.value;
                            return (
                                <TouchableOpacity
                                    key={item.value}
                                    activeOpacity={0.8}
                                    style={[
                                        styles.optionCard,
                                        isSelected && styles.optionCardSelected,
                                    ]}
                                    onPress={() => setStatus(item.value)}
                                >
                                    {/* Icon Box */}
                                    <View style={[styles.iconBox, isSelected && styles.iconBoxSelected]}>
                                        <Icon 
                                            name={isSelected ? item.activeIcon : item.icon} 
                                            size={24} 
                                            color={isSelected ? "#fff" : "#000"} 
                                        />
                                    </View>

                                    {/* Text Content */}
                                    <View style={styles.textContainer}>
                                        <Text
                                            style={[
                                                styles.optionTitle,
                                                isSelected && styles.optionTitleSelected,
                                            ]}
                                        >
                                            {item.label}
                                        </Text>
                                        <Text style={styles.optionDesc}>{item.desc}</Text>
                                    </View>

                                    {/* Checkmark */}
                                    {isSelected && (
                                        <Icon name="checkmark-circle" size={24} color="#000" />
                                    )}
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                {/* Bottom Footer */}
                <View style={styles.bottomContainer}>
                    <TouchableOpacity
                        style={[styles.nextButton, { opacity: status ? 1 : 0.5 }]}
                        disabled={!status}
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
    
    /* Header */
    backButton: { marginBottom: 15 },
    title: { fontSize: 28, fontWeight: "800", color: "#000", marginBottom: 8 },
    desc: { fontSize: 15, color: "#444", marginBottom: 30, lineHeight: 22 },

    optionsContainer: { gap: 16 },

    /* Card Styling */
    optionCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.7)", // Glass effect
        borderRadius: 20,
        padding: 20,
        borderWidth: 2,
        borderColor: "transparent",
        // Shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    optionCardSelected: {
        backgroundColor: "#fff",
        borderColor: "#000",
        shadowOpacity: 0.15,
    },

    /* Icon Styling */
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#eee",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
    },
    iconBoxSelected: {
        backgroundColor: "#000",
    },

    /* Text Styling */
    textContainer: { flex: 1 },
    optionTitle: { fontSize: 18, fontWeight: "600", color: "#333", marginBottom: 4 },
    optionTitleSelected: { color: "#000", fontWeight: "700" },
    optionDesc: { fontSize: 13, color: "#666" },

    /* Footer */
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