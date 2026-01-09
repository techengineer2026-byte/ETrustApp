import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
    Animated,
    ImageBackground,
    Modal,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Location Data
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
    // State Variables
    const [stateSearch, setStateSearch] = useState("");
    const [districtSearch, setDistrictSearch] = useState("");
    
    const [selectedState, setSelectedState] = useState<string | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

    // Filtered Data States
    const [filteredStates, setFilteredStates] = useState<string[]>(Object.keys(INDIA_LOCATIONS));
    const [filteredDistricts, setFilteredDistricts] = useState<string[]>([]);

    // Modals Control
    const [showDistrictModal, setShowDistrictModal] = useState(false);
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

    // 1. Handle State Search
    const handleStateSearch = (text: string) => {
        setStateSearch(text);
        const allStates = Object.keys(INDIA_LOCATIONS);
        const results = allStates.filter((item) =>
            item.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredStates(results);
    };

    // 2. Handle District Search (Inside Popup)
    const handleDistrictSearch = (text: string) => {
        setDistrictSearch(text);
        if (selectedState) {
            const allDistricts = INDIA_LOCATIONS[selectedState];
            const results = allDistricts.filter((item) =>
                item.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredDistricts(results);
        }
    };

    // 3. User Clicks a State -> Open District Popup
    const onSelectState = (stateName: string) => {
        setSelectedState(stateName);
        setFilteredDistricts(INDIA_LOCATIONS[stateName]); // Reset list for that state
        setDistrictSearch(""); // Clear previous search
        setShowDistrictModal(true); // Open Popup
    };

    // 4. User Clicks a District -> Close District Popup -> Show Confirmation
    const onSelectDistrict = (districtName: string) => {
        setSelectedDistrict(districtName);
        setShowDistrictModal(false); // Close District List
        setTimeout(() => setShowConfirm(true), 300); // Open Confirmation
    };

    return (
        <ImageBackground
            source={require("../assets/bg.jpg")}
            style={styles.background}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Select Location</Text>
                <Text style={styles.subtitle}>Choose your State</Text>

                {/* State Search Input */}
                <TextInput
                    style={styles.input}
                    placeholder="Search state..."
                    value={stateSearch}
                    onChangeText={handleStateSearch}
                />

                {/* Main List: STATES Only */}
                <FlatList
                    data={filteredStates}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.option}
                            onPress={() => onSelectState(item)}
                        >
                            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                <Text style={styles.optionText}>{item}</Text>
                                <Text style={styles.arrowText}>›</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />

                {/* ============================================== */}
                {/* 🔹 MODAL 1: District Selection Dropdown/Popup  */}
                {/* ============================================== */}
                <Modal visible={showDistrictModal} transparent animationType="slide">
                    <KeyboardAvoidingView 
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={styles.overlay}
                    >
                        <View style={styles.districtPopup}>
                            <View style={styles.popupHeader}>
                                <Text style={styles.popupTitle}>Select District in {selectedState}</Text>
                                <TouchableOpacity onPress={() => setShowDistrictModal(false)}>
                                    <Text style={styles.closeText}>✕</Text>
                                </TouchableOpacity>
                            </View>

                            <TextInput
                                style={styles.input}
                                placeholder="Search district..."
                                value={districtSearch}
                                onChangeText={handleDistrictSearch}
                                autoFocus={true}
                            />

                            <FlatList
                                data={filteredDistricts}
                                keyExtractor={(item) => item}
                                style={{ maxHeight: 300 }}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.option}
                                        onPress={() => onSelectDistrict(item)}
                                    >
                                        <Text style={styles.optionText}>{item}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </KeyboardAvoidingView>
                </Modal>

                {/* ============================================== */}
                {/* 🔹 MODAL 2: Final Confirmation Popup           */}
                {/* ============================================== */}
                <Modal transparent visible={showConfirm} animationType="fade">
                    <View style={styles.overlay}>
                        <Animated.View
                            style={[
                                styles.popup,
                                { transform: [{ scale: scaleAnim }] },
                            ]}
                        >
                            <Text style={styles.confirmText}>Confirm Location</Text>
                            
                            <View style={styles.infoBox}>
                                <Text style={styles.confirmLabel}>State:</Text>
                                <Text style={styles.confirmValue}>{selectedState}</Text>
                            </View>
                            
                            <View style={styles.infoBox}>
                                <Text style={styles.confirmLabel}>District:</Text>
                                <Text style={styles.confirmValue}>{selectedDistrict}</Text>
                            </View>

                            <View style={styles.confirmActions}>
                                <TouchableOpacity
                                    style={styles.editBtn}
                                    onPress={() => {
                                        setShowConfirm(false);
                                        setShowDistrictModal(true); // Go back to district select
                                    }}
                                >
                                    <Text style={styles.editText}>Change</Text>
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
                                    <Text style={styles.doneText}>Confirm</Text>
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
        backgroundColor: "rgba(255,255,255,0.8)"
    },
    option: {
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        paddingVertical: 14,
        backgroundColor: "rgba(255,255,255,0.5)", // slight background for readability
        paddingHorizontal: 8
    },
    optionText: { fontSize: 16, color: "#000" },
    arrowText: { fontSize: 20, color: "#999", fontWeight:'bold' },
    
    // Modal Styles
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
        width: "85%",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5,
    },
    districtPopup: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 20,
        width: "90%",
        maxHeight: "80%",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5,
    },
    popupHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15
    },
    popupTitle: { fontSize: 18, fontWeight: "700", color: "#333" },
    closeText: { fontSize: 22, color: "#999", padding: 5 },

    // Confirmation Styles
    confirmText: { fontSize: 20, fontWeight: "700", color: "#000", marginBottom: 20 },
    infoBox: {
        flexDirection:'row',
        width: '100%',
        marginBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        paddingBottom: 8
    },
    confirmLabel: { fontSize: 16, color: "#666", width: 80 },
    confirmValue: { fontSize: 16, color: "#000", fontWeight: '600' },

    confirmActions: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 20,
    },
    editBtn: {
        backgroundColor: "#eee",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        flex: 1,
        marginRight: 10,
        alignItems: 'center'
    },
    doneBtn: {
        backgroundColor: "#007BFF",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        flex: 1,
        marginLeft: 10,
        alignItems: 'center'
    },
    editText: { color: "#333", fontWeight: "600", fontSize: 16 },
    doneText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});