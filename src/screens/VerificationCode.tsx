// Filename: VerificationCode.tsx
import React, { useRef, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";

const VerificationCode: React.FC = () => {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputs = useRef<Array<TextInput | null>>([]);

    const phoneNumber = "919872521392";

    const handleChange = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return; // only digits
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // move to next input automatically
        if (value && index < newCode.length - 1) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handleSubmit = () => {
        Alert.alert("Entered code", code.join(""));
    };

    const handleResend = () => {
        Alert.alert("Resend", "Resend code clicked");
    };

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.title}>Enter your code</Text>
                <Text style={styles.subtitle}>{phoneNumber}</Text>

                <View style={styles.inputRow}>
                    {code.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={(ref) => {
                                inputs.current[index] = ref;
                            }}
                            style={styles.input}
                            keyboardType="numeric"
                            maxLength={1}
                            value={digit}
                            onChangeText={(val) => handleChange(val, index)}
                            returnKeyType="next"
                        />
                    ))}
                </View>

                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>

                <Text style={styles.infoText}>
                    Didn’t get anything? No worries, let’s try again.{" "}
                    <Text onPress={handleResend} style={styles.resend}>
                        Resend
                    </Text>
                </Text>
            </View>
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
});

export default VerificationCode;
