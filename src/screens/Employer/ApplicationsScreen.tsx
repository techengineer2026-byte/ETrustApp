import React, { useState, useMemo, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Image,
    StatusBar,
    TextInput,
    LayoutAnimation,
    Platform,
    UIManager,
    Alert,
    Dimensions
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

// Enable Animation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width } = Dimensions.get('window');

// --- THEME CONFIG (Matches Dashboard) ---
const COLORS = {
    darkBg: '#0F172A',       // Deep Midnight Blue
    primary: '#3B82F6',      // Bright Blue
    background: '#F1F5F9',   // Light Gray
    card: '#FFFFFF',
    textDark: '#1E293B',
    textLight: '#94A3B8',
    success: '#10B981',
    danger: '#EF4444',
    warning: '#F59E0B',
    border: '#E2E8F0'
};

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
    matchScore: number;
}

// --- MOCK DATA ---
const ALL_APPLICANTS: Applicant[] = [
    {
        id: '1',
        name: 'Rahul Sharma',
        role: 'Senior React Developer',
        experience: '5 Yrs',
        skills: ['React Native', 'Redux', 'Node.js'],
        appliedTime: '2h ago',
        status: 'Pending',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        matchScore: 92,
    },
    {
        id: '2',
        name: 'Priya Verma',
        role: 'UI/UX Designer',
        experience: '3 Yrs',
        skills: ['Figma', 'Prototyping'],
        appliedTime: '1d ago',
        status: 'Shortlisted',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        matchScore: 85,
    },
    {
        id: '3',
        name: 'Amit Kumar',
        role: 'Backend Engineer',
        experience: '4 Yrs',
        skills: ['Java', 'Spring Boot', 'AWS'],
        appliedTime: '3d ago',
        status: 'Rejected',
        avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
        matchScore: 45,
    },
    {
        id: '4',
        name: 'Sneha Gupta',
        role: 'Frontend Developer',
        experience: '2 Yrs',
        skills: ['React', 'CSS', 'JS'],
        appliedTime: '5d ago',
        status: 'Pending',
        avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
        matchScore: 78,
    },
];

const TABS = ['All', 'Shortlisted', 'Rejected', 'Pending'];

export default function ApplicationsScreen({ navigation }: any) {
    const insets = useSafeAreaInsets();
    const [selectedTab, setSelectedTab] = useState<string>('All');
    const [applicants, setApplicants] = useState<Applicant[]>(ALL_APPLICANTS);
    const [searchQuery, setSearchQuery] = useState<string>('');

    // --- LOGIC ---
    const filteredData = useMemo(() => {
        let data = applicants;
        if (selectedTab !== 'All') {
            data = data.filter((item) => item.status === selectedTab);
        }
        if (searchQuery) {
            data = data.filter((item) =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.role.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        return data.sort((a, b) => b.matchScore - a.matchScore);
    }, [applicants, selectedTab, searchQuery]);

    const handleStatusChange = (id: string, newStatus: ApplicantStatus) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setApplicants(prev => prev.map((item) => item.id === id ? { ...item, status: newStatus } : item));
        if (newStatus === 'Shortlisted') Alert.alert("Success", "Candidate moved to shortlist.");
    };

    // --- RENDER ITEM ---
    const renderApplicant = useCallback(({ item }: { item: Applicant }) => {
        const isShortlisted = item.status === 'Shortlisted';
        const isRejected = item.status === 'Rejected';
        
        // Dynamic Colors
        const statusColor = isShortlisted ? COLORS.success : isRejected ? COLORS.danger : COLORS.warning;
        const matchColor = item.matchScore > 80 ? COLORS.success : item.matchScore > 60 ? COLORS.warning : COLORS.danger;

        return (
            <TouchableOpacity 
                style={[styles.card, isShortlisted && styles.cardShortlisted]}
                activeOpacity={0.9}
            >
                {/* 1. Top Section */}
                <View style={styles.cardTop}>
                    <Image source={{ uri: item.avatar }} style={styles.avatar} />
                    <View style={styles.infoContainer}>
                        <View style={styles.nameRow}>
                            <Text style={styles.name}>{item.name}</Text>
                            <View style={[styles.matchBadge, { backgroundColor: matchColor + '15' }]}>
                                <Text style={[styles.matchText, { color: matchColor }]}>{item.matchScore}% Match</Text>
                            </View>
                        </View>
                        <Text style={styles.role}>{item.role}</Text>
                        
                        <View style={styles.metaRow}>
                            <Feather name="briefcase" size={12} color={COLORS.textLight} />
                            <Text style={styles.metaText}>{item.experience}</Text>
                            <Text style={styles.dot}>•</Text>
                            <Feather name="clock" size={12} color={COLORS.textLight} />
                            <Text style={styles.metaText}>{item.appliedTime}</Text>
                        </View>
                    </View>
                </View>

                {/* 2. Skills */}
                <View style={styles.skillsContainer}>
                    {item.skills.map((skill, index) => (
                        <View key={index} style={styles.skillPill}>
                            <Text style={styles.skillText}>{skill}</Text>
                        </View>
                    ))}
                </View>

                {/* Divider */}
                <View style={styles.divider} />

                {/* 3. Actions */}
                <View style={styles.actionRow}>
                    {/* Communication Buttons */}
                    <View style={styles.commGroup}>
                        <TouchableOpacity style={styles.iconBtn}><Feather name="phone" size={18} color={COLORS.textDark} /></TouchableOpacity>
                        <TouchableOpacity style={styles.iconBtn}><Feather name="mail" size={18} color={COLORS.textDark} /></TouchableOpacity>
                        <TouchableOpacity style={[styles.iconBtn, { borderColor: '#25D366' }]}><MaterialCommunityIcons name="whatsapp" size={20} color="#25D366" /></TouchableOpacity>
                    </View>

                    {/* Decision Buttons */}
                    <View style={styles.decisionGroup}>
                        {isRejected ? (
                            <View style={[styles.statusTag, { backgroundColor: COLORS.danger + '15' }]}>
                                <Text style={[styles.statusText, { color: COLORS.danger }]}>Rejected</Text>
                            </View>
                        ) : isShortlisted ? (
                            <View style={[styles.statusTag, { backgroundColor: COLORS.success + '15' }]}>
                                <Feather name="check" size={14} color={COLORS.success} />
                                <Text style={[styles.statusText, { color: COLORS.success, marginLeft: 4 }]}>Shortlisted</Text>
                            </View>
                        ) : (
                            <>
                                <TouchableOpacity 
                                    style={styles.rejectBtn} 
                                    onPress={() => handleStatusChange(item.id, 'Rejected')}
                                >
                                    <Feather name="x" size={20} color={COLORS.danger} />
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    style={styles.acceptBtn} 
                                    onPress={() => handleStatusChange(item.id, 'Shortlisted')}
                                >
                                    <Text style={styles.acceptText}>Shortlist</Text>
                                    <Feather name="check" size={16} color="#FFF" />
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
            </TouchableOpacity>
        );
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.darkBg} />

            {/* --- DARK HEADER --- */}
            <View style={[styles.headerBg, { paddingTop: insets.top + 10 }]}>
                <View style={styles.headerTop}>
                    <View>
                        <Text style={styles.headerTitle}>Talent Pool</Text>
                        <Text style={styles.headerSubtitle}>Manage your applicants</Text>
                    </View>
                    <View style={styles.countBadge}>
                        <Text style={styles.countText}>{applicants.length}</Text>
                    </View>
                </View>

                {/* Search Bar */}
                <View style={styles.searchBar}>
                    <Feather name="search" size={18} color={COLORS.textLight} />
                    <TextInput 
                        style={styles.searchInput}
                        placeholder="Search by name or role..."
                        placeholderTextColor={COLORS.textLight}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            {/* --- TABS --- */}
            <View style={styles.tabWrapper}>
                <FlatList 
                    horizontal
                    data={TABS}
                    keyExtractor={item => item}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.tabsContainer}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            style={[styles.tab, selectedTab === item && styles.activeTab]}
                            onPress={() => setSelectedTab(item)}
                        >
                            <Text style={[styles.tabText, selectedTab === item && styles.activeTabText]}>
                                {item}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            </View>

            {/* --- LIST --- */}
            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id}
                renderItem={renderApplicant}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Image 
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/7486/7486747.png' }} 
                            style={{ width: 80, height: 80, opacity: 0.5, tintColor: COLORS.textLight }} 
                        />
                        <Text style={styles.emptyText}>No candidates found</Text>
                        <Text style={styles.emptySubText}>Try adjusting your filters</Text>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    
    // Header
    headerBg: { backgroundColor: COLORS.darkBg, paddingHorizontal: 24, paddingBottom: 24, borderBottomLeftRadius: 32, borderBottomRightRadius: 32 },
    headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    headerTitle: { fontSize: 24, fontWeight: '800', color: '#FFF' },
    headerSubtitle: { fontSize: 13, color: COLORS.textLight, marginTop: 2 },
    countBadge: { backgroundColor: 'rgba(255,255,255,0.1)', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
    countText: { color: '#FFF', fontWeight: '800', fontSize: 16 },

    // Search
    searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E293B', borderRadius: 16, paddingHorizontal: 16, height: 50, borderWidth: 1, borderColor: '#334155' },
    searchInput: { flex: 1, height: '100%', marginLeft: 12, fontSize: 15, color: '#FFF' },

    // Tabs
    tabWrapper: { marginTop: 16, marginBottom: 8 },
    tabsContainer: { paddingHorizontal: 24 },
    tab: { marginRight: 10, paddingVertical: 8, paddingHorizontal: 20, borderRadius: 20, backgroundColor: '#FFF', borderWidth: 1, borderColor: COLORS.border },
    activeTab: { backgroundColor: COLORS.darkBg, borderColor: COLORS.darkBg },
    tabText: { color: COLORS.textLight, fontWeight: '600', fontSize: 13 },
    activeTabText: { color: '#FFF' },

    // List
    listContent: { paddingHorizontal: 20, paddingBottom: 100 },
    
    // Card
    card: { backgroundColor: '#FFF', borderRadius: 20, padding: 18, marginBottom: 16, shadowColor: '#94A3B8', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 },
    cardShortlisted: { borderWidth: 2, borderColor: COLORS.success },
    
    cardTop: { flexDirection: 'row' },
    avatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: '#F1F5F9' },
    infoContainer: { flex: 1, marginLeft: 14 },
    nameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    name: { fontSize: 16, fontWeight: '800', color: COLORS.textDark, maxWidth: '65%' },
    matchBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
    matchText: { fontSize: 11, fontWeight: '700' },
    role: { fontSize: 14, color: COLORS.textLight, fontWeight: '500', marginTop: 2 },
    metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
    metaText: { fontSize: 12, color: COLORS.textLight, marginLeft: 4, fontWeight: '500' },
    dot: { marginHorizontal: 6, color: COLORS.textLight },

    // Skills
    skillsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 16, gap: 8 },
    skillPill: { backgroundColor: '#F8FAFC', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, borderWidth: 1, borderColor: COLORS.border },
    skillText: { fontSize: 11, color: COLORS.textDark, fontWeight: '600' },

    divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 16 },

    // Actions
    actionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    commGroup: { flexDirection: 'row', gap: 10 },
    iconBtn: { width: 40, height: 40, borderRadius: 14, backgroundColor: '#F8FAFC', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },

    decisionGroup: { flexDirection: 'row', gap: 10, alignItems: 'center' },
    rejectBtn: { width: 40, height: 40, borderRadius: 14, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FEF2F2', borderWidth: 1, borderColor: '#FECACA' },
    acceptBtn: { flexDirection: 'row', height: 40, paddingHorizontal: 16, backgroundColor: COLORS.darkBg, borderRadius: 14, alignItems: 'center', gap: 6 },
    acceptText: { color: '#FFF', fontWeight: '700', fontSize: 13 },
    
    statusTag: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12 },
    statusText: { fontWeight: '700', fontSize: 12 },

    // Empty
    emptyContainer: { alignItems: 'center', marginTop: 80 },
    emptyText: { marginTop: 16, color: COLORS.textDark, fontSize: 18, fontWeight: '700' },
    emptySubText: { marginTop: 4, color: COLORS.textLight, fontSize: 14 },
}); 