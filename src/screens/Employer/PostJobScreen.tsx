// src/screens/Employer/PostJobScreen.tsx

import React, { useState, useMemo, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Platform,
    KeyboardAvoidingView,
    Modal,
    FlatList,
    StatusBar,
    ActivityIndicator,
    Alert,
    Switch,
    Animated,
    UIManager
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

// --- CONFIGURATION ---
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const COLORS = {
    primary: '#2563EB',      // Brand Blue
    secondary: '#1E40AF',    // Darker Blue
    accent: '#F59E0B',       // Amber for Consulting/Premium
    text: '#0F172A',
    gray: '#64748B',
    border: '#E2E8F0',
    background: '#F8FAFC',
    white: '#FFFFFF',
    success: '#10B981',
    danger: '#EF4444',
    lightBlue: '#EFF6FF',
    lightAmber: '#FEF3C7',
};

const SHADOW_STYLE = {
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
};

// --- DATA LISTS ---
const JOB_TYPES = ['Full Time', 'Part Time', 'Contract', 'Freelance', 'Internship'];
const SALARY_RANGES = ['₹ 3L - 5L', '₹ 5L - 8L', '₹ 8L - 12L', '₹ 12L - 20L', '₹ 20L - 35L', '₹ 35L+'];
const HOURLY_RATES = ['₹ 200 - 500 /hr', '₹ 500 - 1000 /hr', '₹ 1000 - 2000 /hr', '₹ 2000+ /hr'];
const EXPERIENCE_LEVELS = ['Fresher', '1-3 Years', '3-5 Years', '5-8 Years', '8+ Years', 'Director/Lead'];
const BENEFIT_TAGS = ['Health Insurance', 'Remote Friendly', 'Paid Leaves', 'PF & ESI', 'Stock Options', 'Gym Support'];
const CONSULTING_FEE = 4999;

// Mock Services
const mockAIGenerator = async () => new Promise<string>((resolve) => setTimeout(() => resolve('• Deep knowledge of React Native bridging.\n• 5+ years in TypeScript.\n• Ability to lead a team of 4.\n• Experience with CI/CD pipelines.'), 1200));

export default function PostJobScreen() {
    const navigation = useNavigation<any>();
    const insets = useSafeAreaInsets();

    // --- STATE ---
    const [title, setTitle] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');

    // Complex Selectors
    const [paymentMode, setPaymentMode] = useState<'SALARY' | 'HOURLY'>('SALARY');
    const [selectedRange, setSelectedRange] = useState(SALARY_RANGES[1]);
    const [jobType, setJobType] = useState(JOB_TYPES[0]);
    const [experience, setExperience] = useState(EXPERIENCE_LEVELS[2]);
    const [selectedBenefits, setSelectedBenefits] = useState<string[]>([]);

    // Consulting & Budget
    const [candidates, setCandidates] = useState(10);
    const [costPerLead, setCostPerLead] = useState(500);
    const [addConsulting, setAddConsulting] = useState(false);

    // UI Loading & Modals
    const [loading, setLoading] = useState({ ai: false, submit: false });
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState<'RANGE' | 'EXPERIENCE' | 'TYPE' | null>(null);

    // Calculations
    const jobPostCost = candidates * costPerLead;
    const totalBudget = jobPostCost + (addConsulting ? CONSULTING_FEE : 0);

    // --- HANDLERS ---
    const toggleBenefit = (tag: string) => {
        if (selectedBenefits.includes(tag)) {
            setSelectedBenefits(selectedBenefits.filter(t => t !== tag));
        } else {
            setSelectedBenefits([...selectedBenefits, tag]);
        }
    };

    const handleAIGenerate = async () => {
        setLoading(p => ({ ...p, ai: true }));
        try {
            const text = await mockAIGenerator();
            setDescription(text);
        } catch (e) { Alert.alert("AI Error"); }
        setLoading(p => ({ ...p, ai: false }));
    };

    const handleSubmit = () => {
        if (!title || !companyName || !location || !description) {
            Alert.alert("Incomplete Details", "Please fill all required fields to proceed.");
            return;
        }
        setLoading(p => ({ ...p, submit: true }));
        setTimeout(() => {
            setLoading(p => ({ ...p, submit: false }));
            Alert.alert("Job Posted! 🎉", `Total Amount Charged: ₹${totalBudget}`, [
                { text: "View History", onPress: () => console.log('Go to history') }, // Placeholder
                { text: "Done", onPress: () => navigation.goBack() }
            ]);
        }, 1500);
    };

    const openModal = (type: 'RANGE' | 'EXPERIENCE' | 'TYPE') => {
        setModalType(type);
        setModalVisible(true);
    };

    // --- RENDER HELPERS ---
    // Inside PostJobScreen.tsx

    const renderHeader = () => (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
                <Ionicons name="arrow-back" size={24} color={COLORS.text} />
            </TouchableOpacity>
            <View>
                <Text style={styles.headerTitle}>Post a Job</Text>
                <Text style={styles.headerSubtitle}>Targeting 50k+ Jobseekers</Text>
            </View>

            {/* 👇 FIX THIS LINE 👇 */}
            <TouchableOpacity
                style={styles.historyBtn}
                onPress={() => navigation.navigate("JobHistoryScreen")}
            >
                <MaterialCommunityIcons name="history" size={22} color={COLORS.primary} />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
            <SafeAreaView edges={['top']} style={{ backgroundColor: COLORS.white }}>
                {renderHeader()}
            </SafeAreaView>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
                <ScrollView
                    contentContainerStyle={[styles.scrollContent, { paddingBottom: 140 + insets.bottom }]}
                    showsVerticalScrollIndicator={false}
                >
                    {/* SECTION 1: CORE DETAILS */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Basic Details</Text>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Job Title <Text style={styles.req}>*</Text></Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g. Senior Product Designer"
                                value={title}
                                onChangeText={setTitle}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Company Name <Text style={styles.req}>*</Text></Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g. TechCorp Solutions"
                                value={companyName}
                                onChangeText={setCompanyName}
                            />
                        </View>

                        <View style={styles.row}>
                            <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                                <Text style={styles.label}>Job Type</Text>
                                <TouchableOpacity style={styles.selectBox} onPress={() => openModal('TYPE')}>
                                    <Text style={styles.selectText}>{jobType}</Text>
                                    <Feather name="chevron-down" size={18} color={COLORS.gray} />
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.inputGroup, { flex: 1 }]}>
                                <Text style={styles.label}>Experience</Text>
                                <TouchableOpacity style={styles.selectBox} onPress={() => openModal('EXPERIENCE')}>
                                    <Text style={styles.selectText}>{experience}</Text>
                                    <Feather name="chevron-down" size={18} color={COLORS.gray} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Location</Text>
                            <View style={styles.locationContainer}>
                                <Ionicons name="location-outline" size={20} color={COLORS.gray} />
                                <TextInput
                                    style={styles.locationInput}
                                    placeholder="City, State or Remote"
                                    value={location}
                                    onChangeText={setLocation}
                                />
                            </View>
                        </View>
                    </View>

                    {/* SECTION 2: PAYMENT & HOURLY LOGIC */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Salary & Compensation</Text>

                        {/* Toggle */}
                        <View style={styles.toggleContainer}>
                            <TouchableOpacity
                                style={[styles.toggleBtn, paymentMode === 'SALARY' && styles.toggleBtnActive]}
                                onPress={() => { setPaymentMode('SALARY'); setSelectedRange(SALARY_RANGES[1]); }}
                            >
                                <Text style={[styles.toggleText, paymentMode === 'SALARY' && styles.toggleTextActive]}>Fixed Salary (LPA)</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.toggleBtn, paymentMode === 'HOURLY' && styles.toggleBtnActive]}
                                onPress={() => { setPaymentMode('HOURLY'); setSelectedRange(HOURLY_RATES[0]); }}
                            >
                                <Text style={[styles.toggleText, paymentMode === 'HOURLY' && styles.toggleTextActive]}>Hourly Rate</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.helperText}>
                            {paymentMode === 'SALARY'
                                ? "Annual CTC offered to the candidate."
                                : "Per hour rate for contractors/freelancers."}
                        </Text>

                        <TouchableOpacity style={styles.moneyBox} onPress={() => openModal('RANGE')}>
                            <Text style={styles.moneyLabel}>Offered Amount</Text>
                            <Text style={styles.moneyValue}>{selectedRange}</Text>
                            <Text style={styles.moneyChange}>Tap to change</Text>
                        </TouchableOpacity>
                    </View>

                    {/* SECTION 3: DESCRIPTION & AI */}
                    <View style={styles.section}>
                        <View style={styles.rowBetween}>
                            <Text style={styles.sectionTitle}>Job Description</Text>
                            <TouchableOpacity style={styles.aiBtn} onPress={handleAIGenerate} disabled={loading.ai}>
                                {loading.ai ? <ActivityIndicator color={COLORS.primary} size="small" /> : (
                                    <>
                                        <MaterialCommunityIcons name="robot" size={16} color={COLORS.primary} />
                                        <Text style={styles.aiText}> Auto-Fill</Text>
                                    </>
                                )}
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            style={styles.textArea}
                            multiline
                            placeholder="Describe roles, responsibilities, and tech stack..."
                            value={description}
                            onChangeText={setDescription}
                            textAlignVertical="top"
                        />
                    </View>

                    {/* SECTION 4: BENEFITS */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Perks & Benefits</Text>
                        <View style={styles.tagContainer}>
                            {BENEFIT_TAGS.map(tag => (
                                <TouchableOpacity
                                    key={tag}
                                    style={[styles.tag, selectedBenefits.includes(tag) && styles.tagActive]}
                                    onPress={() => toggleBenefit(tag)}
                                >
                                    <Text style={[styles.tagText, selectedBenefits.includes(tag) && styles.tagTextActive]}>{tag}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* SECTION 5: BUDGET & CONSULTING SERVICES */}
                    <View style={[styles.section, styles.consultingSection]}>
                        <View style={styles.rowBetween}>
                            <View>
                                <Text style={styles.consultingTitle}>Need Hiring Experts?</Text>
                                <Text style={styles.consultingDesc}>Add our Consulting Service to verify candidates.</Text>
                            </View>
                            <MaterialCommunityIcons name="briefcase-account" size={32} color={COLORS.accent} />
                        </View>

                        <View style={styles.consultingCard}>
                            <View style={styles.rowBetween}>
                                <Text style={styles.serviceName}>Dedicated HR Consultant</Text>
                                <Switch
                                    value={addConsulting}
                                    onValueChange={setAddConsulting}
                                    trackColor={{ false: "#D1D5DB", true: COLORS.accent }}
                                    thumbColor="white"
                                />
                            </View>
                            <Text style={styles.servicePrice}>+ ₹ {CONSULTING_FEE} one-time fee</Text>
                            {addConsulting && (
                                <View style={styles.consultingBadge}>
                                    <Feather name="check-circle" size={14} color={COLORS.accent} />
                                    <Text style={styles.consultingBadgeText}>Consultant will contact you within 24hrs</Text>
                                </View>
                            )}
                        </View>

                        <View style={styles.divider} />

                        {/* Budget Sliders */}
                        <Text style={styles.label}>Recruitment Budget</Text>
                        <View style={styles.budgetRow}>
                            <View style={styles.budgetBox}>
                                <Text style={styles.budgetSub}>Candidates</Text>
                                <View style={styles.stepper}>
                                    <TouchableOpacity onPress={() => setCandidates(c => Math.max(5, c - 5))}><Feather name="minus" size={16} /></TouchableOpacity>
                                    <Text style={styles.stepVal}>{candidates}</Text>
                                    <TouchableOpacity onPress={() => setCandidates(c => c + 5)}><Feather name="plus" size={16} /></TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.budgetBox}>
                                <Text style={styles.budgetSub}>Cost/Lead</Text>
                                <Text style={styles.staticCost}>₹ {costPerLead}</Text>
                            </View>
                        </View>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>

            {/* BOTTOM DOCK */}
            <View style={[styles.bottomDock, { paddingBottom: Math.max(20, insets.bottom) }]}>
                <View>
                    <Text style={styles.totalLabel}>Total Payable</Text>
                    <Text style={styles.totalAmount}>₹ {totalBudget.toLocaleString('en-IN')}</Text>
                    {addConsulting && <Text style={styles.totalSub}>(Includes Consulting)</Text>}
                </View>
                <TouchableOpacity style={styles.postButton} onPress={handleSubmit}>
                    {loading.submit ? <ActivityIndicator color="white" /> : (
                        <>
                            <Text style={styles.postBtnText}>Pay & Post</Text>
                            <Feather name="arrow-right" size={20} color="white" />
                        </>
                    )}
                </TouchableOpacity>
            </View>

            {/* UNIVERSAL SELECTION MODAL */}
            <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={() => setModalVisible(false)}>
                <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setModalVisible(false)}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalIndicator} />
                        <Text style={styles.modalHeader}>Select Option</Text>
                        <FlatList
                            data={
                                modalType === 'TYPE' ? JOB_TYPES :
                                    modalType === 'EXPERIENCE' ? EXPERIENCE_LEVELS :
                                        paymentMode === 'SALARY' ? SALARY_RANGES : HOURLY_RATES
                            }
                            keyExtractor={item => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.modalItem} onPress={() => {
                                    if (modalType === 'TYPE') setJobType(item);
                                    if (modalType === 'EXPERIENCE') setExperience(item);
                                    if (modalType === 'RANGE') setSelectedRange(item);
                                    setModalVisible(false);
                                }}>
                                    <Text style={styles.modalItemText}>{item}</Text>
                                    <Feather name="circle" size={18} color={COLORS.gray} />
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },

    // Header
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border },
    headerTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text },
    headerSubtitle: { fontSize: 12, color: COLORS.success, fontWeight: '600' },
    iconBtn: { padding: 8 },
    historyBtn: { padding: 8, backgroundColor: COLORS.lightBlue, borderRadius: 8 },

    scrollContent: { padding: 16 },

    // Sections
    section: { backgroundColor: COLORS.white, borderRadius: 16, padding: 16, marginBottom: 16, ...SHADOW_STYLE },
    sectionTitle: { fontSize: 16, fontWeight: '700', color: COLORS.text, marginBottom: 12 },
    row: { flexDirection: 'row' },
    rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },

    // Inputs
    inputGroup: { marginBottom: 16 },
    label: { fontSize: 13, fontWeight: '600', color: COLORS.gray, marginBottom: 6 },
    req: { color: COLORS.danger },
    input: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 10, padding: 12, fontSize: 15, color: COLORS.text, backgroundColor: '#F8FAFC' },
    selectBox: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: COLORS.border, borderRadius: 10, padding: 12, backgroundColor: '#F8FAFC' },
    selectText: { fontSize: 15, color: COLORS.text },

    // Location
    locationContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: COLORS.border, borderRadius: 10, paddingHorizontal: 12, backgroundColor: '#F8FAFC' },
    locationInput: { flex: 1, paddingVertical: 12, paddingLeft: 8, fontSize: 15, color: COLORS.text },

    // Payment Toggle
    toggleContainer: { flexDirection: 'row', backgroundColor: '#F1F5F9', borderRadius: 10, padding: 4, marginBottom: 12 },
    toggleBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 8 },
    toggleBtnActive: { backgroundColor: COLORS.white, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
    toggleText: { fontSize: 14, color: COLORS.gray, fontWeight: '500' },
    toggleTextActive: { color: COLORS.primary, fontWeight: '700' },
    helperText: { fontSize: 12, color: COLORS.gray, fontStyle: 'italic', marginBottom: 12 },

    // Money Box
    moneyBox: { backgroundColor: COLORS.lightBlue, padding: 16, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: COLORS.primary, borderStyle: 'dashed' },
    moneyLabel: { fontSize: 12, color: COLORS.secondary, fontWeight: '600', textTransform: 'uppercase' },
    moneyValue: { fontSize: 24, fontWeight: '800', color: COLORS.primary, marginVertical: 4 },
    moneyChange: { fontSize: 12, color: COLORS.primary, textDecorationLine: 'underline' },

    // Description
    textArea: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 10, padding: 12, fontSize: 15, color: COLORS.text, height: 120, backgroundColor: '#F8FAFC' },
    aiBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E0E7FF', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
    aiText: { fontSize: 12, fontWeight: '700', color: COLORS.primary },

    // Benefits
    tagContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    tag: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
    tagActive: { backgroundColor: '#DCFCE7', borderColor: COLORS.success },
    tagText: { fontSize: 12, color: COLORS.gray },
    tagTextActive: { color: '#166534', fontWeight: '600' },

    // Consulting Section (Premium)
    consultingSection: { borderWidth: 1, borderColor: '#FCD34D', backgroundColor: '#FFFBEB' },
    consultingTitle: { fontSize: 16, fontWeight: '700', color: '#92400E' },
    consultingDesc: { fontSize: 12, color: '#B45309' },
    consultingCard: { backgroundColor: COLORS.white, borderRadius: 10, padding: 12, marginTop: 10 },
    serviceName: { fontSize: 14, fontWeight: '600', color: COLORS.text },
    servicePrice: { fontSize: 12, color: COLORS.gray, marginTop: 2 },
    consultingBadge: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 4 },
    consultingBadgeText: { fontSize: 11, color: COLORS.accent, fontWeight: '600' },
    divider: { height: 1, backgroundColor: '#FDE68A', marginVertical: 16 },

    // Budget Sliders
    budgetRow: { flexDirection: 'row', gap: 12 },
    budgetBox: { flex: 1, backgroundColor: COLORS.white, borderRadius: 8, padding: 10 },
    budgetSub: { fontSize: 12, color: COLORS.gray, marginBottom: 6 },
    stepper: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F1F5F9', borderRadius: 6, padding: 4 },
    stepVal: { fontWeight: '700' },
    staticCost: { fontSize: 16, fontWeight: '700', color: COLORS.text },

    // Bottom Dock
    bottomDock: { position: 'absolute', bottom: 0, width: '100%', backgroundColor: COLORS.white, borderTopWidth: 1, borderTopColor: COLORS.border, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', shadowColor: "#000", shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 10 },
    totalLabel: { fontSize: 12, color: COLORS.gray },
    totalAmount: { fontSize: 20, fontWeight: '800', color: COLORS.text },
    totalSub: { fontSize: 10, color: COLORS.accent, fontWeight: '600' },
    postButton: { backgroundColor: COLORS.primary, paddingHorizontal: 24, paddingVertical: 14, borderRadius: 12, flexDirection: 'row', alignItems: 'center', gap: 8 },
    postBtnText: { color: 'white', fontWeight: '700', fontSize: 16 },

    // Modal
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    modalContent: { backgroundColor: COLORS.white, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, maxHeight: '50%' },
    modalIndicator: { width: 40, height: 4, backgroundColor: COLORS.border, borderRadius: 2, alignSelf: 'center', marginBottom: 15 },
    modalHeader: { fontSize: 18, fontWeight: '700', marginBottom: 15, color: COLORS.text },
    modalItem: { paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#F1F5F9', flexDirection: 'row', justifyContent: 'space-between' },
    modalItemText: { fontSize: 16, color: COLORS.text },
});