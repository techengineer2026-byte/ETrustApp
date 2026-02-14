// src/screens/Employer/EmployerSetupFinalAddress.tsx

import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    ScrollView,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    PermissionsAndroid,
    StatusBar,
    Keyboard
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import Geolocation from "react-native-geolocation-service";
import { useNavigation, useRoute } from "@react-navigation/native";

// --- CONSTANTS ---
const PRIMARY_COLOR = "#000000";
const BG_GLASS = "rgba(255, 255, 255, 0.85)";
const SUCCESS_COLOR = "#10B981";
const ERROR_COLOR = "#d32f2f";

export default function EmployerSetupFinalAddress() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const prevData = route.params || {};

    // --- STATE ---
    const [address, setAddress] = useState(prevData.address || "");
    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const [pincode, setPincode] = useState("");
    
    // GPS State
    const [gpsLoading, setGpsLoading] = useState(false);
    const [gpsData, setGpsData] = useState<{ lat: number; long: number } | null>(null);
    const [error, setError] = useState<string | null>(null);

    // --- PERMISSION LOGIC ---
    const requestLocationPermission = async () => {
        if (Platform.OS === 'ios') {
            const auth = await Geolocation.requestAuthorization("whenInUse");
            return auth === "granted";
        }

        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: "Location Permission",
                        message: "We need your location to auto-fill your address details.",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK",
                    }
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        }
        return false;
    };

    // --- REVERSE GEOCODING (Coordinates -> Address) ---
    const fetchAddressDetails = async (lat: number, long: number) => {
        try {
            // Using OpenStreetMap Nominatim API (Free, No Key Required for low usage)
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}`,
                {
                    headers: {
                        'User-Agent': 'JobApp/1.0', // Required by Nominatim
                    }
                }
            );
            
            const data = await response.json();
            
            if (data && data.address) {
                console.log("Auto-fill Data:", data.address);

                const addr = data.address;

                // 1. Set City (It can be under city, town, village, or municipality)
                const detectedCity = addr.city || addr.town || addr.village || addr.municipality || "";
                setCity(detectedCity);

                // 2. Set District (Usually state_district or county)
                const detectedDistrict = addr.state_district || addr.county || addr.suburb || "";
                setDistrict(detectedDistrict);

                // 3. Set Pincode
                const detectedPincode = addr.postcode || "";
                setPincode(detectedPincode);
                
                // Optional: You could append street address to the main address field if empty
                // if (!address && addr.road) setAddress(addr.road);
            }
        } catch (error) {
            console.log("Reverse Geocoding Error:", error);
            Alert.alert("Notice", "Location captured, but could not auto-fill details. Please enter them manually.");
        }
    };

    // --- HANDLE GPS CLICK ---
    const handleGPS = async () => {
        setError(null);
        setGpsLoading(true);
        Keyboard.dismiss();

        const hasPermission = await requestLocationPermission();

        if (!hasPermission) {
            setGpsLoading(false);
            Alert.alert("Permission Denied", "Please enable location services.");
            return;
        }

        Geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                
                // 1. Save Coordinates
                setGpsData({ lat: latitude, long: longitude });
                
                // 2. Fetch Address Details (Auto-fill)
                await fetchAddressDetails(latitude, longitude);

                setGpsLoading(false);
            },
            (err) => {
                console.log("GPS Error:", err);
                setGpsLoading(false);
                setError("Failed to fetch location. Please ensure GPS is on.");
            },
            { 
                enableHighAccuracy: true, 
                timeout: 15000, 
                maximumAge: 10000 
            }
        );
    };

    // --- SUBMIT ---
    const handleSubmit = () => {
        if (!address.trim() || !city.trim() || !district.trim() || !pincode.trim()) {
            setError("Please fill in all address fields.");
            return;
        }

        const finalPayload = {
            ...prevData,
            address,
            city,
            district,
            pincode,
            gps: gpsData,
        };

        console.log("FINAL REGISTRATION DATA:", finalPayload);
        
        // Navigate to the Welcome Swipe Screen
        navigation.navigate("EmployerAuthPassword");
    };

    return (
        <ImageBackground
            source={require("../../assets/bg.jpg")}
            style={styles.background}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" />
                
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                >
                    {/* --- HEADER --- */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                            <Icon name="arrow-back" size={24} color="#000" />
                        </TouchableOpacity>

                        <View>
                            <Text style={styles.headerTitle}>Profile Setup</Text>
                            <Text style={styles.headerSubtitle}>Final Details</Text>
                        </View>
                        
                        <View style={styles.progressCircle}>
                            <Text style={styles.progressText}>4/4</Text>
                        </View>
                    </View>

                    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                        
                        <View style={styles.titleBlock}>
                            <Text style={styles.title}>Location Details</Text>
                            <Text style={styles.subtitle}>
                                Use GPS to auto-fill your city and pin code.
                            </Text>
                        </View>

                        {/* --- FORM CARD --- */}
                        <View style={styles.card}>
                            
                            {/* Address Input */}
                            <Text style={styles.inputLabel}>Full Address</Text>
                            <View style={[styles.inputContainer, { height: 80, alignItems: 'flex-start' }]}>
                                <Icon name="location-outline" size={20} color="#666" style={{ marginTop: 12, marginRight: 8 }} />
                                <TextInput
                                    style={[styles.inputField, { height: '100%', paddingTop: 10 }]}
                                    placeholder="Floor, Building, Street..."
                                    placeholderTextColor="#999"
                                    multiline
                                    textAlignVertical="top"
                                    value={address}
                                    onChangeText={setAddress}
                                />
                            </View>

                            {/* GPS Button */}
                            <TouchableOpacity 
                                style={[styles.gpsBtn, gpsData ? styles.gpsBtnSuccess : styles.gpsBtnDefault]}
                                onPress={handleGPS}
                                disabled={gpsLoading}
                            >
                                {gpsLoading ? (
                                    <>
                                        <ActivityIndicator color="#fff" size="small" />
                                        <Text style={styles.gpsText}>Fetching Address...</Text>
                                    </>
                                ) : gpsData ? (
                                    <>
                                        <Icon name="checkmark-circle" size={20} color="#fff" />
                                        <Text style={styles.gpsText}>Location & Address Captured</Text>
                                    </>
                                ) : (
                                    <>
                                        <Icon name="locate" size={20} color="#fff" />
                                        <Text style={styles.gpsText}>Update Location on GPS</Text>
                                    </>
                                )}
                            </TouchableOpacity>
                            
                            {/* City & District Row */}
                            <View style={styles.row}>
                                <View style={styles.col}>
                                    <Text style={styles.inputLabel}>City</Text>
                                    <View style={styles.inputContainer}>
                                        <TextInput
                                            style={styles.inputField}
                                            placeholder="City"
                                            placeholderTextColor="#999"
                                            value={city}
                                            onChangeText={setCity}
                                        />
                                    </View>
                                </View>
                                <View style={{ width: 15 }} />
                                <View style={styles.col}>
                                    <Text style={styles.inputLabel}>District</Text>
                                    <View style={styles.inputContainer}>
                                        <TextInput
                                            style={styles.inputField}
                                            placeholder="District"
                                            placeholderTextColor="#999"
                                            value={district}
                                            onChangeText={setDistrict}
                                        />
                                    </View>
                                </View>
                            </View>

                            {/* Pincode */}
                            <Text style={styles.inputLabel}>Pin Code</Text>
                            <View style={styles.inputContainer}>
                                <Icon name="keypad-outline" size={20} color="#666" style={{ marginRight: 8 }} />
                                <TextInput
                                    style={styles.inputField}
                                    placeholder="000000"
                                    placeholderTextColor="#999"
                                    keyboardType="number-pad"
                                    maxLength={6}
                                    value={pincode}
                                    onChangeText={setPincode}
                                />
                            </View>

                        </View>

                        {/* Error Message */}
                        {error && (
                            <View style={styles.errorRow}>
                                <Icon name="alert-circle" size={16} color={ERROR_COLOR} />
                                <Text style={styles.errorText}>{error}</Text>
                            </View>
                        )}
                        
                        <View style={{ height: 100 }} /> 
                    </ScrollView>

                    {/* --- FOOTER --- */}
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.mainBtn} onPress={handleSubmit}>
                            <Text style={styles.mainBtnText}>Finish Setup</Text>
                            <Icon name="checkmark-done" size={22} color="#fff" style={{ marginLeft: 8 }} />
                        </TouchableOpacity>
                    </View>

                </KeyboardAvoidingView>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: { flex: 1 },
    container: { flex: 1 },

    // HEADER
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 24,
        paddingTop: 15,
        marginBottom: 10,
    },
    backBtn: { marginRight: 10, padding: 5 },
    headerTitle: { fontSize: 18, fontWeight: "800", color: "#000" },
    headerSubtitle: { fontSize: 12, color: "#666", marginTop: 2 },
    progressCircle: {
        width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: PRIMARY_COLOR,
        justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.5)'
    },
    progressText: { fontSize: 12, fontWeight: "700", color: "#000" },

    // SCROLL
    scrollContent: { paddingHorizontal: 24, paddingTop: 10 },
    titleBlock: { marginBottom: 20 },
    title: { fontSize: 28, fontWeight: "800", color: "#000", marginBottom: 5 },
    subtitle: { fontSize: 14, color: "#555", lineHeight: 20 },

    // CARD
    card: {
        backgroundColor: BG_GLASS,
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },

    inputLabel: { fontSize: 12, fontWeight: "700", color: "#333", textTransform: "uppercase", marginTop: 15, marginBottom: 8 },
    inputContainer: {
        backgroundColor: "#fff",
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e0e0e0"
    },
    inputField: { flex: 1, fontSize: 16, fontWeight: "600", color: "#000" },

    row: { flexDirection: "row", justifyContent: "space-between" },
    col: { flex: 1 },

    // GPS BUTTON
    gpsBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 14,
        borderRadius: 12,
        marginTop: 15,
        marginBottom: 5,
    },
    gpsBtnDefault: { backgroundColor: "#333" },
    gpsBtnSuccess: { backgroundColor: SUCCESS_COLOR },
    gpsText: { color: "#fff", fontWeight: "700", fontSize: 14, marginLeft: 8 },

    errorRow: { flexDirection: 'row', alignItems: 'center', marginTop: 15, paddingHorizontal: 24 },
    errorText: { color: ERROR_COLOR, fontSize: 14, fontWeight: "600", marginLeft: 6 },

    // FOOTER
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 24,
        paddingBottom: 20,
    },
    mainBtn: {
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 30,
        paddingVertical: 18,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    mainBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});