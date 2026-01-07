// src/screens/ET-Center/ETemployees.tsx

// src/screens/ET-Center/ETemployers.tsx

import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    StatusBar,
    Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

// --- MOCK DATA ---
const INITIAL_CANDIDATES = [
    {
        id: "1",
        name: "Rahul Sharma",
        mobile: "9876543210",
        qualification: "B.Com (Hons)",
        lookingFor: "Full Time",
        status: "Working",
        salary: "₹25,000",
        image: null, // Placeholder logic used if null
    },
    {
        id: "2",
        name: "Neha Verma",
        mobile: "9988776655",
        qualification: "MBA Marketing",
        lookingFor: "Part Time",
        status: "Not Working",
        salary: "₹40,000",
        image: null,
    },
    {
        id: "3",
        name: "Amit Kumar",
        mobile: "8899001122",
        qualification: "ITI - Fitter",
        lookingFor: "Contractual",
        status: "Open to Work",
        salary: "₹18,000",
        image: null,
    },
    {
        id: "4",
        name: "Sonia Singh",
        mobile: "7766554433",
        qualification: "B.Tech (CS)",
        lookingFor: "Internship",
        status: "Studying",
        salary: "₹15,000",
        image: null,
    },
];

export default function ETEmployees() {
    const navigation = useNavigation<any>();
    const [searchText, setSearchText] = useState("");
    const [candidates, setCandidates] = useState(INITIAL_CANDIDATES);

    // Filter Logic
    const handleSearch = (text: string) => {
        setSearchText(text);
        if (text) {
            const filtered = INITIAL_CANDIDATES.filter(
                (item) =>
                    item.name.toLowerCase().includes(text.toLowerCase()) ||
                    item.mobile.includes(text)
            );
            setCandidates(filtered);
        } else {
            setCandidates(INITIAL_CANDIDATES);
        }
    };

    // Helper for Status Badge Color
    const getStatusColor = (status: string) => {
        switch (status) {
            case "Working": return "#10B981"; // Green
            case "Not Working": return "#EF4444"; // Red
            case "Open to Work": return "#F59E0B"; // Orange
            default: return "#6B7280"; // Grey
        }
    };

    // --- RENDER ITEM (Candidate Card) ---
    const renderCandidate = ({ item }: { item: typeof INITIAL_CANDIDATES[0] }) => (
        <View style={styles.card}>
            {/* Card Header: Avatar + Name + Status */}
            <View style={styles.cardHeader}>
                <View style={styles.avatarContainer}>
                    <Icon name="account" size={24} color="#fff" />
                </View>
                <View style={styles.headerInfo}>
                    <Text style={styles.name}>{item.name}</Text>
                    <View style={styles.phoneRow}>
                        <Icon name="phone" size={14} color="#666" />
                        <Text style={styles.phone}>{item.mobile}</Text>
                    </View>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(item.status)}20` }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                        {item.status}
                    </Text>
                </View>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Details Grid */}
            <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Qualification</Text>
                        <Text style={styles.detailValue}>{item.qualification}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Looking For</Text>
                        <Text style={styles.detailValue}>{item.lookingFor}</Text>
                    </View>
                </View>
                <View style={[styles.detailRow, { marginTop: 12 }]}>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Expected Salary</Text>
                        <Text style={styles.detailValue}>{item.salary}</Text>
                    </View>
                    {/* Placeholder for 4th item or blank space */}
                    <View style={styles.detailItem} />
                </View>
            </View>

            {/* Buttons */}
            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.outlineBtn}>
                    <Text style={styles.outlineBtnText}>View Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.fillBtn}>
                    <Text style={styles.fillBtnText}>Apply Job</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#F5F7FA" />

            {/* --- HEADER --- */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Icon name="arrow-left" size={24} color="#1c005e" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Employees (Candidates)</Text>
            </View>

            {/* --- SEARCH BAR --- */}
            <View style={styles.searchContainer}>
                <Icon name="magnify" size={22} color="#999" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by Name / Mobile..."
                    placeholderTextColor="#999"
                    value={searchText}
                    onChangeText={handleSearch}
                />
            </View>

            {/* --- FILTER ROW --- */}
            <View style={styles.filterContainer}>
                {["Status", "Job Type", "Salary"].map((filter, index) => (
                    <TouchableOpacity key={index} style={styles.filterChip}>
                        <Text style={styles.filterText}>{filter}</Text>
                        <Icon name="chevron-down" size={16} color="#666" style={{ marginLeft: 4 }} />
                    </TouchableOpacity>
                ))}
            </View>

            {/* --- LIST --- */}
            <FlatList
                data={candidates}
                renderItem={renderCandidate}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Icon name="account-search" size={50} color="#ccc" />
                        <Text style={styles.emptyText}>No candidates found.</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#F5F7FA",
    },
    // Header
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: "#F5F7FA",
    },
    backBtn: {
        padding: 5,
        marginRight: 15,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#1c005e",
    },
    // Search
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        marginHorizontal: 20,
        borderRadius: 12,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        height: 50,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: "#333",
    },
    // Filter
    filterContainer: {
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    filterChip: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        marginRight: 10,
        borderWidth: 1,
        borderColor: "#E0E0E0",
    },
    filterText: {
        fontSize: 13,
        color: "#444",
        fontWeight: "500",
    },
    // List
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    // Card
    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    avatarContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#1c005e",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    headerInfo: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 2,
    },
    phoneRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    phone: {
        fontSize: 13,
        color: "#666",
        marginLeft: 4,
    },
    statusBadge: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
    statusText: {
        fontSize: 12,
        fontWeight: "700",
    },
    divider: {
        height: 1,
        backgroundColor: "#F0F0F0",
        marginBottom: 12,
    },
    // Details
    detailsContainer: {
        marginBottom: 16,
    },
    detailRow: {
        flexDirection: "row",
    },
    detailItem: {
        flex: 1,
    },
    detailLabel: {
        fontSize: 12,
        color: "#888",
        marginBottom: 2,
    },
    detailValue: {
        fontSize: 14,
        color: "#333",
        fontWeight: "600",
    },
    // Buttons
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
    },
    outlineBtn: {
        flex: 1,
        borderWidth: 1.5,
        borderColor: "#1c005e",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
    },
    outlineBtnText: {
        color: "#1c005e",
        fontWeight: "700",
        fontSize: 14,
    },
    fillBtn: {
        flex: 1,
        backgroundColor: "#1c005e",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
    },
    fillBtnText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 14,
    },
    // Empty State
    emptyState: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50,
    },
    emptyText: {
        marginTop: 10,
        color: "#888",
        fontSize: 16,
    },
});