// src/screens/Employee/NotificationScreen.tsx

import React, { useState, useCallback, useMemo } from 'react';
import {
    View,
    Text,
    SectionList,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Modal, // Import Modal
    LayoutAnimation,
    Platform,
    UIManager,
    Dimensions
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NotificationItem, NotificationType } from '../../types';

// Enable LayoutAnimation
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width } = Dimensions.get('window');

// --- CONFIG: Colors & Icons ---
const getNotificationStyle = (type: NotificationType) => {
    switch (type) {
        case 'interview':
            return { icon: 'calendar-star', color: '#00B894', bg: '#E3FDF5', label: 'Interview' };
        case 'job_alert':
            return { icon: 'briefcase-search', color: '#6C5CE7', bg: '#ECEAF9', label: 'Job Alert' };
        case 'application':
            return { icon: 'file-document-edit', color: '#0984E3', bg: '#E1F0FD', label: 'Application' };
        case 'system':
        default:
            return { icon: 'shield-check', color: '#FAB1A0', bg: '#FFF5F2', label: 'System' };
    }
};

interface NotificationScreenProps {
    navigation: any;
    notifications: NotificationItem[];
    setNotifications: React.Dispatch<React.SetStateAction<NotificationItem[]>>;
}

export default function NotificationScreen({ navigation, notifications, setNotifications }: NotificationScreenProps) {
    const [activeFilter, setActiveFilter] = useState<string>('All');

    // NEW: State for the selected notification (Modal)
    const [selectedItem, setSelectedItem] = useState<NotificationItem | null>(null);

    // 1. Separate Notifications
    const sections = useMemo(() => {
        const unread = notifications.filter(n => !n.read);
        const read = notifications.filter(n => n.read);
        const result = [];
        if (unread.length > 0) result.push({ title: 'New', data: unread });
        if (read.length > 0) result.push({ title: 'Earlier', data: read });
        return result;
    }, [notifications, activeFilter]);

    // 2. Actions
    const markAllRead = useCallback(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const updated = notifications.map(n => ({ ...n, read: true }));
        setNotifications(updated);
    }, [notifications, setNotifications]);

    const handlePressItem = (item: NotificationItem) => {
        // 1. Mark as read
        if (!item.read) {
            setNotifications(prev => prev.map(n => n.id === item.id ? { ...n, read: true } : n));
        }
        // 2. Open Modal
        setSelectedItem(item);
    };

    const renderSectionHeader = ({ section: { title } }: any) => (
        <View style={styles.sectionHeaderBox}>
            <Text style={styles.sectionTitle}>{title}</Text>
        </View>
    );

    const renderItem = ({ item }: { item: NotificationItem }) => {
        const { icon, color, bg, label } = getNotificationStyle(item.type);

        return (
            <TouchableOpacity
                style={[styles.card, !item.read && styles.unreadCard]}
                activeOpacity={0.8}
                onPress={() => handlePressItem(item)} // Changed handler
            >
                <View style={[styles.iconBox, { backgroundColor: bg }]}>
                    <MaterialCommunityIcons name={icon} size={22} color={color} />
                </View>

                <View style={styles.contentBox}>
                    <View style={styles.topRow}>
                        <View style={styles.tagRow}>
                            <View style={[styles.miniTag, { backgroundColor: bg }]}>
                                <Text style={[styles.miniTagText, { color: color }]}>{label}</Text>
                            </View>
                            {!item.read && <View style={styles.newBadge}><Text style={styles.newBadgeText}>NEW</Text></View>}
                        </View>
                        <Text style={styles.timeText}>{item.time}</Text>
                    </View>

                    <Text style={[styles.itemTitle, !item.read && styles.boldTitle]}>{item.title}</Text>
                    <Text style={styles.itemMessage} numberOfLines={2}>{item.message}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    // --- RENDER MODAL CONTENT ---
    const renderModal = () => {
        if (!selectedItem) return null;
        const { icon, color, bg, label } = getNotificationStyle(selectedItem.type);

        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={!!selectedItem}
                onRequestClose={() => setSelectedItem(null)}
            >
                <View style={styles.modalOverlay}>
                    {/* Backdrop Tap to Close */}
                    <TouchableOpacity
                        style={styles.backdropLayer}
                        activeOpacity={1}
                        onPress={() => setSelectedItem(null)}
                    />

                    {/* The Modal Card */}
                    <View style={styles.modalCard}>
                        {/* Decorative Header Line */}
                        <View style={styles.modalHandle} />

                        {/* Large Icon */}
                        <View style={[styles.modalIconBox, { backgroundColor: bg }]}>
                            <MaterialCommunityIcons name={icon} size={40} color={color} />
                        </View>

                        <Text style={styles.modalLabel}>{label}</Text>
                        <Text style={styles.modalTitle}>{selectedItem.title}</Text>
                        <Text style={styles.modalTime}>{selectedItem.time}</Text>

                        <View style={styles.divider} />

                        <Text style={styles.modalMessage}>
                            {selectedItem.message}
                        </Text>

                        {/* Action Button */}
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setSelectedItem(null)}
                        >
                            <Text style={styles.closeButtonText}>Okay, Got it</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <StatusBar barStyle="dark-content" />

            {/* HEADER */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>Activity</Text>
                    <Text style={styles.headerDate}>Stay updated with your applications</Text>
                </View>
                <TouchableOpacity style={styles.readAllBtn} onPress={markAllRead}>
                    <MaterialCommunityIcons name="playlist-check" size={20} color="#1C1C1E" />
                </TouchableOpacity>
            </View>

            {/* FILTERS */}
            <View style={styles.filterContainer}>
                {['All', 'Interviews', 'Alerts', 'System'].map((filter) => (
                    <TouchableOpacity
                        key={filter}
                        style={[styles.filterChip, activeFilter === filter && styles.activeFilterChip]}
                        onPress={() => setActiveFilter(filter)}
                    >
                        <Text style={[styles.filterText, activeFilter === filter && styles.activeFilterText]}>
                            {filter}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* LIST */}
            <SectionList
                sections={sections}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                contentContainerStyle={styles.listContent}
                stickySectionHeadersEnabled={false}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <View style={styles.emptyIconBg}>
                            <MaterialCommunityIcons name="bell-off-outline" size={40} color="#B2B2B2" />
                        </View>
                        <Text style={styles.emptyText}>All caught up!</Text>
                        <Text style={styles.emptySubText}>No new notifications at the moment.</Text>
                    </View>
                }
            />

            {/* INJECT MODAL */}
            {renderModal()}

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FC' },

    // --- MODAL STYLES (NEW) ---
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)', // Dim background
        justifyContent: 'center',
        alignItems: 'center',
    },
    backdropLayer: {
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0
    },
    modalCard: {
        width: width * 0.85,
        backgroundColor: 'white',
        borderRadius: 30,
        padding: 30,
        alignItems: 'center',
        // Heavy Shadow for Pop effect
        shadowColor: "#000", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.25, shadowRadius: 10, elevation: 10,
    },
    modalHandle: {
        width: 40, height: 4, backgroundColor: '#E0E0E0', borderRadius: 2, marginBottom: 20
    },
    modalIconBox: {
        width: 80, height: 80, borderRadius: 25,
        justifyContent: 'center', alignItems: 'center', marginBottom: 15,
    },
    modalLabel: {
        fontSize: 12, fontWeight: '700', color: '#B2BEC3', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 5
    },
    modalTitle: {
        fontSize: 22, fontWeight: '800', color: '#2D3436', textAlign: 'center', marginBottom: 5
    },
    modalTime: {
        fontSize: 14, color: '#B2BEC3', fontWeight: '500', marginBottom: 20
    },
    divider: {
        width: '100%', height: 1, backgroundColor: '#F0F0F0', marginBottom: 20
    },
    modalMessage: {
        fontSize: 16, color: '#636E72', lineHeight: 24, textAlign: 'center', marginBottom: 30
    },
    closeButton: {
        backgroundColor: '#1C1C1E',
        paddingVertical: 14, paddingHorizontal: 40,
        borderRadius: 16,
        width: '100%', alignItems: 'center'
    },
    closeButtonText: {
        color: 'white', fontSize: 16, fontWeight: '700'
    },

    // --- EXISTING LIST STYLES ---
    header: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        paddingHorizontal: 24, paddingTop: 10, paddingBottom: 20,
    },
    headerTitle: { fontSize: 32, fontWeight: '800', color: '#2D3436', letterSpacing: -1 },
    headerDate: { fontSize: 14, color: '#A0A4A8', fontWeight: '500', marginTop: 4 },
    readAllBtn: {
        width: 44, height: 44, borderRadius: 14, backgroundColor: 'white',
        justifyContent: 'center', alignItems: 'center',
        shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3,
    },
    filterContainer: { flexDirection: 'row', paddingHorizontal: 24, marginBottom: 10 },
    filterChip: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, backgroundColor: 'white', marginRight: 10, borderWidth: 1, borderColor: '#F0F0F0' },
    activeFilterChip: { backgroundColor: '#2D3436', borderColor: '#2D3436' },
    filterText: { fontSize: 13, fontWeight: '600', color: '#A0A4A8' },
    activeFilterText: { color: 'white' },
    listContent: { paddingHorizontal: 24, paddingBottom: 40 },
    sectionHeaderBox: { paddingVertical: 15, backgroundColor: '#F8F9FC' },
    sectionTitle: { fontSize: 14, fontWeight: '700', color: '#636E72', textTransform: 'uppercase', letterSpacing: 1 },
    card: {
        flexDirection: 'row', backgroundColor: 'white', borderRadius: 24, padding: 16, marginBottom: 16, alignItems: 'flex-start',
        shadowColor: '#636E72', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.05, shadowRadius: 15, elevation: 2,
    },
    unreadCard: { borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)', backgroundColor: '#FFFFFF' },
    iconBox: { width: 50, height: 50, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
    contentBox: { flex: 1 },
    topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
    tagRow: { flexDirection: 'row', alignItems: 'center' },
    miniTag: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, marginRight: 6 },
    miniTagText: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase' },
    newBadge: { backgroundColor: '#FF7675', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
    newBadgeText: { color: 'white', fontSize: 9, fontWeight: '800' },
    timeText: { fontSize: 12, color: '#B2BEC3', fontWeight: '500' },
    itemTitle: { fontSize: 16, fontWeight: '600', color: '#2D3436', marginBottom: 4 },
    boldTitle: { fontWeight: '800', color: '#000' },
    itemMessage: { fontSize: 14, color: '#636E72', lineHeight: 20 },
    emptyState: { alignItems: 'center', justifyContent: 'center', marginTop: 80 },
    emptyIconBg: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#F0F2F5', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
    emptyText: { fontSize: 18, fontWeight: '700', color: '#2D3436' },
    emptySubText: { fontSize: 14, color: '#A0A4A8', marginTop: 5 },
});