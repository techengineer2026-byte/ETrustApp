// src/screens/Employer/JobHistoryScreen.tsx

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    StatusBar,
    TextInput
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

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
};

// Mock History Data
const HISTORY_DATA = [
    { id: '101', title: 'Senior React Native Dev', date: '20 Oct, 2023', applicants: 42, status: 'Active', budget: '₹ 1500' },
    { id: '102', title: 'UI/UX Designer', date: '15 Sep, 2023', applicants: 89, status: 'Closed', budget: '₹ 800' },
    { id: '103', title: 'Backend Node.js Lead', date: '10 Aug, 2023', applicants: 12, status: 'Expired', budget: '₹ 2000' },
    { id: '104', title: 'Marketing Intern', date: '01 Aug, 2023', applicants: 55, status: 'Closed', budget: '₹ 500' },
    { id: '105', title: 'Sales Executive', date: '20 July, 2023', applicants: 0, status: 'Draft', budget: '₹ 0' },
];

export default function JobHistoryScreen() {
    const navigation = useNavigation();
    const [filter, setFilter] = useState('All');
    const [searchText, setSearchText] = useState('');

    const filteredData = HISTORY_DATA.filter(item => {
        const matchesFilter = filter === 'All' || item.status === filter;
        const matchesSearch = item.title.toLowerCase().includes(searchText.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const getStatusColor = (status: string) => {
        if (status === 'Active') return COLORS.success;
        if (status === 'Closed') return COLORS.gray;
        if (status === 'Draft') return COLORS.warning;
        return COLORS.danger; // Expired
    };

    const renderItem = ({ item }: any) => (
        <View style={styles.card}>
            <View style={styles.cardRow}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.jobTitle}>{item.title}</Text>
                    <Text style={styles.jobDate}>Posted: {item.date}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>{item.status}</Text>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.cardFooter}>
                <View style={styles.stat}>
                    <MaterialCommunityIcons name="account-group-outline" size={16} color={COLORS.gray} />
                    <Text style={styles.statText}>{item.applicants} Applied</Text>
                </View>
                <View style={styles.stat}>
                    <MaterialCommunityIcons name="wallet-outline" size={16} color={COLORS.gray} />
                    <Text style={styles.statText}>Spend: {item.budget}</Text>
                </View>
                <TouchableOpacity onPress={() => console.log('Repost', item.id)}>
                    <MaterialCommunityIcons name="refresh" size={20} color={COLORS.primary} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
            
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Job History</Text>
                <View style={{ width: 24 }} />
            </View>

            {/* Search */}
            <View style={styles.searchContainer}>
                <Feather name="search" size={20} color={COLORS.gray} />
                <TextInput 
                    style={styles.input} 
                    placeholder="Search past jobs..." 
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View>

            {/* Filters */}
            <View style={styles.filterRow}>
                {['All', 'Active', 'Closed', 'Draft'].map(f => (
                    <TouchableOpacity 
                        key={f} 
                        style={[styles.filterChip, filter === f && styles.filterChipActive]}
                        onPress={() => setFilter(f)}
                    >
                        <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* List */}
            <FlatList
                data={filteredData}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <MaterialCommunityIcons name="file-document-outline" size={48} color="#CBD5E1" />
                        <Text style={styles.emptyText}>No jobs found</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: COLORS.border },
    headerTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text },
    backBtn: { padding: 4 },
    
    searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', margin: 16, paddingHorizontal: 12, borderRadius: 10, borderWidth: 1, borderColor: COLORS.border, height: 45 },
    input: { flex: 1, marginLeft: 10, fontSize: 15, color: COLORS.text },

    filterRow: { flexDirection: 'row', paddingHorizontal: 16, marginBottom: 10 },
    filterChip: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20, backgroundColor: '#fff', borderWidth: 1, borderColor: COLORS.border, marginRight: 8 },
    filterChipActive: { backgroundColor: COLORS.text, borderColor: COLORS.text },
    filterText: { fontSize: 13, color: COLORS.gray, fontWeight: '600' },
    filterTextActive: { color: '#fff' },

    listContent: { paddingHorizontal: 16, paddingBottom: 20 },
    
    card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
    cardRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    jobTitle: { fontSize: 16, fontWeight: '700', color: COLORS.text, marginBottom: 4 },
    jobDate: { fontSize: 12, color: COLORS.gray },
    
    statusBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
    statusText: { fontSize: 11, fontWeight: '700' },

    divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 12 },

    cardFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    stat: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    statText: { fontSize: 13, color: COLORS.gray, fontWeight: '500' },

    emptyContainer: { alignItems: 'center', marginTop: 50 },
    emptyText: { marginTop: 10, color: COLORS.gray, fontSize: 16 }
});