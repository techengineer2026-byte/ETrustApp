// src/screens/ET-Center/Dashboard.tsx

// src/screens/ET-Center/Dashboard.tsx

import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    StatusBar,
    Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function Dashboard() {
    const navigation = useNavigation<any>();

    // Mock Data for Date
    const today = new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    // Mock Data for Stats
    const statsData = [
        { label: "Total Cand.", value: "124", icon: "account-group", color: "#4F46E5" },
        { label: "Active", value: "86", icon: "account-check", color: "#10B981" },
        { label: "Jobs Nearby", value: "32", icon: "briefcase-search", color: "#F59E0B" },
        { label: "Revenue", value: "₹45k", icon: "cash-multiple", color: "#1c005e" },
    ];

    // Mock Data for Jobs
    const jobsData = [
        { id: 1, company: "TechSol Pvt Ltd", role: "Software Tester", loc: "Sector 62" },
        { id: 2, company: "Bajaj Finance", role: "Sales Executive", loc: "Sector 18" },
        { id: 3, company: "Urban Company", role: "Helper / Technician", loc: "Noida" },
    ];

    // Mock Data for Activity
    const activityData = [
        { id: 1, name: "Rahul Verma", action: "Applied for Sales Exec", time: "2h ago", status: "applied" },
        { id: 2, name: "Neha Gupta", action: "Interview Scheduled", time: "4h ago", status: "interview" },
        { id: 3, name: "Amit Sharma", action: "Offer Received", time: "1d ago", status: "offer" },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#F5F7FA" />

            <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            >

                {/* --- HEADER --- */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.welcomeText}>Welcome, Centre Name 👋</Text>
                        <Text style={styles.dateText}>Today: {today}</Text>
                    </View>
                    <TouchableOpacity style={styles.profileIcon}>
                        <Icon name="bell-outline" size={24} color="#1c005e" />
                        <View style={styles.notificationDot} />
                    </TouchableOpacity>
                </View>

                {/* --- ACTION BUTTONS --- */}
                <View style={styles.actionRow}>
                    <TouchableOpacity
                        style={[styles.actionBtn, { backgroundColor: "#1c005e" }]}
                        onPress={() => navigation.navigate("ETname")} // Navigate to Step 1
                    >
                        <View style={styles.actionIconCircle}>
                            <Icon name="account-plus" size={22} color="#1c005e" />
                        </View>
                        <View>
                            <Text style={styles.actionBtnTitle}>Add Candidate</Text>
                            <Text style={styles.actionBtnSub}>Register new</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.actionBtn, { backgroundColor: "#fff", borderWidth: 1, borderColor: "#ddd" }]}>
                        <View style={[styles.actionIconCircle, { backgroundColor: "#F3E5F5" }]}>
                            <Icon name="account-group" size={22} color="#1c005e" />
                        </View>
                        <View>
                            <Text style={[styles.actionBtnTitle, { color: "#333" }]}>Enrolled</Text>
                            <Text style={styles.actionBtnSub}>View list</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* --- STATS GRID --- */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Overview</Text>
                    <View style={styles.statsGrid}>
                        {statsData.map((stat, index) => (
                            <View key={index} style={styles.statCard}>
                                <View style={[styles.statIconBox, { backgroundColor: `${stat.color}15` }]}>
                                    <Icon name={stat.icon} size={22} color={stat.color} />
                                </View>
                                <Text style={styles.statValue}>{stat.value}</Text>
                                <Text style={styles.statLabel}>{stat.label}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* --- CURRENT JOBS --- */}
                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeaderRow}>
                        <Text style={styles.sectionTitle}>Current Jobs Nearby</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAllText}>View All →</Text>
                        </TouchableOpacity>
                    </View>

                    {jobsData.map((job) => (
                        <View key={job.id} style={styles.jobCard}>
                            <View style={styles.jobIcon}>
                                <Text style={styles.jobIconText}>{job.company.charAt(0)}</Text>
                            </View>
                            <View style={styles.jobInfo}>
                                <Text style={styles.jobRole}>{job.role}</Text>
                                <Text style={styles.jobCompany}>{job.company} • {job.loc}</Text>
                            </View>
                            <TouchableOpacity style={styles.jdBtn}>
                                <Text style={styles.jdBtnText}>View JD</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>

                {/* --- RECENT ACTIVITY --- */}
                <View style={[styles.sectionContainer, { marginBottom: 30 }]}>
                    <Text style={styles.sectionTitle}>Recent Candidate Activity</Text>

                    <View style={styles.activityCard}>
                        {activityData.map((item, index) => (
                            <View key={item.id} style={[
                                styles.activityRow,
                                index === activityData.length - 1 && { borderBottomWidth: 0 }
                            ]}>
                                <View style={styles.activityContent}>
                                    <Text style={styles.activityName}>{item.name}</Text>
                                    <Text style={styles.activityAction}>
                                        {item.action} <Text style={styles.activityTime}>• {item.time}</Text>
                                    </Text>
                                </View>
                                <Icon
                                    name={
                                        item.status === 'offer' ? 'trophy-award' :
                                            item.status === 'interview' ? 'calendar-check' : 'file-send'
                                    }
                                    size={20}
                                    color={
                                        item.status === 'offer' ? '#10B981' :
                                            item.status === 'interview' ? '#F59E0B' : '#666'
                                    }
                                />
                            </View>
                        ))}
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#F5F7FA",
    },
    container: {
        padding: 20,
        paddingBottom: 40,
    },

    // Header
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 24,
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: "800",
        color: "#1c005e",
        marginBottom: 4,
    },
    dateText: {
        fontSize: 14,
        color: "#666",
        fontWeight: "500",
    },
    profileIcon: {
        width: 44,
        height: 44,
        backgroundColor: "#fff",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    notificationDot: {
        position: "absolute",
        top: 10,
        right: 12,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "red",
        borderWidth: 1,
        borderColor: "#fff",
    },

    // Action Buttons
    actionRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 24,
    },
    actionBtn: {
        flexDirection: "row",
        alignItems: "center",
        width: "48%",
        paddingVertical: 16,
        paddingHorizontal: 12,
        borderRadius: 16,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    actionIconCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    actionBtnTitle: {
        fontSize: 14,
        fontWeight: "700",
        color: "#fff",
    },
    actionBtnSub: {
        fontSize: 11,
        color: "rgba(255,255,255,0.7)",
        marginTop: 1,
    },

    // Sections
    sectionContainer: {
        marginBottom: 24,
    },
    sectionHeaderRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 17,
        fontWeight: "700",
        color: "#1d1b25",
        marginBottom: 12,
    },
    seeAllText: {
        fontSize: 13,
        color: "#1c005e",
        fontWeight: "600",
    },

    // Stats Grid
    statsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    statCard: {
        width: "48%", // 2 columns
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 16,
        marginBottom: 14,
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 2 },
    },
    statIconBox: {
        width: 32,
        height: 32,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    statValue: {
        fontSize: 20,
        fontWeight: "800",
        color: "#333",
        marginBottom: 2,
    },
    statLabel: {
        fontSize: 12,
        color: "#666",
        fontWeight: "500",
    },

    // Jobs List
    jobCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 14,
        borderRadius: 14,
        marginBottom: 12,
        elevation: 1,
    },
    jobIcon: {
        width: 42,
        height: 42,
        borderRadius: 10,
        backgroundColor: "#E8EAF6",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    jobIconText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1c005e",
    },
    jobInfo: {
        flex: 1,
    },
    jobRole: {
        fontSize: 15,
        fontWeight: "700",
        color: "#333",
    },
    jobCompany: {
        fontSize: 12,
        color: "#777",
        marginTop: 2,
    },
    jdBtn: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: "#f3e5f5",
        borderRadius: 8,
    },
    jdBtnText: {
        fontSize: 12,
        fontWeight: "600",
        color: "#1c005e",
    },

    // Activity List
    activityCard: {
        backgroundColor: "#fff",
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 8,
        elevation: 2,
    },
    activityRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },
    activityContent: {
        flex: 1,
    },
    activityName: {
        fontSize: 14,
        fontWeight: "700",
        color: "#333",
    },
    activityAction: {
        fontSize: 12,
        color: "#666",
        marginTop: 3,
    },
    activityTime: {
        color: "#999",
    },
});