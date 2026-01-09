// src/screens/Employee/Setting/Account/ChangeMobileNumberScreen.tsx

import React, { useState, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Make sure this library is installed

export default function ChangeMobileNumberScreen() {
    const navigation = useNavigation();
    const [currentMobile, setCurrentMobile] = useState('+1 555 123 4567');
    const [newMobile, setNewMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);

    // --- TOAST STATE & ANIMATION ---
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState<"error" | "success" | "info">("info");
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const showToast = (type: "error" | "success" | "info", message: string) => {
        setToastType(type);
        setToastMessage(message);

        // Fade In
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();

        // Fade Out after 3 seconds
        setTimeout(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start(() => setToastMessage(""));
        }, 3000);
    };

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: 'Change Mobile Number',
        });
    }, [navigation]);

    const handleSendOtp = () => {
        if (newMobile.length < 10) {
            showToast("error", "Please enter a valid new mobile number.");
            return;
        }
        showToast("info", `An OTP has been sent to ${newMobile}.`);
        setOtpSent(true);
    };

    const handleChangeNumber = () => {
        if (otp.length !== 6) {
            showToast("error", "Please enter the 6-digit OTP.");
            return;
        }
        showToast("success", "Your mobile number has been updated successfully!");
        setTimeout(() => navigation.goBack(), 500); // Slight delay to show toast
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.contentCard}>
                    <Text style={styles.contentText}>
                        This section allows you to update your registered mobile number.
                        For your security, we will send a One-Time Password (OTP) to your new number for verification.
                    </Text>

                    <Text style={styles.inputLabel}>Current Mobile Number</Text>
                    <TextInput
                        style={styles.textInputDisplay}
                        value={currentMobile}
                        editable={false}
                    />

                    <Text style={styles.inputLabel}>New Mobile Number</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter your new mobile number"
                        keyboardType="phone-pad"
                        value={newMobile}
                        onChangeText={setNewMobile}
                        maxLength={15}
                        autoComplete="tel"
                    />

                    {!otpSent ? (
                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={handleSendOtp}
                            disabled={!newMobile}
                        >
                            <Text style={styles.actionButtonText}>Send OTP to New Number</Text>
                        </TouchableOpacity>
                    ) : (
                        <>
                            <Text style={styles.otpSentMessage}>
                                An OTP has been sent. Please check your SMS.
                            </Text>

                            <Text style={styles.inputLabel}>Enter OTP</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Enter 6-digit OTP"
                                keyboardType="number-pad"
                                value={otp}
                                onChangeText={setOtp}
                                maxLength={6}
                            />

                            <TouchableOpacity
                                style={styles.actionButtonPrimary}
                                onPress={handleChangeNumber}
                                disabled={otp.length !== 6}
                            >
                                <Text style={styles.actionButtonPrimaryText}>Update Mobile Number</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>

                {/* --- CUSTOM ERROR TOAST --- */}
                {toastMessage ? (
                    <Animated.View
                        style={[
                            styles.toastContainer,
                            {
                                opacity: fadeAnim,
                                backgroundColor:
                                    toastType === "error"
                                        ? "#FF5252"
                                        : toastType === "success"
                                            ? "#4CAF50"
                                            : "#007AFF",
                            },
                        ]}
                    >
                        <Icon
                            name={
                                toastType === "error"
                                    ? "close-circle-outline"
                                    : toastType === "success"
                                        ? "checkmark-circle-outline"
                                        : "information-circle-outline"
                            }
                            size={24}
                            color="#fff"
                        />
                        <Text style={styles.toastText}>{toastMessage}</Text>
                    </Animated.View>
                ) : null}
            </ScrollView>
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
    textInputDisplay: {
        backgroundColor: '#f2f2f6',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        color: '#666',
    },
    actionButton: {
        backgroundColor: '#007AFF',
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
    actionButtonPrimary: {
        backgroundColor: '#4CAF50',
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
    otpSentMessage: {
        fontSize: 14,
        color: '#007AFF',
        textAlign: 'center',
        marginTop: 15,
        marginBottom: 10,
    },
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
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    toastText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
        marginLeft: 10,
        flex: 1,
    },
});
    