// src/screens/Employer/PostJobScreen.tsx

import React, { useState, useEffect, useCallback } from 'react';
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
    LayoutAnimation,
    UIManager
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

// Enable Animation
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

// --- CONFIG & COLORS ---
const PRIMARY_COLOR = '#2563EB'; // Brand Blue
const ACCENT_COLOR = '#3B82F6';
const TEXT_COLOR = '#1F2937';
const GRAY_TEXT = '#6B7280';
const BG_COLOR = '#F8FAFC'; // Cool Gray
const DANGER_COLOR = '#EF4444';
const SUCCESS_COLOR = '#10B981';

const SHADOW_STYLE = {
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
};

const JOB_TYPES = ['Full Time', 'Part Time', 'Contractual', 'Freelance'];
const SALARY_RANGES = ['₹ 0 – ₹ 5 LPA', '₹ 5 LPA – ₹ 10 LPA', '₹ 10 LPA – ₹ 20 LPA', '₹ 20 LPA+'];
const EXPERIENCE_RANGES = ['Fresher', '1 – 2 Years', '2 – 5 Years', '5 – 10 Years', '10+ Years'];
const CONTRIBUTION_OPTIONS = [1000, 2000, 5000, 10000];

// --- MOCK SERVICES ---
const mockFilePicker = async () => new Promise<string | null>((resolve) => setTimeout(() => resolve('Job_Description_v1.pdf'), 1000));
const mockAIGenerator = async () => new Promise<string>((resolve) => setTimeout(() => resolve('• Proficient in React Native & TypeScript\n• Experience with Redux/Zustand\n• Familiar with native modules (iOS/Android)\n• Strong understanding of REST APIs'), 1500));

export default function PostJobScreen() {
    const navigation = useNavigation();
    const route = useRoute<any>();
    const { jobId } = route.params || {};

    // --- STATE ---
    const [jobType, setJobType] = useState(JOB_TYPES[0]);
    const [workMode, setWorkMode] = useState('Work From Home');
    const [salaryRange, setSalaryRange] = useState(SALARY_RANGES[1]);
    const [position, setPosition] = useState('');
    const [experience, setExperience] = useState(EXPERIENCE_RANGES[2]);
    const [skills, setSkills] = useState('');
    const [candidates, setCandidates] = useState(5);
    const [contribution, setContribution] = useState(2000);
    const [location, setLocation] = useState('');
    const [fileName, setFileName] = useState<string | null>(null);

    // UI State
    const [isLoading, setIsLoading] = useState(false);
    const [isAILoading, setIsAILoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentModalType, setCurrentModalType] = useState<string | null>(null);

    const totalCost = candidates * contribution;

    // --- HANDLERS ---
    const handleGenerateAI = async () => {
        setIsAILoading(true);
        try {
            const aiText = await mockAIGenerator();
            setSkills(aiText);
            Alert.alert("✨ AI Magic", "Requirements generated based on the Job Position!");
        } catch (e) { Alert.alert("Error", "AI Service unavailable"); }
        setIsAILoading(false);
    };

    const handleFileUpload = async () => {
        setIsLoading(true);
        const file = await mockFilePicker();
        setFileName(file);
        setIsLoading(false);
    };

    const handleDetectLocation = () => {
        setIsLoading(true);
        setTimeout(() => {
            setLocation('Bengaluru, Karnataka');
            setIsLoading(false);
        }, 800);
    };

    const handleSubmit = () => {
        if (!position || !skills || !location) {
            Alert.alert("Missing Details", "Please fill all required fields.");
            return;
        }
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            Alert.alert("Success 🚀", "Job Posted Successfully!", [{ text: "OK", onPress: () => navigation.goBack() }]);
        }, 1500);
    };

    // --- COMPONENTS ---
    const DropdownSelector = ({ label, value, type }: any) => (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity
                style={[styles.dropdownBox, SHADOW_STYLE]}
                onPress={() => { setCurrentModalType(type); setModalVisible(true); }}
            >
                <Text style={styles.inputText}>{value}</Text>
                <Feather name="chevron-down" size={20} color={GRAY_TEXT} />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />

            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color={TEXT_COLOR} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{jobId ? 'Edit Job' : 'Create New Job'}</Text>
                <View style={{ width: 30 }} />
            </View>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                    {/* JOB POSITION */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Job Position <Text style={{ color: DANGER_COLOR }}>*</Text></Text>
                        <TextInput
                            style={[styles.textInput, SHADOW_STYLE]}
                            placeholder="e.g. Senior React Native Developer"
                            placeholderTextColor="#9CA3AF"
                            value={position}
                            onChangeText={setPosition}
                        />
                    </View>

                    {/* JOB TYPE & WORK MODE */}
                    <DropdownSelector label="Job Type" value={jobType} type="JOB_TYPE" />

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Work Mode</Text>
                        <View style={styles.pillsContainer}>
                            {['Remote', 'On-Site', 'Hybrid'].map((mode) => (
                                <TouchableOpacity
                                    key={mode}
                                    style={[styles.pill, workMode === mode && styles.pillActive]}
                                    onPress={() => setWorkMode(mode)}
                                >
                                    {workMode === mode && <View style={styles.pillDot} />}
                                    <Text style={[styles.pillText, workMode === mode && styles.pillTextActive]}>{mode}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* EXPERIENCE & SALARY */}
                    <View style={styles.row}>
                        <View style={{ flex: 1, marginRight: 10 }}>
                            <DropdownSelector label="Experience" value={experience} type="EXPERIENCE" />
                        </View>
                        <View style={{ flex: 1 }}>
                            <DropdownSelector label="Salary" value={salaryRange} type="SALARY" />
                        </View>
                    </View>

                    {/* SKILLS WITH AI BUTTON */}
                    <View style={styles.inputContainer}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                            <Text style={styles.label}>Requirements</Text>
                            <TouchableOpacity style={styles.aiBtn} onPress={handleGenerateAI} disabled={isAILoading}>
                                {isAILoading ? <ActivityIndicator size="small" color={PRIMARY_COLOR} /> : (
                                    <>
                                        <MaterialCommunityIcons name="magic-staff" size={14} color={PRIMARY_COLOR} />
                                        <Text style={styles.aiBtnText}>Auto-Write</Text>
                                    </>
                                )}
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            style={[styles.textInput, styles.textArea, SHADOW_STYLE]}
                            placeholder="• Core Skills..."
                            placeholderTextColor="#9CA3AF"
                            multiline
                            value={skills}
                            onChangeText={setSkills}
                        />
                    </View>

                    {/* LOCATION */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Location</Text>
                        <View style={[styles.locationBox, SHADOW_STYLE]}>
                            <Ionicons name="location-outline" size={20} color={GRAY_TEXT} style={{ marginLeft: 10 }} />
                            <TextInput
                                style={styles.locationInput}
                                placeholder="City, State"
                                value={location}
                                onChangeText={setLocation}
                            />
                            <TouchableOpacity onPress={handleDetectLocation} style={styles.detectBtn}>
                                <Text style={styles.detectText}>Detect</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* CANDIDATES & CONTRIBUTION */}
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Budget & Reach</Text>

                        <View style={styles.budgetRow}>
                            <View>
                                <Text style={styles.budgetLabel}>Candidates Needed</Text>
                                <View style={styles.stepper}>
                                    <TouchableOpacity onPress={() => candidates > 1 && setCandidates(c => c - 1)} style={styles.stepBtn}><Feather name="minus" size={16} color="white" /></TouchableOpacity>
                                    <Text style={styles.stepVal}>{candidates}</Text>
                                    <TouchableOpacity onPress={() => setCandidates(c => c + 1)} style={styles.stepBtn}><Feather name="plus" size={16} color="white" /></TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ alignItems: 'flex-end' }}>
                                <Text style={styles.budgetLabel}>Cost / Candidate</Text>
                                <TouchableOpacity onPress={() => { setCurrentModalType('CONTRIBUTION'); setModalVisible(true); }} style={styles.costSelector}>
                                    <Text style={styles.costText}>₹ {contribution}</Text>
                                    <Feather name="chevron-down" size={16} color={PRIMARY_COLOR} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* FILE UPLOAD */}
                    <TouchableOpacity style={[styles.uploadBox, fileName && styles.uploadBoxDone]} onPress={handleFileUpload}>
                        {fileName ? (
                            <>
                                <MaterialCommunityIcons name="file-document" size={24} color={PRIMARY_COLOR} />
                                <Text style={styles.fileName}>{fileName}</Text>
                                <Feather name="check" size={20} color={SUCCESS_COLOR} />
                            </>
                        ) : (
                            <>
                                <Feather name="upload-cloud" size={24} color={GRAY_TEXT} />
                                <Text style={styles.uploadText}>Attach Detailed JD (PDF)</Text>
                            </>
                        )}
                    </TouchableOpacity>

                    <View style={{ height: 100 }} />
                </ScrollView>
            </KeyboardAvoidingView>

            {/* FOOTER */}
            <View style={styles.footer}>
                <View>
                    <Text style={styles.footerLabel}>Total Estimated Cost</Text>
                    <Text style={styles.totalPrice}>₹ {totalCost.toLocaleString('en-IN')}</Text>
                </View>
                <TouchableOpacity style={styles.postBtn} onPress={handleSubmit} disabled={isLoading}>
                    {isLoading ? <ActivityIndicator color="white" /> : (
                        <>
                            <Text style={styles.postBtnText}>{jobId ? 'Update' : 'Post Job'}</Text>
                            <Feather name="arrow-right" size={18} color="white" />
                        </>
                    )}
                </TouchableOpacity>
            </View>

            {/* SELECTION MODAL */}
            <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={() => setModalVisible(false)}>
                <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setModalVisible(false)}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHandle} />
                        <Text style={styles.modalTitle}>Select Option</Text>
                        <FlatList
                            data={
                                currentModalType === 'JOB_TYPE' ? JOB_TYPES :
                                    currentModalType === 'SALARY' ? SALARY_RANGES :
                                        currentModalType === 'EXPERIENCE' ? EXPERIENCE_RANGES :
                                            CONTRIBUTION_OPTIONS
                            }
                            keyExtractor={(item: any) => item.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.modalItem} onPress={() => {
                                    if (currentModalType === 'JOB_TYPE') setJobType(item);
                                    if (currentModalType === 'SALARY') setSalaryRange(item);
                                    if (currentModalType === 'EXPERIENCE') setExperience(item);
                                    if (currentModalType === 'CONTRIBUTION') setContribution(item);
                                    setModalVisible(false);
                                }}>
                                    <Text style={styles.modalText}>
                                        {currentModalType === 'CONTRIBUTION' ? `₹ ${item}` : item}
                                    </Text>
                                    <Feather name="chevron-right" size={18} color="#CBD5E1" />
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>

            {/* LOADING OVERLAY */}
            {isLoading && (
                <View style={styles.loaderOverlay}>
                    <ActivityIndicator size="large" color={PRIMARY_COLOR} />
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: BG_COLOR },

    // Header
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
    headerTitle: { fontSize: 18, fontWeight: '700', color: TEXT_COLOR },
    iconBtn: { padding: 4 },

    scrollContent: { padding: 20 },
    row: { flexDirection: 'row' },

    // Inputs
    inputContainer: { marginBottom: 20 },
    label: { fontSize: 14, fontWeight: '600', color: '#475569', marginBottom: 8 },
    textInput: { backgroundColor: 'white', borderRadius: 12, padding: 14, fontSize: 16, color: TEXT_COLOR, borderWidth: 1, borderColor: 'transparent' },
    textArea: { height: 100, textAlignVertical: 'top' },

    dropdownBox: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', borderRadius: 12, padding: 14 },
    inputText: { fontSize: 16, color: TEXT_COLOR },

    // Work Mode Pills
    pillsContainer: { flexDirection: 'row', gap: 10 },
    pill: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 20, borderWidth: 1, borderColor: '#E2E8F0' },
    pillActive: { borderColor: PRIMARY_COLOR, backgroundColor: '#EFF6FF' },
    pillDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: PRIMARY_COLOR, marginRight: 8 },
    pillText: { fontSize: 14, color: GRAY_TEXT },
    pillTextActive: { color: PRIMARY_COLOR, fontWeight: '600' },

    // AI Button
    aiBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#EFF6FF', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
    aiBtnText: { fontSize: 12, color: PRIMARY_COLOR, fontWeight: '700', marginLeft: 4 },

    // Location
    locationBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 12 },
    locationInput: { flex: 1, padding: 14, fontSize: 16, color: TEXT_COLOR },
    detectBtn: { paddingHorizontal: 16, borderLeftWidth: 1, borderLeftColor: '#F1F5F9' },
    detectText: { color: PRIMARY_COLOR, fontWeight: '600', fontSize: 13 },

    // Budget Card
    card: { backgroundColor: 'white', padding: 16, borderRadius: 16, marginBottom: 20, ...SHADOW_STYLE },
    cardTitle: { fontSize: 16, fontWeight: '700', color: TEXT_COLOR, marginBottom: 15 },
    budgetRow: { flexDirection: 'row', justifyContent: 'space-between' },
    budgetLabel: { fontSize: 12, color: GRAY_TEXT, marginBottom: 6 },

    stepper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8FAFC', borderRadius: 8, padding: 4 },
    stepBtn: { backgroundColor: PRIMARY_COLOR, width: 28, height: 28, borderRadius: 6, justifyContent: 'center', alignItems: 'center' },
    stepVal: { fontSize: 16, fontWeight: '700', marginHorizontal: 12, minWidth: 20, textAlign: 'center' },

    costSelector: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#EFF6FF', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
    costText: { fontSize: 16, fontWeight: '700', color: PRIMARY_COLOR, marginRight: 4 },

    // Upload
    uploadBox: { height: 60, borderRadius: 12, borderStyle: 'dashed', borderWidth: 2, borderColor: '#CBD5E1', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: '#F8FAFC' },
    uploadBoxDone: { borderColor: SUCCESS_COLOR, backgroundColor: '#F0FDF4', borderStyle: 'solid' },
    uploadText: { color: GRAY_TEXT, marginLeft: 10, fontWeight: '500' },
    fileName: { color: TEXT_COLOR, fontWeight: '600', marginHorizontal: 10 },

    // Footer
    footer: { position: 'absolute', bottom: 0, width: '100%', backgroundColor: 'white', padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#F1F5F9', elevation: 20 },
    footerLabel: { fontSize: 12, color: GRAY_TEXT },
    totalPrice: { fontSize: 20, fontWeight: '800', color: TEXT_COLOR },
    postBtn: { backgroundColor: PRIMARY_COLOR, paddingVertical: 14, paddingHorizontal: 24, borderRadius: 12, flexDirection: 'row', alignItems: 'center', gap: 8, shadowColor: PRIMARY_COLOR, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
    postBtnText: { color: 'white', fontSize: 16, fontWeight: '700' },

    // Modals
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    modalContent: { backgroundColor: 'white', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, maxHeight: '60%' },
    modalHandle: { width: 40, height: 4, backgroundColor: '#E2E8F0', borderRadius: 2, alignSelf: 'center', marginBottom: 20 },
    modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 15 },
    modalItem: { paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#F1F5F9', flexDirection: 'row', justifyContent: 'space-between' },
    modalText: { fontSize: 16, color: TEXT_COLOR },

    loaderOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.7)', justifyContent: 'center', alignItems: 'center', zIndex: 50 },
});