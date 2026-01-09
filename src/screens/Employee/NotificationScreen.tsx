// src/screens/Employee/NotificationScreen.tsx

import React, { useState, useCallback } from 'react'; // Added useCallback
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ListRenderItem } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

// Import types from the central types file
import { NotificationItem, NotificationType } from '../../types'; // Adjust path if necessary, e.g., '../../types'

// --- HELPER: Get Icon & Color based on type ---
const getNotificationStyle = (type: NotificationType) => {
    switch (type) {
        case 'interview':
            return { icon: 'calendar-check', color: '#27AE60', bg: '#E8F8F5' };
        case 'job_alert':
            return { icon: 'bell-ring', color: '#EB5757', bg: '#FDEDEC' };
        case 'application':
            return { icon: 'briefcase-eye', color: '#2F80ED', bg: '#EAF2F8' };
        case 'system':
        default:
            return { icon: 'information', color: '#F2994A', bg: '#FEF5E7' };
    }
};

// Update props interface
interface NotificationScreenProps {
    navigation: any;
    notifications: NotificationItem[]; // Now received as a prop
    setNotifications: React.Dispatch<React.SetStateAction<NotificationItem[]>>; // To update read status
}

export default function NotificationScreen(
    { navigation, notifications, setNotifications }: NotificationScreenProps
) {
    // No need for local useState for notifications here anymore, use props

    // Function to mark all as read
    const markAllRead = useCallback(() => {
        const updated = notifications.map(n => ({ ...n, read: true }));
        setNotifications(updated);
    }, [notifications, setNotifications]); // Add dependencies

    // Function to mark a single notification as read (optional, but good for UX)
    const markAsRead = useCallback((id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    }, [setNotifications]);


    const renderItem: ListRenderItem<NotificationItem> = ({ item }) => {
        const { icon, color, bg } = getNotificationStyle(item.type);

        return (
            <TouchableOpacity
                style={[styles.card, !item.read && styles.unreadCard]}
                activeOpacity={0.7}
                onPress={() => markAsRead(item.id)} // Mark as read on press
            >
                {/* Icon Box */}
                <View style={[styles.iconContainer, { backgroundColor: bg }]}>
                    <MaterialCommunityIcons name={icon} size={24} color={color} />
                </View>

                {/* Content */}
                <View style={styles.contentContainer}>
                    <View style={styles.headerRow}>
                        <Text style={[styles.title, !item.read && styles.unreadText]}>
                            {item.title}
                        </Text>
                        <Text style={styles.time}>{item.time}</Text>
                    </View>

                    <Text style={styles.message} numberOfLines={2}>
                        {item.message}
                    </Text>
                </View>

                {/* Unread Dot */}
                {!item.read && <View style={styles.dot} />}
            </TouchableOpacity>
        );
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>Alerts</Text>
                    <Text style={styles.headerSubtitle}>
                        You have {unreadCount} new notifications
                    </Text>
                </View>

                {/* Mark Read Button (only show if there are unread notifications) */}
                {unreadCount > 0 && (
                    <TouchableOpacity onPress={markAllRead}>
                        <Text style={styles.markReadText}>Mark all read</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* List */}
            <FlatList
                data={notifications}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <MaterialCommunityIcons name="bell-sleep-outline" size={60} color="#D1D1D6" />
                        <Text style={styles.emptyText}>No notifications yet</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F8FA', // Consistent background
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: '#F7F8FA',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: '#1C1C1E',
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#8E8E93',
        marginTop: 4,
    },
    markReadText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#EB5757', // Using your Red accent
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },

    // --- CARD STYLES ---
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        // Shadows
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    unreadCard: {
        borderLeftWidth: 3,
        borderLeftColor: '#EB5757', // Red accent on left edge
        backgroundColor: '#FFF',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    contentContainer: {
        flex: 1,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1C1C1E',
        flex: 1,
        marginRight: 8,
    },
    unreadText: {
        fontWeight: '800', // Bolder title for unread
    },
    time: {
        fontSize: 12,
        color: '#C7C7CC',
    },
    message: {
        fontSize: 14,
        color: '#8E8E93',
        lineHeight: 20,
    },
    // Red Dot for unread status
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#EB5757',
        marginLeft: 8,
    },

    // Empty State
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#8E8E93',
        marginTop: 15,
    },
});