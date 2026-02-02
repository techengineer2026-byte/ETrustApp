import React, { useState, useMemo } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    StatusBar,
    Modal,
    Animated,
    Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get('window');

// --- MOCK DATA ---
const ALL_CANDIDATES = [
    { id: "1", name: "Rahul Sharma", mobile: "9876543210", qualification: "B.Com (Hons)", lookingFor: "Full Time", status: "Working", salary: "25000", skill: "Accounting" },
    { id: "2", name: "Neha Verma", mobile: "9988776655", qualification: "MBA Marketing", lookingFor: "Part Time", status: "Not Working", salary: "40000", skill: "Sales" },
    { id: "3", name: "Amit Kumar", mobile: "8899001122", qualification: "ITI - Fitter", lookingFor: "Contractual", status: "Open to Work", salary: "18000", skill: "Technical" },
    { id: "4", name: "Sonia Singh", mobile: "7766554433", qualification: "B.Tech (CS)", lookingFor: "Internship", status: "Studying", salary: "15000", skill: "Coding" },
    { id: "5", name: "Vikas Dubey", mobile: "9911223344", qualification: "12th Pass", lookingFor: "Full Time", status: "Open to Work", salary: "12000", skill: "Delivery" },
    { id: "6", name: "Priya Das", mobile: "8877665544", qualification: "B.Sc Nursing", lookingFor: "Full Time", status: "Working", salary: "30000", skill: "Healthcare" },
];

const FILTERS = ["All", "Working", "Not Working", "Open to Work", "Studying"];

export default function ETEmployees() {
    const navigation = useNavigation<any>();

    // State
    const [searchText, setSearchText] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");
    const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
    const [profileVisible, setProfileVisible] = useState(false);

    // Toast State
    const [toastVisible, setToastVisible] = useState(false);
    const fadeAnim = new Animated.Value(0);

    // --- LOGIC: Filter Data ---
    const filteredCandidates = useMemo(() => {
        return ALL_CANDIDATES.filter(item => {
            // 1. Text Search
            const matchesSearch = item.name.toLowerCase().includes(searchText.toLowerCase()) || item.mobile.includes(searchText);
            // 2. Category Filter
            const matchesFilter = activeFilter === "All" || item.status === activeFilter;

            return matchesSearch && matchesFilter;
        });
    }, [searchText, activeFilter]);

    // --- ACTIONS ---
    const handleViewProfile = (candidate: any) => {
        setSelectedCandidate(candidate);
        setProfileVisible(true);
    };

    const handleApplyJob = (name: string) => {
        // Show Toast Animation
        setToastVisible(true);
        Animated.sequence([
            Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
            Animated.delay(2000),
            Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true })
        ]).start(() => setToastVisible(false));
    };

    // Helper: Color Logic
    const getStatusColor = (status: string) => {
        if (status === 'Working') return '#10B981'; // Green
        if (status === 'Not Working') return '#EF4444'; // Red
        if (status === 'Studying') return '#6366F1'; // Indigo
        return '#F59E0B'; // Orange (Open to work)
    };

    const renderCandidate = ({ item }: { item: typeof ALL_CANDIDATES[0] }) => (
        <View style={styles.card}>
            {/* Header */}
            <View style={styles.cardHeader}>
                <View style={[styles.avatarBox, { backgroundColor: getStatusColor(item.status) }]}>
                    <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
                </View>
                <View style={styles.headerInfo}>
                    <Text style={styles.name}>{item.name}</Text>
                    <View style={styles.row}>
                        <Icon name="phone-outline" size={14} color="#666" />
                        <Text style={styles.phone}>+91 {item.mobile}</Text>
                    </View>
                </View>
                <View style={[styles.badge, { backgroundColor: `${getStatusColor(item.status)}15` }]}>
                    <Text style={[styles.badgeText, { color: getStatusColor(item.status) }]}>{item.status}</Text>
                </View>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Info Grid */}
            <View style={styles.grid}>
                <View style={styles.gridItem}>
                    <Text style={styles.label}>Qualification</Text>
                    <Text style={styles.value}>{item.qualification}</Text>
                </View>
                <View style={styles.gridItem}>
                    <Text style={styles.label}>Looking For</Text>
                    <Text style={styles.value}>{item.lookingFor}</Text>
                </View>
                <View style={[styles.gridItem, { marginTop: 10 }]}>
                    <Text style={styles.label}>Exp. Salary</Text>
                    <Text style={styles.value}>₹{item.salary}</Text>
                </View>
                <View style={[styles.gridItem, { marginTop: 10 }]}>
                    <Text style={styles.label}>Key Skill</Text>
                    <Text style={styles.value}>{item.skill}</Text>
                </View>
            </View>

            {/* Buttons */}
            <View style={styles.btnRow}>
                <TouchableOpacity style={styles.outlineBtn} onPress={() => handleViewProfile(item)}>
                    <Text style={styles.outlineText}>View Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.fillBtn} onPress={() => handleApplyJob(item.name)}>
                    <Text style={styles.fillText}>Refer Job</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

            {/* --- CUSTOM TOAST --- */}
            {toastVisible && (
                <Animated.View style={[styles.toast, { opacity: fadeAnim }]}>
                    <Icon name="check-circle" size={20} color="white" />
                    <Text style={styles.toastText}>Referred Successfully!</Text>
                </Animated.View>
            )}

            {/* --- HEADER --- */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Icon name="arrow-left" size={24} color="#1E293B" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Candidates Pool</Text>
                <View style={{ width: 24 }} />
            </View>

            {/* --- SEARCH --- */}
            <View style={styles.searchBox}>
                <Icon name="magnify" size={22} color="#94A3B8" />
                <TextInput
                    style={styles.input}
                    placeholder="Search name or mobile..."
                    placeholderTextColor="#94A3B8"
                    value={searchText}
                    onChangeText={setSearchText}
                />
                {searchText.length > 0 && (
                    <TouchableOpacity onPress={() => setSearchText("")}>
                        <Icon name="close-circle" size={18} color="#94A3B8" />
                    </TouchableOpacity>
                )}
            </View>

            {/* --- FILTER CHIPS --- */}
            <View>
                <FlatList
                    horizontal
                    data={FILTERS}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.filterList}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[styles.chip, activeFilter === item && styles.activeChip]}
                            onPress={() => setActiveFilter(item)}
                        >
                            <Text style={[styles.chipText, activeFilter === item && styles.activeChipText]}>{item}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>

            {/* --- MAIN LIST --- */}
            <FlatList
                data={filteredCandidates}
                renderItem={renderCandidate}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyBox}>
                        <Icon name="account-search-outline" size={48} color="#CBD5E1" />
                        <Text style={styles.emptyTitle}>No Candidates Found</Text>
                        <Text style={styles.emptySub}>Try searching for something else</Text>
                    </View>
                }
            />

            {/* --- PROFILE MODAL --- */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={profileVisible}
                onRequestClose={() => setProfileVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHandle} />

                        {selectedCandidate && (
                            <>
                                <View style={styles.modalHeader}>
                                    <View style={[styles.lgAvatar, { backgroundColor: getStatusColor(selectedCandidate.status) }]}>
                                        <Text style={styles.lgAvatarText}>{selectedCandidate.name.charAt(0)}</Text>
                                    </View>
                                    <View style={{ marginLeft: 15, flex: 1 }}>
                                        <Text style={styles.modalName}>{selectedCandidate.name}</Text>
                                        <Text style={styles.modalPhone}>+91 {selectedCandidate.mobile}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => setProfileVisible(false)} style={styles.closeIcon}>
                                        <Icon name="close" size={20} color="#64748B" />
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.divider} />

                                <Text style={styles.sectionTitle}>Professional Details</Text>
                                <View style={styles.infoRow}>
                                    <Icon name="school-outline" size={20} color="#64748B" />
                                    <Text style={styles.infoText}>{selectedCandidate.qualification}</Text>
                                </View>
                                <View style={styles.infoRow}>
                                    <Icon name="briefcase-outline" size={20} color="#64748B" />
                                    <Text style={styles.infoText}>{selectedCandidate.status}</Text>
                                </View>
                                <View style={styles.infoRow}>
                                    <Icon name="currency-inr" size={20} color="#64748B" />
                                    <Text style={styles.infoText}>Exp. Salary: ₹{selectedCandidate.salary}</Text>
                                </View>
                                <View style={styles.infoRow}>
                                    <Icon name="tools" size={20} color="#64748B" />
                                    <Text style={styles.infoText}>Skills: {selectedCandidate.skill}</Text>
                                </View>

                                <TouchableOpacity
                                    style={styles.fullBtn}
                                    onPress={() => {
                                        setProfileVisible(false);
                                        handleApplyJob(selectedCandidate.name);
                                    }}
                                >
                                    <Text style={styles.fullBtnText}>Refer for Job</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#F8FAFC" },

    // Header
    header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 20 },
    backBtn: { padding: 4 },
    headerTitle: { fontSize: 20, fontWeight: "800", color: "#1E293B" },

    // Search
    searchBox: { flexDirection: "row", alignItems: "center", backgroundColor: "white", marginHorizontal: 20, paddingHorizontal: 15, borderRadius: 12, borderWidth: 1, borderColor: "#E2E8F0", height: 50 },
    input: { flex: 1, marginLeft: 10, fontSize: 16, color: "#1E293B" },

    // Filters
    filterList: { paddingHorizontal: 20, paddingVertical: 15 },
    chip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: "white", borderWidth: 1, borderColor: "#E2E8F0", marginRight: 10 },
    activeChip: { backgroundColor: "#1c005e", borderColor: "#1c005e" },
    chipText: { fontSize: 13, fontWeight: "600", color: "#64748B" },
    activeChipText: { color: "white" },

    // List
    listContent: { paddingHorizontal: 20, paddingBottom: 30 },
    card: { backgroundColor: "white", borderRadius: 16, padding: 16, marginBottom: 16, shadowColor: "#64748B", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 },
    cardHeader: { flexDirection: "row", alignItems: "center" },
    avatarBox: { width: 44, height: 44, borderRadius: 12, justifyContent: "center", alignItems: "center" },
    avatarText: { color: "white", fontSize: 18, fontWeight: "bold" },
    headerInfo: { flex: 1, marginLeft: 12 },
    name: { fontSize: 16, fontWeight: "700", color: "#1E293B" },
    row: { flexDirection: "row", alignItems: "center", marginTop: 2 },
    phone: { fontSize: 12, color: "#64748B", marginLeft: 4 },
    badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
    badgeText: { fontSize: 11, fontWeight: "700" },

    divider: { height: 1, backgroundColor: "#F1F5F9", marginVertical: 12 },

    // Grid
    grid: { flexDirection: "row", flexWrap: "wrap" },
    gridItem: { width: "50%" },
    label: { fontSize: 11, color: "#94A3B8", fontWeight: "600", textTransform: "uppercase" },
    value: { fontSize: 14, color: "#333", fontWeight: "600", marginTop: 2 },

    // Buttons
    btnRow: { flexDirection: "row", gap: 10, marginTop: 15 },
    outlineBtn: { flex: 1, borderWidth: 1, borderColor: "#1c005e", borderRadius: 10, paddingVertical: 10, alignItems: "center" },
    outlineText: { color: "#1c005e", fontWeight: "700", fontSize: 13 },
    fillBtn: { flex: 1, backgroundColor: "#1c005e", borderRadius: 10, paddingVertical: 10, alignItems: "center" },
    fillText: { color: "white", fontWeight: "700", fontSize: 13 },

    // Toast
    toast: { position: "absolute", top: 10, alignSelf: "center", backgroundColor: "#10B981", paddingHorizontal: 20, paddingVertical: 12, borderRadius: 25, flexDirection: "row", alignItems: "center", zIndex: 100, elevation: 5 },
    toastText: { color: "white", fontWeight: "700", marginLeft: 8 },

    // Empty
    emptyBox: { alignItems: "center", marginTop: 50 },
    emptyTitle: { fontSize: 18, fontWeight: "700", color: "#1E293B", marginTop: 15 },
    emptySub: { fontSize: 14, color: "#94A3B8" },

    // Modal
    modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" },
    modalContent: { backgroundColor: "white", borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 40 },
    modalHandle: { width: 40, height: 4, backgroundColor: "#E2E8F0", borderRadius: 2, alignSelf: "center", marginBottom: 20 },
    modalHeader: { flexDirection: "row", alignItems: "center" },
    lgAvatar: { width: 56, height: 56, borderRadius: 28, justifyContent: "center", alignItems: "center" },
    lgAvatarText: { fontSize: 24, fontWeight: "bold", color: "white" },
    modalName: { fontSize: 20, fontWeight: "800", color: "#1E293B" },
    modalPhone: { fontSize: 14, color: "#64748B", marginTop: 2 },
    closeIcon: { padding: 8, backgroundColor: "#F1F5F9", borderRadius: 20 },
    sectionTitle: { fontSize: 16, fontWeight: "700", color: "#1E293B", marginBottom: 15, marginTop: 10 },
    infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
    infoText: { fontSize: 15, color: "#475569", marginLeft: 12 },
    fullBtn: { backgroundColor: "#1c005e", paddingVertical: 15, borderRadius: 12, alignItems: "center", marginTop: 20 },
    fullBtnText: { color: "white", fontSize: 16, fontWeight: "700" },
});