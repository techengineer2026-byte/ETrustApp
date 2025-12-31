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
import { RootStackParamList } from "../types/navigation"; // Adjust path
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

type WorkStatusNavProp = NativeStackNavigationProp<RootStackParamList, "WorkStatus">;

export default function WorkStatusScreen() {
    const navigation = useNavigation<WorkStatusNavProp>();
    const [status, setStatus] = useState<string | null>(null);

    const options = ["Working", "Not Working"];

    const handleNext = () => {
        if (!status) return;
        // Navigate to Work Experience
        navigation.navigate("WorkExperience");
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

                    <Text style={styles.title}>Current Status</Text>
                    <Text style={styles.desc}>
                        Are you currently employed? This helps us find relevant opportunities for you.
                    </Text>

                    {options.map((option) => (
                        <TouchableOpacity
                            key={option}
                            style={[
                                styles.option,
                                status === option && styles.optionSelected,
                            ]}
                            onPress={() => setStatus(option)}
                        >
                            <Text
                                style={[
                                    styles.optionText,
                                    status === option && styles.optionTextSelected,
                                ]}
                            >
                                {option}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.bottomContainer}>
                    <TouchableOpacity
                        style={[styles.nextButton, { opacity: status ? 1 : 0.4 }]}
                        disabled={!status}
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
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingVertical: 14,
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    optionSelected: { borderColor: "#ff0000ff", backgroundColor: "#cacacadc" },
    optionText: { fontSize: 16, color: "#000" },
    optionTextSelected: { fontWeight: "600" },
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