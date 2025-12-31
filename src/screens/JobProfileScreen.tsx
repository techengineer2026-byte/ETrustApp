import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    FlatList,
    Keyboard,
    TouchableWithoutFeedback
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

/* ===== COMMON JOB TITLES DATA ===== */
const JOB_TITLES = [
    "Software Engineer", "Senior Software Engineer", "Frontend Developer", "Backend Developer", "Full Stack Developer",
    "Product Manager", "Project Manager", "Business Analyst",
    "Sales Executive", "Marketing Manager", "HR Manager", "Recruiter",
    "Accountant", "Financial Analyst",
    "Graphic Designer", "UI/UX Designer",
    "Data Scientist", "Data Analyst",
    "Customer Support", "Operations Manager",
    "Content Writer", "Digital Marketer",
    "Intern", "Fresher"
];

type JobNavProp = NativeStackNavigationProp<RootStackParamList, "JobProfile">;

export default function JobProfileScreen() {
    const navigation = useNavigation<JobNavProp>();
    const [jobProfile, setJobProfile] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleTextChange = (text: string) => {
        setJobProfile(text);
        if (text.length > 0) {
            const filtered = JOB_TITLES.filter((item) =>
                item.toLowerCase().includes(text.toLowerCase())
            );
            setSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    const handleSelectSuggestion = (item: string) => {
        setJobProfile(item);
        setShowSuggestions(false);
        Keyboard.dismiss();
    };

    const handleNext = () => {
        if (jobProfile.trim().length === 0) return;
        navigation.navigate("CurrentCTC");
    };

    return (
        <TouchableWithoutFeedback onPress={() => setShowSuggestions(false)}>
            <ImageBackground
                source={require("../assets/bg.jpg")}
                style={styles.background}
                resizeMode="cover"
            >
                <SafeAreaView style={styles.safe}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={{ flex: 1 }}
                    >
                        <View style={styles.container}>
                            {/* Simple Header (No Progress Bar) */}
                            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                                <Icon name="chevron-back" size={26} color="#000" />
                            </TouchableOpacity>

                            <Text style={styles.title}>Current Job Profile</Text>
                            <Text style={styles.desc}>
                                What is your current designation or position?
                            </Text>

                            {/* Input Area with ZIndex for Dropdown */}
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="e.g. Software Engineer"
                                    placeholderTextColor="#6B7280"
                                    value={jobProfile}
                                    onChangeText={handleTextChange}
                                    autoCapitalize="words"
                                />

                                {/* Floating Suggestions List */}
                                {showSuggestions && suggestions.length > 0 && (
                                    <View style={styles.suggestionsContainer}>
                                        <FlatList
                                            data={suggestions.slice(0, 5)} // Limit to 5 items
                                            keyExtractor={(item) => item}
                                            keyboardShouldPersistTaps="handled"
                                            renderItem={({ item, index }) => (
                                                <TouchableOpacity
                                                    style={[
                                                        styles.suggestionItem,
                                                        index === suggestions.length - 1 && styles.lastItem // Round corners for last item
                                                    ]}
                                                    onPress={() => handleSelectSuggestion(item)}
                                                >
                                                    <Icon name="search-outline" size={16} color="#9CA3AF" style={{marginRight: 10}} />
                                                    <Text style={styles.suggestionText}>{item}</Text>
                                                </TouchableOpacity>
                                            )}
                                        />
                                    </View>
                                )}
                            </View>
                        </View>

                        {/* Bottom Button */}
                        <View style={styles.bottomContainer}>
                            <TouchableOpacity
                                style={[styles.nextButton, { opacity: jobProfile.trim().length > 0 ? 1 : 0.6 }]}
                                disabled={jobProfile.trim().length === 0}
                                onPress={handleNext}
                            >
                                <Text style={styles.nextButtonText}>Next</Text>
                                <Icon name="arrow-forward" size={20} color="#fff" style={{marginLeft: 8}} />
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </ImageBackground>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1 },
    background: { flex: 1 },
    container: { flex: 1, paddingHorizontal: 24, paddingTop: 10 },
    backButton: { marginBottom: 20 },
    
    title: { 
        fontSize: 28, 
        fontWeight: "800", 
        color: "#111827", 
        marginBottom: 8 
    },
    desc: { 
        fontSize: 15, 
        color: "#4B5563", 
        marginBottom: 30, 
        lineHeight: 22 
    },

    /* Input Wrapper needed for relative positioning of dropdown */
    inputWrapper: {
        zIndex: 1000, 
        position: 'relative'
    },
    input: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 16,
        fontSize: 16,
        color: "#111827",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },

    /* Dropdown Styles */
    suggestionsContainer: {
        position: 'absolute',
        top: 60, // Directly below input
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
        zIndex: 2000,
    },
    suggestionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
    },
    lastItem: {
        borderBottomWidth: 0,
    },
    suggestionText: {
        fontSize: 15,
        color: "#374151",
    },

    /* Footer */
    bottomContainer: { 
        paddingHorizontal: 24, 
        paddingBottom: 20, 
        alignItems: 'flex-end' 
    },
    nextButton: {
        backgroundColor: "#000",
        borderRadius: 30,
        paddingVertical: 16,
        paddingHorizontal: 24,
        alignItems: "center",
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
    },
    nextButtonText: { 
        color: "#fff", 
        fontSize: 16, 
        fontWeight: "700" 
    },
});