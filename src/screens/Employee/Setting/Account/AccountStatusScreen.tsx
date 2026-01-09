// src/screens/Employee/Setting/Account/AccountStatusScreen.tsx

import React, { useState, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Animated,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from '../../../navigation/types'; // adjust path

// Import common settings components
import { SettingsItem, SectionHeader } from '../../../../components/SettingsCommon';

// --- TYPES ---
type ToastType = 'info' | 'success' | 'error';
type OverallAccountStatus = 'Active' | 'Pending Verification' | 'Suspended';

export default function AccountStatusScreen() {
    const navigation = useNavigation();

    // --- SCREEN STATE (SIMULATED) ---
    const [overallStatus, setOverallStatus] = useState<OverallAccountStatus>('Active'); // Can change to 'Pending Verification' or 'Suspended'
    const [emailVerified, setEmailVerified] = useState(true);
    const [mobileVerified, setMobileVerified] = useState(true);
    const [kycStatus, setKycStatus] = useState<'Not Started' | 'Pending' | 'Verified' | 'Rejected'>('Verified');
    const [currentPlan, setCurrentPlan] = useState('Premium');
    const [lastLogin, setLastLogin] = useState('2023-10-26 10:30 AM');
    const [suspensionReason, setSuspensionReason] = useState('Policy violation. Please contact support.'); // Only if Suspended

    // --- TOAST STATE & ANIMATION ---
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState<ToastType>("info");
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const showToast = (message: string, type: ToastType = "info") => {
        setToastMessage(message);
        setToastType(type);
        fadeAnim.setValue(0); // Reset animation
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();

        setTimeout(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start(() => setToastMessage(""));
        }, 3000);
    };

    // --- HEADER CONFIGURATION ---
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: 'Account Status',
            // Other header styles are inherited from AccountStack.Navigator
        });
    }, [navigation]);

    // --- RENDER HELPERS ---
    const getOverallStatusStyle = (status: OverallAccountStatus) => {
        switch (status) {
            case 'Active': return { backgroundColor: '#4CAF50', borderColor: '#4CAF50' };
            case 'Pending Verification': return { backgroundColor: '#FFC107', borderColor: '#FFC107' };
            case 'Suspended': return { backgroundColor: '#FF5252', borderColor: '#FF5252' };
            default: return { backgroundColor: '#9E9E9E', borderColor: '#9E9E9E' };
        }
    };

    const getVerificationStatusBadge = (status: boolean | string) => {
        const isVerified = status === true || status === 'Verified';
        const color = isVerified ? '#4CAF50' : '#FF5722';
        const text = isVerified ? 'Verified' : (status === 'Not Started' ? 'Not Started' : (status === 'Pending' ? 'Pending' : 'Unverified'));
        const icon = isVerified ? "check-circle" : (status === 'Pending' ? "timer-sand" : "alert-circle");

        return (
            <View style={[styles.verificationBadge, { backgroundColor: color }]}>
                <MaterialCommunityIcons name={icon} size={14} color="#fff" />
                <Text style={styles.verificationText}>{text}</Text>
            </View>
        );
    };

    const getToastIcon = (type: ToastType) => {
        switch (type) {
            case 'success': return "check-circle-outline";
            case 'error': return "alert-circle-outline";
            case 'info':
            default: return "information-outline";
        }
    };

    const getToastColor = (type: ToastType) => {
        switch (type) {
            case 'success': return '#4CAF50';
            case 'error': return '#FF5252';
            case 'info':
            default: return '#007AFF'; // Blue
        }
    };

    const handleContactSupport = () => {
        showToast("Navigating to Contact Support...", "info");
        navigation.navigate('SettingsScreen'); // Example navigation
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.contentCard}>
                    <Text style={styles.contentText}>
                        This section provides an overview of your account's current status,
                        verification progress, and other important details.
                    </Text>

                    {/* --- OVERALL ACCOUNT STATUS --- */}
                    <Text style={styles.inputLabel}>Overall Account Status</Text>
                    <View style={[styles.overallStatusBox, getOverallStatusStyle(overallStatus)]}>
                        <MaterialCommunityIcons name={overallStatus === 'Active' ? "check-decagram" : overallStatus === 'Suspended' ? "alert-octagon" : "information"} size={24} color="#fff" />
                        <Text style={styles.overallStatusText}>{overallStatus}</Text>
                    </View>

                    {overallStatus === 'Suspended' && (
                        <View style={styles.suspensionReasonBox}>
                            <Text style={styles.suspensionReasonTitle}>Reason:</Text>
                            <Text style={styles.suspensionReasonText}>{suspensionReason}</Text>
                            <TouchableOpacity
                                style={styles.contactSupportButton}
                                onPress={handleContactSupport}
                            >
                                <Text style={styles.contactSupportButtonText}>Contact Support</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* --- VERIFICATION STATUSES --- */}
                    <SectionHeader title="Verification Status" iconName="shield-check-outline" />
                    <View style={styles.verificationSectionBody}>
                        <View style={styles.verificationRow}>
                            <MaterialCommunityIcons name="email-check-outline" size={20} color="#555" />
                            <Text style={styles.verificationLabel}>Email:</Text>
                            {getVerificationStatusBadge(emailVerified)}
                        </View>
                        <View style={styles.verificationRow}>
                            <MaterialCommunityIcons name="cellphone-check" size={20} color="#555" />
                            <Text style={styles.verificationLabel}>Mobile:</Text>
                            {getVerificationStatusBadge(mobileVerified)}
                        </View>
                        <View style={[styles.verificationRow, { borderBottomWidth: 0 }]}>
                            <MaterialCommunityIcons name="file-document-outline" size={20} color="#555" />
                            <Text style={styles.verificationLabel}>KYC Documents:</Text>
                            {getVerificationStatusBadge(kycStatus)}
                        </View>
                    </View>

                    {/* --- SUBSCRIPTION DETAILS --- */}
                    <SectionHeader title="Subscription" iconName="star-outline" />
                    <View style={styles.verificationSectionBody}>
                        <View style={styles.verificationRow}>
                            <MaterialCommunityIcons name="crown-outline" size={20} color="#555" />
                            <Text style={styles.verificationLabel}>Current Plan:</Text>
                            <Text style={styles.detailValue}>{currentPlan}</Text>
                        </View>
                        <View style={[styles.verificationRow, { borderBottomWidth: 0 }]}>
                            <MaterialCommunityIcons name="login" size={20} color="#555" />
                            <Text style={styles.verificationLabel}>Last Login:</Text>
                            <Text style={styles.detailValue}>{lastLogin}</Text>
                        </View>
                    </View>

                </View>

                {/* --- VERSION DISPLAY --- */}
                <Text style={styles.versionText}>App Version 1.0.0</Text>

            </ScrollView>

            {/* --- TOAST UI --- */}
            {toastMessage ? (
                <Animated.View style={[styles.toastContainer, { opacity: fadeAnim, backgroundColor: getToastColor(toastType) }]}>
                    <MaterialCommunityIcons name={getToastIcon(toastType)} size={20} color="#fff" />
                    <Text style={styles.toastText}>{toastMessage}</Text>
                </Animated.View>
            ) : null}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f2f2f6',
    },
    container: {
        paddingVertical: 20,
        paddingHorizontal: 0,
    },
    contentCard: {
        backgroundColor: '#ffffff',
        marginHorizontal: 15,
        borderRadius: 12,
        paddingTop: 20, // Only internal padding, not for items
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 3,
        overflow: 'hidden',
    },
    contentText: {
        fontSize: 15,
        color: '#666',
        lineHeight: 22,
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    inputLabel: {
        fontSize: 14,
        color: '#555',
        fontWeight: '600',
        marginBottom: 8,
        marginTop: 15,
        paddingHorizontal: 20, // Align with content text
    },
    overallStatusBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        borderRadius: 8,
        marginHorizontal: 20, // Align within card
        marginBottom: 20,
    },
    overallStatusText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    suspensionReasonBox: {
        backgroundColor: '#ffebeb',
        borderColor: '#ff5252',
        borderWidth: 1,
        borderRadius: 8,
        padding: 15,
        marginHorizontal: 20,
        marginBottom: 20,
    },
    suspensionReasonTitle: {
        color: '#d32f2f',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    suspensionReasonText: {
        color: '#d32f2f',
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 10,
    },
    contactSupportButton: {
        backgroundColor: '#FF5252',
        paddingVertical: 10,
        borderRadius: 6,
        alignItems: 'center',
        marginTop: 10,
    },
    contactSupportButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    verificationSectionBody: {
        backgroundColor: '#ffffff', // Explicitly white for this internal card
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#e5e5e5', // Lighter border for internal sections
        marginHorizontal: 0, // No margin for this sub-section
        paddingHorizontal: 20, // Padding for content
        marginBottom: 20, // Space below this section
    },
    verificationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Push badge to the right
        paddingVertical: 14,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#e5e5e5',
    },
    verificationLabel: {
        flex: 1, // Take up space
        fontSize: 16,
        color: '#333',
        marginLeft: 10,
        fontWeight: '500',
    },
    verificationBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderRadius: 20,
        marginLeft: 10,
    },
    verificationText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    detailValue: {
        fontSize: 16,
        color: '#666',
        fontWeight: '500',
    },
    versionText: {
        marginTop: 20,
        color: '#aaa',
        fontSize: 12,
        textAlign: 'center',
    },
    // --- TOAST STYLES ---
    toastContainer: {
        position: "absolute",
        top: 60,
        left: 20,
        right: 20,
        borderRadius: 10,
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
        elevation: 10,
        zIndex: 1000,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
    },
    toastText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
        marginLeft: 10,
        flex: 1,
    },
});