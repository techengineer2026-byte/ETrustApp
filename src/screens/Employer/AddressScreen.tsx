import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function AddressScreen() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const prevData = route.params;

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const [pincode, setPincode] = useState("");

    const handleSubmit = () => {
        if (!address || !city || !district || !pincode) {
            Alert.alert("Missing Info", "Please fill in all address details.");
            return;
        }

        const finalData = { ...prevData, address, city, district, pincode };
        console.log("FINAL REGISTRATION DATA:", finalData);

        Alert.alert("Success", "Account Registered Successfully!", [
            { text: "Login Now", onPress: () => navigation.replace("EmployerLogin") }
        ]);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><Icon name="arrow-left" size={24} color="#0f172a" /></TouchableOpacity>
                <Text style={styles.stepIndicator}>4 of 4</Text>
            </View>
            <View style={styles.progressBarBg}><View style={[styles.progressBarFill, { width: "100%" }]} /></View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.iconCircle}><Icon name="map-marker-radius" size={32} color="#0f172a" /></View>
                <Text style={styles.title}>Office Location</Text>
                <Text style={styles.subtitle}>Where is your company located?</Text>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Address Line</Text>
                    <TextInput style={styles.input} placeholder="Floor, Building, Street" placeholderTextColor="#94a3b8" value={address} onChangeText={setAddress} />
                </View>

                <View style={styles.row}>
                    <View style={[styles.inputGroup, { width: '48%' }]}>
                        <Text style={styles.label}>City</Text>
                        <TextInput style={styles.input} placeholder="Mumbai" placeholderTextColor="#94a3b8" value={city} onChangeText={setCity} />
                    </View>
                    <View style={[styles.inputGroup, { width: '48%' }]}>
                        <Text style={styles.label}>District</Text>
                        <TextInput style={styles.input} placeholder="Thane" placeholderTextColor="#94a3b8" value={district} onChangeText={setDistrict} />
                    </View>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Pincode</Text>
                    <TextInput style={styles.input} placeholder="400001" placeholderTextColor="#94a3b8" keyboardType="number-pad" maxLength={6} value={pincode} onChangeText={setPincode} />
                </View>

                <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                    <Text style={styles.nextText}>Finish Registration</Text>
                    <Icon name="check-circle" size={20} color="#fff" />
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 20 },
    backBtn: { padding: 5, backgroundColor: '#f1f5f9', borderRadius: 8 },
    stepIndicator: { fontWeight: "bold", color: "#64748B" },
    progressBarBg: { height: 4, backgroundColor: "#E2E8F0", marginHorizontal: 20, borderRadius: 2 },
    progressBarFill: { height: "100%", backgroundColor: "#0f172a", borderRadius: 2 },
    content: { padding: 24, marginTop: 10 },
    iconCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#f1f5f9', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
    title: { fontSize: 26, fontWeight: "800", color: "#0f172a", marginBottom: 5 },
    subtitle: { fontSize: 16, color: "#64748B", marginBottom: 30 },
    inputGroup: { marginBottom: 20 },
    label: { fontSize: 14, fontWeight: "600", color: "#334155", marginBottom: 8 },
    input: { borderWidth: 1, borderColor: "#CBD5E1", borderRadius: 12, padding: 16, fontSize: 16, color: "#0f172a", backgroundColor: "#F8FAFC" },
    row: { flexDirection: 'row', justifyContent: "space-between" },
    submitBtn: { backgroundColor: "#0f172a", flexDirection: "row", justifyContent: "center", alignItems: "center", paddingVertical: 18, borderRadius: 12, marginTop: 10, shadowColor: "#0f172a", shadowOpacity: 0.3, shadowOffset: { width: 0, height: 4 }, elevation: 5 },
    nextText: { color: "#fff", fontSize: 16, fontWeight: "bold", marginRight: 10 },
});