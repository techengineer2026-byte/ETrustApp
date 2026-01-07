// src/screens/Employer/PostJobScreen.tsx

import React, { useState } from 'react';
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
    StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Standard CLI Icon imports
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
interface DropdownSelectorProps {
    label: string;
    value: string;
    type: string;
}
// --- Configuration & Mock Data ---
const PRIMARY_COLOR = '#2563EB'; // Brand Blue
const TEXT_COLOR = '#1F2937';
const GRAY_TEXT = '#6B7280';
const BORDER_COLOR = '#E5E7EB';

const JOB_TYPES = ['Full Time', 'Part Time', 'Contractual'];
const SALARY_RANGES = ['₹ 0 – ₹ 5,00,000', '₹ 5,00,000 – ₹ 10,00,000', '₹ 10L – ₹ 20L', '₹ 20L+'];
const EXPERIENCE_RANGES = ['Fresher', '1 – 2 Years', '2 – 5 Years', '5 – 10 Years', '10+ Years'];
const CONTRIBUTION_OPTIONS = [1000, 2000, 5000, 10000];

export default function PostJobScreen() {
    // --- State Management ---
    const [jobType, setJobType] = useState(JOB_TYPES[0]);
    const [workMode, setWorkMode] = useState('Work From Home');
    const [salaryRange, setSalaryRange] = useState(SALARY_RANGES[0]);
    const [position, setPosition] = useState('');
    const [experience, setExperience] = useState(EXPERIENCE_RANGES[2]);
    const [skills, setSkills] = useState('');
    const [candidates, setCandidates] = useState(10);
    const [contribution, setContribution] = useState(1000);
    const [location, setLocation] = useState('');
    const [fileName, setFileName] = useState<string | null>(null);

    // Modal State
    const [modalVisible, setModalVisible] = useState(false);
    const [currentModalType, setCurrentModalType] = useState<string | null>(null);

    // --- Logic ---
    const totalCost = candidates * contribution;

    const handleStepper = (action: string) => {
        if (action === 'increase') {
            if (candidates < 10000) setCandidates(candidates + 1);
        } else {
            if (candidates > 1) setCandidates(candidates - 1);
        }
    };

    const handleFileUpload = () => {
        setFileName('Job_Description_v1.pdf');
    };

    // --- Reusable Components ---
    const DropdownSelector = ({ label, value, type }: DropdownSelectorProps) => (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>

            <TouchableOpacity
                style={styles.dropdownBox}
                onPress={() => {
                    setCurrentModalType(type);
                    setModalVisible(true);
                }}
            >
                <Text style={styles.inputText}>{value}</Text>
                <Feather name="chevron-down" size={20} color={GRAY_TEXT} />
            </TouchableOpacity>
        </View>
    );


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />

            {/* 🔝 HEADER */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconBtn}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Post Job</Text>
                <TouchableOpacity style={styles.iconBtn}>
                    <MaterialCommunityIcons name="file-document-edit-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >

                    {/* 1️⃣ Job Type */}
                    <DropdownSelector label="Job Type" value={jobType} type="JOB_TYPE" />

                    {/* 2️⃣ Work Mode */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Work Mode</Text>
                        <View style={styles.pillsContainer}>
                            {['Work From Home', 'On-Site', 'Freelancing'].map((mode) => (
                                <TouchableOpacity
                                    key={mode}
                                    style={[
                                        styles.pill,
                                        workMode === mode && styles.pillActive,
                                    ]}
                                    onPress={() => setWorkMode(mode)}
                                >
                                    <View style={[styles.radioCircle, workMode === mode && styles.radioActive]}>
                                        {workMode === mode && <View style={styles.radioDot} />}
                                    </View>
                                    <Text style={[styles.pillText, workMode === mode && styles.pillTextActive]}>
                                        {mode}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* 3️⃣ Salary Range */}
                    <DropdownSelector label="Salary Range" value={salaryRange} type="SALARY" />

                    {/* 4️⃣ Job Position */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Job Position / Role</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="e.g. Software Engineer"
                            placeholderTextColor="#9CA3AF"
                            value={position}
                            onChangeText={setPosition}
                        />
                    </View>

                    {/* 5️⃣ Desired Experience */}
                    <DropdownSelector label="Desired Experience" value={experience} type="EXPERIENCE" />

                    {/* 6️⃣ Skills */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Skills / Requirements</Text>
                        <TextInput
                            style={[styles.textInput, styles.textArea]}
                            placeholder="Java, Spring Boot, MySQL..."
                            placeholderTextColor="#9CA3AF"
                            multiline
                            numberOfLines={3}
                            value={skills}
                            onChangeText={setSkills}
                        />
                    </View>

                    {/* 7️⃣ Number of Candidates (Stepper) */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Number of Candidates Required</Text>
                        <View style={styles.stepperContainer}>
                            <TouchableOpacity style={styles.stepperBtn} onPress={() => handleStepper('decrease')}>
                                <Feather name="minus" size={20} color={PRIMARY_COLOR} />
                            </TouchableOpacity>
                            <Text style={styles.stepperValue}>{candidates}</Text>
                            <TouchableOpacity style={styles.stepperBtn} onPress={() => handleStepper('increase')}>
                                <Feather name="plus" size={20} color={PRIMARY_COLOR} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* 8️⃣ Upload JD */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Upload Job Description</Text>
                        <TouchableOpacity style={styles.uploadBox} onPress={handleFileUpload}>
                            {fileName ? (
                                <View style={styles.filePreview}>
                                    <MaterialCommunityIcons name="file-pdf-box" size={30} color="#DC2626" />
                                    <Text style={styles.fileName}>{fileName}</Text>
                                    <Feather name="check-circle" size={20} color="green" />
                                </View>
                            ) : (
                                <>
                                    <Feather name="upload-cloud" size={24} color={GRAY_TEXT} />
                                    <Text style={styles.uploadText}>Upload JD (PDF / Word)</Text>
                                </>
                            )}
                        </TouchableOpacity>
                    </View>

                    {/* 9️⃣ Job Location */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Job Location</Text>
                        <View style={styles.locationContainer}>
                            <Ionicons name="location-sharp" size={20} color={PRIMARY_COLOR} style={{ marginLeft: 10 }} />
                            <TextInput
                                style={styles.locationInput}
                                placeholder="City, District, Pin"
                                placeholderTextColor="#9CA3AF"
                                value={location}
                                onChangeText={setLocation}
                            />
                            <TouchableOpacity style={styles.detectBtn}>
                                <Text style={styles.detectText}>Detect</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* 🔟 Per Candidate Contribution */}
                    <DropdownSelector
                        label="Per Candidate Contribution"
                        value={`₹ ${contribution.toLocaleString('en-IN')}`}
                        type="CONTRIBUTION"
                    />

                    {/* Spacer for sticky footer */}
                    <View style={{ height: 100 }} />
                </ScrollView>
            </KeyboardAvoidingView>

            {/* 🔽 STICKY FOOTER */}
            <View style={styles.footer}>
                <View style={styles.costRow}>
                    <Text style={styles.costLabel}>Total Cost Estimation</Text>
                    <Text style={styles.costValue}>
                        {candidates} x ₹{contribution} = <Text style={styles.totalAmount}>₹ {totalCost.toLocaleString('en-IN')}</Text>
                    </Text>
                </View>

                <View style={styles.footerButtons}>
                    <TouchableOpacity style={styles.draftBtn}>
                        <Text style={styles.draftBtnText}>Save Draft</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.postBtn}>
                        <Text style={styles.postBtnText}>Post Job</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* ⚙️ GENERIC SELECTION MODAL */}
            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Select Option</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Feather name="x" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        <FlatList<string | number>
                            data={
                                currentModalType === 'JOB_TYPE' ? JOB_TYPES :
                                    currentModalType === 'SALARY' ? SALARY_RANGES :
                                        currentModalType === 'EXPERIENCE' ? EXPERIENCE_RANGES :
                                            currentModalType === 'CONTRIBUTION' ? CONTRIBUTION_OPTIONS :
                                                []
                            }
                            keyExtractor={(item, index) => `${item}-${index}`}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.modalItem}
                                    onPress={() => {
                                        if (currentModalType === 'JOB_TYPE') setJobType(item as string);
                                        if (currentModalType === 'SALARY') setSalaryRange(item as string);
                                        if (currentModalType === 'EXPERIENCE') setExperience(item as string);
                                        if (currentModalType === 'CONTRIBUTION') setContribution(item as number);
                                        setModalVisible(false);
                                    }}
                                >
                                    <Text style={styles.modalItemText}>
                                        {currentModalType === 'CONTRIBUTION'
                                            ? `₹ ${item}`
                                            : item}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />

                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    // Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: TEXT_COLOR,
    },
    iconBtn: {
        padding: 4,
    },

    // Scroll Content
    scrollContent: {
        padding: 16,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
    },

    // Inputs
    textInput: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: BORDER_COLOR,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: TEXT_COLOR,
    },
    textArea: {
        height: 80,
        textAlignVertical: 'top',
    },
    dropdownBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: BORDER_COLOR,
        borderRadius: 8,
        padding: 12,
    },
    inputText: {
        fontSize: 16,
        color: TEXT_COLOR,
    },

    // Pills (Work Mode)
    pillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    pill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: BORDER_COLOR,
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    pillActive: {
        borderColor: PRIMARY_COLOR,
        backgroundColor: '#EFF6FF',
    },
    pillText: {
        fontSize: 14,
        color: GRAY_TEXT,
        marginLeft: 6,
    },
    pillTextActive: {
        color: PRIMARY_COLOR,
        fontWeight: '600',
    },
    radioCircle: {
        width: 16,
        height: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: GRAY_TEXT,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioActive: {
        borderColor: PRIMARY_COLOR,
    },
    radioDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: PRIMARY_COLOR,
    },

    // Stepper
    stepperContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: BORDER_COLOR,
        borderRadius: 8,
        padding: 4,
    },
    stepperBtn: {
        padding: 10,
        backgroundColor: '#EFF6FF',
        borderRadius: 6,
    },
    stepperValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: TEXT_COLOR,
    },

    // Upload
    uploadBox: {
        borderWidth: 1,
        borderColor: PRIMARY_COLOR,
        borderStyle: 'dashed',
        borderRadius: 8,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EFF6FF',
        flexDirection: 'row',
    },
    uploadText: {
        color: PRIMARY_COLOR,
        marginLeft: 8,
        fontWeight: '500',
    },
    filePreview: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    fileName: {
        marginLeft: 8,
        marginRight: 8,
        fontSize: 14,
        color: TEXT_COLOR,
        fontWeight: '500',
    },

    // Location
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: BORDER_COLOR,
        borderRadius: 8,
        overflow: 'hidden',
    },
    locationInput: {
        flex: 1,
        padding: 12,
        fontSize: 16,
        color: TEXT_COLOR,
    },
    detectBtn: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#F3F4F6',
        borderLeftWidth: 1,
        borderLeftColor: BORDER_COLOR,
    },
    detectText: {
        color: PRIMARY_COLOR,
        fontWeight: '600',
        fontSize: 12,
    },

    // Footer
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        elevation: 10, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    costRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    costLabel: {
        fontSize: 14,
        color: GRAY_TEXT,
    },
    costValue: {
        fontSize: 16,
        color: TEXT_COLOR,
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: PRIMARY_COLOR,
    },
    footerButtons: {
        flexDirection: 'row',
        gap: 12,
    },
    draftBtn: {
        flex: 1,
        padding: 14,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: PRIMARY_COLOR,
        alignItems: 'center',
    },
    draftBtnText: {
        color: PRIMARY_COLOR,
        fontWeight: '600',
        fontSize: 16,
    },
    postBtn: {
        flex: 1,
        padding: 14,
        borderRadius: 8,
        backgroundColor: PRIMARY_COLOR,
        alignItems: 'center',
    },
    postBtnText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },

    // Modal
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        maxHeight: '50%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: BORDER_COLOR,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: TEXT_COLOR,
    },
    modalItem: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    modalItemText: {
        fontSize: 16,
        color: TEXT_COLOR,
    },
});