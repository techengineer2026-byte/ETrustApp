import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Image,
    StatusBar,
    Alert,
    Platform,
    Linking
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

const COLORS = {
    primary: '#2563EB',
    background: '#F8FAFC',
    card: '#FFFFFF',
    text: '#0F172A',
    gray: '#64748B',
    border: '#E2E8F0',
    success: '#10B981',
    danger: '#EF4444',
    warning: '#F59E0B',
    lightBlue: '#EFF6FF',
};

// --- MOCK CANDIDATE DATA ---
const CANDIDATES = [
    {
        id: '1',
        name: 'Rahul Sharma',
        role: 'Senior React Native Dev',
        exp: '4 Yrs',
        location: 'Noida',
        matchScore: 95,
        status: 'NEW', // NEW, SHORTLISTED, REJECTED
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        appliedDate: '2 hours ago'
    },
    {
        id: '2',
        name: 'Priya Singh',
        role: 'Frontend Developer',
        exp: '3 Yrs',
        location: 'Delhi',
        matchScore: 88,
        status: 'SHORTLISTED',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        appliedDate: '1 day ago'
    },
    {
        id: '3',
        name: 'Amit Kumar',
        role: 'Full Stack Dev',
        exp: '5 Yrs',
        location: 'Remote',
        matchScore: 60,
        status: 'REJECTED',
        avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
        appliedDate: '3 days ago'
    },
    {
        id: '4',
        name: 'Sneha Gupta',
        role: 'UI/UX Designer',
        exp: '2 Yrs',
        location: 'Bangalore',
        matchScore: 92,
        status: 'NEW',
        avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
        appliedDate: '5 hours ago'
    },
];

export default function CandidateListScreen() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    
    // Get Job Title passed from Dashboard
    const { jobTitle = "Applicants", jobId } = route.params || {};

    const [filter, setFilter] = useState<'ALL' | 'SHORTLISTED' | 'REJECTED'>('ALL');
    const [listData, setListData] = useState(CANDIDATES);

    // Filter Logic
    const filteredList = listData.filter(item => {
        if (filter === 'ALL') return item.status !== 'REJECTED'; // Show New & Shortlisted
        if (filter === 'SHORTLISTED') return item.status === 'SHORTLISTED';
        if (filter === 'REJECTED') return item.status === 'REJECTED';
        return true;
    });

    const handleDownloadResume = (name: string) => {
        Alert.alert("Downloading...", `Downloading resume for ${name}`);
        // Add actual download logic here
    };

    const handleShortlist = (id: string) => {
        Alert.alert("Shortlisted", "Candidate moved to shortlist.");
        // Update state logic here
    };

    const handleChat = (name: string) => {
        navigation.navigate('ChatDetailScreen', { userName: name });
    };

    const renderCandidate = ({ item }: { item: typeof CANDIDATES[0] }) => (
        <TouchableOpacity 
            style={styles.card} 
            activeOpacity={0.9}
            // Navigate to Full Profile (The Swipe Screen logic or Detail Screen)
            onPress={() => navigation.navigate('EmployerHome', { candidateId: item.id })} 
        >
            {/* Top Row: Info & Match Score */}
            <View style={styles.cardHeader}>
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.role}>{item.role}</Text>
                    <View style={styles.metaRow}>
                        <Feather name="briefcase" size={12} color={COLORS.gray} />
                        <Text style={styles.metaText}>{item.exp}</Text>
                        <Text style={styles.dot}>•</Text>
                        <Feather name="map-pin" size={12} color={COLORS.gray} />
                        <Text style={styles.metaText}>{item.location}</Text>
                    </View>
                </View>
                
                {/* Match Score Badge */}
                <View style={[styles.matchBadge, { backgroundColor: item.matchScore > 80 ? '#DCFCE7' : '#FEF3C7' }]}>
                    <Text style={[styles.matchText, { color: item.matchScore > 80 ? '#166534' : '#D97706' }]}>
                        {item.matchScore}% Match
                    </Text>
                </View>
            </View>

            <View style={styles.divider} />

            {/* Actions Row */}
            <View style={styles.actionRow}>
                {/* Download Resume Button */}
                <TouchableOpacity style={styles.resumeBtn} onPress={() => handleDownloadResume(item.name)}>
                    <MaterialCommunityIcons name="file-document-outline" size={18} color={COLORS.primary} />
                    <Text style={styles.resumeText}>Resume</Text>
                </TouchableOpacity>

                <View style={styles.rightActions}>
                    <TouchableOpacity style={styles.iconAction} onPress={() => handleChat(item.name)}>
                        <Ionicons name="chatbubble-ellipses-outline" size={20} color={COLORS.gray} />
                    </TouchableOpacity>
                    
                    {item.status !== 'SHORTLISTED' && (
                        <TouchableOpacity style={[styles.iconAction, { backgroundColor: '#EFF6FF' }]} onPress={() => handleShortlist(item.id)}>
                            <Ionicons name="checkmark-circle-outline" size={22} color={COLORS.primary} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.text} />
                </TouchableOpacity>
                <View>
                    <Text style={styles.headerTitle} numberOfLines={1}>{jobTitle}</Text>
                    <Text style={styles.headerSub}>{listData.length} Candidates Applied</Text>
                </View>
                <TouchableOpacity style={styles.filterBtn}>
                    <Feather name="filter" size={20} color={COLORS.primary} />
                </TouchableOpacity>
            </View>

            {/* Filter Tabs */}
            <View style={styles.tabContainer}>
                {['ALL', 'SHORTLISTED', 'REJECTED'].map((tab) => (
                    <TouchableOpacity 
                        key={tab} 
                        style={[styles.tab, filter === tab && styles.activeTab]}
                        onPress={() => setFilter(tab as any)}
                    >
                        <Text style={[styles.tabText, filter === tab && styles.activeTabText]}>
                            {tab === 'ALL' ? 'New' : tab.charAt(0) + tab.slice(1).toLowerCase()}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* List */}
            <FlatList
                data={filteredList}
                keyExtractor={item => item.id}
                renderItem={renderCandidate}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <MaterialCommunityIcons name="account-search-outline" size={50} color={COLORS.gray} />
                        <Text style={styles.emptyText}>No candidates found.</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    
    // Header
    header: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: COLORS.border, backgroundColor: COLORS.card },
    backBtn: { marginRight: 16, padding: 4 },
    headerTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text, width: 200 },
    headerSub: { fontSize: 12, color: COLORS.gray },
    filterBtn: { marginLeft: 'auto', padding: 8, backgroundColor: COLORS.lightBlue, borderRadius: 8 },

    // Tabs
    tabContainer: { flexDirection: 'row', padding: 16, gap: 12 },
    tab: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, borderWidth: 1, borderColor: COLORS.border, backgroundColor: COLORS.card },
    activeTab: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
    tabText: { fontSize: 13, fontWeight: '600', color: COLORS.gray },
    activeTabText: { color: '#FFF' },

    // List
    listContent: { paddingHorizontal: 16, paddingBottom: 20 },
    
    // Card
    card: { backgroundColor: COLORS.card, borderRadius: 16, padding: 16, marginBottom: 12, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, shadowOffset: { width: 0, height: 2 } },
    cardHeader: { flexDirection: 'row', alignItems: 'flex-start' },
    avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
    infoContainer: { flex: 1 },
    name: { fontSize: 16, fontWeight: '700', color: COLORS.text },
    role: { fontSize: 13, color: COLORS.gray, marginBottom: 4 },
    metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    metaText: { fontSize: 12, color: COLORS.gray },
    dot: { fontSize: 12, color: COLORS.gray, marginHorizontal: 2 },
    
    // Match Badge
    matchBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
    matchText: { fontSize: 11, fontWeight: '700' },

    divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 12 },

    // Actions
    actionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    resumeBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 6, paddingHorizontal: 12, backgroundColor: COLORS.lightBlue, borderRadius: 8 },
    resumeText: { fontSize: 13, fontWeight: '600', color: COLORS.primary },
    
    rightActions: { flexDirection: 'row', gap: 10 },
    iconAction: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },

    // Empty State
    emptyContainer: { alignItems: 'center', marginTop: 50 },
    emptyText: { marginTop: 10, color: COLORS.gray, fontSize: 16 },
});