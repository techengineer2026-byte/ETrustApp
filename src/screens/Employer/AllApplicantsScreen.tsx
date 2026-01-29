import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Image,
    TextInput,
    StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const COLORS = {
    primary: '#0F172A',
    background: '#F8FAFC',
    surface: '#FFFFFF',
    textPrimary: '#1E293B',
    textSecondary: '#64748B',
    border: '#E2E8F0',
    success: '#10B981'
};

const APPLICANTS_DATA = [
    { id: '1', name: 'Rahul Sharma', role: 'Senior React Dev', match: '95%', img: 'https://randomuser.me/api/portraits/men/32.jpg', status: 'New' },
    { id: '2', name: 'Priya Verma', role: 'Product Designer', match: '88%', img: 'https://randomuser.me/api/portraits/women/44.jpg', status: 'Interview' },
    { id: '3', name: 'Amit Kumar', role: 'Backend Engineer', match: '72%', img: 'https://randomuser.me/api/portraits/men/85.jpg', status: 'Rejected' },
    { id: '4', name: 'Sarah Jenkins', role: 'Project Manager', match: '91%', img: 'https://randomuser.me/api/portraits/women/12.jpg', status: 'New' },
    { id: '5', name: 'Mike Ross', role: 'Legal Consultant', match: '85%', img: 'https://randomuser.me/api/portraits/men/22.jpg', status: 'Review' },
];

export default function AllApplicantsScreen() {
    const navigation = useNavigation();
    const [search, setSearch] = useState('');

    const renderItem = ({ item }: any) => (
        <TouchableOpacity style={styles.card} activeOpacity={0.7}>
            <Image source={{ uri: item.img }} style={styles.avatar} />
            <View style={styles.info}>
                <View style={styles.row}>
                    <Text style={styles.name}>{item.name}</Text>
                    <View style={[
                        styles.statusBadge,
                        item.status === 'New' ? { backgroundColor: '#ECFDF5' } : { backgroundColor: '#F1F5F9' }
                    ]}>
                        <Text style={[
                            styles.statusText,
                            item.status === 'New' ? { color: COLORS.success } : { color: COLORS.textSecondary }
                        ]}>{item.status}</Text>
                    </View>
                </View>
                <Text style={styles.role}>{item.role}</Text>
                <View style={styles.metaRow}>
                    <Text style={styles.matchText}>{item.match} Match</Text>
                    <Text style={styles.dot}>•</Text>
                    <Text style={styles.date}>Applied 2d ago</Text>
                </View>
            </View>
            <Feather name="chevron-right" size={20} color={COLORS.textSecondary} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Feather name="arrow-left" size={24} color={COLORS.primary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>All Applicants</Text>
                <TouchableOpacity style={styles.filterBtn}>
                    <Feather name="filter" size={20} color={COLORS.primary} />
                </TouchableOpacity>
            </View>

            {/* Search */}
            <View style={styles.searchContainer}>
                <Feather name="search" size={20} color={COLORS.textSecondary} style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search candidates..."
                    placeholderTextColor={COLORS.textSecondary}
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

            <FlatList
                data={APPLICANTS_DATA}
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
    headerTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary },
    filterBtn: { padding: 5 },

    searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, marginHorizontal: 20, paddingHorizontal: 15, height: 50, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: COLORS.border },
    searchIcon: { marginRight: 10 },
    searchInput: { flex: 1, color: COLORS.textPrimary, fontSize: 16 },

    listContent: { paddingHorizontal: 20, paddingBottom: 20 },
    card: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, padding: 16, borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: COLORS.border },
    avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
    info: { flex: 1 },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight: 10 },
    name: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary },
    role: { fontSize: 14, color: COLORS.textSecondary, marginTop: 2 },
    metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
    matchText: { color: COLORS.success, fontSize: 12, fontWeight: '700' },
    dot: { marginHorizontal: 6, color: COLORS.textSecondary },
    date: { fontSize: 12, color: COLORS.textSecondary },

    statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
    statusText: { fontSize: 10, fontWeight: '700' },
});