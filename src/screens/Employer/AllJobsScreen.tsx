import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const COLORS = {
    primary: '#0F172A',
    accent: '#3B82F6',
    background: '#F8FAFC',
    surface: '#FFFFFF',
    textPrimary: '#1E293B',
    textSecondary: '#64748B',
    border: '#E2E8F0',
};

const JOBS_DATA = [
    { id: '1', title: 'Senior React Native Developer', type: 'Full-Time', applicants: 42, daysLeft: 5, status: 'Active' },
    { id: '2', title: 'UI/UX Designer', type: 'Remote', applicants: 18, daysLeft: 12, status: 'Active' },
    { id: '3', title: 'Project Manager', type: 'Contract', applicants: 6, daysLeft: 2, status: 'Active' },
    { id: '4', title: 'Backend Intern', type: 'Internship', applicants: 120, daysLeft: 0, status: 'Closed' },
];

export default function AllJobsScreen() {
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState('Active'); // Active | Closed

    const renderItem = ({ item }: any) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.jobTitle}>{item.title}</Text>
                <TouchableOpacity>
                    <Feather name="more-vertical" size={20} color={COLORS.textSecondary} />
                </TouchableOpacity>
            </View>

            <View style={styles.tagsRow}>
                <View style={styles.tag}><Text style={styles.tagText}>{item.type}</Text></View>
                <Text style={styles.daysText}>
                    {item.status === 'Active' ? `${item.daysLeft} days left` : 'Expired'}
                </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.cardFooter}>
                <View style={styles.stat}>
                    <Text style={styles.statNum}>{item.applicants}</Text>
                    <Text style={styles.statLabel}>Candidates</Text>
                </View>

                <TouchableOpacity style={styles.manageBtn}>
                    <Text style={styles.manageText}>Manage Job</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Feather name="arrow-left" size={24} color={COLORS.primary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Jobs</Text>
                <TouchableOpacity
                    style={styles.addBtn}
                    onPress={() => (navigation as any).navigate('PostJob')}                >
                    <Feather name="plus" size={24} color={COLORS.primary} />
                </TouchableOpacity>
            </View>

            {/* Tabs */}
            <View style={styles.tabContainer}>
                {['Active', 'Closed'].map(tab => (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.tab, activeTab === tab && styles.activeTab]}
                        onPress={() => setActiveTab(tab)}
                    >
                        <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <FlatList
                data={JOBS_DATA.filter(j => j.status === activeTab)}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: COLORS.background },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 },
    backBtn: { padding: 5 },
    addBtn: { padding: 5 },
    headerTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary },

    tabContainer: { flexDirection: 'row', marginHorizontal: 20, marginBottom: 20, backgroundColor: COLORS.surface, borderRadius: 12, padding: 4 },
    tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
    activeTab: { backgroundColor: COLORS.primary },
    tabText: { fontSize: 14, color: COLORS.textSecondary, fontWeight: '600' },
    activeTabText: { color: '#fff' },

    listContent: { paddingHorizontal: 20, paddingBottom: 20 },
    card: { backgroundColor: COLORS.surface, borderRadius: 16, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: COLORS.border },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    jobTitle: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary, width: '90%' },
    tagsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 16 },
    tag: { backgroundColor: '#F1F5F9', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, marginRight: 10 },
    tagText: { fontSize: 12, color: COLORS.textSecondary, fontWeight: '600' },
    daysText: { fontSize: 12, color: '#F59E0B', fontWeight: '600' },
    divider: { height: 1, backgroundColor: '#F1F5F9', marginBottom: 12 },
    cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    stat: { flexDirection: 'row', alignItems: 'baseline' },
    statNum: { fontSize: 18, fontWeight: '700', color: COLORS.primary, marginRight: 4 },
    statLabel: { fontSize: 12, color: COLORS.textSecondary },
    manageBtn: { backgroundColor: '#EFF6FF', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8 },
    manageText: { color: COLORS.accent, fontSize: 13, fontWeight: '700' },
});