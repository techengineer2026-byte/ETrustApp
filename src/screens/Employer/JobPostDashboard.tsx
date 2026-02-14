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
    RefreshControl,
    Animated
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
    darkBg: '#0F172A',       // Deep Midnight Blue (Header)
    primary: '#3B82F6',      // Bright Blue
    accent: '#8B5CF6',       // Purple
    background: '#F1F5F9',   // Light Gray Background
    card: '#FFFFFF',
    textDark: '#1E293B',
    textLight: '#94A3B8',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    border: '#E2E8F0'
};

// --- MOCK DATA ---
export const GLOBAL_JOBS_DATA = [
    {
        id: '1',
        title: 'Senior React Native Dev',
        company: 'TechCorp Solutions',
        location: 'Bengaluru, KA',
        type: 'Full Time',
        salary: '₹12L - 18L',
        postedDate: '2d ago',
        applicants: 42,
        newApplicants: 5,
        status: 'ACTIVE',
        isPremium: true,
    },
    {
        id: '2',
        title: 'UI/UX Designer',
        company: 'Creative Studio',
        location: 'Remote',
        type: 'Contract',
        salary: '₹1.5k /hr',
        postedDate: '5d ago',
        applicants: 12,
        newApplicants: 0,
        status: 'ACTIVE',
        isPremium: false,
    },
    {
        id: '3',
        title: 'Marketing Intern',
        company: 'Growth Hackers',
        location: 'Mumbai',
        type: 'Internship',
        salary: '₹15k /mo',
        postedDate: '2w ago',
        applicants: 89,
        newApplicants: 0,
        status: 'CLOSED',
        isPremium: false,
    }
];

export default function JobPostDashboard() {
    const navigation = useNavigation<any>();
    const insets = useSafeAreaInsets();
    const isFocused = useIsFocused();
    const scrollY = new Animated.Value(0);

    // --- STATE ---
    const [jobs, setJobs] = useState(GLOBAL_JOBS_DATA);
    const [selectedTab, setSelectedTab] = useState<'ACTIVE' | 'CLOSED'>('ACTIVE');
    const [refreshing, setRefreshing] = useState(false);

    // --- LOGIC ---
    useEffect(() => {
        if (isFocused) fetchJobs();
    }, [isFocused]);

    const fetchJobs = () => {
        // Simulate API
        setJobs([...GLOBAL_JOBS_DATA]);
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            fetchJobs();
            setRefreshing(false);
        }, 1200);
    }, []);

    const filteredJobs = jobs.filter(job =>
        selectedTab === 'ACTIVE' ? job.status === 'ACTIVE' : job.status === 'CLOSED'
    );

    const handleTabChange = (tab: 'ACTIVE' | 'CLOSED') => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setSelectedTab(tab);
    };

    // --- SUB-COMPONENTS ---

    const StatCard = ({ label, value, icon, color, delay }: any) => (
        <View style={[styles.statCard, { borderBottomColor: color }]}>
            <View style={[styles.iconCircle, { backgroundColor: color + '15' }]}>
                <MaterialCommunityIcons name={icon} size={22} color={color} />
            </View>
            <View>
                <Text style={styles.statValue}>{value}</Text>
                <Text style={styles.statLabel}>{label}</Text>
            </View>
        </View>
    );

    const renderJobItem = ({ item }: { item: typeof GLOBAL_JOBS_DATA[0] }) => (
        <TouchableOpacity
            style={styles.jobCard}
            activeOpacity={0.95}
            onPress={() => navigation.navigate('CandidateListScreen', { jobId: item.id, jobTitle: item.title })}
        >
            {/* Top Row: Badge & Menu */}
            <View style={styles.cardTop}>
                {item.isPremium ? (
                    <View style={styles.premiumBadge}>
                        <MaterialCommunityIcons name="crown" size={14} color="#FFF" />
                        <Text style={styles.premiumText}>FEATURED</Text>
                    </View>
                ) : (
                    <View style={styles.basicBadge}>
                        <Text style={styles.basicBadgeText}>STANDARD</Text>
                    </View>
                )}
                <Text style={styles.dateText}>{item.postedDate}</Text>
            </View>

            {/* Main Content */}
            <View style={styles.cardContent}>
                <Text style={styles.jobTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.companyText}>{item.location} • {item.type}</Text>

                <View style={styles.salaryTag}>
                    <Text style={styles.salaryText}>{item.salary}</Text>
                </View>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Bottom Actions */}
            <View style={styles.cardBottom}>
                <View style={styles.applicantGroup}>
                    <View style={styles.avatarPile}>
                        {[1, 2, 3].map((_, i) => (
                            <View key={i} style={[styles.miniAvatar, { marginLeft: i === 0 ? 0 : -10, zIndex: 3 - i }]} />
                        ))}
                    </View>
                    <Text style={styles.applicantCount}>
                        <Text style={{ fontWeight: '800', color: COLORS.textDark }}>{item.applicants}</Text> Applicants
                    </Text>
                    {item.newApplicants > 0 && (
                        <View style={styles.newDot} />
                    )}
                </View>

                <TouchableOpacity style={styles.viewBtn} onPress={() => navigation.navigate('CandidateListScreen', { jobId: item.id, jobTitle: item.title })}>
                    <Text style={styles.viewBtnText}>Manage</Text>
                    <Feather name="chevron-right" size={16} color="#FFF" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.darkBg} />

            {/* --- HERO HEADER --- */}
            <View style={[styles.headerBg, { paddingTop: insets.top + 20 }]}>
                <View style={styles.headerRow}>
                    <View>
                        <Text style={styles.greeting}>Welcome back,</Text>
                        <Text style={styles.username}>TechCorp Inc.</Text>
                    </View>
                    <TouchableOpacity style={styles.profileBtn}>
                        <Image source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} style={styles.profileImg} />
                        <View style={styles.onlineDot} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* --- FLOATING STATS --- */}
            <View style={styles.statsFloater}>
                <StatCard label="Active" value={jobs.filter(j => j.status === 'ACTIVE').length} icon="lightning-bolt" color={COLORS.warning} />
                <StatCard label="Candidates" value="143" icon="account-group" color={COLORS.primary} />
                <StatCard label="Views" value="3.2k" icon="chart-line" color={COLORS.success} />
            </View>

            {/* --- MAIN CONTENT --- */}
            <View style={styles.body}>
                {/* Tabs */}
                <View style={styles.tabWrapper}>
                    <View style={styles.tabContainer}>
                        <TouchableOpacity style={[styles.tab, selectedTab === 'ACTIVE' && styles.activeTab]} onPress={() => handleTabChange('ACTIVE')}>
                            <Text style={[styles.tabText, selectedTab === 'ACTIVE' && styles.activeTabText]}>Active Jobs</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.tab, selectedTab === 'CLOSED' && styles.activeTab]} onPress={() => handleTabChange('CLOSED')}>
                            <Text style={[styles.tabText, selectedTab === 'CLOSED' && styles.activeTabText]}>Closed</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* List */}
                <FlatList
                    data={filteredJobs}
                    keyExtractor={(item) => item.id}
                    renderItem={renderJobItem}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.darkBg} />}
                    ListEmptyComponent={
                        <View style={styles.emptyState}>
                            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/7486/7486747.png' }} style={{ width: 80, height: 80, opacity: 0.5 }} />
                            <Text style={styles.emptyText}>No Jobs Found</Text>
                            <Text style={styles.emptySub}>Time to hire some talent!</Text>
                        </View>
                    }
                />
            </View>

            {/* --- GLOWING FAB --- */}
            <TouchableOpacity
                style={styles.fab}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('PostJobScreen')}
            >
                <View style={styles.fabGradient}>
                    <Feather name="plus" size={28} color="#FFF" />
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },

    // Header
    headerBg: { backgroundColor: COLORS.darkBg, paddingHorizontal: 24, paddingBottom: 80, borderBottomLeftRadius: 32, borderBottomRightRadius: 32 },
    headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    greeting: { color: COLORS.textLight, fontSize: 14, fontWeight: '600' },
    username: { color: '#FFF', fontSize: 24, fontWeight: '800', marginTop: 4 },
    profileBtn: { position: 'relative' },
    profileImg: { width: 48, height: 48, borderRadius: 24, borderWidth: 2, borderColor: 'rgba(255,255,255,0.2)' },
    onlineDot: { width: 12, height: 12, backgroundColor: COLORS.success, borderRadius: 6, position: 'absolute', bottom: 2, right: 2, borderWidth: 2, borderColor: COLORS.darkBg },

    // Stats
    statsFloater: { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginTop: -50, zIndex: 10 },
    statCard: { flex: 1, backgroundColor: COLORS.card, marginHorizontal: 6, borderRadius: 20, padding: 16, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, shadowOffset: { width: 0, height: 5 }, elevation: 5, borderBottomWidth: 4 },
    iconCircle: { padding: 10, borderRadius: 14, marginBottom: 8 },
    statValue: { fontSize: 18, fontWeight: '800', color: COLORS.textDark },
    statLabel: { fontSize: 11, fontWeight: '600', color: COLORS.textLight, marginTop: 2 },

    // Body
    body: { flex: 1, marginTop: 20 },
    tabWrapper: { paddingHorizontal: 24, marginBottom: 16 },
    tabContainer: { flexDirection: 'row', backgroundColor: '#E2E8F0', borderRadius: 16, padding: 4 },
    tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 14 },
    activeTab: { backgroundColor: '#FFF', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 },
    tabText: { fontSize: 14, fontWeight: '600', color: COLORS.textLight },
    activeTabText: { color: COLORS.darkBg, fontWeight: '700' },

    // List
    listContent: { paddingHorizontal: 24, paddingBottom: 100 },

    // Job Card
    jobCard: { backgroundColor: '#FFF', borderRadius: 24, marginBottom: 20, padding: 20, shadowColor: '#94A3B8', shadowOpacity: 0.15, shadowRadius: 12, shadowOffset: { width: 0, height: 8 }, elevation: 8 },
    cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    premiumBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.darkBg, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, gap: 4 },
    premiumText: { color: '#FFF', fontSize: 10, fontWeight: '800', letterSpacing: 0.5 },
    basicBadge: { backgroundColor: '#F1F5F9', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
    basicBadgeText: { color: COLORS.textLight, fontSize: 10, fontWeight: '700' },
    dateText: { fontSize: 12, color: COLORS.textLight, fontWeight: '600' },

    cardContent: { marginBottom: 16 },
    jobTitle: { fontSize: 18, fontWeight: '800', color: COLORS.textDark, marginBottom: 4 },
    companyText: { fontSize: 13, color: COLORS.textLight, fontWeight: '500' },
    salaryTag: { alignSelf: 'flex-start', marginTop: 10, backgroundColor: '#EFF6FF', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
    salaryText: { color: COLORS.primary, fontWeight: '700', fontSize: 13 },

    divider: { height: 1, backgroundColor: '#F1F5F9', marginBottom: 16 },

    cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    applicantGroup: { flexDirection: 'row', alignItems: 'center' },
    avatarPile: { flexDirection: 'row', marginRight: 8 },
    miniAvatar: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#CBD5E1', borderWidth: 2, borderColor: '#FFF' },
    applicantCount: { fontSize: 13, color: COLORS.textLight },
    newDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.danger, marginLeft: 6, marginBottom: 8 },

    viewBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primary, paddingVertical: 10, paddingHorizontal: 16, borderRadius: 14, gap: 4 },
    viewBtnText: { color: '#FFF', fontSize: 13, fontWeight: '700' },

    // Empty State
    emptyState: { alignItems: 'center', marginTop: 40, opacity: 0.8 },
    emptyText: { fontSize: 18, fontWeight: '700', color: COLORS.textDark, marginTop: 16 },
    emptySub: { fontSize: 14, color: COLORS.textLight, marginTop: 4 },

    // FAB
    fab: { position: 'absolute', bottom: 30, right: 24, shadowColor: COLORS.primary, shadowOpacity: 0.4, shadowRadius: 15, shadowOffset: { width: 0, height: 8 }, elevation: 10 },
    fabGradient: { width: 64, height: 64, borderRadius: 32, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
});