import React, { useState, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    StatusBar,
    TextInput,
    Alert,
    Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

// --- TYPES ---
type CandidateStatus = 'New' | 'Shortlisted' | 'Interview' | 'Rejected';

interface Candidate {
    id: string;
    name: string;
    role: string;
    experience: string;
    email: string;
    phone: string;
    avatar: string;
    status: CandidateStatus;
    appliedDate: string;
    matchScore: number; // 0-100
}

// --- MOCK DATA ---
const MOCK_CANDIDATES: Candidate[] = [
    { id: '1', name: 'Rohan Gupta', role: 'Senior React Dev', experience: '5 Yrs', email: 'rohan@gmail.com', phone: '+91 9876543210', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', status: 'New', appliedDate: '2h ago', matchScore: 92 },
    { id: '2', name: 'Priya Sharma', role: 'Frontend Dev', experience: '3 Yrs', email: 'priya@test.com', phone: '+91 9988776655', avatar: 'https://randomuser.me/api/portraits/women/2.jpg', status: 'Shortlisted', appliedDate: '1d ago', matchScore: 85 },
    { id: '3', name: 'Amit Verma', role: 'Full Stack', experience: '4 Yrs', email: 'amit@test.com', phone: '+91 8899776655', avatar: 'https://randomuser.me/api/portraits/men/3.jpg', status: 'Rejected', appliedDate: '3d ago', matchScore: 40 },
    { id: '4', name: 'Sneha Singh', role: 'React Native', experience: '2 Yrs', email: 'sneha@test.com', phone: '+91 7766554433', avatar: 'https://randomuser.me/api/portraits/women/4.jpg', status: 'Interview', appliedDate: '5d ago', matchScore: 78 },
];

const TABS = ['All', 'New', 'Shortlisted', 'Interview', 'Rejected'];

export default function CandidateListScreen() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();

    // Get Params passed from Dashboard
    const { jobId, jobTitle } = route.params || { jobId: '0', jobTitle: 'Job Applicants' };

    const [activeTab, setActiveTab] = useState('All');
    const [candidates, setCandidates] = useState(MOCK_CANDIDATES);
    const [searchText, setSearchText] = useState('');

    // --- FILTER LOGIC ---
    const filteredList = useMemo(() => {
        return candidates.filter(c => {
            const matchesTab = activeTab === 'All' || c.status === activeTab;
            const matchesSearch = c.name.toLowerCase().includes(searchText.toLowerCase());
            return matchesTab && matchesSearch;
        });
    }, [candidates, activeTab, searchText]);

    // --- ACTIONS ---
    const updateStatus = (id: string, newStatus: CandidateStatus) => {
        setCandidates(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
        Alert.alert("Status Updated", `Candidate moved to ${newStatus}`);
    };

    const handleChat = (name: string) => {
        // Navigate to your Chat Detail Screen (Reuse what we built earlier)
        // navigation.navigate('ChatDetailScreen', { name: name }); 
        Alert.alert("Chat", `Opening chat with ${name}...`);
    };

    const handleProfile = (name: string) => {
        Alert.alert("Profile", `Viewing ${name}'s full profile...`);
    };

    // --- RENDER ITEM ---
    const renderCandidate = ({ item }: { item: Candidate }) => {
        const getStatusColor = (s: string) => {
            if (s === 'Shortlisted') return '#10B981';
            if (s === 'Interview') return '#8B5CF6';
            if (s === 'Rejected') return '#EF4444';
            return '#3B82F6'; // New
        };

        return (
            <View style={styles.card}>
                <TouchableOpacity style={styles.cardBody} onPress={() => handleProfile(item.name)}>
                    <View style={styles.rowTop}>
                        <Image source={{ uri: item.avatar }} style={styles.avatar} />
                        <View style={{ flex: 1, marginLeft: 12 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.date}>{item.appliedDate}</Text>
                            </View>
                            <Text style={styles.role}>{item.role} • {item.experience}</Text>

                            {/* Match Score */}
                            <View style={styles.matchRow}>
                                <View style={styles.scoreBadge}>
                                    <MaterialCommunityIcons name="star-four-points" size={10} color="#fff" />
                                    <Text style={styles.scoreText}>{item.matchScore}% Match</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>

                <View style={styles.divider} />

                {/* Footer Actions */}
                <View style={styles.cardFooter}>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '15' }]}>
                        <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>{item.status}</Text>
                    </View>

                    <View style={styles.actionRow}>
                        <TouchableOpacity style={styles.iconBtn} onPress={() => handleChat(item.name)}>
                            <MaterialCommunityIcons name="message-text-outline" size={20} color="#64748B" />
                        </TouchableOpacity>

                        {/* Action Logic based on status */}
                        {item.status !== 'Rejected' && (
                            <TouchableOpacity
                                style={[styles.iconBtn, { backgroundColor: '#FEE2E2' }]}
                                onPress={() => updateStatus(item.id, 'Rejected')}
                            >
                                <MaterialCommunityIcons name="close" size={20} color="#EF4444" />
                            </TouchableOpacity>
                        )}

                        {item.status !== 'Shortlisted' && item.status !== 'Interview' && (
                            <TouchableOpacity
                                style={[styles.iconBtn, { backgroundColor: '#ECFDF5' }]}
                                onPress={() => updateStatus(item.id, 'Shortlisted')}
                            >
                                <MaterialCommunityIcons name="check" size={20} color="#10B981" />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#1E293B" />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <Text style={styles.headerTitle} numberOfLines={1}>{jobTitle}</Text>
                    <Text style={styles.headerSub}>ID: {jobId} • {candidates.length} Applicants</Text>
                </View>
                <TouchableOpacity>
                    <MaterialCommunityIcons name="dots-vertical" size={24} color="#1E293B" />
                </TouchableOpacity>
            </View>

            {/* Search */}
            <View style={styles.searchContainer}>
                <MaterialCommunityIcons name="magnify" size={20} color="#94A3B8" />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search candidates..."
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View>

            {/* Tabs */}
            <View>
                <FlatList
                    data={TABS}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.tabList}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[styles.tab, activeTab === item && styles.activeTab]}
                            onPress={() => setActiveTab(item)}
                        >
                            <Text style={[styles.tabText, activeTab === item && styles.activeTabText]}>{item}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>

            {/* Main List */}
            <FlatList
                data={filteredList}
                keyExtractor={item => item.id}
                renderItem={renderCandidate}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <MaterialCommunityIcons name="account-search-outline" size={48} color="#CBD5E1" />
                        <Text style={styles.emptyText}>No candidates found</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8FAFC' },

    // Header
    header: {
        flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#fff',
        borderBottomWidth: 1, borderBottomColor: '#E2E8F0'
    },
    backBtn: { marginRight: 12 },
    headerTitle: { fontSize: 18, fontWeight: '700', color: '#0F172A' },
    headerSub: { fontSize: 12, color: '#64748B' },

    // Search
    searchContainer: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
        margin: 16, borderRadius: 12, paddingHorizontal: 12, height: 45, borderWidth: 1, borderColor: '#E2E8F0'
    },
    searchInput: { flex: 1, marginLeft: 8, fontSize: 14, color: '#333' },

    // Tabs
    tabList: { paddingHorizontal: 16, paddingBottom: 16 },
    tab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#fff', marginRight: 8, borderWidth: 1, borderColor: '#E2E8F0' },
    activeTab: { backgroundColor: '#2563EB', borderColor: '#2563EB' },
    tabText: { fontSize: 13, fontWeight: '600', color: '#64748B' },
    activeTabText: { color: '#fff' },

    // List
    listContent: { paddingHorizontal: 16, paddingBottom: 30 },
    emptyState: { alignItems: 'center', marginTop: 50 },
    emptyText: { color: '#94A3B8', marginTop: 10, fontSize: 16 },

    // Card
    card: { backgroundColor: '#fff', borderRadius: 16, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
    cardBody: { padding: 16 },
    rowTop: { flexDirection: 'row' },
    avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#F1F5F9' },
    name: { fontSize: 16, fontWeight: '700', color: '#0F172A' },
    date: { fontSize: 11, color: '#94A3B8' },
    role: { fontSize: 13, color: '#64748B', marginTop: 2 },

    matchRow: { flexDirection: 'row', marginTop: 8 },
    scoreBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#2563EB', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8 },
    scoreText: { color: '#fff', fontSize: 10, fontWeight: '700', marginLeft: 4 },

    divider: { height: 1, backgroundColor: '#F1F5F9' },

    // Footer
    cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12 },
    statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
    statusText: { fontSize: 12, fontWeight: '700' },

    actionRow: { flexDirection: 'row', gap: 8 },
    iconBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center' },
});