import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Image,
    StatusBar,
    TextInput
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// CLI Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

// --- Configuration & Colors ---
const PRIMARY_COLOR = '#2563EB'; // Brand Blue
const SUCCESS_COLOR = '#10B981'; // Green
const DANGER_COLOR = '#EF4444';  // Red
const WARNING_COLOR = '#F59E0B'; // Amber
const TEXT_COLOR = '#1F2937';
const GRAY_TEXT = '#6B7280';
const BG_COLOR = '#F3F4F6';
type ApplicantStatus = 'Shortlisted' | 'Rejected' | 'Pending';

interface Applicant {
    id: string;
    name: string;
    role: string;
    experience: string;
    appliedTime: string;
    avatar: string;
    status: ApplicantStatus;
    skills: string[];
}

// --- Mock Data: Applicants ---
const ALL_APPLICANTS: Applicant[] = [
    {
        id: '1',
        name: 'Rahul Sharma',
        role: 'Senior React Developer',
        experience: '5 Years',
        skills: ['React Native', 'Redux', 'Node.js'],
        appliedTime: '2 hrs ago',
        status: 'Pending',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
        id: '2',
        name: 'Priya Verma',
        role: 'UI/UX Designer',
        experience: '3 Years',
        skills: ['Figma', 'Adobe XD', 'Prototyping'],
        appliedTime: '1 day ago',
        status: 'Shortlisted',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
        id: '3',
        name: 'Amit Kumar',
        role: 'Backend Engineer',
        experience: '4 Years',
        skills: ['Java', 'Spring Boot', 'AWS'],
        appliedTime: '3 days ago',
        status: 'Rejected',
        avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
    },
    {
        id: '4',
        name: 'Sneha Gupta',
        role: 'Frontend Developer',
        experience: '2 Years',
        skills: ['React', 'CSS', 'JavaScript'],
        appliedTime: '5 days ago',
        status: 'Pending',
        avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    },
];

const TABS = ['All', 'Shortlisted', 'Rejected'] as const;

export default function ApplicationsScreen() {
    const [selectedTab, setSelectedTab] = useState<'All' | ApplicantStatus>('All');
    const [applicants, setApplicants] = useState<Applicant[]>(ALL_APPLICANTS);
    const [searchQuery, setSearchQuery] = useState<string>('');
    type Tab = 'All' | 'Shortlisted' | 'Rejected';

    // -tfhybgtfhbggtfhyblo9plglloi,d,yuhjkmgtfhntku7tgfjutuktjuz-- <<           Logic: Filter Data ---
    const getFilteredData = () => {
        let data = applicants;

        // 1. Filter by Tab
        if (selectedTab !== 'All') {
            data = data.filter((item) => item.status === selectedTab);
        }

        // 2. Filter by Search
        if (searchQuery) {
            data = data.filter((item) =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.role.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return data;
    };

    // --- Logic: Update Status ---
    const handleStatusChange = (id: string, newStatus: ApplicantStatus) => {
        const updatedList = applicants.map((item) =>
            item.id === id ? { ...item, status: newStatus } : item
        );
        setApplicants(updatedList);
    };

    // --- Render Item: Applicant Card ---
    const renderApplicant = ({ item }: { item: Applicant }) => {
        // Determine status color
        const statusColor =
            item.status === 'Shortlisted' ? SUCCESS_COLOR :
                item.status === 'Rejected' ? DANGER_COLOR : WARNING_COLOR;

        const statusIcon =
            item.status === 'Shortlisted' ? 'check-circle' :
                item.status === 'Rejected' ? 'x-circle' : 'clock';

        return (
            <View style={styles.card}>
                {/* Top Row: Avatar + Info + Date */}
                <View style={styles.cardHeader}>
                    <Image source={{ uri: item.avatar }} style={styles.avatar} />
                    <View style={styles.infoContainer}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.role}>{item.role}</Text>
                        <Text style={styles.metaInfo}>
                            <Feather name="briefcase" size={12} /> {item.experience}  •  {item.appliedTime}
                        </Text>
                    </View>

                    {/* Status Badge */}
                    <View style={[styles.statusBadge, { backgroundColor: statusColor + '20' }]}>
                        <Feather name={statusIcon} size={12} color={statusColor} />
                        <Text style={[styles.statusText, { color: statusColor }]}>{item.status}</Text>
                    </View>
                </View>

                {/* Skills Row */}
                <View style={styles.skillsContainer}>
                    {item.skills.map((skill, index) => (
                        <View key={index} style={styles.skillPill}>
                            <Text style={styles.skillText}>{skill}</Text>
                        </View>
                    ))}
                </View>

                {/* Divider */}
                <View style={styles.divider} />

                {/* Action Buttons */}
                <View style={styles.actionRow}>
                    {/* Communication Actions */}
                    <View style={styles.commActions}>
                        <TouchableOpacity style={styles.iconBtn}>
                            <Ionicons name="call-outline" size={20} color={GRAY_TEXT} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconBtn}>
                            <Ionicons name="mail-outline" size={20} color={GRAY_TEXT} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconBtn}>
                            <MaterialCommunityIcons name="whatsapp" size={20} color="#25D366" />
                        </TouchableOpacity>
                    </View>

                    {/* Decision Actions */}
                    <View style={styles.decisionActions}>
                        {item.status !== 'Rejected' && (
                            <TouchableOpacity
                                style={[styles.decisionBtn, styles.rejectBtn]}
                                onPress={() => handleStatusChange(item.id, 'Rejected')}
                            >
                                <Feather name="x" size={18} color={DANGER_COLOR} />
                            </TouchableOpacity>
                        )}

                        {item.status !== 'Shortlisted' && (
                            <TouchableOpacity
                                style={[styles.decisionBtn, styles.acceptBtn]}
                                onPress={() => handleStatusChange(item.id, 'Shortlisted')}
                            >
                                <Feather name="check" size={18} color="white" />
                                <Text style={styles.acceptText}>Shortlist</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />

            {/* 🔝 HEADER */}
            <View style={styles.header}>
                <TouchableOpacity>
                    <Ionicons name="arrow-back" size={24} color={TEXT_COLOR} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Applications (12)</Text>
                <TouchableOpacity>
                    <Ionicons name="filter-outline" size={24} color={TEXT_COLOR} />
                </TouchableOpacity>
            </View>

            {/* 🔍 SEARCH BAR */}
            <View style={styles.searchContainer}>
                <Feather name="search" size={20} color={GRAY_TEXT} style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by name or role..."
                    placeholderTextColor={GRAY_TEXT}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            {/* 📑 TABS */}
            <View style={styles.tabsContainer}>
                {TABS.map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.tab, selectedTab === tab && styles.activeTab]}
                        onPress={() => setSelectedTab(tab)}
                    >
                        <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* 📋 LIST */}
            <FlatList
                data={getFilteredData()}
                keyExtractor={(item) => item.id}
                renderItem={renderApplicant}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <MaterialCommunityIcons name="clipboard-text-off-outline" size={60} color="#D1D5DB" />
                        <Text style={styles.emptyText}>No applicants found</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR,
    },

    // Header
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'white',
        elevation: 2,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: TEXT_COLOR,
    },

    // Search
    searchContainer: {
        margin: 16,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        height: 44,
        color: TEXT_COLOR,
    },

    // Tabs
    tabsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        marginBottom: 10,
    },
    tab: {
        marginRight: 10,
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    activeTab: {
        backgroundColor: PRIMARY_COLOR,
        borderColor: PRIMARY_COLOR,
    },
    tabText: {
        color: GRAY_TEXT,
        fontWeight: '500',
    },
    activeTabText: {
        color: 'white',
        fontWeight: '600',
    },

    // List
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },

    // Card
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        elevation: 2, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#E0E7FF',
    },
    infoContainer: {
        flex: 1,
        marginLeft: 12,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: TEXT_COLOR,
    },
    role: {
        fontSize: 14,
        color: GRAY_TEXT,
        marginBottom: 4,
    },
    metaInfo: {
        fontSize: 12,
        color: '#9CA3AF',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 10,
        fontWeight: '700',
        marginLeft: 4,
    },

    // Skills
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 12,
        gap: 8,
    },
    skillPill: {
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    skillText: {
        fontSize: 12,
        color: '#4B5563',
    },

    // Divider
    divider: {
        height: 1,
        backgroundColor: '#F3F4F6',
        marginVertical: 12,
    },

    // Actions
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    commActions: {
        flexDirection: 'row',
        gap: 12,
    },
    iconBtn: {
        padding: 6,
        backgroundColor: '#F9FAFB',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    decisionActions: {
        flexDirection: 'row',
        gap: 10,
    },
    decisionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    rejectBtn: {
        backgroundColor: '#FEE2E2', // Light Red
    },
    acceptBtn: {
        backgroundColor: PRIMARY_COLOR,
    },
    acceptText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 14,
        marginLeft: 6,
    },

    // Empty State
    emptyContainer: {
        alignItems: 'center',
        marginTop: 50,
    },
    emptyText: {
        marginTop: 10,
        color: GRAY_TEXT,
        fontSize: 16,
    },
});