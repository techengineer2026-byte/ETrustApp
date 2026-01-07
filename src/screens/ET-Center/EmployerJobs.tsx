// src/screens/ET-Center/EmployerJobs.tsx

import React from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    StatusBar,
    TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation, useRoute } from "@react-navigation/native";

// --- MOCK DATA FOR JOBS ---
const ALL_JOBS = [
    { id: "101", companyId: "1", title: "Software Tester", salary: "₹25k - ₹30k", type: "Full Time", exp: "1-2 Yrs", location: "Bangalore" },
    { id: "102", companyId: "1", title: "React Native Dev", salary: "₹40k - ₹60k", type: "Full Time", exp: "3 Yrs", location: "Bangalore" },
    { id: "103", companyId: "2", title: "Sales Executive", salary: "₹15k - ₹20k", type: "On-Site", exp: "Fresher", location: "Delhi" },
    { id: "104", companyId: "2", title: "Store Manager", salary: "₹30k", type: "Full Time", exp: "4 Yrs", location: "Delhi" },
    { id: "105", companyId: "3", title: "Customer Support", salary: "₹18k", type: "Rotational", exp: "0-1 Yr", location: "Noida" },
];

export default function EmployerJobs() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();

    // Get params passed from ETEmployers
    const { companyId, companyName } = route.params;

    // Filter jobs for this specific company
    const companyJobs = ALL_JOBS.filter(job => job.companyId === companyId);

    const handleViewJD = (job: any) => {
        // Navigate to Job Detail Screen (Assuming you have one, or use the one created previously)
        navigation.navigate("JobDetail", { job });
    };

    const renderJob = ({ item }: { item: typeof ALL_JOBS[0] }) => (
        <View style={styles.card}>
            <View style={styles.rowBetween}>
                <View>
                    <Text style={styles.jobTitle}>{item.title}</Text>
                    <View style={styles.badgeRow}>
                        <View style={styles.badge}><Text style={styles.badgeText}>{item.type}</Text></View>
                        <Text style={styles.locationText}>• {item.location}</Text>
                    </View>
                </View>
                <View style={styles.salaryBox}>
                    <Text style={styles.salaryText}>{item.salary}</Text>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.rowBetween}>
                <View style={styles.iconRow}>
                    <Icon name="briefcase-clock-outline" size={16} color="#666" />
                    <Text style={styles.metaText}>Exp: {item.exp}</Text>
                </View>
                <TouchableOpacity
                    style={styles.viewBtn}
                    onPress={() => handleViewJD(item)}
                >
                    <Text style={styles.viewBtnText}>View JD</Text>
                    <Icon name="chevron-right" size={16} color="#1c005e" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#F5F7FA" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Icon name="arrow-left" size={24} color="#1c005e" />
                </TouchableOpacity>
                <View>
                    <Text style={styles.subTitle}>Jobs at</Text>
                    <Text style={styles.headerTitle}>{companyName}</Text>
                </View>
            </View>

            {/* List */}
            <FlatList
                data={companyJobs}
                renderItem={renderJob}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Icon name="briefcase-off-outline" size={48} color="#ccc" />
                        <Text style={styles.emptyText}>No active jobs listed for this company.</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#F5F7FA" },
    header: { flexDirection: "row", alignItems: "center", padding: 20, paddingBottom: 10 },
    backBtn: { marginRight: 15, padding: 5 },
    subTitle: { fontSize: 12, color: "#666" },
    headerTitle: { fontSize: 20, fontWeight: "bold", color: "#1c005e" },

    listContent: { padding: 20 },

    // Card Styles
    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    jobTitle: { fontSize: 16, fontWeight: "bold", color: "#333", marginBottom: 6 },
    badgeRow: { flexDirection: "row", alignItems: "center" },
    badge: { backgroundColor: "#F3E5F5", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
    badgeText: { color: "#1c005e", fontSize: 11, fontWeight: "600" },
    locationText: { color: "#666", fontSize: 12, marginLeft: 6 },

    salaryBox: { backgroundColor: "#E0F2F1", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
    salaryText: { color: "#00695C", fontWeight: "700", fontSize: 13 },

    divider: { height: 1, backgroundColor: "#F0F0F0", marginVertical: 12 },

    iconRow: { flexDirection: "row", alignItems: "center" },
    metaText: { color: "#666", fontSize: 13, marginLeft: 6 },

    viewBtn: { flexDirection: "row", alignItems: "center" },
    viewBtnText: { color: "#1c005e", fontWeight: "700", fontSize: 14, marginRight: 2 },

    emptyState: { alignItems: "center", marginTop: 50 },
    emptyText: { color: "#999", marginTop: 10 },
});