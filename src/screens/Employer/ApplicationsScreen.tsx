// src/screens/Employer/ApplicationsScreen.tsx

import React, { useState, useMemo } from 'react';
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
    Dimensions // 1. IMPORT DIMENSIONS
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

// Enable Animation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

// 2. GET PHONE WIDTH & HEIGHT
const { width, height } = Dimensions.get('window');

// --- CONFIG ---
const PRIMARY_COLOR = '#2563EB'; 
const SUCCESS_COLOR = '#10B981'; 
const DANGER_COLOR = '#EF4444';  
const BG_COLOR = '#F8FAFC';

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
        avatar: 'https://i.pravatar.cc/150?img=11',
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
        avatar: 'https://i.pravatar.cc/150?img=5',
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
        avatar: 'https://i.pravatar.cc/150?img=3',
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
        avatar: 'https://i.pravatar.cc/150?img=9',
        matchScore: 78,
    },
];

const TABS = ['All', 'Shortlisted', 'Rejected', 'Pending'];

export default function ApplicationsScreen({ navigation }: any) {
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
        // Sort by Match Score (Highest first)
        return data.sort((a, b) => b.matchScore - a.matchScore);
    }, [applicants, selectedTab, searchQuery]);

    const handleStatusChange = (id: string, newStatus: ApplicantStatus) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        
        const updatedList = applicants.map((item) =>
            item.id === id ? { ...item, status: newStatus } : item
        );
        setApplicants(updatedList);
        
        if(newStatus === 'Shortlisted') {
            Alert.alert("Candidate Shortlisted", "Moved to the interview pipeline.");
        }
    };

    // --- RENDER ITEMS ---
    const renderApplicant = ({ item }: { item: Applicant }) => {
        const isShortlisted = item.status === 'Shortlisted';
        const isRejected = item.status === 'Rejected';
        
        let cardBorderColor = 'transparent';
        if (isShortlisted) cardBorderColor = SUCCESS_COLOR;

        const scoreColor = item.matchScore > 80 ? SUCCESS_COLOR : item.matchScore > 60 ? '#F59E0B' : DANGER_COLOR;

        return (
            <TouchableOpacity 
                style={[styles.card, { borderColor: cardBorderColor, borderWidth: isShortlisted ? 1.5 : 0 }]}
                activeOpacity={0.9}
            >
                {/* 1. Header Row */}
                <View style={styles.cardHeader}>
                    <Image source={{ uri: item.avatar }} style={styles.avatar} />
                    
                    <View style={styles.infoContainer}>
                        <View style={styles.nameRow}>
                            <Text style={styles.name}>{item.name}</Text>
                            {/* Match Score Badge */}
                            <View style={[styles.matchBadge, { backgroundColor: scoreColor + '15' }]}>
                                <Text style={[styles.matchText, { color: scoreColor }]}>{item.matchScore}% Match</Text>
                            </View>
                        </View>
                        
                        <Text style={styles.role}>{item.role}</Text>
                        
                        <View style={styles.metaRow}>
                            <View style={styles.metaItem}>
                                <Feather name="briefcase" size={12} color="#6B7280" />
                                <Text style={styles.metaText}>{item.experience}</Text>
                            </View>
                            <View style={[styles.metaItem, { marginLeft: 12 }]}>
                                <Feather name="clock" size={12} color="#6B7280" />
                                <Text style={styles.metaText}>{item.appliedTime}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* 2. Skills Chips */}
                <View style={styles.skillsContainer}>
                    {item.skills.map((skill, index) => (
                        <View key={index} style={styles.skillPill}>
                            <Text style={styles.skillText}>{skill}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.divider} />

                {/* 3. Actions Row */}
                <View style={styles.actionRow}>
                    {/* Comm Buttons */}
                    <View style={styles.commGroup}>
                        <TouchableOpacity style={styles.iconBtn}>
                            <MaterialCommunityIcons name="phone" size={20} color="#4B5563" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconBtn}>
                            <MaterialCommunityIcons name="email-outline" size={20} color="#4B5563" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconBtn}>
                            <MaterialCommunityIcons name="whatsapp" size={20} color="#25D366" />
                        </TouchableOpacity>
                    </View>

                    {/* Decision Buttons */}
                    <View style={styles.decisionGroup}>
                        {isRejected ? (
                            <View style={styles.statusLabelBox}>
                                <Text style={[styles.statusLabelText, { color: DANGER_COLOR }]}>Rejected</Text>
                            </View>
                        ) : isShortlisted ? (
                            <View style={styles.statusLabelBox}>
                                <MaterialCommunityIcons name="check-circle" size={16} color={SUCCESS_COLOR} style={{marginRight:4}} />
                                <Text style={[styles.statusLabelText, { color: SUCCESS_COLOR }]}>Shortlisted</Text>
                            </View>
                        ) : (
                            <>
                                <TouchableOpacity
                                    style={[styles.decisionBtn, styles.rejectBtn]}
                                    onPress={() => handleStatusChange(item.id, 'Rejected')}
                                >
                                    <MaterialCommunityIcons name="close" size={20} color={DANGER_COLOR} />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.decisionBtn, styles.acceptBtn]}
                                    onPress={() => handleStatusChange(item.id, 'Shortlisted')}
                                >
                                    <Text style={styles.acceptText}>Shortlist</Text>
                                    <MaterialCommunityIcons name="check" size={18} color="white" />
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

            {/* HEADER */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>Talent Pool</Text>
                    <Text style={styles.headerSubtitle}>Find the perfect candidate</Text>
                </View>
                <View style={styles.countBadge}>
                    <Text style={styles.countText}>{applicants.length}</Text>
                </View>
            </View>

            {/* SEARCH */}
            <View style={styles.searchWrapper}>
                <View style={styles.searchContainer}>
                    <Feather name="search" size={20} color="#9CA3AF" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search candidates..."
                        placeholderTextColor="#9CA3AF"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            {/* TABS */}
            <View>
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

            {/* LIST */}
            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id}
                renderItem={renderApplicant}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <MaterialCommunityIcons name="account-search-outline" size={60} color="#D1D5DB" />
                        <Text style={styles.emptyText}>No candidates found</Text>
                        <Text style={styles.emptySubText}>Try adjusting your filters</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: BG_COLOR },
    
    // Header
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 15 },
    headerTitle: { fontSize: 28, fontWeight: '800', color: '#1E293B', letterSpacing: -0.5 },
    headerSubtitle: { fontSize: 14, color: '#64748B', marginTop: 2 },
    countBadge: { backgroundColor: '#E0E7FF', width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
    countText: { color: PRIMARY_COLOR, fontWeight: 'bold', fontSize: 16 },

    // Search
    searchWrapper: { paddingHorizontal: 20, marginBottom: 15 },
    searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 12, paddingHorizontal: 12, height: 48, borderWidth: 1, borderColor: '#E2E8F0' },
    searchInput: { flex: 1, height: '100%', marginLeft: 10, fontSize: 15, color: '#1E293B' },

    // Tabs
    tabsContainer: { paddingHorizontal: 20, paddingBottom: 15 },
    tab: { marginRight: 10, paddingVertical: 8, paddingHorizontal: 18, borderRadius: 20, backgroundColor: 'white', borderWidth: 1, borderColor: '#E2E8F0' },
    activeTab: { backgroundColor: '#1E293B', borderColor: '#1E293B' },
    tabText: { color: '#64748B', fontWeight: '600' },
    activeTabText: { color: 'white' },

    // Card
    listContent: { paddingHorizontal: 20, paddingBottom: 30 },
    card: { 
        backgroundColor: 'white', 
        borderRadius: 16, 
        padding: 16, 
        marginBottom: 16, 
        // Use WIDTH for consistent sizing relative to screen if needed, though flex handles it well
        width: width - 40, 
        alignSelf: 'center',
        shadowColor: '#64748B', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3 
    },
    
    cardHeader: { flexDirection: 'row' },
    avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#F1F5F9' },
    infoContainer: { flex: 1, marginLeft: 14 },
    
    nameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    name: { fontSize: 16, fontWeight: '700', color: '#1E293B', maxWidth: '65%' }, // Limit name width to avoid overlap
    matchBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
    matchText: { fontSize: 11, fontWeight: '700' },
    
    role: { fontSize: 14, color: '#64748B', fontWeight: '500', marginTop: 2, marginBottom: 6 },
    
    metaRow: { flexDirection: 'row' },
    metaItem: { flexDirection: 'row', alignItems: 'center' },
    metaText: { fontSize: 12, color: '#64748B', marginLeft: 4, fontWeight: '500' },

    // Skills
    skillsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 14, gap: 8 },
    skillPill: { backgroundColor: '#F1F5F9', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
    skillText: { fontSize: 12, color: '#475569', fontWeight: '500' },

    divider: { height: 1, backgroundColor: '#F1F5F9', marginVertical: 14 },

    // Actions
    actionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    commGroup: { flexDirection: 'row', gap: 10 },
    iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F8FAFC', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0' },
    
    decisionGroup: { flexDirection: 'row', gap: 10, alignItems: 'center' },
    decisionBtn: { height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' },
    rejectBtn: { width: 40, backgroundColor: '#FEF2F2', borderWidth: 1, borderColor: '#FECACA' },
    acceptBtn: { paddingHorizontal: 16, backgroundColor: '#1E293B' },
    acceptText: { color: 'white', fontWeight: '600', fontSize: 14, marginRight: 6 },

    statusLabelBox: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, backgroundColor: '#F8FAFC' },
    statusLabelText: { fontWeight: '700', fontSize: 13 },

    // Empty
    emptyContainer: { alignItems: 'center', marginTop: height * 0.1 }, // Responsive margin
    emptyText: { marginTop: 15, color: '#1E293B', fontSize: 18, fontWeight: '700' },
    emptySubText: { marginTop: 5, color: '#94A3B8', fontSize: 14 },
});