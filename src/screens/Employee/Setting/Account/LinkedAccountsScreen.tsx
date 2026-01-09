// src/screens/Employee/Setting/Account/LinkedAccountsScreen.tsx


import React, { useState, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Animated,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Import common settings components
import { SettingsItem, SectionHeader } from '../../../../components/SettingsCommon';

// --- TYPES FOR TOAST ---
type ToastType = 'info' | 'success' | 'error';

export default function LinkedAccountsScreen() {
    const navigation = useNavigation();

    // --- SCREEN STATE ---
    const [isGoogleLinked, setIsGoogleLinked] = useState(true); // Simulate linked by default
    const [isFacebookLinked, setIsFacebookLinked] = useState(false);
    const [isLinkedInLinked, setIsLinkedInLinked] = useState(true);

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
            headerTitle: 'Linked Accounts',
            // Other header styles are inherited from AccountStack.Navigator
        });
    }, [navigation]);

    // --- LINK/UNLINK ACTIONS ---

    const handleConnectAccount = (accountName: string, setState: React.Dispatch<React.SetStateAction<boolean>>) => {
        // Simulate API call to connect account
        showToast(`Connecting with ${accountName}...`, "info");
        setTimeout(() => {
            setState(true);
            showToast(`${accountName} connected successfully!`, "success");
            // In a real app: handle actual OAuth flow
        }, 1500);
    };

    const handleDisconnectAccount = (accountName: string, setState: React.Dispatch<React.SetStateAction<boolean>>) => {
        Alert.alert(
            `Disconnect ${accountName}?`,
            `Are you sure you want to disconnect your ${accountName} account? This might affect certain features.`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Disconnect",
                    style: "destructive",
                    onPress: () => {
                        // Simulate API call to disconnect account
                        showToast(`Disconnecting ${accountName}...`, "info");
                        setTimeout(() => {
                            setState(false);
                            showToast(`${accountName} disconnected.`, "success");
                        }, 1500);
                    }
                }
            ]
        );
    };

    // --- RENDER HELPERS ---
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

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.contentCard}>
                    <Text style={styles.contentText}>
                        Link your social accounts to simplify sign-ins and potentially import profile data (with your permission).
                        You can connect or disconnect accounts at any time.
                    </Text>

                    {/* Google Account */}
                    <SettingsItem
                        label="Google"
                        leftIcon="google"
                        iconColor="#DB4437" // Google Red
                        type="value" // Using value to show status
                        value={isGoogleLinked ? "Connected" : "Disconnected"}
                        onPress={() => isGoogleLinked
                            ? handleDisconnectAccount('Google', setIsGoogleLinked)
                            : handleConnectAccount('Google', setIsGoogleLinked)
                        }
                    />

                    {/* Facebook Account */}
                    <SettingsItem
                        label="Facebook"
                        leftIcon="facebook"
                        iconColor="#1877F2" // Facebook Blue
                        type="value"
                        value={isFacebookLinked ? "Connected" : "Disconnected"}
                        onPress={() => isFacebookLinked
                            ? handleDisconnectAccount('Facebook', setIsFacebookLinked)
                            : handleConnectAccount('Facebook', setIsFacebookButtonLinked) // Typo fixed: setIsFacebookLinked
                        }
                    />

                    {/* LinkedIn Account */}
                    <SettingsItem
                        label="LinkedIn"
                        leftIcon="linkedin"
                        iconColor="#0A66C2" // LinkedIn Blue
                        type="value"
                        value={isLinkedInLinked ? "Connected" : "Disconnected"}
                        onPress={() => isLinkedInLinked
                            ? handleDisconnectAccount('LinkedIn', setIsLinkedInLinked)
                            : handleConnectAccount('LinkedIn', setIsLinkedInLinked)
                        }
                        isLast // Mark as last item in this section
                    />

                    {/* You can add more social accounts here */}

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
        // No extra padding here, SettingsItem provides its own
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 3,
        overflow: 'hidden', // Ensures rounded corners are respected by children
    },
    contentText: {
        fontSize: 15,
        color: '#666',
        lineHeight: 22,
        marginBottom: 20,
        paddingHorizontal: 20, // Add padding to text within the card
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