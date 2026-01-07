// src/screens/ET-Center/OfficeAddressET.tsx

import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    StyleSheet,
    ScrollView,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    PermissionsAndroid,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Geolocation from "react-native-geolocation-service";

export default function OfficeAddressET({ navigation, route }: any) {
    const prevData = route.params || {};

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const [pincode, setPincode] = useState("");
    const [gpsLoading, setGpsLoading] = useState(false);
    const [gpsData, setGpsData] = useState<{ lat: number; long: number } | null>(null);

    const requestLocationPermission = async () => {
        if (Platform.OS === "android") {
            try {
                const granted = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
                ]);

                return (
                    granted["android.permission.ACCESS_FINE_LOCATION"] === PermissionsAndroid.RESULTS.GRANTED &&
                    granted["android.permission.ACCESS_COARSE_LOCATION"] === PermissionsAndroid.RESULTS.GRANTED
                );
            } catch (err) {
                console.warn(err);
                return false;
            }
        }
        return true; // iOS will ask automatically
    };


    const handleGPS = async () => {
        setGpsLoading(true);

        const hasPermission = await requestLocationPermission();
        if (!hasPermission) {
            Alert.alert("Permission Denied", "Allow location to use GPS feature.");
            setGpsLoading(false);
            return;
        }

        Geolocation.getCurrentPosition(
            (position) => {
                setGpsData({
                    lat: position.coords.latitude,
                    long: position.coords.longitude,
                });
                setGpsLoading(false);
            },
            (error) => {
                if (error.code === 1) {
                    // Permission denied
                    Alert.alert("Permission Denied", "Allow location to use GPS feature.");
                } else if (error.code === 2) {
                    // Location unavailable
                    Alert.alert("Location Error", "Location not available. Try again.");
                } else if (error.code === 3) {
                    // Timeout
                    Alert.alert("Timeout", "Fetching location timed out. Try again.");
                } else {
                    Alert.alert("Error", error.message);
                }
                setGpsLoading(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 10000,
                forceRequestLocation: true, // ensure GPS dialog shows
            }
        );

    };

    const handleFinish = () => {
        if (!address || !city || !district || !pincode) {
            Alert.alert("Missing Fields", "Please fill in all address details.");
            return;
        }

        const finalData = {
            ...prevData,
            address,
            city,
            district,
            pincode,
            gps: gpsData,
        };

        console.log("FINAL SUBMISSION:", finalData);
        navigation.navigate("CenterName");
    };

    return (
        <ImageBackground
            source={require("../../assets/bg.jpg")}
            style={styles.background}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <Icon name="arrow-left" size={24} color="#0f172a" />
                    </TouchableOpacity>
                    <Text style={styles.stepIndicator}>Step 2 of 3</Text>
                </View>

                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                >
                    <ScrollView contentContainerStyle={styles.content}>
                        <Text style={styles.title}>Office Address</Text>
                        <Text style={styles.subtitle}>Where is your company located?</Text>

                        <Text style={styles.label}>Full Address</Text>
                        <TextInput
                            style={[styles.input, { height: 80, textAlignVertical: "top", paddingTop: 12 }]}
                            placeholder="Floor, Building, Street..."
                            multiline
                            value={address}
                            onChangeText={setAddress}
                        />

                        <TouchableOpacity
                            style={[styles.gpsBtn, gpsData && styles.gpsBtnActive]}
                            onPress={handleGPS}
                        >
                            {gpsLoading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <>
                                    <Icon
                                        name={gpsData ? "crosshairs-gps" : "crosshairs"}
                                        size={20}
                                        color="#fff"
                                    />
                                    <Text style={styles.gpsText}>
                                        {gpsData ? "Location Captured" : "Update Location on GPS"}
                                    </Text>
                                </>
                            )}
                        </TouchableOpacity>

                        <View style={styles.row}>
                            <View style={{ flex: 1, marginRight: 10 }}>
                                <Text style={styles.label}>City</Text>
                                <TextInput style={styles.input} value={city} onChangeText={setCity} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.label}>District</Text>
                                <TextInput style={styles.input} value={district} onChangeText={setDistrict} />
                            </View>
                        </View>

                        <Text style={styles.label}>Pin Code</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="number-pad"
                            maxLength={6}
                            value={pincode}
                            onChangeText={setPincode}
                        />

                        <TouchableOpacity style={styles.submitBtn} onPress={handleFinish}>
                            <Text style={styles.nextText}>Submit All Details</Text>
                        </TouchableOpacity>

                        <View style={{ height: 40 }} />
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: { flex: 1 },
    container: { flex: 1 },
    header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 24 },
    backBtn: { padding: 8, backgroundColor: "#f1f5f9", borderRadius: 8 },
    stepIndicator: { fontWeight: "600", color: "#64748B" },
    content: { padding: 24 },
    title: { fontSize: 26, fontWeight: "800", color: "#0f172a", marginBottom: 8 },
    subtitle: { fontSize: 16, color: "#64748B", marginBottom: 20 },
    label: { fontSize: 14, fontWeight: "600", color: "#334155", marginBottom: 8, marginTop: 10 },
    input: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#E2E8F0", borderRadius: 12, paddingHorizontal: 16, height: 50 },
    row: { flexDirection: "row" },
    gpsBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#334155", paddingVertical: 14, borderRadius: 12, marginVertical: 10 },
    gpsBtnActive: { backgroundColor: "#10B981" },
    gpsText: { color: "#fff", fontWeight: "600", marginLeft: 8 },
    submitBtn: { backgroundColor: "#0f172a", paddingVertical: 18, borderRadius: 30, marginTop: 30, alignItems: "center" },
    nextText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
