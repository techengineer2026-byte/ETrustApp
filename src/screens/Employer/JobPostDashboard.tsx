import React, { useState, useEffect, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    StatusBar,
    Image,
    Platform,
    UIManager,
    LayoutAnimation,
    Alert,
    RefreshControl
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

// --- CONFIGURATION ---
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const COLORS = {
    primary: '#2563EB',      // Blue
    secondary: '#1E40AF',    // Dark Blue
    background: '#F8FAFC',   // Cool Gray Bg
    card: '#FFFFFF',
    text: '#0F172A',         // Slate 900
    gray: '#64748B',         // Slate 500
    border: '#E2E8F0',
    success: '#10B981',
    warning: '#F59E0B',      // Amber
    danger: '#EF4444',
    purple: '#8B5CF6',
    lightBlue: '#EFF6FF'
};

// --- MOCK DATA ---
export const GLOBAL_JOBS_DATA = [
    {
        id: '1',
        title: 'Senior React Native Dev',
        company: 'TechCorp Solutions',
        location: 'Bengaluru, KA',
        type: 'Full Time',
        salary: '₹ 12L - 18L PA',
        postedDate: '2 Days ago',
        applicants: 42,
        newApplicants: 5,
        status: 'ACTIVE',
        isPremium: true,
        views: 1205
    },
    {
        id: '2',
        title: 'Freelance UI Designer',
        company: 'TechCorp Solutions',
        location: 'Remote',
        type: 'Hourly',
        salary: '₹ 800 - 1500 /hr',
        postedDate: '5 Days ago',
        applicants: 12,
        newApplicants: 0,
        status: 'ACTIVE',
        isPremium: false,
        views: 450
    },
    {
        id: '3',
        title: 'Marketing Intern',
        company: 'TechCorp Solutions',
        location: 'Mumbai, MH',
        type: 'Internship',
        salary: '₹ 15k /mo',
        postedDate: '2 Weeks ago',
        applicants: 89,
        newApplicants: 0,
        status: 'CLOSED',
        isPremium: false,
        views: 2100
    }
];

export default function JobPostDashboard() {
    const navigation = useNavigation<any>();
    const insets = useSafeAreaInsets();
    const isFocused = useIsFocused();

    // --- STATE ---
    const [jobs, setJobs] = useState(GLOBAL_JOBS_DATA);
    const [selectedTab, setSelectedTab] = useState<'ACTIVE' | 'CLOSED'>('ACTIVE');
    const [refreshing, setRefreshing] = useState(false);

    // --- REFRESH LOGIC ---
    useEffect(() => {
        if (isFocused) {
            fetchJobs();
        }
    }, [isFocused]);

    const fetchJobs = () => {
        setJobs([...GLOBAL_JOBS_DATA]);
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            fetchJobs();
            setRefreshing(false);
        }, 1000);
    }, []);

    const filteredJobs = jobs.filter(job =>
        selectedTab === 'ACTIVE' ? job.status === 'ACTIVE' : job.status === 'CLOSED'
    );

    // --- HANDLERS ---
    const handleTabChange = (tab: 'ACTIVE' | 'CLOSED') => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setSelectedTab(tab);
    };

    const handleViewCandidates = (jobId: string, jobTitle: string) => {
        // Ensure 'CandidateListScreen' is registered in your Navigator!
        navigation.navigate('CandidateListScreen', { jobId, jobTitle });
    };

    const handleEditJob = (jobId: string) => {
        Alert.alert("Edit Job", "Navigate to edit screen for ID: " + jobId);
    };

    // --- COMPONENT: Stat Card ---
    const StatCard = ({ label, value, icon, color }: any) => (
        <View style={styles.statCard}>
            <View style={[styles.statIconBox, { backgroundColor: color + '20' }]}>
                <MaterialCommunityIcons name={icon} size={20} color={color} />
            </View>
            <View>
                <Text style={styles.statValue}>{value}</Text>
                <Text style={styles.statLabel}>{label}</Text>
            </View>
        </View>
    );

    // --- COMPONENT: Job Item ---
    const renderJobItem = ({ item }: { item: typeof GLOBAL_JOBS_DATA[0] }) => (
        <TouchableOpacity
            style={styles.jobCard}
            activeOpacity={0.9}
            onPress={() => handleViewCandidates(item.id, item.title)}
        >
            {/* Header */}
            <View style={styles.cardHeader}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.jobTitle} numberOfLines={1}>{item.title}</Text>
                    <Text style={styles.jobLocation}>{item.location} • {item.type}</Text>
                </View>
                {item.isPremium && (
                    <View style={styles.premiumBadge}>
                        <MaterialCommunityIcons name="star-circle" size={12} color="white" />
                        <Text style={styles.premiumText}>Premium</Text>
                    </View>
                )}
            </View>

            {/* Salary */}
            <View style={styles.salaryRow}>
                <Text style={styles.salaryText}>{item.salary}</Text>
                <Text style={styles.dateText}>Posted {item.postedDate}</Text>
            </View>

            <View style={styles.divider} />

            {/* Footer */}
            <View style={styles.cardFooter}>
                <View style={styles.metricContainer}>
                    <Text style={styles.metricValue}>{item.applicants}</Text>
                    <Text style={styles.metricLabel}>Applicants</Text>

                </View>

                <View style={styles.actionRow}>
                    <TouchableOpacity
                        style={styles.iconBtn}
                        onPress={() => handleEditJob(item.id)}
                    >
                        <Feather name="edit-2" size={18} color={COLORS.gray} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.viewBtn}
                        onPress={() => handleViewCandidates(item.id, item.title)}
                    >
                        <Text style={styles.viewBtnText} numberOfLines={1}>View Candidates</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

            {/* --- HEADER --- */}
            <SafeAreaView edges={['top']} style={styles.headerContainer}>
                <View style={styles.headerRow}>
                    <View>
                        <Text style={styles.welcomeText}>Hello, Recruiter 👋</Text>
                        <Text style={styles.headerTitle}>My Job Dashboard</Text>
                    </View>
                    <Image
                        source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
                        style={styles.profileImage}
                    />
                </View>

                {/* Stats Grid */}
                <View style={styles.statsContainer}>
                    <StatCard
                        label="Active Jobs"
                        value={jobs.filter(j => j.status === 'ACTIVE').length}
                        icon="briefcase-outline"
                        color={COLORS.primary}
                    />
                    <StatCard
                        label="Total Candidates"
                        value={jobs.reduce((acc, curr) => acc + curr.applicants, 0)}
                        icon="account-group-outline"
                        color={COLORS.purple}
                    />
                    <StatCard
                        label="Total Views"
                        value="3.2k"
                        icon="eye-outline"
                        color={COLORS.warning}
                    />
                </View>
            </SafeAreaView>

            {/* --- TABS --- */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, selectedTab === 'ACTIVE' && styles.activeTab]}
                    onPress={() => handleTabChange('ACTIVE')}
                >
                    <Text style={[styles.tabText, selectedTab === 'ACTIVE' && styles.activeTabText]}>Active Jobs</Text>
                    {selectedTab === 'ACTIVE' && <View style={styles.activeIndicator} />}
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tab, selectedTab === 'CLOSED' && styles.activeTab]}
                    onPress={() => handleTabChange('CLOSED')}
                >
                    <Text style={[styles.tabText, selectedTab === 'CLOSED' && styles.activeTabText]}>Closed / Expired</Text>
                    {selectedTab === 'CLOSED' && <View style={styles.activeIndicator} />}
                </TouchableOpacity>
            </View>

            {/* --- LIST --- */}
            <FlatList
                data={filteredJobs}
                keyExtractor={(item) => item.id}
                renderItem={renderJobItem}
                contentContainerStyle={[styles.listContent, { paddingBottom: 100 }]}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.primary]} />
                }
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <MaterialCommunityIcons name="briefcase-off-outline" size={48} color={COLORS.gray} />
                        <Text style={styles.emptyText}>No {selectedTab.toLowerCase()} jobs found.</Text>
                        <Text style={styles.emptySubText}>Post a new job to get started!</Text>
                    </View>
                }
            />

            {/* --- FAB --- */}
            <TouchableOpacity
                style={[styles.fab, { bottom: insets.bottom + 20 }]}
                onPress={() => navigation.navigate('PostJobScreen')}
                activeOpacity={0.8}
            >
                <Feather name="plus" size={24} color="white" />
                <Text style={styles.fabText}>Post Job</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },

    // Header
    headerContainer: { paddingHorizontal: 20, paddingBottom: 20, backgroundColor: COLORS.background },
    headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, marginTop: 10 },
    welcomeText: { fontSize: 14, color: COLORS.gray, fontWeight: '500' },
    headerTitle: { fontSize: 24, fontWeight: '800', color: COLORS.text },
    profileImage: { width: 45, height: 45, borderRadius: 22.5, borderWidth: 2, borderColor: COLORS.card },

    // Stats
    statsContainer: { flexDirection: 'row', justifyContent: 'space-between' },
    statCard: { backgroundColor: COLORS.card, width: '31%', padding: 12, borderRadius: 16, elevation: 3, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5 },
    statIconBox: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
    statValue: { fontSize: 20, fontWeight: '800', color: COLORS.text },
    statLabel: { fontSize: 11, color: COLORS.gray, fontWeight: '600', marginTop: 2 },

    // Tabs
    tabContainer: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 10, borderBottomWidth: 1, borderBottomColor: COLORS.border },
    tab: { marginRight: 25, paddingVertical: 12 },
    activeTab: {},
    tabText: { fontSize: 16, color: COLORS.gray, fontWeight: '600' },
    activeTabText: { color: COLORS.primary },
    activeIndicator: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, backgroundColor: COLORS.primary, borderRadius: 2 },

    // List
    listContent: { paddingHorizontal: 20, paddingTop: 10 },
    emptyState: { alignItems: 'center', marginTop: 60 },
    emptyText: { color: COLORS.text, fontSize: 18, fontWeight: '600', marginTop: 12 },
    emptySubText: { color: COLORS.gray, fontSize: 14, marginTop: 4 },

    // Job Card
    jobCard: { backgroundColor: COLORS.card, borderRadius: 16, padding: 16, marginBottom: 16, elevation: 2, shadowColor: '#94A3B8', shadowOpacity: 0.1, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, borderWidth: 1, borderColor: '#F1F5F9' },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
    jobTitle: { fontSize: 16, fontWeight: '700', color: COLORS.text, marginBottom: 4 },
    jobLocation: { fontSize: 13, color: COLORS.gray },

    // Premium Badge
    premiumBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.warning, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, gap: 4 },
    premiumText: { color: 'white', fontSize: 10, fontWeight: '700' },

    // Salary Row
    salaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    salaryText: {
        fontSize: 14,
        fontWeight: '700',
        backgroundColor: COLORS.lightBlue,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        color: COLORS.primary
    },
    dateText: { fontSize: 12, color: COLORS.gray },

    divider: { height: 1, backgroundColor: COLORS.border, marginBottom: 12 },

    // Card Footer
    cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    metricContainer: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    metricValue: { fontSize: 18, fontWeight: '700', color: COLORS.text },
    metricLabel: { fontSize: 12, color: COLORS.gray, marginRight: 5 },

    newBadge: { backgroundColor: '#DCFCE7', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
    newBadgeText: { color: '#166534', fontSize: 10, fontWeight: '700' },

    actionRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    iconBtn: { padding: 8, backgroundColor: '#F1F5F9', borderRadius: 8 },
    viewBtn: {
        backgroundColor: COLORS.primary,
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 8,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4
    },
    viewBtnText: { color: 'white', fontSize: 13, fontWeight: '700' },

    // FAB
    fab: { position: 'absolute', right: 20, backgroundColor: '#0F172A', paddingVertical: 14, paddingHorizontal: 20, borderRadius: 30, flexDirection: 'row', alignItems: 'center', gap: 8, elevation: 8, shadowColor: '#0F172A', shadowOpacity: 0.3, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } },
    fabText: { color: 'white', fontWeight: '700', fontSize: 16 },
});