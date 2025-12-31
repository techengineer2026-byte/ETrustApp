import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

type ReferenceNavProp = NativeStackNavigationProp<RootStackParamList, "Reference">;

export default function ReferenceScreen() {
    const navigation = useNavigation<ReferenceNavProp>();
    const [selectedRef, setSelectedRef] = useState<string | null>(null);

    const options = [
        "Social Media",
        "Poster / Banner",
        "ET Center",
        "Self",
        "Others"
    ];

    const handleNext = () => {
        if (!selectedRef) return;
        navigation.navigate("PreferredCity");
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

                    <Text style={styles.title}>Reference</Text>
                    <Text style={styles.desc}>
                        How did you hear about us?
                    </Text>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        {options.map((item) => (
                            <TouchableOpacity
                                key={item}
                                style={[
                                    styles.option,
                                    selectedRef === item && styles.optionSelected,
                                ]}
                                onPress={() => setSelectedRef(item)}
                            >
                                <Text
                                    style={[
                                        styles.optionText,
                                        selectedRef === item && styles.optionTextSelected,
                                    ]}
                                >
                                    {item}
                                </Text>
                                {selectedRef === item && (
                                    <Icon name="checkmark-circle" size={20} color="#000" />
                                )}
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                <View style={styles.bottomContainer}>
                    <TouchableOpacity
                        style={[styles.nextButton, { opacity: selectedRef ? 1 : 0.4 }]}
                        disabled={!selectedRef}
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

    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingVertical: 14,
        paddingHorizontal: 16,
        marginBottom: 12,
        backgroundColor: "rgba(255,255,255,0.4)" // Slight background for readability
    },
    optionSelected: {
        borderColor: "#000", // Changed to black for contrast or use red as before
        backgroundColor: "#e0e0e0",
        borderWidth: 1.5
    },
    optionText: { fontSize: 16, color: "#000" },
    optionTextSelected: { fontWeight: "700" },

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