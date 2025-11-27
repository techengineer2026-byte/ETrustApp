// TopOtpModal.tsx
import React from "react";
import { View, Text, StyleSheet, Modal } from "react-native";

interface Props {
    visible: boolean;
    otp: string;
}

const TopOtpModal: React.FC<Props> = ({ visible, otp }) => {
    return (
        <Modal transparent animationType="slide" visible={visible}>
            <View style={styles.overlay}>
                <View style={styles.banner}>
                    <Text style={styles.title}>ETrust Security Alert</Text>
                    <Text style={styles.otpText}>Your OTP is {otp}</Text>
                    <Text style={styles.warning}>
                        ⚠️ Do NOT share this code with anyone, including ETrust staff.
                    </Text>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        alignItems: "center",
        marginTop: 50,
    },
    banner: {
        width: "90%",
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 12,
        elevation: 5,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        borderLeftWidth: 5,
        borderLeftColor: "#ff0000",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 6,
    },
    otpText: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 6,
    },
    warning: {
        fontSize: 14,
        color: "#d00",
    },
});

export default TopOtpModal;
