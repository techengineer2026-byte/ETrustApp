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
const COMPANIES = [
    {
        id: "1",
        name: "ABC Pvt Ltd",
        industry: "IT Services",
        location: "Bangalore",
        activeJobs: 5,
        logo: "domain", // Icon name as placeholder
    },
    {
        id: "2",
        name: "XYZ Retail",
        industry: "Retail",
        location: "Delhi",
        activeJobs: 2,
        logo: "store",
    },
    {
        id: "3",
        name: "Tech Solutions",
        industry: "Teleperformance",
        location: "Noida",
        activeJobs: 12,
        logo: "headset",
    },
    {
        id: "4",
        name: "Global Manufacturing",
        industry: "Manufacturing",
        location: "Pune",
        activeJobs: 0,
        logo: "factory",
    },
];

export default function ETEmployers() {
    const navigation = useNavigation<any>();
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState(COMPANIES);

    // --- HANDLERS ---
    const handleSearch = (text: string) => {
        setSearchText(text);
        if (text) {
            const filtered = COMPANIES.filter((item) =>
                item.name.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredData(filtered);
        } else {
            setFilteredData(COMPANIES);
        }
    };

    // Navigation Handlers
    const handleViewJobs = (company: any) => {
        navigation.navigate("EmployerJobs", { companyId: company.id, companyName: company.name });
    };

    const handleProfile = (company: any) => {
        // Navigate to CompanyProfile and pass the data
        navigation.navigate("CompanyProfile", {
            name: company.name,
            industry: company.industry,
            location: company.location,
            activeJobs: company.activeJobs
        });
    };
    // --- RENDER ITEM ---
    const renderCompanyCard = ({ item }: { item: typeof COMPANIES[0] }) => (
        <View style={styles.card}>
            {/* Header: Logo & Name */}
            <View style={styles.cardHeader}>
                <View style={styles.logoContainer}>
                    <Icon name={item.logo} size={28} color="#1c005e" />
                </View>
                <View style={styles.headerInfo}>
                    <Text style={styles.companyName}>{item.name}</Text>
                    <Text style={styles.industryText}>{item.industry}</Text>
                </View>
                {/* Status Dot */}
                <View style={styles.statusContainer}>
                    <View style={[styles.dot, { backgroundColor: item.activeJobs > 0 ? '#10B981' : '#ccc' }]} />
                    <Text style={styles.statusText}>{item.activeJobs > 0 ? 'Active' : 'Inactive'}</Text>
                </View>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Details Row */}
            <View style={styles.detailsRow}>
                <View style={styles.detailItem}>
                    <Icon name="map-marker-outline" size={16} color="#666" />
                    <Text style={styles.detailText}>{item.location}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Icon name="briefcase-outline" size={16} color="#666" />
                    <Text style={styles.detailText}>{item.activeJobs} Active Jobs</Text>
                </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={styles.outlineBtn}
                    onPress={() => handleProfile(item)}
                >
                    <Text style={styles.outlineBtnText}>Company Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.fillBtn}
                    onPress={() => handleViewJobs(item)}
                >
                    <Text style={styles.fillBtnText}>View Jobs</Text>
                    <Icon name="arrow-right" size={16} color="#fff" style={{ marginLeft: 4 }} />
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
                <Text style={styles.headerTitle}>Employers</Text>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Icon name="magnify" size={22} color="#999" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search Company Name..."
                    placeholderTextColor="#999"
                    value={searchText}
                    onChangeText={handleSearch}
                />
            </View>

            {/* Filters */}
            <View style={styles.filterRow}>
                {["Location", "Industry", "Active"].map((filter, index) => (
                    <TouchableOpacity key={index} style={styles.filterChip}>
                        <Text style={styles.filterText}>{filter}</Text>
                        <Icon name="chevron-down" size={14} color="#666" style={{ marginLeft: 4 }} />
                    </TouchableOpacity>
                ))}
            </View>

            {/* List */}
            <FlatList
                data={filteredData}
                renderItem={renderCompanyCard}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>No companies found.</Text>
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
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
    },
    backBtn: {
        marginRight: 15,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#1c005e",
    },
    // Search
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        marginHorizontal: 20,
        paddingHorizontal: 12,
        height: 50,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E0E0E0",
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: "#333",
    },
    // Filters
    filterRow: {
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
        borderColor: "#DDD",
    },
    filterText: {
        fontSize: 13,
        color: "#444",
        fontWeight: "500",
    },
    // List & Cards
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
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
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    logoContainer: {
        width: 50,
        height: 50,
        borderRadius: 10,
        backgroundColor: "#F3E5F5",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    headerInfo: {
        flex: 1,
    },
    companyName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    industryText: {
        fontSize: 13,
        color: "#666",
        marginTop: 2,
    },
    statusContainer: {
        alignItems: "flex-end",
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginBottom: 2,
    },
    statusText: {
        fontSize: 10,
        color: "#888",
    },
    divider: {
        height: 1,
        backgroundColor: "#F0F0F0",
        marginBottom: 12,
    },
    detailsRow: {
        flexDirection: "row",
        marginBottom: 16,
    },
    detailItem: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 20,
    },
    detailText: {
        marginLeft: 6,
        fontSize: 13,
        color: "#555",
        fontWeight: "500",
    },
    // Buttons
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
    },
    outlineBtn: {
        flex: 1,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: "#1c005e",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    outlineBtnText: {
        color: "#1c005e",
        fontWeight: "700",
        fontSize: 13,
    },
    fillBtn: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 10,
        backgroundColor: "#1c005e",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    fillBtnText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 13,
    },
    emptyState: {
        alignItems: "center",
        marginTop: 40,
    },
    emptyText: {
        color: "#999",
        fontSize: 16,
    },
});