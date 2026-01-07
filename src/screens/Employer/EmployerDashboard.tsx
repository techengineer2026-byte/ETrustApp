// src/screens/Employer/EmployerDashboard.tsx

import React , { useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    StatusBar,
    Modal,
    Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

// --- Configuration ---
const { width } = Dimensions.get('window');
const PRIMARY_COLOR = '#2563EB'; // Brand Blue
const BG_COLOR = '#F3F4F6';
const TEXT_COLOR = '#111827';
const GRAY_TEXT = '#6B7280';

// --- Mock Data ---
const STATS = [
    { label: 'New Applicants', value: '42', icon: 'account-group', color: '#10B981' },
    { label: 'Active Jobs', value: '3', icon: 'briefcase-check', color: PRIMARY_COLOR },
    { label: 'Interviews', value: '8', icon: 'calendar-clock', color: '#8B5CF6' },
];

const RECENT_APPLICANTS = [
    { id: '1', name: 'Rahul Sharma', role: 'React Native Dev', time: '2h ago', img: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: '2', name: 'Priya Verma', role: 'UI/UX Designer', time: '5h ago', img: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: '3', name: 'Amit Kumar', role: 'Backend Engineer', time: '1d ago', img: 'https://randomuser.me/api/portraits/men/85.jpg' },
];

const ACTIVE_JOBS = [
    { id: '1', title: 'Senior React Native Developer', applicants: 24, location: 'Remote', status: 'Active' },
    { id: '2', title: 'UI/UX Designer', applicants: 18, location: 'Bangalore', status: 'Active' },
];

export default function EmployerDashboard({ navigation }: any) {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);

    // --- Components ---

    const StatCard = ({ item }: any) => (
        <View style={styles.statCard}>
            <View style={[styles.statIconBox, { backgroundColor: item.color + '15' }]}>
                <MaterialCommunityIcons name={item.icon} size={24} color={item.color} />
            </View>
            <Text style={styles.statValue}>{item.value}</Text>
            <Text style={styles.statLabel}>{item.label}</Text>
        </View>
    );

    const ApplicantItem = ({ item }: any) => (
        <View style={styles.applicantRow}>
            <Image source={{ uri: item.img }} style={styles.avatar} />
            <View style={styles.applicantInfo}>
                <Text style={styles.applicantName}>{item.name}</Text>
                <Text style={styles.applicantRole}>{item.role}</Text>
            </View>
            <View style={styles.timeTag}>
                <Text style={styles.timeText}>{item.time}</Text>
            </View>
            <TouchableOpacity style={styles.arrowBtn}>
                <Feather name="chevron-right" size={20} color={GRAY_TEXT} />
            </TouchableOpacity>
        </View>
    );

    const JobCard = ({ item }: any) => (
        <View style={styles.jobCard}>
            <View style={styles.jobHeader}>
                <View>
                    <Text style={styles.jobTitle}>{item.title}</Text>
                    <Text style={styles.jobLocation}><Ionicons name="location-sharp" size={12} /> {item.location}</Text>
                </View>
                <TouchableOpacity>
                    <Feather name="more-horizontal" size={20} color={GRAY_TEXT} />
                </TouchableOpacity>
            </View>

            <View style={styles.jobFooter}>
                <View style={styles.applicantBadge}>
                    <MaterialCommunityIcons name="account-outline" size={16} color={PRIMARY_COLOR} />
                    <Text style={styles.applicantCount}>{item.applicants} Candidates</Text>
                </View>
                <View style={styles.statusPill}>
                    <View style={styles.activeDot} />
                    <Text style={styles.statusText}>{item.status}</Text>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F3F4F6" />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Image
                        source={{ uri: 'https://randomuser.me/api/portraits/lego/1.jpg' }}
                        style={styles.profileImage}
                    />
                    <View>
                        <Text style={styles.greeting}>Hello,</Text>
                        <Text style={styles.companyName}>Employment Trust</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.notificationBtn}>
                    <Ionicons name="notifications-outline" size={24} color={TEXT_COLOR} />
                    <View style={styles.redDot} />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Banner - Navigates to PostJob Tab */}
                <View style={styles.bannerContainer}>
                    <View>
                        <Text style={styles.bannerTitle}>Find your next hire</Text>
                        <Text style={styles.bannerSubtitle}>2 Free job posts remaining</Text>
                        <TouchableOpacity
                            style={styles.postJobBtn}
                            onPress={() => navigation.navigate('PostJob')}
                        >
                            <Feather name="plus-circle" size={18} color="white" />
                            <Text style={styles.postJobText}>Post a Job</Text>
                        </TouchableOpacity>
                    </View>
                    <MaterialCommunityIcons name="rocket-launch-outline" size={80} color="rgba(255,255,255,0.2)" style={styles.bannerIcon} />
                </View>

                {/* Stats */}
                <View style={styles.statsContainer}>
                    {STATS.map((stat, index) => (
                        <StatCard key={index} item={stat} />
                    ))}
                </View>

                {/* Recent Applicants */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Recent Applicants</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Jobs')}>
                        <Text style={styles.seeAllText}>See All</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.cardContainer}>
                    {RECENT_APPLICANTS.map((applicant) => (
                        <ApplicantItem key={applicant.id} item={applicant} />
                    ))}
                </View>

                {/* Active Jobs */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Active Jobs</Text>
                </View>

                <View style={{ gap: 16 }}>
                    {ACTIVE_JOBS.map((job) => (
                        <JobCard key={job.id} item={job} />
                    ))}
                </View>
            </ScrollView>

            {/* DETAIL MODAL */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>
                                {selectedItem?.type === 'applicant' ? 'Applicant Details' : 'Job Details'}
                            </Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Ionicons name="close" size={24} color={GRAY_TEXT} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.modalBody}>
                            {selectedItem?.type === 'applicant' ? (
                                <>
                                    <Image source={{ uri: selectedItem?.img }} style={{ width: 60, height: 60, borderRadius: 30, marginBottom: 10 }} />
                                    <Text style={styles.applicantName}>{selectedItem?.name}</Text>
                                    <Text style={styles.applicantRole}>{selectedItem?.role}</Text>
                                    <Text style={{ marginTop: 10, color: GRAY_TEXT }}>{selectedItem?.details}</Text>
                                </>
                            ) : (
                                <>
                                    <Text style={styles.jobTitle}>{selectedItem?.title}</Text>
                                    <Text style={styles.jobLocation}>{selectedItem?.location}</Text>
                                    <Text style={{ marginTop: 10, color: GRAY_TEXT }}>Applicants: {selectedItem?.applicants}</Text>
                                    <Text style={{ color: GRAY_TEXT }}>Status: {selectedItem?.status}</Text>
                                </>
                            )}
                        </View>

                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.modalButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: BG_COLOR,
    },
    // Header
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: BG_COLOR,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 45,
        height: 45,
        borderRadius: 12,
        marginRight: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    greeting: {
        fontSize: 14,
        color: GRAY_TEXT,
        fontWeight: '500',
    },
    companyName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: TEXT_COLOR,
    },
    notificationBtn: {
        padding: 8,
        backgroundColor: 'white',
        borderRadius: 50,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    redDot: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#EF4444',
        borderWidth: 1,
        borderColor: 'white',
    },

    // Scroll Content
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 20, // Reduced from 100 since tab bar is gone
    },

    // Banner
    bannerContainer: {
        marginTop: 10,
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 20,
        padding: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden',
        elevation: 4,
        shadowColor: PRIMARY_COLOR,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    bannerTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    bannerSubtitle: {
        color: '#DBEAFE',
        fontSize: 14,
        marginBottom: 16,
    },
    postJobBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    postJobText: {
        color: 'white',
        fontWeight: '600',
        marginLeft: 8,
    },
    bannerIcon: {
        position: 'absolute',
        right: -10,
        bottom: -10,
    },

    // Stats
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
    },
    statCard: {
        backgroundColor: 'white',
        width: '31%',
        padding: 12,
        borderRadius: 16,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    statIconBox: {
        padding: 8,
        borderRadius: 50,
        marginBottom: 8,
    },
    statValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: TEXT_COLOR,
    },
    statLabel: {
        fontSize: 11,
        color: GRAY_TEXT,
        textAlign: 'center',
    },

    // Section Headers
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 28,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: TEXT_COLOR,
    },
    seeAllText: {
        color: PRIMARY_COLOR,
        fontWeight: '600',
        fontSize: 14,
    },

    // Recent Applicants Card Container
    cardContainer: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 8,
        elevation: 1,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    applicantRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E5E7EB',
    },
    applicantInfo: {
        flex: 1,
        marginLeft: 12,
    },
    applicantName: {
        fontSize: 15,
        fontWeight: '600',
        color: TEXT_COLOR,
    },
    applicantRole: {
        fontSize: 13,
        color: GRAY_TEXT,
    },
    timeTag: {
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    timeText: {
        fontSize: 10,
        color: GRAY_TEXT,
        fontWeight: '600',
    },
    arrowBtn: {
        marginLeft: 8,
    },

    // Job Card
    jobCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    jobHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    jobTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: TEXT_COLOR,
        marginBottom: 4,
    },
    jobLocation: {
        fontSize: 13,
        color: GRAY_TEXT,
    },
    jobFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
    },
    applicantBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EFF6FF',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
    },
    applicantCount: {
        color: PRIMARY_COLOR,
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 4,
    },
    statusPill: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    activeDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#10B981',
        marginRight: 6,
    },
    statusText: {
        color: '#10B981',
        fontSize: 12,
        fontWeight: '600',
    },

    // MODAL STYLES
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    modalContent: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        elevation: 5
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: TEXT_COLOR
    },
    modalBody: {
        marginBottom: 20
    },
    modalButton: {
        backgroundColor: PRIMARY_COLOR,
        padding: 12,
        borderRadius: 10,
        alignItems: 'center'
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold'
    }
});