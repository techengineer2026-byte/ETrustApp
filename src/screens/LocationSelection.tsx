import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
    Animated,
    ImageBackground, // ✅ ADD THIS

    Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const INDIA_LOCATIONS: Record<string, string[]> = {
    Punjab: ["Mohali", "Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Kharar"],
    Haryana: ["Panchkula", "Gurgaon", "Faridabad", "Panipat", "Ambala"],
    Chandigarh: ["Chandigarh"],
    HimachalPradesh: ["Shimla", "Solan", "Kullu", "Kangra", "Mandi"],
    UttarPradesh: ["Lucknow", "Noida", "Varanasi", "Kanpur", "Agra"],
    Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
    Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"],
    Rajasthan: ["Jaipur", "Udaipur", "Jodhpur", "Kota", "Ajmer"],
    MadhyaPradesh: ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain"],
    Telangana: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar"],
    TamilNadu: ["Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli"],
    Karnataka: ["Bengaluru", "Mysuru", "Mangalore", "Hubli", "Belagavi"],
    Kerala: ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur", "Alappuzha"],
    WestBengal: ["Kolkata", "Howrah", "Siliguri", "Durgapur", "Asansol"],
    Bihar: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga"],
    Odisha: ["Bhubaneswar", "Cuttack", "Rourkela", "Sambalpur", "Balasore"],
    Assam: ["Guwahati", "Dibrugarh", "Silchar", "Jorhat", "Tezpur"],
    Jharkhand: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh"],
    Chhattisgarh: ["Raipur", "Bilaspur", "Durg", "Korba", "Jagdalpur"],
    Delhi: ["Central Delhi", "South Delhi", "West Delhi", "North Delhi"],
};

const LocationSelection = ({ navigation }: any) => {
    const [search, setSearch] = useState("");
    const [selectedState, setSelectedState] = useState<string | null>(null);
    const [filtered, setFiltered] = useState<string[]>([]);
    const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
    const [showConfirm, setShowConfirm] = useState(false);

    // 🔹 Animation value
    const scaleAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (showConfirm) {
            Animated.spring(scaleAnim, {
                toValue: 1,
                useNativeDriver: true,
                friction: 6,
            }).start();
        } else {
            scaleAnim.setValue(0);
        }
    }, [showConfirm]);

    const handleSelect = (name: string) => {
        if (!selectedState) {
            setSelectedState(name);
            setSearch("");
            setFiltered([]);
        } else {
            setSelectedDistrict(name);
            setShowConfirm(true); // show animated popup
        }
    };

    const handleSearch = (text: string) => {
        setSearch(text);
        const data = selectedState
            ? INDIA_LOCATIONS[selectedState]
            : Object.keys(INDIA_LOCATIONS);
        const results = data.filter((item) =>
            item.toLowerCase().includes(text.toLowerCase())
        );
        setFiltered(results);
    };

    const displayedData = filtered.length
        ? filtered
        : selectedState
            ? INDIA_LOCATIONS[selectedState]
            : Object.keys(INDIA_LOCATIONS);

    return (
        <ImageBackground
            source={require("../assets/bg.jpg")}
            style={styles.background}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Current location</Text>
                {!selectedState ? (
                    <Text style={styles.subtitle}>First, Current state</Text>
                ) : (
                    <Text style={styles.subtitle}>Current State: {selectedState}</Text>
                )}

                <TextInput
                    style={styles.input}
                    placeholder={
                        selectedState ? "Search district..." : "Search state..."
                    }
                    value={search}
                    onChangeText={handleSearch}
                />

                <FlatList
                    data={displayedData}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.option}
                            onPress={() => handleSelect(item)}
                        >
                            <Text style={styles.optionText}>{item}</Text>
                        </TouchableOpacity>
                    )}
                />

                {selectedState && (
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => setSelectedState(null)}
                    >
                        <Text style={styles.backText}>← Change State</Text>
                    </TouchableOpacity>
                )}

                {/* 🔹 Confirmation Popup */}
                <Modal transparent visible={showConfirm} animationType="fade">
                    <View style={styles.overlay}>
                        <Animated.View
                            style={[
                                styles.popup,
                                { transform: [{ scale: scaleAnim }] },
                            ]}
                        >
                            <Text style={styles.confirmText}>Your Current Location:</Text>
                            <Text style={styles.confirmDetail}>
                                State: {selectedState}
                            </Text>
                            <Text style={styles.confirmDetail}>
                                District: {selectedDistrict}
                            </Text>

                            <View style={styles.confirmActions}>
                                <TouchableOpacity
                                    style={styles.editBtn}
                                    onPress={() => setShowConfirm(false)}
                                >
                                    <Text style={styles.editText}>Edit</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.doneBtn}
                                    onPress={() => {
                                        setShowConfirm(false);
                                        navigation.navigate("UploadResume", {
                                            state: selectedState,
                                            district: selectedDistrict,
                                        });
                                    }}
                                >
                                    <Text style={styles.doneText}>Done</Text>
                                </TouchableOpacity>
                            </View>
                        </Animated.View>
                    </View>
                </Modal>
            </SafeAreaView>
        </ImageBackground>
    );
};

export default LocationSelection;


const styles = StyleSheet.create({
    background: {
        flex: 1,
    },

    container: {
        flex: 1,
        padding: 24,
    },
    title: { fontSize: 24, fontWeight: "700", color: "#000", marginBottom: 8 },
    subtitle: { color: "#555", marginBottom: 24 },
    input: {
        borderWidth: 1.5,
        borderColor: "#ccc",
        borderRadius: 12,
        padding: 12,
        fontSize: 16,
        marginBottom: 12,
    },
    option: {
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        paddingVertical: 14,
    },
    optionText: { fontSize: 16, color: "#000" },
    backButton: {
        backgroundColor: "#eee",
        borderRadius: 20,
        paddingVertical: 10,
        alignItems: "center",
        marginTop: 30,
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    popup: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 24,
        alignItems: "center",
        width: "80%",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5,
    },
    confirmText: { fontSize: 18, fontWeight: "700", color: "#000", marginBottom: 8 },
    confirmDetail: { fontSize: 16, color: "#333", marginBottom: 4 },
    confirmActions: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 16,
    },
    backText: {
        color: "#000",
        fontSize: 14,
        fontWeight: "600"
    },

    editBtn: {
        backgroundColor: "#eee",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    doneBtn: {
        backgroundColor: "#007BFF",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    editText: { color: "#000", fontWeight: "600" },
    doneText: { color: "#fff", fontWeight: "600" },

});