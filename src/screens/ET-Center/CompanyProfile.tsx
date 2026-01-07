// src/screens/ET-Center/CompanyProfile.tsx

import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function CompanyProfile() {
    const navigation = useNavigation();
    const route = useRoute<any>();

    // In a real app, use companyId to fetch details. 
    // Here we use the passed item or mock data based on params.
    const { name, industry, location, activeJobs } = route.params;

    const handleCall = () => Linking.openURL(`tel:9876543210`);
    const handleEmail = () => Linking.openURL(`mailto:hr@${name.replace(/\s/g, '').toLowerCase()}.com`);

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor="#1c005e" />

            {/* Top Header Background */}
            <View style={styles.headerBg}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Icon name="arrow-left" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Company Profile</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>

                {/* Profile Card */}
                <View style={styles.profileCard}>
                    <View style={styles.avatarCircle}>
                        <Icon name="domain" size={40} color="#1c005e" />
                    </View>
                    <Text style={styles.companyName}>{name || "Company Name"}</Text>
                    <Text style={styles.industry}>{industry || "Industry Sector"}</Text>
                    <View style={styles.locationRow}>
                        <Icon name="map-marker" size={14} color="#666" />
                        <Text style={styles.location}>{location || "India"}</Text>
                    </View>
                </View>

                {/* Stats Grid */}
                <View style={styles.statsRow}>
                    <View style={styles.statBox}>
                        <Text style={styles.statValue}>{activeJobs || 0}</Text>
                        <Text style={styles.statLabel}>Active Jobs</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statValue}>15</Text>
                        <Text style={styles.statLabel}>Hires Made</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statValue}>4.5</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name="star" size={12} color="#F59E0B" />
                            <Text style={styles.statLabel}> Rating</Text>
                        </View>
                    </View>
                </View>

                {/* Contact Info */}
                <Text style={styles.sectionTitle}>HR Contact Details</Text>
                <View style={styles.infoCard}>
                    <View style={styles.row}>
                        <View style={styles.iconBox}><Icon name="account" size={20} color="#1c005e" /></View>
                        <View>
                            <Text style={styles.label}>HR Manager</Text>
                            <Text style={styles.value}>Sandeep Mehta</Text>
                        </View>
                    </View>
                    <View style={styles.divider} />

                    <View style={styles.actionRow}>
                        <TouchableOpacity style={styles.actionBtn} onPress={handleCall}>
                            <Icon name="phone" size={18} color="#fff" />
                            <Text style={styles.actionText}>Call</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionBtn} onPress={handleEmail}>
                            <Icon name="email" size={18} color="#fff" />
                            <Text style={styles.actionText}>Email</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Financials / About */}
                <Text style={styles.sectionTitle}>Business Terms</Text>
                <View style={styles.infoCard}>
                    <View style={styles.row}>
                        <View style={styles.iconBox}><Icon name="cash-multiple" size={20} color="#1c005e" /></View>
                        <View>
                            <Text style={styles.label}>Placement Commission</Text>
                            <Text style={styles.value}>8.33% of Annual CTC</Text>
                        </View>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.row}>
                        <View style={styles.iconBox}><Icon name="clock-check-outline" size={20} color="#1c005e" /></View>
                        <View>
                            <Text style={styles.label}>Payment Cycle</Text>
                            <Text style={styles.value}>30 Days after joining</Text>
                        </View>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#F5F7FA" },

    headerBg: {
        backgroundColor: "#1c005e",
        padding: 20,
        paddingBottom: 20, // Extra space for overlap
        flexDirection: "row",
        alignItems: "center",
    },
    backBtn: { marginRight: 15 },
    headerTitle: { fontSize: 20, fontWeight: "bold", color: "#fff" },

    content: { paddingHorizontal: 20, marginTop: 40 }, // Overlap effect

    // Profile Card
    profileCard: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        marginBottom: 20,
    },
    avatarCircle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#F3E5F5",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    companyName: { fontSize: 22, fontWeight: "bold", color: "#333" },
    industry: { fontSize: 14, color: "#666", marginBottom: 6 },
    locationRow: { flexDirection: "row", alignItems: "center" },
    location: { fontSize: 14, color: "#666", marginLeft: 4 },

    // Stats
    statsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 25,
    },
    statBox: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 15,
        marginHorizontal: 5,
        alignItems: "center",
        elevation: 1,
    },
    statValue: { fontSize: 18, fontWeight: "bold", color: "#1c005e" },
    statLabel: { fontSize: 11, color: "#888", marginTop: 2 },

    sectionTitle: { fontSize: 16, fontWeight: "bold", color: "#333", marginBottom: 10, marginLeft: 5 },

    // Info Cards
    infoCard: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
        elevation: 1,
    },
    row: { flexDirection: "row", alignItems: "center" },
    iconBox: {
        width: 36, height: 36, borderRadius: 18, backgroundColor: "#F5F7FA",
        justifyContent: "center", alignItems: "center", marginRight: 12
    },
    label: { fontSize: 12, color: "#888" },
    value: { fontSize: 15, fontWeight: "600", color: "#333" },
    divider: { height: 1, backgroundColor: "#F0F0F0", marginVertical: 12 },

    actionRow: { flexDirection: "row", justifyContent: "space-around" },
    actionBtn: {
        flexDirection: "row", backgroundColor: "#1c005e", paddingVertical: 10, paddingHorizontal: 20,
        borderRadius: 8, alignItems: "center"
    },
    actionText: { color: "#fff", fontWeight: "bold", marginLeft: 6 },
});