import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    FlatList,
    Platform,
    KeyboardAvoidingView,
    ImageBackground,
    Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons"; // Ensure you have this installed

/* ===== DATA SOURCE ===== */
const INDIA_LOCATIONS: Record<string, string[]> = {

    Punjab: [
        "Amritsar", "Ludhiana", "Jalandhar", "Patiala", "Bathinda",
        "Mohali", "Hoshiarpur", "Pathankot", "Moga", "Firozpur" , 
        "Batala" , "Kharar"
    ],

    Haryana: [
        "Gurgaon", "Faridabad", "Panipat", "Ambala",
        "Karnal", "Kurukshetra", "Rohtak", "Hisar",
        "Sirsa", "Panchkula"
    ],

    Chandigarh: ["Chandigarh"],

    HimachalPradesh: [
        "Shimla", "Solan", "Kullu", "Manali", "Mandi",
        "Kangra", "Hamirpur", "Bilaspur", "Una", "Chamba"
    ],

    UttarPradesh: [
        "Lucknow", "Noida", "Greater Noida", "Ghaziabad", "Kanpur",
        "Agra", "Varanasi", "Prayagraj", "Meerut", "Bareilly",
        "Aligarh", "Mathura", "Moradabad", "Ayodhya"
    ],

    Maharashtra: [
        "Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad",
        "Thane", "Kalyan", "Solapur", "Kolhapur", "Satara",
        "Ahmednagar", "Jalgaon", "Akola", "Amravati"
    ],

    Gujarat: [
        "Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar",
        "Jamnagar", "Junagadh", "Anand", "Gandhinagar", "Morbi"
    ],

    Rajasthan: [
        "Jaipur", "Udaipur", "Jodhpur", "Kota", "Ajmer",
        "Bikaner", "Alwar", "Bhilwara", "Sri Ganganagar", "Sikar"
    ],

    MadhyaPradesh: [
        "Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain",
        "Sagar", "Ratlam", "Satna", "Rewa", "Dewas"
    ],

    Telangana: [
        "Hyderabad", "Warangal", "Nizamabad", "Karimnagar",
        "Khammam", "Mahbubnagar", "Adilabad", "Siddipet"
    ],

    AndhraPradesh: [
        "Visakhapatnam", "Vijayawada", "Guntur", "Nellore",
        "Kurnool", "Rajahmundry", "Tirupati", "Anantapur", "Kadapa"
    ],

    TamilNadu: [
        "Chennai", "Coimbatore", "Madurai", "Salem", "Erode",
        "Tiruppur", "Tiruchirappalli", "Vellore", "Thoothukudi",
        "Nagercoil"
    ],

    Karnataka: [
        "Bengaluru", "Mysuru", "Mangalore", "Hubli", "Belagavi",
        "Davangere", "Ballari", "Tumakuru", "Udupi", "Shivamogga"
    ],

    Kerala: [
        "Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur",
        "Alappuzha", "Kottayam", "Palakkad", "Malappuram",
        "Kannur", "Kasaragod"
    ],

    WestBengal: [
        "Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri",
        "Kharagpur", "Bardhaman", "Malda", "Haldia", "Jalpaiguri"
    ],

    Bihar: [
        "Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga",
        "Purnia", "Ara", "Begusarai", "Katihar", "Chapra"
    ],

    Odisha: [
        "Bhubaneswar", "Cuttack", "Rourkela", "Sambalpur",
        "Balasore", "Baripada", "Berhampur", "Jharsuguda",
        "Rayagada", "Koraput"
    ],

    Assam: [
        "Guwahati", "Dibrugarh", "Silchar", "Jorhat",
        "Tezpur", "Tinsukia", "Nagaon", "Bongaigaon", "Goalpara"
    ],

    Jharkhand: [
        "Ranchi", "Jamshedpur", "Dhanbad", "Bokaro",
        "Hazaribagh", "Giridih", "Ramgarh", "Deoghar"
    ],

    Chhattisgarh: [
        "Raipur", "Bilaspur", "Durg", "Bhilai",
        "Korba", "Jagdalpur", "Ambikapur", "Rajnandgaon"
    ],

    Delhi: [
        "Central Delhi", "South Delhi", "North Delhi",
        "East Delhi", "West Delhi", "New Delhi"
    ],

    Uttarakhand: [
        "Dehradun", "Haridwar", "Rishikesh",
        "Haldwani", "Roorkee", "Nainital"
    ],

    Goa: [
        "Panaji", "Margao", "Vasco da Gama",
        "Mapusa", "Ponda"
    ],

    JammuAndKashmir: [
        "Srinagar", "Jammu", "Anantnag",
        "Baramulla", "Pulwama"
    ],

    NorthEast: [
        "Imphal", "Aizawl", "Kohima", "Shillong",
        "Agartala", "Itanagar"
    ]
};

const STATES_LIST = Object.keys(INDIA_LOCATIONS).sort();

/* ===== REUSABLE AUTOCOMPLETE COMPONENT ===== */
const AutoComplete = ({
    label,
    placeholder,
    value,
    setValue,
    data,
    zIndex = 1,
    disabled = false,
    iconName
}: any) => {
    const [list, setList] = useState<string[]>([]);
    const [show, setShow] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const onChange = (text: string) => {
        setValue(text);
        if (text.length > 0 && data) {
            const filtered = data.filter((item: string) =>
                item.toLowerCase().includes(text.toLowerCase())
            );
            setList(filtered);
            setShow(true);
        } else {
            setShow(false);
        }
    };

    return (
        <View style={[styles.inputContainer, { zIndex: zIndex }]}>
            <Text style={styles.label}>{label}</Text>
            <View style={[
                styles.inputWrapper,
                isFocused && styles.inputWrapperFocused,
                disabled && styles.inputWrapperDisabled,
                show && list.length > 0 && styles.inputBottomFlat
            ]}>
                <Icon name={iconName} size={20} color={isFocused ? "#2563EB" : "#9CA3AF"} style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor="#9CA3AF"
                    value={value}
                    onChangeText={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => {
                        setIsFocused(false);
                        setTimeout(() => setShow(false), 200);
                    }}
                    editable={!disabled}
                />
            </View>

            {show && list.length > 0 && (
                <View style={styles.dropdownOverlay}>
                    <FlatList
                        data={list.slice(0, 5)}
                        keyExtractor={(item) => item}
                        keyboardShouldPersistTaps="handled"
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                style={[
                                    styles.dropdownItem,
                                    index === list.length - 1 && styles.dropdownItemLast
                                ]}
                                onPress={() => {
                                    setValue(item);
                                    setShow(false);
                                    Keyboard.dismiss();
                                }}
                            >
                                <Text style={styles.dropdownText}>{item}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}
        </View>
    );
};

/* ===== MAIN SCREEN ===== */
export default function PreferredCityScreen({ navigation }: any) {
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [cityList, setCityList] = useState<string[]>([]);

    // Update available cities when State changes
    useEffect(() => {
        // Check if the typed state matches a key in our object
        const match = STATES_LIST.find(s => s.toLowerCase() === selectedState.toLowerCase());

        if (match) {
            setCityList(INDIA_LOCATIONS[match]);
        } else {
            setCityList([]);
        }

        // Only clear city if user is typing a new state (optional UX choice)
        if (!match && selectedState.length > 0) {
            setSelectedCity("");
        }
    }, [selectedState]);

    const handleNext = () => {
        if (!selectedState || !selectedCity) return;
        console.log("Saving Location:", selectedState, selectedCity);
        navigation.navigate("SyncLoading");
    };

    return (
        <ImageBackground
            source={require("../assets/bg.jpg")} // Same BG as Education
            style={styles.background}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <Icon name="chevron-back" size={26} color="#1F2937" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Preferred Location</Text>
                            <Text style={styles.subtitle}>Where would you like to work?</Text>
                        </View>

                        {/* Form Card */}
                        <View style={styles.card}>

                            {/* STATE SELECTION */}
                            <AutoComplete
                                label="State"
                                placeholder="e.g. Maharashtra"
                                value={selectedState}
                                setValue={setSelectedState}
                                data={STATES_LIST}
                                zIndex={2000} // Higher z-index to float over City
                                iconName="map-outline"
                            />

                            {/* CITY SELECTION */}
                            <AutoComplete
                                label="City"
                                placeholder={cityList.length > 0 ? "Select City" : "Select State first..."}
                                value={selectedCity}
                                setValue={setSelectedCity}
                                data={cityList}
                                zIndex={1000}
                                disabled={cityList.length === 0}
                                iconName="location-outline"
                            />

                            {/* Info Tip */}
                            <View style={styles.infoBox}>
                                <Icon name="information-circle" size={20} color="#2563EB" />
                                <Text style={styles.infoText}>
                                    You can change your preferred location later in your profile settings.
                                </Text>
                            </View>

                        </View>
                    </ScrollView>

                    {/* Bottom Button */}
                    <View style={styles.bottomContainer}>
                        <TouchableOpacity
                            style={[
                                styles.finishButton,
                                (!selectedCity || !selectedState) && styles.finishButtonDisabled
                            ]}
                            onPress={handleNext}
                            disabled={!selectedCity || !selectedState}
                        >
                            <Text style={styles.finishButtonText}>Finish Setup</Text>
                            <Icon name="checkmark-circle-outline" size={20} color="#fff" style={{ marginLeft: 8 }} />
                        </TouchableOpacity>
                    </View>

                </KeyboardAvoidingView>
            </SafeAreaView>
        </ImageBackground>
    );
}

/* ===== STYLES ===== */
const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    safeArea: {
        flex: 1,
        backgroundColor: "transparent",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0,0,0,0.05)",
    },
    backButton: { marginRight: 15 },
    progressBarContainer: {
        flex: 1,
        height: 6,
        backgroundColor: "#E5E7EB",
        borderRadius: 3,
        marginRight: 15,
    },
    progressBarFill: {
        width: "75%", // Progress at 75%
        height: "100%",
        backgroundColor: "#2563EB",
        borderRadius: 3,
    },
    stepText: { fontSize: 12, fontWeight: "600", color: "#6B7280" },

    scrollContent: { padding: 20 },

    titleContainer: { marginBottom: 24, marginTop: 10 },
    title: {
        fontSize: 28,
        fontWeight: "800",
        color: "#111827",
        marginBottom: 8,
        textShadowColor: 'rgba(255, 255, 255, 0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    subtitle: { fontSize: 15, color: "#4B5563", fontWeight: "500" },

    card: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 22,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.08,
        shadowRadius: 20,
        elevation: 5,
        marginBottom: 24,
    },

    /* Input Styles */
    inputContainer: { marginBottom: 20, position: 'relative' },
    label: { fontSize: 14, fontWeight: "700", color: "#374151", marginBottom: 8 },

    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#F9FAFB",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 12,
        paddingHorizontal: 12,
    },
    inputWrapperFocused: {
        borderColor: "#2563EB",
        backgroundColor: "#fff",
        borderWidth: 1.5,
    },
    inputWrapperDisabled: {
        backgroundColor: "#F3F4F6",
    },
    inputBottomFlat: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    inputIcon: { marginRight: 10 },
    input: {
        flex: 1,
        paddingVertical: 14,
        fontSize: 16,
        color: "#111827",
    },

    /* Dropdown Styles */
    dropdownOverlay: {
        position: 'absolute',
        top: 78,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderTopWidth: 0,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 10,
    },
    dropdownItem: {
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6",
    },
    dropdownItemLast: {
        borderBottomWidth: 0,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
    dropdownText: { fontSize: 15, color: "#374151" },

    /* Info Box */
    infoBox: {
        flexDirection: 'row',
        backgroundColor: "#EFF6FF",
        padding: 12,
        borderRadius: 10,
        marginTop: 10,
        alignItems: 'center'
    },
    infoText: {
        flex: 1,
        marginLeft: 10,
        fontSize: 13,
        color: "#1E40AF",
        lineHeight: 18
    },

    /* Footer */
    bottomContainer: {
        padding: 24,
        paddingBottom: 10,
    },
    finishButton: {
        backgroundColor: "#111827", // Black/Dark button for contrast
        borderRadius: 30,
        paddingVertical: 18,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
    finishButtonDisabled: {
        backgroundColor: "#9CA3AF",
        shadowOpacity: 0,
        elevation: 0
    },
    finishButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
    },
});