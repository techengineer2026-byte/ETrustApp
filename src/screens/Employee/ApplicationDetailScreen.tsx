// src/screens/Employee/ApplicationDetailScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppliedJob } from '../../types';

export default function ApplicationDetailScreen({ route, navigation }: any) {
    // Get the job data passed from the previous screen
    const { job } = route.params as { job: AppliedJob };

    // --- HELPER: Calculate Timeline Status ---
    // 0: Pending, 1: Screening, 2: Interview, 3: Offer (or Rejected)
    const getStepIndex = (status: string) => {
        if (status === 'Offer' || status === 'Rejected') return 3;
        if (status === 'Interview') return 2;
        return 0; // Pending implies step 0 or 1
    };

    const currentStep = getStepIndex(job.status);
    const isRejected = job.status === 'Rejected';

    // Timeline Data
    const steps = [
        { title: 'Application Sent', date: job.appliedDate, icon: 'email-check-outline' },
        { title: 'Resume Screening', date: 'In Progress', icon: 'account-search-outline' },
        { title: 'Interview', date: job.status === 'Interview' ? 'Scheduled' : 'Pending', icon: 'human-greeting-proximity' },
        { title: isRejected ? 'Application Closed' : 'HR will calling you!', date: 'Pending', icon: isRejected ? 'close-circle' : 'trophy-outline' },
    ];

    const renderTimelineStep = (step: any, index: number) => {
        const isActive = index <= currentStep;
        const isLast = index === steps.length - 1;

        // Dynamic Colors
        let iconColor = isActive ? '#27AE60' : '#D1D1D6';
        let lineColor = isActive ? '#27AE60' : '#E1E4E8';

        // Special case for Rejected
        if (isRejected && index === currentStep) {
            iconColor = '#E74C3C'; // Red
        }

        return (
            <View key={index} style={styles.stepContainer}>
                {/* Left Side: Line and Icon */}
                <View style={styles.leftColumn}>
                    <View style={[styles.iconCircle, { borderColor: iconColor, backgroundColor: isActive ? iconColor : 'white' }]}>
                        <MaterialCommunityIcons
                            name={step.icon}
                            size={18}
                            color={isActive ? 'white' : '#D1D1D6'}
                        />
                    </View>
                    {!isLast && <View style={[styles.line, { backgroundColor: lineColor }]} />}
                </View>

                {/* Right Side: Text */}
                <View style={styles.rightColumn}>
                    <Text style={[styles.stepTitle, { color: isActive ? '#1C1C1E' : '#8E8E93' }]}>
                        {step.title}
                    </Text>
                    <Text style={styles.stepDate}>{step.date}</Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header with Back Button */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#1C1C1E" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Application Status</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Job Header Card */}
                <View style={styles.jobCard}>
                    <View style={[styles.logoBox, { backgroundColor: job.logoColor }]}>
                        <Text style={styles.logoText}>{job.logoInitial}</Text>
                    </View>
                    <Text style={styles.jobTitle}>{job.title}</Text>
                    <Text style={styles.companyName}>{job.company}</Text>
                    <View style={styles.locationRow}>
                        <MaterialCommunityIcons name="map-marker-outline" size={16} color="#8E8E93" />
                        <Text style={styles.locationText}>{job.location}</Text>
                    </View>
                </View>

                {/* The Unique Timeline */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Timeline</Text>
                    <View style={styles.timelineBox}>
                        {steps.map(renderTimelineStep)}
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F7F8FA' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    backBtn: { padding: 5 },
    headerTitle: { fontSize: 18, fontWeight: '700', color: '#1C1C1E' },
    scrollContent: { paddingBottom: 40 },

    // Job Card
    jobCard: {
        backgroundColor: 'white',
        alignItems: 'center',
        padding: 25,
        margin: 20,
        borderRadius: 20,
        elevation: 2,
        shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }
    },
    logoBox: {
        width: 64, height: 64, borderRadius: 18, justifyContent: 'center', alignItems: 'center',
        marginBottom: 15,
    },
    logoText: { fontSize: 28, color: 'white', fontWeight: 'bold' },
    jobTitle: { fontSize: 20, fontWeight: '800', color: '#1C1C1E', textAlign: 'center', marginBottom: 5 },
    companyName: { fontSize: 16, color: '#8E8E93', fontWeight: '500', marginBottom: 10 },
    locationRow: { flexDirection: 'row', alignItems: 'center' },
    locationText: { color: '#8E8E93', marginLeft: 4 },

    // Timeline Section
    section: { marginTop: 10, paddingHorizontal: 20 },
    sectionHeader: { fontSize: 18, fontWeight: '700', color: '#1C1C1E', marginBottom: 15 },
    timelineBox: { backgroundColor: 'white', padding: 20, borderRadius: 20 },

    // Timeline Steps
    stepContainer: { flexDirection: 'row', height: 70 }, // Fixed height for alignment
    leftColumn: { alignItems: 'center', width: 40 },
    iconCircle: {
        width: 32, height: 32, borderRadius: 16, borderWidth: 2,
        justifyContent: 'center', alignItems: 'center', zIndex: 2
    },
    line: { width: 2, flex: 1, marginVertical: -2 }, // Connects dots
    rightColumn: { justifyContent: 'flex-start', paddingTop: 6, marginLeft: 10, flex: 1 },
    stepTitle: { fontSize: 16, fontWeight: '600', marginBottom: 2 },
    stepDate: { fontSize: 13, color: '#C7C7CC' },

    // Actions
    actionButton: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        backgroundColor: 'white', padding: 16, borderRadius: 16,
    },
    actionText: { fontSize: 16, fontWeight: '600', color: '#007AFF', marginLeft: 8 },
    withdrawButton: { marginTop: 20, backgroundColor: '#FFF5F5' },
    withdrawText: { color: '#E74C3C', fontWeight: '600' }
});