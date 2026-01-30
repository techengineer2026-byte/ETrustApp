// src/screens/ET-Center/Dashboard.tsx

import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    StatusBar,
    Dimensions,
    Modal,
    Animated,
    TouchableWithoutFeedback
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

// --- THEME COLORS ---
const THEME = {
    primary: "#1c005e",
    secondary: "#4F46E5",
    bg: "#F5F7FA",
    white: "#FFFFFF",
    text: "#1F2937",
    gray: "#9CA3AF"
};

export default function Dashboard() {
    // --- STATE MANAGEMENT ---
    const [selectedJob, setSelectedJob] = useState<any>(null);
    const [jobModalVisible, setJobModalVisible] = useState(false);

    const [notifModalVisible, setNotifModalVisible] = useState(false);

    const [statsModalVisible, setStatsModalVisible] = useState(false);
    const [selectedStat, setSelectedStat] = useState<any>(null);

    // Toast State
    const [toastMsg, setToastMsg] = useState("");
    const fadeAnim = useRef(new Animated.Value(0)).current;

    // --- DATA ---
    const today = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

    const statsData = [
        { id: 'cand', label: "Total Cand.", value: "124", icon: "account-group", color: "#4F46E5", detail: "124 Total registered candidates this month." },
        { id: 'active', label: "Active", value: "86", icon: "account-check", color: "#10B981", detail: "86 Candidates currently in interview stages." },
        { id: 'jobs', label: "Jobs Nearby", value: "32", icon: "briefcase-search", color: "#F59E0B", detail: "32 New job openings within 10km radius." },
        { id: 'revenue', label: "Revenue", value: "₹45k", icon: "cash-multiple", color: "#1c005e", detail: "Total earnings from placements in October." },
    ];

    const jobsData = [
        { id: 1, company: "TechSol Pvt Ltd", role: "Software Tester", loc: "Sector 62", desc: "Looking for manual testers with 1yr exp." },
        { id: 2, company: "Bajaj Finance", role: "Sales Executive", loc: "Sector 18", desc: "Field sales role. Two wheeler mandatory." },
        { id: 3, company: "Urban Company", role: "Helper / Technician", loc: "Noida", desc: "AC repair technician needed urgently." },
    ];

    const notifications = [
        { id: 1, title: "Interview Reminder", desc: "Rahul has an interview at 2 PM", time: "10m ago", icon: "clock-outline", color: "#F59E0B" },
        { id: 2, title: "New Job Alert", desc: "TechSol posted a new QA role", time: "1h ago", icon: "briefcase-outline", color: "#4F46E5" },
        { id: 3, title: "System Update", desc: "Maintenance scheduled for tonight", time: "5h ago", icon: "cog-outline", color: "#6B7280" },
    ];

    // --- HELPER FUNCTIONS ---

    // 1. Show Custom Toast
    const showToast = (message: string) => {
        setToastMsg(message);
        Animated.sequence([
            Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
            Animated.delay(2000),
            Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true })
        ]).start();
    };

    // 2. Handle Interactions
    const openJobModal = (job: any) => { setSelectedJob(job); setJobModalVisible(true); };
    const openStatsModal = (stat: any) => { setSelectedStat(stat); setStatsModalVisible(true); };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor={THEME.bg} />

            {/* --- CUSTOM TOAST NOTIFICATION --- */}
            <Animated.View style={[styles.toast, { opacity: fadeAnim, transform: [{ translateY: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [-20, 0] }) }] }]}>
                <Icon name="check-circle" size={20} color={THEME.white} />
                <Text style={styles.toastText}>{toastMsg}</Text>
            </Animated.View>

            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

                {/* --- HEADER --- */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.welcomeText}>Welcome, Centre Name 👋</Text>
                        <Text style={styles.dateText}>Today: {today}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.profileIcon}
                        onPress={() => setNotifModalVisible(true)}
                    >
                        <Icon name="bell-outline" size={24} color={THEME.primary} />
                        <View style={styles.notificationDot} />
                    </TouchableOpacity>
                </View>

                {/* --- STATS GRID --- */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Overview</Text>
                    <View style={styles.statsGrid}>
                        {statsData.map((stat, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.statCard}
                                onPress={() => openStatsModal(stat)}
                                activeOpacity={0.9}
                            >
                                <View style={[styles.statIconBox, { backgroundColor: `${stat.color}15` }]}>
                                    <Icon name={stat.icon} size={22} color={stat.color} />
                                </View>
                                <Text style={styles.statValue}>{stat.value}</Text>
                                <Text style={styles.statLabel}>{stat.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* --- CURRENT JOBS --- */}
                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeaderRow}>
                        <Text style={styles.sectionTitle}>Current Jobs Nearby</Text>
                        <TouchableOpacity onPress={() => showToast("Loading full job list...")}>
                            <Text style={styles.seeAllText}>View All →</Text>
                        </TouchableOpacity>
                    </View>

                    {jobsData.map((job) => (
                        <View key={job.id} style={styles.jobCard}>
                            <View style={styles.jobIcon}>
                                <Text style={styles.jobIconText}>{job.company.charAt(0)}</Text>
                            </View>
                            <View style={styles.jobInfo}>
                                <Text style={styles.jobRole}>{job.role}</Text>
                                <Text style={styles.jobCompany}>{job.company} • {job.loc}</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.jdBtn}
                                onPress={() => openJobModal(job)}
                            >
                                <Text style={styles.jdBtnText}>View JD</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>

            </ScrollView>

            {/* ================= MODALS ================= */}

            {/* 1. NOTIFICATION BOTTOM SHEET */}
            <Modal transparent visible={notifModalVisible} animationType="fade" onRequestClose={() => setNotifModalVisible(false)}>
                <TouchableWithoutFeedback onPress={() => setNotifModalVisible(false)}>
                    <View style={styles.modalBackdrop}>
                        <TouchableWithoutFeedback>
                            <View style={styles.bottomSheet}>
                                <View style={styles.sheetHandle} />
                                <Text style={styles.sheetTitle}>Notifications</Text>
                                {notifications.map((item) => (
                                    <TouchableOpacity key={item.id} style={styles.notifItem} onPress={() => showToast("Marked as read")}>
                                        <View style={[styles.notifIcon, { backgroundColor: `${item.color}20` }]}>
                                            <Icon name={item.icon} size={20} color={item.color} />
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.notifTitle}>{item.title}</Text>
                                            <Text style={styles.notifDesc}>{item.desc}</Text>
                                        </View>
                                        <Text style={styles.notifTime}>{item.time}</Text>
                                    </TouchableOpacity>
                                ))}
                                <TouchableOpacity style={styles.closeBtn} onPress={() => setNotifModalVisible(false)}>
                                    <Text style={styles.closeBtnText}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            {/* 2. STATS DETAIL MODAL */}
            <Modal transparent visible={statsModalVisible} animationType="fade" onRequestClose={() => setStatsModalVisible(false)}>
                <View style={styles.centerModalBackdrop}>
                    <View style={styles.centerModalCard}>
                        {selectedStat && (
                            <>
                                <View style={[styles.statBigIcon, { backgroundColor: `${selectedStat.color}20` }]}>
                                    <Icon name={selectedStat.icon} size={40} color={selectedStat.color} />
                                </View>
                                <Text style={styles.centerModalTitle}>{selectedStat.label}</Text>
                                <Text style={[styles.centerModalValue, { color: selectedStat.color }]}>{selectedStat.value}</Text>
                                <Text style={styles.centerModalDesc}>{selectedStat.detail}</Text>

                                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: selectedStat.color }]} onPress={() => { setStatsModalVisible(false); showToast("Report Downloaded!") }}>
                                    <Text style={styles.actionBtnText}>Download Report</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.secondaryBtn} onPress={() => setStatsModalVisible(false)}>
                                    <Text style={{ color: '#666' }}>Close</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
            </Modal>

            {/* 3. JOB JD BOTTOM SHEET */}
            <Modal transparent visible={jobModalVisible} animationType="fade" onRequestClose={() => setJobModalVisible(false)}>
                <View style={styles.modalBackdrop}>
                    <View style={[styles.bottomSheet, { height: '60%' }]}>
                        <View style={styles.sheetHandle} />
                        {selectedJob && (
                            <>
                                <View style={styles.jdHeader}>
                                    <View style={styles.jobIconLg}>
                                        <Text style={styles.jobIconTextLg}>{selectedJob.company.charAt(0)}</Text>
                                    </View>
                                    <View style={{ marginLeft: 15 }}>
                                        <Text style={styles.jdRole}>{selectedJob.role}</Text>
                                        <Text style={styles.jdCompany}>{selectedJob.company}</Text>
                                    </View>
                                </View>

                                <View style={styles.divider} />

                                <Text style={styles.jdSectionTitle}>About the Role</Text>
                                <Text style={styles.jdText}>{selectedJob.desc}</Text>
                                <Text style={styles.jdText}>• Competitive Salary{'\n'}• Health Insurance{'\n'}• Flexible Hours</Text>

                                <TouchableOpacity
                                    style={[styles.actionBtn, { marginTop: 'auto', backgroundColor: THEME.primary }]}
                                    onPress={() => { setJobModalVisible(false); showToast("Candidate Referred Successfully!"); }}
                                >
                                    <Text style={styles.actionBtnText}>Refer Candidate</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: THEME.bg },
    container: { padding: 20, paddingBottom: 40 },

    // TOAST
    toast: {
        position: 'absolute', top: 10, alignSelf: 'center', backgroundColor: '#333',
        paddingHorizontal: 20, paddingVertical: 12, borderRadius: 25, flexDirection: 'row',
        alignItems: 'center', zIndex: 999, elevation: 10
    },
    toastText: { color: 'white', marginLeft: 10, fontWeight: '600' },

    // HEADER
    header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 24 },
    welcomeText: { fontSize: 20, fontWeight: "800", color: THEME.primary, marginBottom: 4 },
    dateText: { fontSize: 14, color: "#666", fontWeight: "500" },
    profileIcon: { width: 44, height: 44, backgroundColor: "#fff", borderRadius: 12, justifyContent: "center", alignItems: "center", elevation: 2 },
    notificationDot: { position: "absolute", top: 10, right: 12, width: 8, height: 8, borderRadius: 4, backgroundColor: "red", borderWidth: 1, borderColor: "#fff" },

    // STATS
    sectionContainer: { marginBottom: 24 },
    sectionTitle: { fontSize: 17, fontWeight: "700", color: "#1d1b25", marginBottom: 12 },
    statsGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
    statCard: { width: "48%", backgroundColor: "#fff", padding: 16, borderRadius: 16, marginBottom: 14, elevation: 2 },
    statIconBox: { width: 32, height: 32, borderRadius: 8, justifyContent: "center", alignItems: "center", marginBottom: 10 },
    statValue: { fontSize: 20, fontWeight: "800", color: "#333", marginBottom: 2 },
    statLabel: { fontSize: 12, color: "#666", fontWeight: "500" },

    // JOBS
    sectionHeaderRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
    seeAllText: { fontSize: 13, color: THEME.primary, fontWeight: "600" },
    jobCard: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", padding: 14, borderRadius: 14, marginBottom: 12, elevation: 1 },
    jobIcon: { width: 42, height: 42, borderRadius: 10, backgroundColor: "#E8EAF6", justifyContent: "center", alignItems: "center", marginRight: 12 },
    jobIconText: { fontSize: 18, fontWeight: "bold", color: THEME.primary },
    jobInfo: { flex: 1 },
    jobRole: { fontSize: 15, fontWeight: "700", color: "#333" },
    jobCompany: { fontSize: 12, color: "#777", marginTop: 2 },
    jdBtn: { paddingVertical: 6, paddingHorizontal: 12, backgroundColor: "#f3e5f5", borderRadius: 8 },
    jdBtnText: { fontSize: 12, fontWeight: "600", color: THEME.primary },

    // MODAL COMMON
    modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    centerModalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
    bottomSheet: { backgroundColor: 'white', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 40 },
    sheetHandle: { width: 40, height: 4, backgroundColor: '#E5E7EB', borderRadius: 2, alignSelf: 'center', marginBottom: 20 },

    // NOTIFICATIONS MODAL
    sheetTitle: { fontSize: 20, fontWeight: '800', marginBottom: 20, color: '#333' },
    notifItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    notifIcon: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    notifTitle: { fontSize: 16, fontWeight: '700', color: '#333' },
    notifDesc: { fontSize: 13, color: '#666' },
    notifTime: { fontSize: 12, color: '#999', marginLeft: 10 },
    closeBtn: { marginTop: 10, padding: 15, backgroundColor: '#F3F4F6', borderRadius: 12, alignItems: 'center' },
    closeBtnText: { fontWeight: '700', color: '#555' },

    // CENTER STATS MODAL
    centerModalCard: { width: '85%', backgroundColor: 'white', borderRadius: 24, padding: 30, alignItems: 'center', elevation: 10 },
    statBigIcon: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
    centerModalTitle: { fontSize: 18, color: '#666', fontWeight: '600' },
    centerModalValue: { fontSize: 32, fontWeight: '900', marginVertical: 10 },
    centerModalDesc: { textAlign: 'center', color: '#888', marginBottom: 25, lineHeight: 20 },
    actionBtn: { width: '100%', paddingVertical: 15, borderRadius: 12, alignItems: 'center', marginBottom: 10 },
    actionBtnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
    secondaryBtn: { padding: 10 },

    // JD MODAL
    jdHeader: { flexDirection: 'row', alignItems: 'center' },
    jobIconLg: { width: 56, height: 56, borderRadius: 16, backgroundColor: '#E8EAF6', justifyContent: 'center', alignItems: 'center' },
    jobIconTextLg: { fontSize: 24, fontWeight: 'bold', color: THEME.primary },
    jdRole: { fontSize: 20, fontWeight: '800', color: '#333' },
    jdCompany: { fontSize: 14, color: '#666' },
    divider: { height: 1, backgroundColor: '#EEE', marginVertical: 20 },
    jdSectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 10, color: '#333' },
    jdText: { fontSize: 14, color: '#555', lineHeight: 22, marginBottom: 15 },
});