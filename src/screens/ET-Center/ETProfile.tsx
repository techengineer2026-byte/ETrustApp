// src/screens/ET-Center/ETProfile.tsx

import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Image,
    Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

export default function ETProfile() {
    const navigation = useNavigation<any>();

    // --- Mock Data (Replace with Context/API later) ---
    const centerData = {
        centerId: "CNT-8821",
        centerName: "Skill India Training Hub",
        contactPerson: "Rajesh Kumar",
        email: "admin@skillindia.com",
        phone: "+91 98765 43210",
        address: "Plot 45, Industrial Area, Phase 2",
        city: "Noida",
        state: "Uttar Pradesh",
        pincode: "201301",
        isVerified: true
    };

    // --- Handlers ---
    const handleLogout = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Logout", style: "destructive", onPress: () => navigation.reset({
                        index: 0,
                        routes: [{ name: 'Welcome' }],
                    })
                }
            ]
        );
    };

    const handleEdit = () => {
        // Navigate to an Edit Screen (You can create ETEditProfileScreen similar to EditEmployerProfileScreen)
        navigation.navigate("ETEditProfileScreen");
        // Alert.alert("Edit Profile", "Navigation to Edit Form");
    };

    const handleChangePassword = () => {
        Alert.alert("Change Password", "Open Password Reset Flow");
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
            <SafeAreaView style={styles.safeArea}>

                {/* --- HEADER --- */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.headerTitle}>ET Centre Zone</Text>
                        <Text style={styles.headerSubtitle}>Manage centre profile & settings</Text>
                    </View>
                    <TouchableOpacity style={styles.logoutIconBtn} onPress={handleLogout}>
                        <Icon name="logout" size={22} color="#EF4444" />
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                    {/* --- MAIN PROFILE CARD --- */}
                    <View style={styles.profileCard}>
                        <View style={styles.profileHeaderRow}>
                            <View style={styles.avatarContainer}>
                                <Image
                                    source={{ uri: 'https://randomuser.me/api/portraits/lego/6.jpg' }}
                                    style={styles.avatar}
                                />
                                <View style={styles.editBadge}>
                                    <Icon name="camera" size={12} color="#fff" />
                                </View>
                            </View>
                            <View style={styles.profileInfo}>
                                <Text style={styles.centerName}>{centerData.centerName}</Text>
                                <View style={styles.idRow}>
                                    <Text style={styles.centerId}>ID: {centerData.centerId}</Text>
                                    {centerData.isVerified && (
                                        <View style={styles.verifiedTag}>
                                            <Icon name="check-decagram" size={12} color="#15803D" />
                                            <Text style={styles.verifiedText}>Verified</Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        <TouchableOpacity style={styles.editBtn} onPress={handleEdit}>
                            <Text style={styles.editBtnText}>Edit Profile Details</Text>
                            <Icon name="chevron-right" size={16} color="#2563EB" />
                        </TouchableOpacity>
                    </View>

                    {/* --- STATS ROW --- */}
                    <View style={styles.statsGrid}>
                        <View style={styles.statCard}>
                            <View style={[styles.iconBox, { backgroundColor: '#EFF6FF' }]}>
                                <Icon name="account-group" size={24} color="#2563EB" />
                            </View>
                            <Text style={styles.statValue}>120</Text>
                            <Text style={styles.statLabel}>Candidates</Text>
                        </View>
                        <View style={styles.statCard}>
                            <View style={[styles.iconBox, { backgroundColor: '#F0FDF4' }]}>
                                <Icon name="briefcase-check" size={24} color="#16A34A" />
                            </View>
                            <Text style={styles.statValue}>85</Text>
                            <Text style={styles.statLabel}>Placed</Text>
                        </View>
                        <View style={styles.statCard}>
                            <View style={[styles.iconBox, { backgroundColor: '#FFF7ED' }]}>
                                <Icon name="star" size={24} color="#EA580C" />
                            </View>
                            <Text style={styles.statValue}>4.8</Text>
                            <Text style={styles.statLabel}>Rating</Text>
                        </View>
                    </View>

                    {/* --- SECTION 1: BASIC INFO --- */}
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionHeader}>Basic Information</Text>

                        <InfoRow icon="domain" label="Centre Name" value={centerData.centerName} />
                        <View style={styles.rowDivider} />
                        <InfoRow icon="account-tie" label="Contact Person" value={centerData.contactPerson} />
                        <View style={styles.rowDivider} />
                        <InfoRow icon="card-account-details-outline" label="Centre ID" value={centerData.centerId} />
                    </View>

                    {/* --- SECTION 2: CONTACT DETAILS --- */}
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionHeader}>Contact Details</Text>

                        <InfoRow icon="email-outline" label="Email Address" value={centerData.email} />
                        <View style={styles.rowDivider} />
                        <InfoRow icon="phone-outline" label="Phone Number" value={centerData.phone} />
                    </View>

                    {/* --- SECTION 3: LOCATION --- */}
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionHeader}>Location</Text>

                        <View style={styles.locationRow}>
                            <Icon name="map-marker-outline" size={20} color="#64748B" style={{ marginTop: 2 }} />
                            <View style={{ marginLeft: 12, flex: 1 }}>
                                <Text style={styles.infoLabel}>Address</Text>
                                <Text style={styles.infoValue}>{centerData.address}</Text>
                                <Text style={styles.infoValue}>{centerData.city}, {centerData.state} - {centerData.pincode}</Text>
                            </View>
                        </View>
                    </View>

                    {/* --- SECTION 4: SECURITY --- */}
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionHeader}>Security</Text>

                        <TouchableOpacity style={styles.securityRow} onPress={handleChangePassword}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={[styles.iconCircle, { backgroundColor: '#F1F5F9' }]}>
                                    <Icon name="lock-reset" size={20} color="#334155" />
                                </View>
                                <Text style={styles.securityLabel}>Change Password</Text>
                            </View>
                            <Icon name="chevron-right" size={20} color="#94A3B8" />
                        </TouchableOpacity>
                    </View>

                    {/* --- LOGOUT BUTTON --- */}
                    <TouchableOpacity style={styles.fullLogoutBtn} onPress={handleLogout}>
                        <Text style={styles.fullLogoutText}>Log Out</Text>
                    </TouchableOpacity>

                    <View style={{ height: 40 }} />
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

// --- Helper Component: Info Row ---
const InfoRow = ({ icon, label, value }: { icon: string, label: string, value: string }) => (
    <View style={styles.infoRowContainer}>
        <View style={styles.iconCircle}>
            <Icon name={icon} size={18} color="#64748B" />
        </View>
        <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={styles.infoLabel}>{label}</Text>
            <Text style={styles.infoValue}>{value}</Text>
        </View>
    </View>
);


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F8FAFC" },
    safeArea: { flex: 1 },

    // Header
    header: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#fff',
        borderBottomWidth: 1, borderBottomColor: '#F1F5F9'
    },
    headerTitle: { fontSize: 20, fontWeight: '800', color: '#0F172A' },
    headerSubtitle: { fontSize: 13, color: '#64748B', marginTop: 2 },
    logoutIconBtn: { padding: 8, backgroundColor: '#FEF2F2', borderRadius: 8 },

    scrollContent: { paddingHorizontal: 20, paddingTop: 20 },

    // Main Profile Card
    profileCard: {
        backgroundColor: '#fff', borderRadius: 20, padding: 20,
        shadowColor: '#64748B', shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08, shadowRadius: 12, elevation: 4, marginBottom: 20
    },
    profileHeaderRow: { flexDirection: 'row', alignItems: 'center' },
    avatarContainer: { position: 'relative' },
    avatar: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#F1F5F9' },
    editBadge: {
        position: 'absolute', bottom: 0, right: 0, backgroundColor: '#2563EB',
        width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: '#fff',
        justifyContent: 'center', alignItems: 'center'
    },
    profileInfo: { marginLeft: 16, flex: 1 },
    centerName: { fontSize: 18, fontWeight: '700', color: '#0F172A', marginBottom: 4 },
    idRow: { flexDirection: 'row', alignItems: 'center' },
    centerId: { fontSize: 13, color: '#64748B', fontWeight: '500', marginRight: 8 },
    verifiedTag: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: '#DCFCE7',
        paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4
    },
    verifiedText: { fontSize: 10, fontWeight: '700', color: '#15803D', marginLeft: 2 },

    divider: { height: 1, backgroundColor: '#F1F5F9', marginVertical: 16 },

    editBtn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10, backgroundColor: '#F0F9FF', borderRadius: 10 },
    editBtnText: { color: '#2563EB', fontSize: 13, fontWeight: '600', marginRight: 4 },

    // Stats Grid
    statsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
    statCard: {
        width: '31%', backgroundColor: '#fff', paddingVertical: 15, borderRadius: 16,
        alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 6, elevation: 2
    },
    iconBox: { width: 42, height: 42, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
    statValue: { fontSize: 18, fontWeight: '800', color: '#0F172A' },
    statLabel: { fontSize: 11, color: '#64748B', marginTop: 2, fontWeight: '600' },

    // Section Containers
    sectionContainer: {
        backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 20,
        shadowColor: '#000', shadowOpacity: 0.02, shadowRadius: 4, elevation: 1
    },
    sectionHeader: { fontSize: 15, fontWeight: '700', color: '#0F172A', marginBottom: 16 },

    // Info Rows
    infoRowContainer: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
    iconCircle: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#F8FAFC', justifyContent: 'center', alignItems: 'center' },
    infoLabel: { fontSize: 11, color: '#64748B', marginBottom: 2 },
    infoValue: { fontSize: 14, color: '#334155', fontWeight: '500' },
    rowDivider: { height: 1, backgroundColor: '#F1F5F9', marginLeft: 44 }, // Indented divider

    locationRow: { flexDirection: 'row', paddingVertical: 8 },

    // Security
    securityRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8 },
    securityLabel: { fontSize: 14, color: '#334155', fontWeight: '500', marginLeft: 12 },

    // Logout
    fullLogoutBtn: {
        backgroundColor: '#FEF2F2', paddingVertical: 16, borderRadius: 16,
        alignItems: 'center', borderWidth: 1, borderColor: '#FECACA'
    },
    fullLogoutText: { color: '#EF4444', fontWeight: '700', fontSize: 15 }
});