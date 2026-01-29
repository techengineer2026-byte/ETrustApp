import React, { useState, useEffect, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Platform,
    Modal,
    FlatList,
    ActivityIndicator,
    Alert
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const mockFilePicker = async () => {
    return new Promise<string | null>((resolve) => {
        setTimeout(() => {
            const success = Math.random() > 0.3;
            if (success) {
                resolve('Job_Description_v1.pdf');
            } else {
                resolve(null);
            }
        }, 800);
    });
};
interface DropdownSelectorProps {
    label: string;
    value: string;
    type: string;
    onPress: () => void;
    disabled?: boolean;
}
const PRIMARY_COLOR = '#2563EB';
const ACCENT_COLOR = '#3B82F6';
const TEXT_COLOR = '#1F2937';
const GRAY_TEXT = '#6B7280';
const LIGHT_GRAY_TEXT = '#9CA3AF';
const BORDER_COLOR = '#E5E7EB';
const BG_COLOR = '#F9FAFB';
const ACTIVE_BG_COLOR = '#EFF6FF';
const DANGER_COLOR = '#EF4444';
const SHADOW_STYLE = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 3,
};
const JOB_TYPES = ['Full Time', 'Part Time', 'Contractual'];
const SALARY_RANGES = ['₹ 0 – ₹ 5,00,000', '₹ 5,00,000 – ₹ 10,00,000', '₹ 10L – ₹ 20L', '₹ 20L+'];
const EXPERIENCE_RANGES = ['Fresher', '1 – 2 Years', '2 – 5 Years', '5 – 10 Years', '10+ Years'];
const CONTRIBUTION_OPTIONS = [1000, 2000, 5000, 10000];
const mockFetchJobDetails = async (id: string) => {
    console.log(`Mock: Fetching job details for jobId: ${id}`);
    return new Promise<any>((resolve, reject) => {
        setTimeout(() => {
            if (id === 'job-123') {
                resolve({
                    jobType: 'Full Time',
                    workMode: 'Hybrid',
                    salaryRange: '₹ 10L – ₹ 20L',
                    position: 'Senior React Native Developer',
                    experience: '5 – 10 Years',
                    skills: 'React Native, JavaScript, TypeScript, Redux, Firebase, REST APIs, GraphQL',
                    candidates: 5,
                    contribution: 5000,
                    location: 'Bengaluru, Karnataka, 560001',
                    fileName: 'Senior_RN_Dev_JD_v2.pdf'
                });
            } else if (id === 'job-error') {
                reject(new Error("Job details could not be found."));
            } else {
                resolve(null);
            }
        }, 1500);
    });
};
interface DashboardJobPostProps {
    jobId?: string;
    initialJobData?: any;
    onJobPosted?: (jobData: any, isUpdate: boolean) => void;
    onDraftSaved?: (jobData: any) => void;
    onCancel?: () => void;
}
export default function DashboardJobPost(props: DashboardJobPostProps) {
    const { jobId, initialJobData, onJobPosted, onDraftSaved, onCancel } = props;
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
    const [isLoading, setIsLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentModalType, setCurrentModalType] = useState<string | null>(null);
    const [showAlertModal, setShowAlertModal] = useState(false);
    const [alertModalTitle, setAlertModalTitle] = useState('');
    const [alertModalMessage, setAlertModalMessage] = useState('');
    const [alertModalIsError, setAlertModalIsError] = useState(false);
    const totalCost = candidates * contribution;
    const resetForm = useCallback(() => {
        setJobType(JOB_TYPES[0]);
        setWorkMode('Work From Home');
        setSalaryRange(SALARY_RANGES[0]);
        setPosition('');
        setExperience(EXPERIENCE_RANGES[2]);
        setSkills('');
        setCandidates(10);
        setContribution(1000);
        setLocation('');
        setFileName(null);
    }, []);
    useEffect(() => {
        const loadFormData = async () => {
            setIsLoading(true);
            try {
                let dataToLoad = null;
                if (initialJobData) {
                    dataToLoad = initialJobData;
                } else if (jobId) {
                    dataToLoad = await mockFetchJobDetails(jobId);
                    if (!dataToLoad) {
                        setAlertModalTitle('Error');
                        setAlertModalMessage('Job not found or could not be loaded.');
                        setAlertModalIsError(true);
                        setShowAlertModal(true);
                        resetForm();
                        return;
                    }
                }
                if (dataToLoad) {
                    setJobType(dataToLoad.jobType || JOB_TYPES[0]);
                    setWorkMode(dataToLoad.workMode || 'Work From Home');
                    setSalaryRange(dataToLoad.salaryRange || SALARY_RANGES[0]);
                    setPosition(dataToLoad.position || '');
                    setExperience(dataToLoad.experience || EXPERIENCE_RANGES[2]);
                    setSkills(dataToLoad.skills || '');
                    setCandidates(dataToLoad.candidates || 10);
                    setContribution(dataToLoad.contribution || 1000);
                    setLocation(dataToLoad.location || '');
                    setFileName(dataToLoad.fileName || null);
                } else {
                    resetForm();
                }
            } catch (error: any) {
                console.error("Failed to load job:", error);
                setAlertModalTitle('Error');
                setAlertModalMessage(`Failed to load job details: ${error.message || 'Unknown error'}`);
                setAlertModalIsError(true);
                setShowAlertModal(true);
                resetForm();
            } finally {
                setIsLoading(false);
            }
        };
        loadFormData();
    }, [jobId, initialJobData, resetForm]);
    const handleStepper = (action: string) => {
        if (action === 'increase') {
            if (candidates < 100) setCandidates(candidates + 1);
        } else {
            if (candidates > 1) setCandidates(candidates - 1);
        }
    };
    const handleFileUpload = async () => {
        setIsLoading(true);
        const file = await mockFilePicker();
        if (file) {
            setFileName(file);
            setAlertModalTitle('Upload Successful');
            setAlertModalMessage(`"${file}" has been uploaded.`);
            setAlertModalIsError(false);
            setShowAlertModal(true);
        } else {
            setAlertModalTitle('Upload Failed');
            setAlertModalMessage('Could not select a file. Please try again.');
            setAlertModalIsError(true);
            setShowAlertModal(true);
        }
        setIsLoading(false);
    };
    const handleDetectLocation = () => {
        setIsLoading(true);
        setTimeout(() => {
            const detectedLocation = 'Bengaluru, Karnataka, 560001';
            setLocation(detectedLocation);
            setAlertModalTitle('Location Detected');
            setAlertModalMessage(`Your current location has been set to "${detectedLocation}".`);
            setAlertModalIsError(false);
            setShowAlertModal(true);
            setIsLoading(false);
        }, 800);
    };
    const getCurrentFormData = () => ({
        jobType, workMode, salaryRange, position, experience, skills, candidates, contribution, location, fileName, totalCost
    });
    const handleSaveDraft = () => {
        setIsLoading(true);
        setTimeout(() => {
            const formData = getCurrentFormData();
            console.log('Draft saved:', formData);
            setAlertModalTitle('Draft Saved');
            setAlertModalMessage('Your job post draft has been saved successfully.');
            setAlertModalIsError(false);
            setShowAlertModal(true);
            setIsLoading(false);
            if (onDraftSaved) {
                onDraftSaved(formData);
            }
        }, 1000);
    };
    const handleSubmit = () => {
        setIsLoading(true);
        if (!position.trim()) {
            setAlertModalTitle('Validation Error');
            setAlertModalMessage('Please enter a Job Position/Role.');
            setAlertModalIsError(true);
            setShowAlertModal(true);
            setIsLoading(false);
            return;
        }
        if (!skills.trim()) {
            setAlertModalTitle('Validation Error');
            setAlertModalMessage('Please enter Skills/Requirements.');
            setAlertModalIsError(true);
            setShowAlertModal(true);
            setIsLoading(false);
            return;
        }
        if (!location.trim()) {
            setAlertModalTitle('Validation Error');
            setAlertModalMessage('Please enter a Job Location.');
            setAlertModalIsError(true);
            setShowAlertModal(true);
            setIsLoading(false);
            return;
        }
        setTimeout(() => {
            const formData = getCurrentFormData();
            if (jobId) {
                console.log('Job updated:', jobId, formData);
                setAlertModalTitle('Job Updated!');
                setAlertModalMessage(`Job "${position}" (ID: ${jobId}) has been updated successfully.`);
            } else {
                console.log('New job posted:', formData);
                setAlertModalTitle('Job Posted Successfully!');
                setAlertModalMessage(
                    `Job Position: ${position}\nCandidates: ${candidates}\nTotal Cost: ₹ ${totalCost.toLocaleString('en-IN')}`
                );
                resetForm();
            }
            setAlertModalIsError(false);
            setShowAlertModal(true);
            setIsLoading(false);
            if (onJobPosted) {
                onJobPosted(formData, !!jobId);
            }
        }, 1500);
    };
    const DropdownSelector = ({ label, value, type, onPress, disabled }: DropdownSelectorProps) => (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <TouchableOpacity
                style={[styles.dropdownBox, SHADOW_STYLE, disabled && { backgroundColor: BORDER_COLOR }]}
                onPress={onPress}
                disabled={disabled || isLoading}
            >
                <Text style={[styles.inputText, disabled && { color: GRAY_TEXT }]}>{value}</Text>
                <Feather name="chevron-down" size={20} color={GRAY_TEXT} />
            </TouchableOpacity>
        </View>
    );
    return (
        <View style={styles.container}>
            {isLoading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color={PRIMARY_COLOR} />
                    <Text style={styles.loadingText}>{jobId ? 'Loading Job...' : 'Processing...'}</Text>
                </View>
            )}
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <DropdownSelector
                    label="Job Type"
                    value={jobType}
                    type="JOB_TYPE"
                    onPress={() => {
                        setCurrentModalType('JOB_TYPE');
                        setModalVisible(true);
                    }}
                    disabled={isLoading}
                />
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Work Mode</Text>
                    <View style={styles.pillsContainer}>
                        {['Work From Home', 'On-Site', 'Hybrid'].map((mode) => (
                            <TouchableOpacity
                                key={mode}
                                style={[
                                    styles.pill,
                                    workMode === mode && styles.pillActive,
                                    isLoading && { backgroundColor: BORDER_COLOR, borderColor: GRAY_TEXT }
                                ]}
                                onPress={() => setWorkMode(mode)}
                                disabled={isLoading}
                            >
                                <View style={[styles.radioCircle, workMode === mode && styles.radioActive, isLoading && { borderColor: GRAY_TEXT }]}>
                                    {workMode === mode && <View style={styles.radioDot} />}
                                </View>
                                <Text style={[styles.pillText, workMode === mode && styles.pillTextActive, isLoading && { color: GRAY_TEXT }]}>
                                    {mode}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
                <DropdownSelector
                    label="Salary Range"
                    value={salaryRange}
                    type="SALARY"
                    onPress={() => {
                        setCurrentModalType('SALARY');
                        setModalVisible(true);
                    }}
                    disabled={isLoading}
                />
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Job Position / Role</Text>
                    <TextInput
                        style={[styles.textInput, SHADOW_STYLE, isLoading && { backgroundColor: BORDER_COLOR }]}
                        placeholder="e.g. Software Engineer"
                        placeholderTextColor={LIGHT_GRAY_TEXT}
                        value={position}
                        onChangeText={setPosition}
                        editable={!isLoading}
                    />
                </View>
                <DropdownSelector
                    label="Desired Experience"
                    value={experience}
                    type="EXPERIENCE"
                    onPress={() => {
                        setCurrentModalType('EXPERIENCE');
                        setModalVisible(true);
                    }}
                    disabled={isLoading}
                />
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Skills / Requirements</Text>
                    <TextInput
                        style={[styles.textInput, styles.textArea, SHADOW_STYLE, isLoading && { backgroundColor: BORDER_COLOR }]}
                        placeholder="Java, Spring Boot, MySQL, REST APIs..."
                        placeholderTextColor={LIGHT_GRAY_TEXT}
                        multiline
                        numberOfLines={4}
                        value={skills}
                        onChangeText={setSkills}
                        editable={!isLoading}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Number of Candidates Required</Text>
                    <View style={[styles.stepperContainer, SHADOW_STYLE, isLoading && { backgroundColor: BORDER_COLOR }]}>
                        <TouchableOpacity style={[styles.stepperBtn, isLoading && { opacity: 0.5 }]} onPress={() => handleStepper('decrease')} disabled={isLoading}>
                            <Feather name="minus" size={20} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.stepperValue}>{candidates}</Text>
                        <TouchableOpacity style={[styles.stepperBtn, isLoading && { opacity: 0.5 }]} onPress={() => handleStepper('increase')} disabled={isLoading}>
                            <Feather name="plus" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Upload Job Description</Text>
                    <TouchableOpacity
                        style={[styles.uploadBox, SHADOW_STYLE, fileName && { borderColor: PRIMARY_COLOR, backgroundColor: ACTIVE_BG_COLOR }, isLoading && { backgroundColor: BORDER_COLOR }]}
                        onPress={handleFileUpload}
                        disabled={isLoading}
                    >
                        {fileName ? (
                            <View style={styles.filePreview}>
                                <MaterialCommunityIcons name="file-pdf-box" size={30} color="#DC2626" />
                                <Text style={styles.fileName}>{fileName}</Text>
                                <Feather name="check-circle" size={20} color="green" />
                            </View>
                        ) : (
                            <>
                                <Feather name="upload-cloud" size={24} color={PRIMARY_COLOR} />
                                <Text style={styles.uploadText}>Upload JD (PDF / Word)</Text>
                            </>
                        )}
                    </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Job Location</Text>
                    <View style={[styles.locationContainer, SHADOW_STYLE, isLoading && { backgroundColor: BORDER_COLOR }]}>
                        <Ionicons name="location-sharp" size={20} color={ACCENT_COLOR} style={{ marginLeft: 12 }} />
                        <TextInput
                            style={styles.locationInput}
                            placeholder="City, District, Pin Code"
                            placeholderTextColor={LIGHT_GRAY_TEXT}
                            value={location}
                            onChangeText={setLocation}
                            editable={!isLoading}
                        />
                        <TouchableOpacity style={[styles.detectBtn, isLoading && { opacity: 0.5 }]} onPress={handleDetectLocation} disabled={isLoading}>
                            <Text style={styles.detectText}>Detect</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <DropdownSelector
                    label="Per Candidate Contribution"
                    value={`₹ ${contribution.toLocaleString('en-IN')}`}
                    type="CONTRIBUTION"
                    onPress={() => {
                        setCurrentModalType('CONTRIBUTION');
                        setModalVisible(true);
                    }}
                    disabled={isLoading}
                />
                {!jobId && (
                    <TouchableOpacity
                        style={styles.clearFormBtn}
                        onPress={resetForm}
                        disabled={isLoading}
                    >
                        <Text style={styles.clearFormBtnText}>Clear Form</Text>
                    </TouchableOpacity>
                )}
                <View style={{ height: 120 }} />
            </ScrollView>
            <View style={styles.footer}>
                <View style={styles.costRow}>
                    <Text style={styles.costLabel}>Total Cost Estimation:</Text>
                    <Text style={styles.costValue}>
                        {candidates} x ₹{contribution.toLocaleString('en-IN')} = <Text style={styles.totalAmount}>₹ {totalCost.toLocaleString('en-IN')}</Text>
                    </Text>
                </View>
                <View style={styles.footerButtons}>
                    <TouchableOpacity style={styles.draftBtn} onPress={handleSaveDraft} disabled={isLoading}>
                        {isLoading ? (
                            <ActivityIndicator size="small" color={PRIMARY_COLOR} />
                        ) : (
                            <Text style={styles.draftBtnText}>Save Draft</Text>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.postBtn} onPress={handleSubmit} disabled={isLoading}>
                        {isLoading ? (
                            <ActivityIndicator size="small" color="white" />
                        ) : (
                            <Text style={styles.postBtnText}>{jobId ? 'Update Job' : 'Post Job'}</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
            <Modal visible={modalVisible} transparent animationType="fade">
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setModalVisible(false)}
                >
                    <View style={[styles.dropdownModalContent, SHADOW_STYLE]} onStartShouldSetResponder={() => true}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Select an Option</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.iconBtn}>
                                <Feather name="x" size={24} color={GRAY_TEXT} />
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
                                            ? `₹ ${item.toLocaleString('en-IN')}`
                                            : item}
                                    </Text>
                                    {(currentModalType === 'JOB_TYPE' && jobType === item) ||
                                        (currentModalType === 'SALARY' && salaryRange === item) ||
                                        (currentModalType === 'EXPERIENCE' && experience === item) ||
                                        (currentModalType === 'CONTRIBUTION' && contribution === item) ? (
                                        <Feather name="check" size={20} color={PRIMARY_COLOR} />
                                    ) : null}
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
            <Modal visible={showAlertModal} transparent animationType="fade">
                <View style={styles.alertModalOverlay}>
                    <View style={[styles.alertModalContainer, SHADOW_STYLE]}>
                        <Text style={[styles.alertModalTitle, alertModalIsError && { color: DANGER_COLOR }]}>{alertModalTitle}</Text>
                        <Text style={styles.alertModalMessage}>{alertModalMessage}</Text>
                        <TouchableOpacity
                            style={[styles.alertModalButton, alertModalIsError && { backgroundColor: DANGER_COLOR }]}
                            onPress={() => setShowAlertModal(false)}
                        >
                            <Text style={styles.alertModalButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR,
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: PRIMARY_COLOR,
        fontWeight: '600',
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 20,
    },
    inputContainer: {
        marginBottom: 24,
    },
    label: {
        fontSize: 15,
        fontWeight: '600',
        color: TEXT_COLOR,
        marginBottom: 8,
    },
    textInput: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: BORDER_COLOR,
        borderRadius: 10,
        padding: 14,
        fontSize: 16,
        color: TEXT_COLOR,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    dropdownBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: BORDER_COLOR,
        borderRadius: 10,
        padding: 14,
    },
    inputText: {
        fontSize: 16,
        color: TEXT_COLOR,
    },
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
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    pillActive: {
        borderColor: PRIMARY_COLOR,
        backgroundColor: ACTIVE_BG_COLOR,
    },
    pillText: {
        fontSize: 14,
        color: GRAY_TEXT,
        marginLeft: 8,
    },
    pillTextActive: {
        color: PRIMARY_COLOR,
        fontWeight: '600',
    },
    radioCircle: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 1.5,
        borderColor: GRAY_TEXT,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioActive: {
        borderColor: PRIMARY_COLOR,
    },
    radioDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: PRIMARY_COLOR,
    },
    stepperContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: BORDER_COLOR,
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 4,
    },
    stepperBtn: {
        padding: 12,
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 8,
    },
    stepperValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: TEXT_COLOR,
        minWidth: 40,
        textAlign: 'center',
    },
    uploadBox: {
        borderWidth: 2,
        borderColor: BORDER_COLOR,
        borderStyle: 'dashed',
        borderRadius: 10,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    uploadText: {
        color: PRIMARY_COLOR,
        marginLeft: 10,
        fontWeight: '500',
        fontSize: 15,
    },
    filePreview: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingHorizontal: 10,
    },
    fileName: {
        marginLeft: 10,
        marginRight: 10,
        fontSize: 15,
        color: TEXT_COLOR,
        fontWeight: '500',
        flexShrink: 1,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: BORDER_COLOR,
        borderRadius: 10,
        overflow: 'hidden',
    },
    locationInput: {
        flex: 1,
        padding: 14,
        fontSize: 16,
        color: TEXT_COLOR,
    },
    detectBtn: {
        paddingVertical: 14,
        paddingHorizontal: 18,
        backgroundColor: ACTIVE_BG_COLOR,
        borderLeftWidth: 1,
        borderLeftColor: BORDER_COLOR,
    },
    detectText: {
        color: PRIMARY_COLOR,
        fontWeight: '600',
        fontSize: 13,
    },
    clearFormBtn: {
        marginTop: 20,
        padding: 14,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: GRAY_TEXT,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    clearFormBtnText: {
        color: GRAY_TEXT,
        fontWeight: '600',
        fontSize: 16,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        padding: 18,
        borderTopWidth: 1,
        borderTopColor: BORDER_COLOR,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    costRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 16,
    },
    costLabel: {
        fontSize: 13,
        color: GRAY_TEXT,
    },
    costValue: {
        fontSize: 15,
        color: TEXT_COLOR,
    },
    totalAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: PRIMARY_COLOR,
    },
    footerButtons: {
        flexDirection: 'row',
        gap: 12,
    },
    draftBtn: {
        flex: 1,
        padding: 16,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: PRIMARY_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
    },
    draftBtnText: {
        color: PRIMARY_COLOR,
        fontWeight: '600',
        fontSize: 16,
    },
    postBtn: {
        flex: 1,
        padding: 16,
        borderRadius: 10,
        backgroundColor: PRIMARY_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
    },
    postBtnText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'flex-end',
    },
    dropdownModalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        maxHeight: '60%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: BORDER_COLOR,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: TEXT_COLOR,
    },
    iconBtn: {
        padding: 6,
    },
    modalItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: BORDER_COLOR,
    },
    modalItemText: {
        fontSize: 17,
        color: TEXT_COLOR,
    },
    alertModalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    alertModalContainer: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 25,
        alignItems: 'center',
    },
    alertModalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: TEXT_COLOR,
        marginBottom: 10,
        textAlign: 'center',
    },
    alertModalMessage: {
        fontSize: 16,
        color: GRAY_TEXT,
        textAlign: 'center',
        marginBottom: 25,
        lineHeight: 24,
    },
    alertModalButton: {
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 30,
        width: '100%',
    },
    alertModalButtonText: {
        color: 'white',
        fontSize: 17,
        fontWeight: '600',
        textAlign: 'center',
    },
});
