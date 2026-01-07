// src/screens/ET-Center/Transactions.tsx


import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

// --- MOCK DATA ---
const TRANSACTIONS = [
    {
        id: "1",
        candidate: "Rahul Sharma",
        company: "XYZ Pvt Ltd",
        job: "Sales Executive",
        offerPrice: "30,000",
        commission: "5,000",
        status: "Pending",
        date: "06 Jan 2024",
    },
    {
        id: "2",
        candidate: "Neha Verma",
        company: "ABC Pvt Ltd",
        job: "HR Assistant",
        offerPrice: "40,000",
        commission: "7,000",
        status: "Paid",
        date: "02 Jan 2024",
    },
    {
        id: "3",
        candidate: "Amit Kumar",
        company: "TechSol Inc",
        job: "Technician",
        offerPrice: "18,000",
        commission: "2,500",
        status: "Paid",
        date: "28 Dec 2023",
    },
];

export default function Transactions() {
    const navigation = useNavigation<any>();
    const [filter, setFilter] = useState("All");

    // Helper for Status Color
    const getStatusColor = (status: string) => {
        return status === "Paid" ? "#10B981" : "#F59E0B"; // Green vs Orange
    };

    const handleViewDetails = (item: any) => {
        navigation.navigate("TransactionDetail", { transaction: item });
    };

    // --- RENDER CARD ---
    const renderCard = ({ item }: { item: typeof TRANSACTIONS[0] }) => (
        <View style={styles.card}>
            {/* Header: Candidate & Date */}
            <View style={styles.cardHeader}>
                <View style={styles.candidateRow}>
                    <Icon name="account-tie" size={20} color="#1c005e" />
                    <Text style={styles.candidateName}>{item.candidate}</Text>
                </View>
                <Text style={styles.dateText}>{item.date}</Text>
            </View>

            <View style={styles.divider} />

            {/* Context: Company & Job */}
            <View style={styles.contextRow}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.label}>Company</Text>
                    <Text style={styles.value}>{item.company}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.label}>Job Role</Text>
                    <Text style={styles.value}>{item.job}</Text>
                </View>
            </View>

            {/* Financials Box */}
            <View style={styles.financeBox}>
                <View>
                    <Text style={styles.financeLabel}>Offer Price</Text>
                    <Text style={styles.offerValue}>₹{item.offerPrice}</Text>
                </View>
                <View style={styles.verticalLine} />
                <View>
                    <Text style={styles.financeLabel}>Commission</Text>
                    <Text style={styles.commissionValue}>₹{item.commission}</Text>
                </View>
            </View>

            {/* Footer: Status & Action */}
            <View style={styles.footerRow}>
                <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(item.status)}15` }]}>
                    <Icon
                        name={item.status === 'Paid' ? "check-circle" : "clock-outline"}
                        size={14}
                        color={getStatusColor(item.status)}
                    />
                    <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                        {item.status}
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => handleViewDetails(item)}
                >
                    <Text style={styles.actionText}>
                        {item.status === 'Paid' ? "View Invoice" : "View Details"}
                    </Text>
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
                <Text style={styles.headerTitle}>Transactions</Text>
                <TouchableOpacity style={styles.exportBtn}>
                    <Icon name="download" size={20} color="#1c005e" />
                </TouchableOpacity>
            </View>

            {/* Filters */}
            <View style={styles.filterRow}>
                {["All", "Paid", "Pending"].map((f, i) => (
                    <TouchableOpacity
                        key={i}
                        style={[styles.filterChip, filter === f && styles.activeChip]}
                        onPress={() => setFilter(f)}
                    >
                        <Text style={[styles.filterText, filter === f && styles.activeFilterText]}>
                            {f}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* List */}
            <FlatList
                data={TRANSACTIONS}
                renderItem={renderCard}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#F5F7FA" },

    // Header
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    headerTitle: { fontSize: 24, fontWeight: "800", color: "#1c005e" },
    exportBtn: { padding: 8, backgroundColor: "#E8EAF6", borderRadius: 8 },

    // Filters
    filterRow: { flexDirection: "row", paddingHorizontal: 20, marginBottom: 15 },
    filterChip: {
        paddingVertical: 6, paddingHorizontal: 16,
        borderRadius: 20, marginRight: 10,
        borderWidth: 1, borderColor: "#DDD", backgroundColor: "#fff",
    },
    activeChip: { backgroundColor: "#1c005e", borderColor: "#1c005e" },
    filterText: { fontSize: 13, color: "#666", fontWeight: "600" },
    activeFilterText: { color: "#fff" },

    // Card
    listContent: { paddingHorizontal: 20, paddingBottom: 20 },
    card: {
        backgroundColor: "#fff", borderRadius: 16, padding: 16, marginBottom: 16,
        elevation: 2, shadowColor: "#000", shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05, shadowRadius: 4,
    },

    // Card - Header
    cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
    candidateRow: { flexDirection: "row", alignItems: "center" },
    candidateName: { fontSize: 16, fontWeight: "bold", color: "#333", marginLeft: 8 },
    dateText: { fontSize: 12, color: "#999" },
    divider: { height: 1, backgroundColor: "#F0F0F0", marginBottom: 12 },

    // Card - Context
    contextRow: { flexDirection: "row", marginBottom: 12 },
    label: { fontSize: 11, color: "#888", marginBottom: 2 },
    value: { fontSize: 14, color: "#444", fontWeight: "600" },

    // Card - Finance
    financeBox: {
        flexDirection: "row", alignItems: "center", justifyContent: "space-around",
        backgroundColor: "#F9FAFB", borderRadius: 12, paddingVertical: 12, marginBottom: 15,
        borderWidth: 1, borderColor: "#F3F4F6",
    },
    verticalLine: { width: 1, height: 25, backgroundColor: "#DDD" },
    financeLabel: { fontSize: 11, color: "#666", textAlign: "center", marginBottom: 4 },
    offerValue: { fontSize: 16, fontWeight: "600", color: "#333", textAlign: "center" },
    commissionValue: { fontSize: 18, fontWeight: "bold", color: "#1c005e", textAlign: "center" },

    // Card - Footer
    footerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    statusBadge: {
        flexDirection: "row", alignItems: "center", paddingVertical: 5, paddingHorizontal: 10, borderRadius: 8,
    },
    statusText: { fontSize: 12, fontWeight: "700", marginLeft: 4 },
    actionBtn: { flexDirection: "row", alignItems: "center" },
    actionText: { fontSize: 13, fontWeight: "600", color: "#1c005e", marginRight: 2 },
});