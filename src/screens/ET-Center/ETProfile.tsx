// src/screens/ET-Center/ETProfile.tsx

// src/screens/ET-Center/ETProfile.tsx

import React from "react";
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

    // --- Handlers ---
    const handleLogout = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Logout", style: "destructive", onPress: () => console.log("Logged Out") } // Nav back to login here
            ]
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1c005e" />

            {/* --- TOP BACKGROUND --- */}
            <View style={styles.topBackground} />

            <SafeAreaView style={styles.safeArea}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >

                    {/* --- PROFILE HEADER --- */}
                    <View style={styles.profileHeader}>
                        <View style={styles.avatarContainer}>
                            <Icon name="domain" size={40} color="#1c005e" />
                            <View style={styles.editAvatarBadge}>
                                <Icon name="camera" size={12} color="#fff" />
                            </View>
                        </View>
                        <Text style={styles.centreName}>ABC Skill Development Centre</Text>
                        <View style={styles.codeBadge}>
                            <Text style={styles.codeText}>Centre Code: CNT-1023</Text>
                        </View>
                    </View>

                    {/* --- STATS SUMMARY --- */}
                    <View style={styles.statsCard}>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>120</Text>
                            <Text style={styles.statLabel}>Candidates</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>45</Text>
                            <Text style={styles.statLabel}>Placements</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>₹3.5L</Text>
                            <Text style={styles.statLabel}>Earnings</Text>
                        </View>
                    </View>

                    {/* --- CENTRE DETAILS --- */}
                    <View style={styles.sectionCard}>
                        <View style={styles.cardHeaderRow}>
                            <Text style={styles.sectionTitle}>Centre Details</Text>
                            <TouchableOpacity onPress={() => console.log("Edit Profile")}>
                                <Text style={styles.editText}>Edit</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.infoRow}>
                            <Icon name="account-tie" size={20} color="#666" style={styles.infoIcon} />
                            <View>
                                <Text style={styles.infoLabel}>Owner Name</Text>
                                <Text style={styles.infoValue}>Rajesh Kumar</Text>
                            </View>
                        </View>
                        <View style={styles.divider} />

                        <View style={styles.infoRow}>
                            <Icon name="phone" size={20} color="#666" style={styles.infoIcon} />
                            <View>
                                <Text style={styles.infoLabel}>Mobile</Text>
                                <Text style={styles.infoValue}>+91 98765 43210</Text>
                            </View>
                        </View>
                        <View style={styles.divider} />

                        <View style={styles.infoRow}>
                            <Icon name="email-outline" size={20} color="#666" style={styles.infoIcon} />
                            <View>
                                <Text style={styles.infoLabel}>Email</Text>
                                <Text style={styles.infoValue}>abc@centre.com</Text>
                            </View>
                        </View>
                        <View style={styles.divider} />

                        <View style={styles.infoRow}>
                            <Icon name="map-marker-outline" size={20} color="#666" style={styles.infoIcon} />
                            <View>
                                <Text style={styles.infoLabel}>Address</Text>
                                <Text style={styles.infoValue}>Block C, Sector 62, Noida, India</Text>
                            </View>
                        </View>
                    </View>

                    {/* --- BANK DETAILS --- */}
                    <View style={styles.sectionCard}>
                        <View style={styles.cardHeaderRow}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon name="bank" size={20} color="#1c005e" style={{ marginRight: 8 }} />
                                <Text style={styles.sectionTitle}>Bank Details</Text>
                            </View>
                            <TouchableOpacity onPress={() => console.log("Edit Bank")}>
                                <Text style={styles.editText}>Update</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.bankContainer}>
                            <Text style={styles.bankName}>HDFC Bank</Text>
                            <Text style={styles.accountNo}>XXXX XXXX 1234</Text>
                            <View style={styles.ifscRow}>
                                <Text style={styles.ifscLabel}>IFSC Code:</Text>
                                <Text style={styles.ifscValue}>HDFC000123</Text>
                            </View>
                        </View>
                    </View>

                    {/* --- SETTINGS --- */}
                    <Text style={styles.sectionHeaderLabel}>Settings</Text>
                    <View style={styles.settingsContainer}>
                        <SettingItem icon="bell-outline" label="Notifications" hasToggle />
                        <SettingItem icon="lock-outline" label="Change Password" />
                        <SettingItem icon="file-document-outline" label="Terms & Conditions" />
                        <SettingItem icon="file-chart-outline" label="Download Reports" lastItem />
                    </View>

                    {/* --- LOGOUT --- */}
                    <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                        <Icon name="logout" size={20} color="#EF4444" />
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>

                    <Text style={styles.versionText}>App Version 1.0.2</Text>
                    <View style={{ height: 20 }} />

                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

// --- Helper Component for Settings ---
const SettingItem = ({ icon, label, lastItem, hasToggle }: any) => (
    <TouchableOpacity style={[styles.settingRow, lastItem && { borderBottomWidth: 0 }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.settingIconBox}>
                <Icon name={icon} size={20} color="#555" />
            </View>
            <Text style={styles.settingLabel}>{label}</Text>
        </View>
        {hasToggle ? (
            <Icon name="toggle-switch" size={36} color="#1c005e" />
        ) : (
            <Icon name="chevron-right" size={20} color="#ccc" />
        )}
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F7FA",
    },
    topBackground: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 200, // Covers header area
        backgroundColor: "#1c005e",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    safeArea: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },

    // --- Profile Header ---
    profileHeader: {
        alignItems: "center",
        marginBottom: 20,
    },
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
        borderWidth: 3,
        borderColor: "rgba(255,255,255,0.3)",
    },
    editAvatarBadge: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "#1c005e",
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#fff",
    },
    centreName: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
        marginBottom: 6,
    },
    codeBadge: {
        backgroundColor: "rgba(255,255,255,0.2)",
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    codeText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "600",
    },

    // --- Stats Card ---
    statsCard: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 16,
        paddingVertical: 20,
        marginBottom: 20,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    statItem: {
        alignItems: "center",
    },
    statValue: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1c005e",
        marginBottom: 2,
    },
    statLabel: {
        fontSize: 12,
        color: "#666",
        fontWeight: "500",
    },
    statDivider: {
        width: 1,
        height: 30,
        backgroundColor: "#eee",
    },

    // --- Section Card General ---
    sectionCard: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        elevation: 1,
        shadowColor: "#000",
        shadowOpacity: 0.05,
    },
    cardHeaderRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    editText: {
        fontSize: 14,
        color: "#1c005e",
        fontWeight: "600",
    },

    // --- Info Rows ---
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
    },
    infoIcon: {
        width: 30,
        marginRight: 10,
    },
    infoLabel: {
        fontSize: 12,
        color: "#888",
        marginBottom: 2,
    },
    infoValue: {
        fontSize: 14,
        color: "#333",
        fontWeight: "500",
    },
    divider: {
        height: 1,
        backgroundColor: "#f5f5f5",
        marginLeft: 40, // offset for icon
        marginVertical: 4,
    },

    // --- Bank Details ---
    bankContainer: {
        backgroundColor: "#F8F9FA",
        borderRadius: 12,
        padding: 15,
        borderWidth: 1,
        borderColor: "#E0E0E0",
    },
    bankName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 4,
    },
    accountNo: {
        fontSize: 15,
        color: "#555",
        letterSpacing: 1,
        marginBottom: 10,
        fontFamily: "monospace", // Helps look like numbers
    },
    ifscRow: {
        flexDirection: "row",
    },
    ifscLabel: {
        color: "#888",
        fontSize: 12,
        marginRight: 6,
    },
    ifscValue: {
        color: "#333",
        fontSize: 12,
        fontWeight: "bold",
    },

    // --- Settings ---
    sectionHeaderLabel: {
        fontSize: 14,
        fontWeight: "700",
        color: "#666",
        marginLeft: 10,
        marginBottom: 10,
        textTransform: "uppercase",
        letterSpacing: 1,
    },
    settingsContainer: {
        backgroundColor: "#fff",
        borderRadius: 16,
        marginBottom: 25,
        overflow: "hidden", // for border radius on children
    },
    settingRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },
    settingIconBox: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: "#F3F4F6",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    settingLabel: {
        fontSize: 15,
        color: "#333",
        fontWeight: "500",
    },

    // --- Logout ---
    logoutBtn: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 15,
        backgroundColor: "#FEE2E2",
        borderRadius: 12,
        marginBottom: 15,
    },
    logoutText: {
        color: "#EF4444",
        fontWeight: "bold",
        marginLeft: 8,
        fontSize: 15,
    },
    versionText: {
        textAlign: "center",
        color: "#aaa",
        fontSize: 12,
    },
});