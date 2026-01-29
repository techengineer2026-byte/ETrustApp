// src/screens/Employee/EditProfileScreen.tsx

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Modal,
    FlatList,
    Platform,
    KeyboardAvoidingView,
    Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// --- MOCK DATA FOR DROPDOWNS ---
const STATES: { [key: string]: string[] } = {
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik'],
    'Delhi NCR': ['New Delhi', 'Noida', 'Gurgaon', 'Faridabad'],
    'Karnataka': ['Bangalore', 'Mysore', 'Hubli'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai'],
};

const JOB_TYPES = ['Full Time', 'Part Time', 'Contract', 'Freelance'];
const CURRENT_STATUS = ['Employed', 'Unemployed', 'Student', 'Notice Period'];
const GENDERS = ['Male', 'Female', 'Other'];

export default function EditProfileScreen({ navigation }: any) {

    // --- FORM STATE ---
    const [form, setForm] = useState({
        name: 'Anurag Kohli',
        dob: '15/08/1995', // Use a DatePicker in real app
        gender: 'Male',

        // Education
        degree: 'B.Tech',
        fos: 'Computer Science',
        college: 'IIT Bombay',
        collegeLocation: 'Mumbai',

        // Work
        status: 'Employed',
        experience: '4', // Years
        currentProfile: 'Senior React Developer',
        currentCTC: '12.5', // LPA

        // Preference
        jobType: 'Full Time',
        expectedSalary: '18.0', // LPA
        distancePref: '25', // km
        state: 'Maharashtra',
        city: 'Mumbai',
    });

    // --- MODAL STATE ---
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState(''); // 'gender', 'state', 'city', 'status', 'type'
    const [modalData, setModalData] = useState<string[]>([]);

    // --- HANDLERS ---
    const updateField = (key: string, value: string) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    const openSelector = (type: string) => {
        setModalType(type);
        setModalVisible(true);

        switch (type) {
            case 'gender': setModalData(GENDERS); break;
            case 'status': setModalData(CURRENT_STATUS); break;
            case 'jobType': setModalData(JOB_TYPES); break;
            case 'state': setModalData(Object.keys(STATES)); break;
            case 'city':
                setModalData(form.state ? STATES[form.state] : []);
                break;
        }
    };

    const handleSelect = (item: string) => {
        if (modalType === 'state') {
            // Reset city if state changes
            setForm(prev => ({ ...prev, state: item, city: '' }));
        } else {
            updateField(modalType === 'jobType' ? 'jobType' : modalType, item);
        }
        setModalVisible(false);
    };

    const handleSave = () => {
        // Here you would send API request
        Alert.alert("Profile Updated", "Your details have been saved successfully.", [
            { text: "OK", onPress: () => navigation.goBack() }
        ]);
    };

    // --- REUSABLE COMPONENTS ---

    // 1. Section Header
    const SectionTitle = ({ title, icon }: { title: string, icon: string }) => (
        <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name={icon} size={20} color="#4F46E5" />
            <Text style={styles.sectionTitleText}>{title}</Text>
        </View>
    );

    // 2. Text Input Field
    const InputField = ({ label, value, fieldKey, placeholder, keyboard = 'default' }: any) => (
        <View style={styles.inputGroup}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={(text) => updateField(fieldKey, text)}
                placeholder={placeholder}
                placeholderTextColor="#9CA3AF"
                keyboardType={keyboard as any}
            />
        </View>
    );

    // 3. Dropdown/Selector Field
    const SelectField = ({ label, value, type }: any) => (
        <TouchableOpacity style={styles.inputGroup} onPress={() => openSelector(type)}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.selectBox}>
                <Text style={[styles.selectText, !value && { color: '#9CA3AF' }]}>
                    {value || 'Select'}
                </Text>
                <MaterialCommunityIcons name="chevron-down" size={20} color="#6B7280" />
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* --- HEADER --- */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#111" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Edit Profile</Text>
                <View style={{ width: 40 }} />
            </View>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                    {/* SECTION 1: PERSONAL */}
                    <SectionTitle title="Personal Details" icon="account-circle-outline" />
                    <View style={styles.card}>
                        <InputField label="Full Name" value={form.name} fieldKey="name" />
                        <View style={styles.row}>
                            <View style={{ flex: 1, marginRight: 10 }}>
                                <InputField label="Date of Birth" value={form.dob} fieldKey="dob" placeholder="DD/MM/YYYY" />
                            </View>
                            <View style={{ flex: 1 }}>
                                <SelectField label="Gender" value={form.gender} type="gender" />
                            </View>
                        </View>
                    </View>

                    {/* SECTION 2: EDUCATION */}
                    <SectionTitle title="Education" icon="school-outline" />
                    <View style={styles.card}>
                        <InputField label="Degree" value={form.degree} fieldKey="degree" placeholder="e.g. B.Tech, MBA" />
                        <InputField label="Field of Study" value={form.fos} fieldKey="fos" placeholder="e.g. Computer Science" />
                        <InputField label="College / University" value={form.college} fieldKey="college" />
                        <InputField label="College Location" value={form.collegeLocation} fieldKey="collegeLocation" placeholder="City" />
                    </View>

                    {/* SECTION 3: WORK */}
                    <SectionTitle title="Work Experience" icon="briefcase-outline" />
                    <View style={styles.card}>
                        <SelectField label="Current Status" value={form.status} type="status" />
                        <View style={styles.row}>
                            <View style={{ flex: 1, marginRight: 10 }}>
                                <InputField label="Experience (Yrs)" value={form.experience} fieldKey="experience" keyboard="numeric" />
                            </View>
                            <View style={{ flex: 1 }}>
                                <InputField label="Current CTC (LPA)" value={form.currentCTC} fieldKey="currentCTC" keyboard="numeric" />
                            </View>
                        </View>
                        <InputField label="Current Job Profile" value={form.currentProfile} fieldKey="currentProfile" placeholder="e.g. Sales Manager" />
                    </View>

                    {/* SECTION 4: PREFERENCES */}
                    <SectionTitle title="Job Preferences" icon="target" />
                    <View style={styles.card}>
                        <View style={styles.row}>
                            <View style={{ flex: 1, marginRight: 10 }}>
                                <SelectField label="Job Type" value={form.jobType} type="jobType" />
                            </View>
                            <View style={{ flex: 1 }}>
                                <InputField label="Exp. Salary (LPA)" value={form.expectedSalary} fieldKey="expectedSalary" keyboard="numeric" />
                            </View>
                        </View>

                        <InputField label="Max Distance (km)" value={form.distancePref} fieldKey="distancePref" keyboard="numeric" />

                        <Text style={styles.subHeader}>Preferred Location</Text>
                        <View style={styles.row}>
                            <View style={{ flex: 1, marginRight: 10 }}>
                                <SelectField label="State" value={form.state} type="state" />
                            </View>
                            <View style={{ flex: 1 }}>
                                <SelectField label="Site (City)" value={form.city} type="city" />
                            </View>
                        </View>
                    </View>

                    {/* BOTTOM PADDING FOR FAB */}
                    <View style={{ height: 80 }} />

                </ScrollView>
            </KeyboardAvoidingView>

            {/* --- SAVE BUTTON --- */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
            </View>

            {/* --- SELECTION MODAL --- */}
            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Select {modalType === 'jobType' ? 'Job Type' : modalType}</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <MaterialCommunityIcons name="close" size={24} color="#333" />
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={modalData}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.modalItem} onPress={() => handleSelect(item)}>
                                    <Text style={styles.modalItemText}>{item}</Text>
                                    {/* Show checkmark if selected */}
                                    {(form as any)[modalType] === item && (
                                        <MaterialCommunityIcons name="check" size={20} color="#4F46E5" />
                                    )}
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
    container: { flex: 1, backgroundColor: '#F9FAFB' },

    // Header
    header: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#fff',
        borderBottomWidth: 1, borderBottomColor: '#E5E7EB'
    },
    backBtn: { padding: 5 },
    headerTitle: { fontSize: 18, fontWeight: '700', color: '#111' },

    scrollContent: { padding: 20 },

    // Sections
    sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, marginTop: 8 },
    sectionTitleText: { fontSize: 16, fontWeight: '700', color: '#111', marginLeft: 8 },

    // Cards
    card: {
        backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 24,
        shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2
    },
    row: { flexDirection: 'row' },
    subHeader: { fontSize: 13, fontWeight: '600', color: '#6B7280', marginTop: 10, marginBottom: 10 },

    // Inputs
    inputGroup: { marginBottom: 16 },
    label: { fontSize: 12, color: '#6B7280', marginBottom: 6, fontWeight: '500' },
    input: {
        borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 10,
        paddingHorizontal: 12, paddingVertical: 10, fontSize: 15, color: '#111',
        backgroundColor: '#F9FAFB'
    },
    selectBox: {
        borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 10,
        paddingHorizontal: 12, paddingVertical: 12,
        backgroundColor: '#F9FAFB', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
    },
    selectText: { fontSize: 15, color: '#111' },

    // Footer
    footer: {
        position: 'absolute', bottom: 0, left: 0, right: 0,
        backgroundColor: '#fff', padding: 20,
        borderTopWidth: 1, borderTopColor: '#E5E7EB'
    },
    saveButton: {
        backgroundColor: '#4F46E5', borderRadius: 12, paddingVertical: 16,
        alignItems: 'center', shadowColor: '#4F46E5', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5
    },
    saveButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },

    // Modal
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, maxHeight: '60%' },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    modalTitle: { fontSize: 18, fontWeight: '700', color: '#111', textTransform: 'capitalize' },
    modalItem: { paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#F3F4F6', flexDirection: 'row', justifyContent: 'space-between' },
    modalItemText: { fontSize: 16, color: '#374151' },
});