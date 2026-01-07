// src/screens/Employee/NotificationScreen.tsx

import React, { useState } from 'react';
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
type NotificationType = "interview" | "job_alert" | "application" | "system";
type NotificationItem = {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    time: string;
    read: boolean;
};

// --- MOCK DATA ---
const NOTIFICATIONS_DATA: NotificationItem[] = [
    {
        id: '1',
        type: 'interview', // interview, job_alert, system, application
        title: 'Interview Scheduled',
        message: 'Infosys has scheduled an interview for Frontend Developer role.',
        time: '10 min ago',
        read: false,
    },
    {
        id: '2',
        type: 'job_alert',
        title: 'New Job Alert',
        message: '3 new jobs match your preferences for "React Native".',
        time: '2 hours ago',
        read: false,
    },
    {
        id: '3',
        type: 'application',
        title: 'Application Viewed',
        message: 'Tech Mahindra viewed your application for Backend Developer.',
        time: '5 hours ago',
        read: true,
    },
    {
        id: '4',
        type: 'system',
        title: 'Profile Incomplete',
        message: 'Add your resume to increase your chances by 50%.',
        time: '1 day ago',
        read: true,
    },
    {
        id: '5',
        type: 'application',
        title: 'Application Update',
        message: 'Sadly, Wipro has decided not to move forward.',
        time: '2 days ago',
        read: true,
    },
];

// --- HELPER: Get Icon & Color based on type ---
const getNotificationStyle = (type: NotificationType) => {
    switch (type) {
        case 'interview':
            return { icon: 'calendar-check', color: '#27AE60', bg: '#E8F8F5' };
        case 'job_alert':
            return { icon: 'bell-ring', color: '#EB5757', bg: '#FDEDEC' }; // Using your Tab Color
        case 'application':
            return { icon: 'briefcase-eye', color: '#2F80ED', bg: '#EAF2F8' };
        case 'system':
        default:
            return { icon: 'information', color: '#F2994A', bg: '#FEF5E7' };
    }
};

export default function NotificationScreen(
    { navigation }: { navigation: any }
) {
    const [notifications, setNotifications] =
        useState<NotificationItem[]>(NOTIFICATIONS_DATA);

    // Function to mark all as read (Mock logic)
    const markAllRead = () => {
        const updated = notifications.map(n => ({ ...n, read: true }));
        setNotifications(updated);
    };

    const renderItem: ListRenderItem<NotificationItem> = ({ item }) => {
        const { icon, color, bg } = getNotificationStyle(item.type);

        return (
            <TouchableOpacity
                style={[styles.card, !item.read && styles.unreadCard]}
                activeOpacity={0.7}
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

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>Alerts</Text>
                    <Text style={styles.headerSubtitle}>
                        You have {notifications.filter(n => !n.read).length} new notifications
                    </Text>
                </View>

                {/* Mark Read Button */}
                <TouchableOpacity onPress={markAllRead}>
                    <Text style={styles.markReadText}>Mark all read</Text>
                </TouchableOpacity>
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