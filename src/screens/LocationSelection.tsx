import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const INDIA_LOCATIONS: Record<string, string[]> = {
    Punjab: ["Mohali", "Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Kharar"],
    Haryana: ["Panchkula", "Gurgaon", "Faridabad", "Panipat", "Ambala"],
    Chandigarh: ["Chandigarh"], // Union Territory (part of Tricity)
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

    const handleSelect = (name: string) => {
        if (!selectedState) {
            setSelectedState(name);
            setSearch("");
            setFiltered([]);
        } else {
            setSelectedDistrict(name);
            setShowConfirm(true); // show confirmation
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
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Select your location</Text>
            {!selectedState ? (
                <Text style={styles.subtitle}>First, choose your state</Text>
            ) : (
                <Text style={styles.subtitle}>
                    Selected State: {selectedState}
                </Text>
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
            {showConfirm && (
                <View style={styles.confirmBox}>
                    <Text style={styles.confirmText}>
                        Your Location:
                    </Text>
                    <Text style={styles.confirmDetail}>State: {selectedState}</Text>
                    <Text style={styles.confirmDetail}>District: {selectedDistrict}</Text>

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
                                navigation.navigate("EducationForm", {
                                    state: selectedState,
                                    district: selectedDistrict,
                                });
                            }}
                        >
                            <Text style={styles.doneText}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {selectedState && (
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => setSelectedState(null)}
                >
                    <Text style={styles.backText}>← Change State</Text>
                </TouchableOpacity>
            )}
        </SafeAreaView>
    );
};

export default LocationSelection;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
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
    confirmBox: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ddd",
},
confirmText: { fontSize: 18, fontWeight: "700", color: "#000" },
confirmDetail: { fontSize: 16, color: "#333", marginTop: 4 },
confirmActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
},
editBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#eee",
},
editText: { color: "#000", fontWeight: "600" },
doneBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#007BFF",
},
doneText: { color: "#fff", fontWeight: "600" },

    backText: { color: "#000", fontSize: 14, fontWeight: "600" },
});