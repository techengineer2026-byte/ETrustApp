import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Modal,
    Dimensions,
    Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

// --- TYPES ---
interface DeviceSession {
    id: string;
    deviceName: string;
    os: string;
    location: string;
    lastActive: string;
    isCurrent: boolean;
    type: 'mobile' | 'desktop' | 'tablet';
}

// --- MOCK DATA ---
const INITIAL_SESSIONS: DeviceSession[] = [
    {
        id: '1',
        deviceName: 'iPhone 14 Pro',
        os: 'iOS 17.0.1',
        location: 'Mumbai, India',
        lastActive: 'Active now',
        isCurrent: true,
        type: 'mobile',
    },
    {
        id: '2',
        deviceName: 'MacBook Pro',
        os: 'macOS Sonoma',
        location: 'Mumbai, India',
        lastActive: '2 hours ago',
        isCurrent: false,
        type: 'desktop',
    },
    {
        id: '3',
        deviceName: 'Chrome on Windows',
        os: 'Windows 11',
        location: 'Delhi, India',
        lastActive: 'Yesterday',
        isCurrent: false,
        type: 'desktop',
    },
];

export default function LogoutFromAllDevicesScreen() {
    const navigation = useNavigation();

    // --- STATE ---
    const [sessions, setSessions] = useState<DeviceSession[]>(INITIAL_SESSIONS);
    const [isLoading, setIsLoading] = useState(false);

    // --- MODAL STATE ---
    const [modalVisible, setModalVisible] = useState(false);
    const [modalConfig, setModalConfig] = useState({
        type: 'confirm', // 'confirm' | 'success'
        title: '',
        message: '',
        confirmText: 'Yes, Logout',
        cancelText: 'Cancel',
        onConfirm: () => { },
    });

    // --- LOGIC ---
    const handleLogoutPress = () => {
        const otherDevicesCount = sessions.length - 1;
        if (otherDevicesCount <= 0) return;

        setModalConfig({
            type: 'confirm',
            title: 'Logout All Devices?',
            message: `You will be logged out of ${otherDevicesCount} other device${otherDevicesCount > 1 ? 's' : ''}. Your current session will stay active.`,
            confirmText: 'Logout All',
            cancelText: 'Cancel',
            onConfirm: performLogout
        });
        setModalVisible(true);
    };

    const performLogout = () => {
        // 1. Close confirm modal
        setModalVisible(false);
        setIsLoading(true);

        // 2. Simulate API Call
        setTimeout(() => {
            setIsLoading(false);

            // 3. Update State (Remove everyone except current)
            const currentDevice = sessions.find(s => s.isCurrent);
            if (currentDevice) {
                setSessions([currentDevice]);
            }

            // 4. Show Success Modal
            setTimeout(() => {
                setModalConfig({
                    type: 'success',
                    title: 'Devices Logged Out',
                    message: 'All other sessions have been successfully terminated.',
                    confirmText: 'Done',
                    cancelText: '',
                    onConfirm: () => setModalVisible(false)
                });
                setModalVisible(true);
            }, 300);

        }, 2000);
    };

    const getIconName = (type: string) => {
        switch (type) {
            case 'desktop': return 'laptop';
            case 'tablet': return 'tablet-ipad';
            default: return 'cellphone';
        }
    };

    // --- RENDER ITEM ---
    const renderSessionItem = (item: DeviceSession) => (
        <View key={item.id} style={[styles.card, item.isCurrent && styles.currentCard]}>
            <View style={styles.cardIcon}>
                <MaterialCommunityIcons
                    name={getIconName(item.type)}
                    size={28}
                    color={item.isCurrent ? '#166534' : '#555'}
                />
            </View>
            <View style={styles.cardContent}>
                <View style={styles.rowTitle}>
                    <Text style={styles.deviceName}>{item.deviceName}</Text>
                    {item.isCurrent && (
                        <View style={styles.currentBadge}>
                            <Text style={styles.currentBadgeText}>THIS DEVICE</Text>
                        </View>
                    )}
                </View>
                <Text style={styles.deviceDetail}>{item.os} • {item.location}</Text>
                <Text style={[styles.lastActive, item.isCurrent && styles.activeText]}>
                    {item.lastActive}
                </Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Active Sessions</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

                {/* HERO ILLUSTRATION */}
                <View style={styles.heroSection}>
                    <View style={styles.heroIconCircle}>
                        <MaterialCommunityIcons name="shield-account-outline" size={40} color="#3B82F6" />
                    </View>
                    <Text style={styles.heroTitle}>Manage Access</Text>
                    <Text style={styles.heroSubtitle}>
                        If you see a device you don't recognize, log out of all devices immediately and change your password.
                    </Text>
                </View>

                {/* SESSION LIST */}
                <Text style={styles.sectionHeader}>Where you're logged in</Text>
                {sessions.map(renderSessionItem)}

            </ScrollView>

            {/* FOOTER ACTION */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={[
                        styles.logoutButton,
                        sessions.length <= 1 && styles.logoutButtonDisabled
                    ]}
                    onPress={handleLogoutPress}
                    disabled={sessions.length <= 1 || isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.logoutButtonText}>
                            Log out of all other devices
                        </Text>
                    )}
                </TouchableOpacity>
            </View>

            {/* --- CUSTOM MODAL --- */}
            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="fade"
                onRequestClose={() => { }}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {/* Icon */}
                        <View style={[
                            styles.modalIconContainer,
                            { backgroundColor: modalConfig.type === 'success' ? '#DCFCE7' : '#FEE2E2' }
                        ]}>
                            <MaterialCommunityIcons
                                name={modalConfig.type === 'success' ? "check-bold" : "logout-variant"}
                                size={28}
                                color={modalConfig.type === 'success' ? "#166534" : "#991B1B"}
                            />
                        </View>

                        {/* Text */}
                        <Text style={styles.modalTitle}>{modalConfig.title}</Text>
                        <Text style={styles.modalMessage}>{modalConfig.message}</Text>

                        {/* Buttons */}
                        <View style={styles.modalButtonRow}>
                            {modalConfig.type === 'confirm' && (
                                <TouchableOpacity
                                    style={styles.modalButtonCancel}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.modalTextCancel}>{modalConfig.cancelText}</Text>
                                </TouchableOpacity>
                            )}

                            <TouchableOpacity
                                style={[
                                    styles.modalButtonConfirm,
                                    modalConfig.type === 'confirm' ? { backgroundColor: '#EF4444' } : { backgroundColor: '#166534', width: '100%' }
                                ]}
                                onPress={modalConfig.onConfirm}
                            >
                                <Text style={styles.modalTextConfirm}>{modalConfig.confirmText}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#fff',
    },
    backButton: { padding: 5 },
    headerTitle: { fontSize: 18, fontWeight: '700', color: '#111' },

    container: {
        padding: 20,
        paddingBottom: 40,
    },

    // HERO
    heroSection: {
        alignItems: 'center',
        marginBottom: 30,
        paddingHorizontal: 20,
    },
    heroIconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#EFF6FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    heroTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#1F2937',
        marginBottom: 8,
    },
    heroSubtitle: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: 20,
    },

    sectionHeader: {
        fontSize: 14,
        fontWeight: '700',
        color: '#6B7280',
        marginBottom: 12,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },

    // CARDS
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        // Shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
    },
    currentCard: {
        borderColor: '#22c55e',
        borderWidth: 1,
        backgroundColor: '#F0FDF4',
    },
    cardIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#f3f4f6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    cardContent: {
        flex: 1,
    },
    rowTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    deviceName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1F2937',
    },
    currentBadge: {
        backgroundColor: '#DCFCE7',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        marginLeft: 8,
    },
    currentBadgeText: {
        color: '#166534',
        fontSize: 10,
        fontWeight: '700',
    },
    deviceDetail: {
        fontSize: 13,
        color: '#6B7280',
        marginBottom: 4,
    },
    lastActive: {
        fontSize: 12,
        color: '#9CA3AF',
    },
    activeText: {
        color: '#166534',
        fontWeight: '600',
    },

    // FOOTER
    footer: {
        padding: 20,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    logoutButton: {
        backgroundColor: '#EF4444',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: "#EF4444",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 3,
    },
    logoutButtonDisabled: {
        backgroundColor: '#FCA5A5',
        shadowOpacity: 0,
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },

    // MODAL
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 24,
        width: width - 48,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 10,
    },
    modalIconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#1F2937',
        marginBottom: 8,
        textAlign: 'center',
    },
    modalMessage: {
        fontSize: 15,
        color: '#6B7280',
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 22,
    },
    modalButtonRow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        gap: 12,
    },
    modalButtonCancel: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
    },
    modalButtonConfirm: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    modalTextCancel: {
        color: '#374151',
        fontWeight: '600',
        fontSize: 16,
    },
    modalTextConfirm: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});