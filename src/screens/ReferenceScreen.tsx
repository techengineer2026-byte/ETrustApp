// src/screens/ReferenceScreen.tsx

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

    // Data with Icons
    const options = [
        { id: "Social Media", label: "Social Media (Insta/FB)", icon: "logo-instagram" },
        { id: "Poster", label: "Poster / Banner", icon: "newspaper-outline" },
        { id: "ET Center", label: "ET Center", icon: "business-outline" },
        { id: "Friend", label: "Friend / Referral", icon: "people-outline" },
        { id: "Self", label: "Self / Walk-in", icon: "person-outline" },
        { id: "Others", label: "Others", icon: "ellipsis-horizontal-circle-outline" }
    ];

    const handleNext = () => {
        if (!selectedRef) return;
        // Proceed to Sync/Loading or Dashboard
        navigation.navigate("EmployeeWelcomeDashboard");
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

                    <Text style={styles.title}>Reference</Text>
                    <Text style={styles.desc}>
                        How did you hear about us?
                    </Text>

                    {/* Options Grid */}
                    <ScrollView 
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.listContent}
                    >
                        {options.map((item) => {
                            const isSelected = selectedRef === item.id;
                            return (
                                <TouchableOpacity
                                    key={item.id}
                                    activeOpacity={0.8}
                                    style={[
                                        styles.optionCard,
                                        isSelected && styles.optionCardSelected,
                                    ]}
                                    onPress={() => setSelectedRef(item.id)}
                                >
                                    <View style={styles.cardLeft}>
                                        <View style={[styles.iconBox, isSelected && styles.iconBoxSelected]}>
                                            <Icon 
                                                name={item.icon} 
                                                size={22} 
                                                color={isSelected ? "#fff" : "#000"} 
                                            />
                                        </View>
                                        <Text
                                            style={[
                                                styles.optionText,
                                                isSelected && styles.optionTextSelected,
                                            ]}
                                        >
                                            {item.label}
                                        </Text>
                                    </View>

                                    {isSelected && (
                                        <Icon name="checkmark-circle" size={24} color="#000" />
                                    )}
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>

                {/* Footer */}
                <View style={styles.bottomContainer}>
                    <TouchableOpacity
                        style={[styles.nextButton, { opacity: selectedRef ? 1 : 0.5 }]}
                        disabled={!selectedRef}
                        onPress={handleNext}
                    >
                        <Text style={styles.nextButtonText}>Complete Setup</Text>
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
    
    backButton: { marginBottom: 15 },
    title: { fontSize: 28, fontWeight: "800", color: "#000", marginBottom: 8 },
    desc: { fontSize: 15, color: "#444", marginBottom: 20 },

    listContent: {
        paddingBottom: 20,
    },

    /* Option Card Styles */
    optionCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: "rgba(255, 255, 255, 0.7)", // Glass effect
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 12,
        borderWidth: 2,
        borderColor: "transparent",
        // Shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    optionCardSelected: {
        backgroundColor: "#fff",
        borderColor: "#000",
        shadowOpacity: 0.1,
    },
    
    cardLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    
    /* Icon Box */
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#eee",
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    iconBoxSelected: {
        backgroundColor: "#000",
    },

    optionText: { fontSize: 16, color: "#333", fontWeight: "500" },
    optionTextSelected: { fontWeight: "700", color: "#000" },

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
        flexDirection: 'row',
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