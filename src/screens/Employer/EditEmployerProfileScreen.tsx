// src/screens/Employer/EditEmployerProfileScreen.tsx

import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Alert,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const EditEmployerProfileScreen = () => {
    const navigation = useNavigation();

    // --- State ---
    const [companyName, setCompanyName] = useState('Tech Solutions Pvt Ltd');
    const [contactPerson, setContactPerson] = useState('Anurag Kohli');

    // Contact Fields
    const [email] = useState('hr@techsolutions.com');
    const [isEmailVerified] = useState(true); // Already Verified

    const [phone] = useState('+91 98765 43210');

    // Verification State for Phone
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false); // For loading spinner

    // Location Fields
    const [address, setAddress] = useState('Plot 45, Tech Park, Sector 82');
    const [city, setCity] = useState('Mohali');
    const [state, setState] = useState('Punjab');
    const [pincode, setPincode] = useState('140308');

    const [isLoading, setIsLoading] = useState(false);

    // --- Actions ---

    // 1. Handle Verification Click
    const handleVerifyPhone = () => {
        setIsVerifying(true);

        // Simulate API/OTP delay
        setTimeout(() => {
            setIsVerifying(false);
            setIsPhoneVerified(true); // Turn Green
            Alert.alert("Success", "Phone number verified successfully!");
        }, 1500);
    };

    const handleSave = () => {
        if (!companyName || !contactPerson || !city || !pincode) {
            return;
        }
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            navigation.goBack();
        }, 1500);
    };

    const handleImageUpload = () => {
        Alert.alert("Upload Logo", "Open Gallery/Camera");
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            {/* --- HEADER --- */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Icon name="arrow-left" size={24} color="#1E293B" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Edit Company Details</Text>
                <TouchableOpacity onPress={handleSave} disabled={isLoading}>
                    <Text style={[styles.headerSave, isLoading && { color: '#94A3B8' }]}>
                        {isLoading ? 'Saving...' : 'Save'}
                    </Text>
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

                    {/* Logo Section */}
                    <View style={styles.logoSection}>
                        <TouchableOpacity style={styles.logoWrapper} onPress={handleImageUpload}>
                            <Image
                                source={{ uri: 'https://randomuser.me/api/portraits/lego/1.jpg' }}
                                style={styles.logo}
                            />
                            <View style={styles.cameraOverlay}>
                                <Icon name="camera-outline" size={22} color="#fff" />
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.logoText}>Tap to update logo</Text>
                    </View>

                    {/* Basic Info */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Basic Information</Text>
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Company Name</Text>
                            <TextInput style={styles.input} value={companyName} onChangeText={setCompanyName} />
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Contact Person Name</Text>
                            <TextInput style={styles.input} value={contactPerson} onChangeText={setContactPerson} />
                        </View>
                    </View>

                    {/* Contact Details */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Contact Details</Text>

                        {/* Email */}
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Email Address</Text>
                            <View style={[styles.inputWrapper, styles.readOnly]}>
                                <Icon name="email-outline" size={20} color="#94A3B8" />
                                <TextInput
                                    style={[styles.inputField, { color: '#64748B' }]}
                                    value={email}
                                    editable={false}
                                />
                                <View style={styles.verifiedBadge}>
                                    <Icon name="check-decagram" size={16} color="#10B981" />
                                    <Text style={styles.verifiedText}>Verified</Text>
                                </View>
                            </View>
                        </View>

                        {/* Phone Number (Interactive Verification) */}
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Phone Number</Text>
                            <View style={[styles.inputWrapper, styles.readOnly]}>
                                <Icon name="phone-outline" size={20} color="#94A3B8" />
                                <TextInput
                                    style={[styles.inputField, { color: '#64748B' }]}
                                    value={phone}
                                    editable={false}
                                />

                                {/* --- TOGGLE BADGE LOGIC --- */}
                                {isPhoneVerified ? (
                                    // GREEN: Verified
                                    <View style={styles.verifiedBadge}>
                                        <Icon name="check-decagram" size={16} color="#10B981" />
                                        <Text style={styles.verifiedText}>Verified</Text>
                                    </View>
                                ) : (
                                    // RED: Click to Verify
                                    <TouchableOpacity
                                        style={styles.unverifiedBadge}
                                        onPress={handleVerifyPhone}
                                        disabled={isVerifying}
                                    >
                                        {isVerifying ? (
                                            <ActivityIndicator size="small" color="#DC2626" />
                                        ) : (
                                            <>
                                                <Icon name="alert-circle-outline" size={16} color="#DC2626" />
                                                <Text style={styles.unverifiedText}>Verify Now</Text>
                                            </>
                                        )}
                                    </TouchableOpacity>
                                )}
                            </View>

                            {/* Helper Text */}
                            {!isPhoneVerified && !isVerifying && (
                                <Text style={styles.helperErrorText}>
                                    Tap the button to verify your phone number.
                                </Text>
                            )}
                        </View>
                    </View>

                    {/* Location Details */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Office Location</Text>
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Street Address</Text>
                            <TextInput
                                style={[styles.input, { height: 80, textAlignVertical: 'top', paddingTop: 12 }]}
                                value={address} onChangeText={setAddress} multiline
                            />
                        </View>
                        <View style={styles.row}>
                            <View style={[styles.formGroup, { flex: 1, marginRight: 12 }]}>
                                <Text style={styles.label}>City</Text>
                                <TextInput style={styles.input} value={city} onChangeText={setCity} />
                            </View>
                            <View style={[styles.formGroup, { flex: 1 }]}>
                                <Text style={styles.label}>State</Text>
                                <TextInput style={styles.input} value={state} onChangeText={setState} />
                            </View>
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Pincode / Zip Code</Text>
                            <TextInput style={styles.input} value={pincode} onChangeText={setPincode} keyboardType="numeric" maxLength={6} />
                        </View>
                    </View>

                    <View style={{ height: 100 }} />
                </ScrollView>
            </KeyboardAvoidingView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.saveBtn} onPress={handleSave} disabled={isLoading}>
                    <Text style={styles.saveBtnText}>{isLoading ? "Updating..." : "Update Profile"}</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
};

export default EditEmployerProfileScreen;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9', backgroundColor: '#fff',
    },
    backBtn: { padding: 4 },
    headerTitle: { fontSize: 18, fontWeight: '700', color: '#0F172A' },
    headerSave: { fontSize: 16, fontWeight: '600', color: '#2563EB' },
    content: { padding: 20 },

    logoSection: { alignItems: 'center', marginBottom: 24 },
    logoWrapper: { position: 'relative', width: 100, height: 100 },
    logo: { width: 100, height: 100, borderRadius: 50, borderWidth: 1, borderColor: '#E2E8F0' },
    cameraOverlay: {
        position: 'absolute', bottom: 0, right: 0, backgroundColor: '#2563EB',
        width: 34, height: 34, borderRadius: 17, justifyContent: 'center', alignItems: 'center',
        borderWidth: 2, borderColor: '#fff'
    },
    logoText: { marginTop: 10, color: '#2563EB', fontSize: 14, fontWeight: '500' },

    section: { marginBottom: 24 },
    sectionTitle: { fontSize: 16, fontWeight: '700', color: '#0F172A', marginBottom: 16 },
    formGroup: { marginBottom: 16 },
    row: { flexDirection: 'row' },
    label: { fontSize: 13, fontWeight: '600', color: '#64748B', marginBottom: 8 },

    input: {
        backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E2E8F0',
        borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12,
        fontSize: 15, color: '#0F172A',
    },
    inputWrapper: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8FAFC',
        borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 12, paddingHorizontal: 12
    },
    inputField: { flex: 1, paddingVertical: 12, paddingHorizontal: 8, fontSize: 15, color: '#0F172A' },
    readOnly: { backgroundColor: '#F1F5F9', borderColor: '#E2E8F0' },

    // --- BADGES ---
    verifiedBadge: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: '#DCFCE7',
        paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, borderWidth: 1, borderColor: '#BBF7D0'
    },
    verifiedText: {
        fontSize: 11, fontWeight: '700', color: '#15803D', marginLeft: 4
    },
    // CLICKABLE RED BADGE
    unverifiedBadge: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: '#FEF2F2',
        paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6, borderWidth: 1, borderColor: '#FECACA'
    },
    unverifiedText: {
        fontSize: 11, fontWeight: '700', color: '#DC2626', marginLeft: 4
    },
    helperErrorText: {
        fontSize: 11, color: '#DC2626', marginTop: 6, marginLeft: 4
    },

    footer: {
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: 20, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#F1F5F9'
    },
    saveBtn: {
        backgroundColor: '#2563EB', paddingVertical: 16, borderRadius: 14,
        alignItems: 'center', shadowColor: '#2563EB', shadowOpacity: 0.2, shadowRadius: 5, elevation: 4
    },
    saveBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' }
});