import React, { useRef, useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Modal,
    ActivityIndicator,
    Animated, // Import Animated
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import TopOtpModal from "./TopOtpModal";

const VerificationCode: React.FC = () => {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputs = useRef<Array<TextInput | null>>([]);
    const navigation = useNavigation();
    const [showModal, setShowModal] = useState(true);
    const [otp, setOtp] = useState("");

    // State for verification flow
    const [verifying, setVerifying] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    
    // Animation value for the checkmark (starts at scale 0)
    const scaleValue = useRef(new Animated.Value(0)).current;

    const phoneNumber = "919872521392";

    const handleChange = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < 5) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handleSubmit = () => {
        setVerifying(true);
        setIsSuccess(false);
        scaleValue.setValue(0); // Reset animation

        // 1. Simulate Verification API Call (1.5 seconds)
        setTimeout(() => {
            setIsSuccess(true);
            
            // 2. Start Checkmark Animation
            Animated.spring(scaleValue, {
                toValue: 1,
                friction: 5,
                tension: 40,
                useNativeDriver: true,
            }).start();

            // 3. Navigate after showing success for 1 second
            setTimeout(() => {
                setVerifying(false);
                setIsSuccess(false); // Reset state
                navigation.navigate("Firstname" as never);
            }, 1200);
            
        }, 1500);
    };

    const allFilled = code.every((digit) => digit !== "");
    
    useEffect(() => {
        const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
        setOtp(generatedOtp);

        const timer = setTimeout(() => setShowModal(false), 5500);

        return () => clearTimeout(timer);
    }, []);


    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.title}>Enter your code</Text>
                <Text style={styles.subtitle}>{phoneNumber}</Text>

                <View style={styles.inputRow}>
                    {code.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={(ref: TextInput | null): void => {
                                inputs.current[index] = ref;
                            }}
                            style={styles.input}
                            keyboardType="numeric"
                            maxLength={1}
                            value={digit}
                            onChangeText={(val) => handleChange(val, index)}
                        />
                    ))}
                </View>
                <TopOtpModal visible={showModal} otp={otp} />

                <TouchableOpacity
                    onPress={handleSubmit}
                    style={[styles.button, { opacity: allFilled ? 1 : 0.5 }]}
                    disabled={!allFilled}
                >
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>

                <Text style={styles.infoText}>
                    Didn’t get anything?{" "}
                    <Text style={styles.resend}>Resend</Text>
                </Text>
            </View>

            {/* Verification Modal */}
            <Modal transparent visible={verifying} animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBox}>
                        {!isSuccess ? (
                            // State 1: Loading
                            <>
                                <ActivityIndicator size="large" color="#000" />
                                <Text style={styles.modalText}>Verifying code...</Text>
                            </>
                        ) : (
                            // State 2: Success with Animation
                            <>
                                <Animated.View 
                                    style={[
                                        styles.successIconCircle, 
                                        { transform: [{ scale: scaleValue }] }
                                    ]}
                                >
                                    {/* Simple Checkmark using Text. 
                                        You can replace this <Text> with an Icon from a library like 
                                        react-native-vector-icons if you have it installed. */}
                                    <Text style={styles.checkmark}>✓</Text>
                                </Animated.View>
                                <Text style={styles.modalText}>Verified!</Text>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingHorizontal: 20,
    },
    box: {
        width: "100%",
        maxWidth: 300,
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
    },
    subtitle: {
        color: "#666",
        marginBottom: 24,
    },
    inputRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 24,
    },
    input: {
        width: 40,
        height: 50,
        fontSize: 20,
        textAlign: "center",
        borderBottomWidth: 2,
        borderBottomColor: "#ccc",
    },
    button: {
        width: "100%",
        paddingVertical: 12,
        backgroundColor: "#000",
        borderRadius: 24,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "500",
    },
    infoText: {
        color: "#666",
        fontSize: 14,
        marginTop: 16,
        textAlign: "center",
    },
    resend: {
        color: "#007bff",
        fontWeight: "500",
    },
    // --- Modal Styles ---
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        alignItems: "center",
        justifyContent: "center",
    },
    modalBox: {
        width: 160,
        height: 140, // Fixed height to prevent jumping
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: 'center'
    },
    modalText: {
        marginTop: 12,
        fontSize: 14,
        fontWeight: '600',
        color: "#000",
    },
    // Success Icon Styles
    successIconCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#4CAF50', // Green
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkmark: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    }
});

export default VerificationCode;