// src/screens/Employee/Setting/Account/EmailVerificationScreen.tsx

// src/screens/Employee/Setting/Account/EmailVerificationScreen.tsx

import React, { useState, useRef } from 'react'; // Import useState and useRef
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Alert,
    Animated, // Import Animated for toast animation
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // For toast icon

export default function EmailVerificationScreen() {
    const navigation = useNavigation();

    // --- SCREEN STATE ---
    const [currentEmail, setCurrentEmail] = useState('user@example.com'); // Example email
    const [isVerified, setIsVerified] = useState(false); // Example verification status
    const [newEmailInput, setNewEmailInput] = useState(''); // State for the email input field
    const [showChangeEmailForm, setShowChangeEmailForm] = useState(false); // Toggle change email form visibility

    // --- TOAST STATE & ANIMATION ---
    const [toastMessage, setToastMessage] = useState("");
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const showToast = (message: string, isError: boolean = false) => {
        setToastMessage(message);
        // Reset animation before starting new one
        fadeAnim.setValue(0);
        // Fade In
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();

        // Wait 3 seconds, then Fade Out
        setTimeout(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start(() => setToastMessage(""));
        }, 3000);
    };
    // --- END TOAST ---

    // Set header options for this screen
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: 'Email Verification',
            // Other header styles are inherited from AccountStack.Navigator
        });
    }, [navigation]);

    // --- ACTIONS ---

    const validateEmail = (email: string) => {
        // Basic email validation regex
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleResendVerification = () => {
        // In a real app:
        // 1. Call API to resend verification email
        // 2. Handle success/error from API
        showToast("Verification email sent to " + currentEmail + "!", false);
        // Simulate setting to unverified if it was already verified to show the flow
        // setIsVerified(false);
    };

    const handleUpdateEmail = () => {
        if (!validateEmail(newEmailInput)) {
            showToast("Please enter a valid email address.", true);
            return;
        }
        if (newEmailInput === currentEmail) {
            showToast("New email cannot be the same as current email.", true);
            return;
        }

        // In a real app:
        // 1. Call API to update email address
        // 2. Handle success/error from API
        // On success:
        setCurrentEmail(newEmailInput);
        setIsVerified(false); // New email would typically be unverified
        setNewEmailInput('');
        setShowChangeEmailForm(false);
        showToast("Email updated. Please verify your new email: " + newEmailInput, false);
    };

    const handleCancelChangeEmail = () => {
        setNewEmailInput('');
        setShowChangeEmailForm(false); 
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.contentCard}>
                    {/* Contextual description for the user */}
                    <Text style={styles.contentText}>
                        Your email address is crucial for account security and notifications.
                        Please ensure your email is up-to-date and verified.
                    </Text>

                    {/* Display Current Email */}
                    <Text style={styles.inputLabel}>Current Email Address</Text>
                    <View style={styles.statusRow}>
                        <Text style={styles.emailDisplay}>{currentEmail}</Text>
                        <View style={[styles.verificationBadge, isVerified ? styles.verified : styles.unverified]}>
                            <MaterialCommunityIcons
                                name={isVerified ? "check-circle" : "alert-circle"}
                                size={14}
                                color="#fff"
                            />
                            <Text style={styles.verificationText}>
                                {isVerified ? 'Verified' : 'Unverified'}
                            </Text>
                        </View>
                    </View>

                    {/* Action Buttons */}
                    {!isVerified && !showChangeEmailForm && (
                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={handleResendVerification}
                        >
                            <Text style={styles.actionButtonText}>Resend Verification Email</Text>
                        </TouchableOpacity>
                    )}

                    {!showChangeEmailForm ? (
                        <TouchableOpacity
                            style={styles.secondaryActionButton}
                            onPress={() => setShowChangeEmailForm(true)}
                        >
                            <Text style={styles.secondaryActionButtonText}>Change Email Address</Text>
                        </TouchableOpacity>
                    ) : (
                        // Form for changing email address
                        <>
                            <Text style={styles.inputLabel}>Enter New Email Address</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="new.email@example.com"
                                keyboardType="email-address"
                                value={newEmailInput}
                                onChangeText={setNewEmailInput}
                                autoCapitalize="none"
                                autoComplete="email"
                            />

                            <TouchableOpacity
                                style={styles.actionButtonPrimary}
                                onPress={handleUpdateEmail}
                                disabled={!newEmailInput || !validateEmail(newEmailInput)}
                            >
                                <Text style={styles.actionButtonPrimaryText}>Update Email</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={handleCancelChangeEmail}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </ScrollView>

            {/* --- TOAST UI --- */}
            {toastMessage ? (
                <Animated.View style={[styles.toastContainer, { opacity: fadeAnim }]}>
                    <MaterialCommunityIcons name="information-outline" size={20} color="#fff" />
                    <Text style={styles.toastText}>{toastMessage}</Text>
                </Animated.View>
            ) : null}
            {/* --- END TOAST UI --- */}

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
        padding: 20,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 3,
    },
    contentText: {
        fontSize: 15,
        color: '#666',
        lineHeight: 22,
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 14,
        color: '#555',
        fontWeight: '600',
        marginBottom: 8,
        marginTop: 15,
    },
    emailDisplay: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
        flex: 1, // Take up available space
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 15,
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
    },
    verificationBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderRadius: 20,
        marginLeft: 10,
    },
    verified: {
        backgroundColor: '#4CAF50', // Green
    },
    unverified: {
        backgroundColor: '#FF5722', // Orange/Red
    },
    verificationText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    textInput: {
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        color: '#333',
    },
    actionButton: {
        backgroundColor: '#007AFF', // Primary blue
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    actionButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    secondaryActionButton: {
        backgroundColor: '#e0e0e0', // Light grey for secondary action
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#d0d0d0',
    },
    secondaryActionButtonText: {
        color: '#333',
        fontSize: 16,
        fontWeight: '600',
    },
    actionButtonPrimary: {
        backgroundColor: '#4CAF50', // Green for positive update
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    actionButtonPrimaryText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    cancelButton: {
        backgroundColor: 'transparent',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    cancelButtonText: {
        color: '#888',
        fontSize: 16,
        fontWeight: '500',
    },
    // --- TOAST STYLES ---
    toastContainer: {
        position: "absolute",
        top: 60, // Adjusted slightly for potential header
        left: 20,
        right: 20,
        backgroundColor: "#222", // Darker background for better contrast
        borderRadius: 10,
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
        elevation: 10,
        zIndex: 1000,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 }, // Stronger shadow for toast
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