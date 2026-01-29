// src/screens/Employee/AppliedJobsScreen.tsx

import React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Alert,
    ListRenderItem
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

// Import shared types
import { AppliedJob, JobStatus } from '../../types';

// --- PROPS INTERFACE ---
interface AppliedJobsScreenProps {
    navigation: any;
    appliedJobs: AppliedJob[];
    // Callback to trigger status change & notification in App.tsx
    onUpdateJobStatus: (jobId: number, newStatus: JobStatus, message: string) => void;
}

// --- HELPER COMPONENT: STATUS BADGE ---
type StatusBadgeProps = {
    status: JobStatus;
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    let bg, color, icon;

    switch (status) {
        case "Interview":
            bg = "#E8F8F5"; color = "#27AE60"; icon = "calendar-clock";
            break;
        case "Rejected":
            bg = "#FDEDEC"; color = "#E74C3C"; icon = "close-circle-outline";
            break;
        case "Offer":
            bg = "#F4ECF7"; color = "#8E44AD"; icon = "party-popper";
            break;
        default: // "Pending"
            bg = "#FEF9E7"; color = "#F39C12"; icon = "timer-sand";
    }

    return (
        <View style={[styles.badge, { backgroundColor: bg }]}>
            <MaterialCommunityIcons name={icon} size={14} color={color} style={{ marginRight: 4 }} />
            <Text style={[styles.badgeText, { color }]}>{status}</Text>
        </View>
    );
};

// --- MAIN COMPONENT ---
export default function AppliedJobsScreen({ navigation, appliedJobs, onUpdateJobStatus }: AppliedJobsScreenProps) {
    const renderItem: ListRenderItem<AppliedJob> = ({ item }) => (

        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('ApplicationDetail', { job: item })}

            // DEMO FEATURE: Long press to simulate a status change from the "Employer"
            onLongPress={() => {
                Alert.alert(
                    "Simulate Employer Action",
                    `Change status for "${item.title}"?`,
                    [
                        { text: "Cancel", style: "cancel" },
                        {
                            text: "Set Interview",
                            onPress: () => onUpdateJobStatus(item.id, "Interview", `Great news! ${item.company} wants to interview you.`)
                        },
                        {
                            text: "Send Offer",
                            onPress: () => onUpdateJobStatus(item.id, "Offer", `Congratulations! You received an offer from ${item.company}.`)
                        },
                        {
                            text: "Reject",
                            style: 'destructive',
                            onPress: () => onUpdateJobStatus(item.id, "Rejected", `Update regarding your application at ${item.company}.`)
                        },
                    ]
                );
            }}
        >
            <View style={styles.cardTop}>
                {/* Logo Box */}
                <View style={[styles.logoPlaceholder, { backgroundColor: item.logoColor }]}>
                    <Text style={styles.logoText}>{item.logoInitial}</Text>
                </View>

                {/* Title & Company */}
                <View style={styles.textContainer}>
                    <Text style={styles.jobTitle} numberOfLines={1}>{item.title}</Text>
                    <Text style={styles.companyName}>{item.company}</Text>
                </View>

                {/* Status Badge */}
                <View style={{ marginLeft: 'auto' }}>
                    <StatusBadge status={item.status} />
                </View>
            </View>

            <View style={styles.divider} />

            {/* Footer Info */}
            <View style={styles.cardBottom}>
                <View style={styles.row}>
                    <MaterialCommunityIcons name="map-marker-outline" size={16} color="#8E8E93" />
                    <Text style={styles.metaText}>{item.location}</Text>
                </View>
                <Text style={styles.dateText}>Applied {item.appliedDate}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Applications</Text>
                <View style={styles.headerCountBadge}>
                    <Text style={styles.headerCountText}>{appliedJobs.length}</Text>
                </View>
            </View>

            {/* List */}
            <FlatList
                data={appliedJobs}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <MaterialCommunityIcons name="folder-open-outline" size={60} color="#D1D1D6" />
                        <Text style={styles.emptyText}>No applications yet</Text>
                        <Text style={styles.emptySubText}>Swipe right on jobs to see them here.</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F8FA',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#F7F8FA',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: '#1C1C1E',
    },
    headerCountBadge: {
        backgroundColor: '#E1E4E8',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        marginLeft: 10,
        marginTop: 4,
    },
    headerCountText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#555',
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    // --- CARD STYLES ---
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
        // iOS Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        // Android Shadow
        elevation: 3,
    },
    cardTop: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoPlaceholder: {
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    logoText: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    },
    textContainer: {
        flex: 1,
        marginRight: 8,
    },
    jobTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1C1C1E',
        marginBottom: 2,
    },
    companyName: {
        fontSize: 14,
        color: '#8E8E93',
        fontWeight: '500',
    },
    // --- BADGE ---
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: '700',
    },
    // --- FOOTER ---
    divider: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginVertical: 14,
    },
    cardBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    metaText: {
        fontSize: 13,
        color: '#8E8E93',
        marginLeft: 4,
    },
    dateText: {
        fontSize: 12,
        color: '#C7C7CC',
        fontWeight: '500',
    },
    // --- EMPTY STATE ---
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
    emptySubText: {
        fontSize: 14,
        color: '#C7C7CC',
        marginTop: 5,
    }
});