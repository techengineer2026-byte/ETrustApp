// src/screens/ET-Center/ETChatScreen.tsx

import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, StatusBar, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useChat, Ticket } from '../../context/ChatContext'; // IMP: Import Context

const ETChatScreen = () => {
    const navigation = useNavigation<any>();
    const { tickets, markAsRead } = useChat(); // <--- USE DYNAMIC DATA
    const [filter, setFilter] = useState<'All' | 'Open' | 'Resolved'>('All');
    const [searchText, setSearchText] = useState('');

    // Filter Logic
    const filteredChats = tickets.filter(chat => {
        const matchesSearch = chat.name.toLowerCase().includes(searchText.toLowerCase()) || chat.ticketId.toLowerCase().includes(searchText.toLowerCase());
        const matchesFilter = filter === 'All' ? true : chat.status === filter;
        return matchesSearch && matchesFilter;
    });

    const handlePress = (item: Ticket) => {
        markAsRead(item.id); // Mark 0 unread when opening
        navigation.navigate('ETChatDetailScreen', { ticketId: item.id }); // Pass ID only
    };

    const renderItem = ({ item }: { item: Ticket }) => {
        // Get dynamic last message
        const lastMsg = item.messages[item.messages.length - 1];
        const displayMsg = lastMsg ? (lastMsg.isSystem ? 'System: ' + lastMsg.text : lastMsg.text) : 'No messages';
        const displayTime = lastMsg ? lastMsg.time : '';

        return (
            <TouchableOpacity style={styles.chatCard} activeOpacity={0.7} onPress={() => handlePress(item)}>
                <View style={styles.row}>
                    <Image source={{ uri: item.avatar }} style={styles.avatar} />
                    <View style={styles.content}>
                        <View style={styles.headerRow}>
                            <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                            <Text style={styles.time}>{displayTime}</Text>
                        </View>
                        <View style={styles.subHeaderRow}>
                            <View style={[styles.badge, item.userType === 'Employer' ? styles.badgeEmployer : styles.badgeSeeker]}>
                                <Text style={styles.badgeText}>{item.userType}</Text>
                            </View>
                            <Text style={styles.ticketId}>{item.ticketId}</Text>
                        </View>
                        <View style={styles.messageRow}>
                            <Text style={[styles.message, item.unreadCount > 0 && styles.messageBold]} numberOfLines={1}>
                                {displayMsg}
                            </Text>
                            {item.unreadCount > 0 && (
                                <View style={styles.unreadBadge}>
                                    <Text style={styles.unreadText}>{item.unreadCount}</Text>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
                {/* Dynamic Status Stripe */}
                <View style={[styles.statusStripe,
                item.status === 'Open' ? { backgroundColor: '#22C55E' } :
                    item.status === 'Resolved' ? { backgroundColor: '#9CA3AF' } :
                        item.status === 'Banned' ? { backgroundColor: '#EF4444' } :
                            { backgroundColor: '#F59E0B' }
                ]} />
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F3F4F6" />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Support Center</Text>
            </View>
            <View style={styles.searchContainer}>
                <MaterialCommunityIcons name="magnify" size={20} color="#9E9E9E" style={{ marginRight: 8 }} />
                <TextInput
                    placeholder="Search by name or Ticket ID..."
                    placeholderTextColor="#9CA3AF"
                    style={styles.searchInput}
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View>
            <View style={styles.tabsContainer}>
                {['All', 'Open', 'Resolved'].map((tab) => (
                    <TouchableOpacity key={tab} style={[styles.tab, filter === tab && styles.activeTab]} onPress={() => setFilter(tab as any)}>
                        <Text style={[styles.tabText, filter === tab && styles.activeTabText]}>{tab}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <FlatList
                data={filteredChats}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F3F4F6' },
    header: { padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
    headerTitle: { fontSize: 24, fontWeight: '800', color: '#1F2937' },
    searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', marginHorizontal: 20, marginTop: 15, borderRadius: 12, paddingHorizontal: 12, height: 45, borderWidth: 1, borderColor: '#E5E7EB' },
    searchInput: { flex: 1, fontSize: 14, color: '#333' },
    tabsContainer: { flexDirection: 'row', paddingHorizontal: 20, marginVertical: 15 },
    tab: { marginRight: 10, paddingVertical: 8, paddingHorizontal: 18, borderRadius: 20, backgroundColor: '#E5E7EB' },
    activeTab: { backgroundColor: '#6C63FF' },
    tabText: { fontSize: 13, fontWeight: '600', color: '#6B7280' },
    activeTabText: { color: '#fff' },
    listContent: { paddingHorizontal: 20, paddingBottom: 20 },
    chatCard: { backgroundColor: '#fff', borderRadius: 16, marginBottom: 12, overflow: 'hidden', elevation: 2 },
    row: { flexDirection: 'row', padding: 15 },
    avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#E2E8F0' },
    content: { flex: 1, marginLeft: 12, justifyContent: 'center' },
    headerRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
    name: { fontSize: 16, fontWeight: '700', color: '#111', flex: 1 },
    time: { fontSize: 11, color: '#9CA3AF' },
    subHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
    badge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginRight: 8 },
    badgeEmployer: { backgroundColor: '#3B82F6' },
    badgeSeeker: { backgroundColor: '#10B981' },
    badgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },
    ticketId: { fontSize: 11, color: '#6B7280' },
    messageRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    message: { fontSize: 13, color: '#6B7280', flex: 1, marginRight: 10 },
    messageBold: { color: '#111', fontWeight: '600' },
    unreadBadge: { backgroundColor: '#EF4444', borderRadius: 10, minWidth: 20, height: 20, justifyContent: 'center', alignItems: 'center' },
    unreadText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
    statusStripe: { height: 4, width: '100%' },
});

export default ETChatScreen;