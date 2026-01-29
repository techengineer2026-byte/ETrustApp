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

// ✅ This import now works because we created src/components/SettingsCommon.tsx
import { SettingsItem } from '../../../../components/SettingsCommon';

type ToastType = 'info' | 'success' | 'error';

export default function LinkedAccountsScreen() {
    const navigation = useNavigation();
    const [isGoogleLinked, setIsGoogleLinked] = useState(true);
    const [isFacebookLinked, setIsFacebookLinked] = useState(false);
    const [isLinkedInLinked, setIsLinkedInLinked] = useState(true);

    // Toast Logic
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState<ToastType>("info");
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const showToast = (message: string, type: ToastType = "info") => {
        setToastMessage(message);
        setToastType(type);
        fadeAnim.setValue(0);
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

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: 'Linked Accounts',
        });
    }, [navigation]);

    const handleConnectAccount = (accountName: string, setState: React.Dispatch<React.SetStateAction<boolean>>) => {
        showToast(`Connecting with ${accountName}...`, "info");
        setTimeout(() => {
            setState(true);
            showToast(`${accountName} connected successfully!`, "success");
        }, 1500);
    };

    const handleDisconnectAccount = (accountName: string, setState: React.Dispatch<React.SetStateAction<boolean>>) => {
        Alert.alert(
            `Disconnect ${accountName}?`,
            `Are you sure you want to disconnect your ${accountName} account?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Disconnect",
                    style: "destructive",
                    onPress: () => {
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

    const getToastIcon = (type: ToastType) => {
        switch (type) {
            case 'success': return "check-circle-outline";
            case 'error': return "alert-circle-outline";
            default: return "information-outline";
        }
    };
    const getToastColor = (type: ToastType) => {
        switch (type) {
            case 'success': return '#4CAF50';
            case 'error': return '#FF5252';
            default: return '#007AFF';
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.contentCard}>
                    <Text style={styles.contentText}>
                        Link your social accounts to simplify sign-ins.
                    </Text>

                    {/* These work now because SettingsItem is imported correctly */}
                    <SettingsItem
                        label="Google"
                        leftIcon="google"
                        iconColor="#DB4437"
                        type="value"
                        value={isGoogleLinked ? "Connected" : "Disconnected"}
                        onPress={() => isGoogleLinked
                            ? handleDisconnectAccount('Google', setIsGoogleLinked)
                            : handleConnectAccount('Google', setIsGoogleLinked)
                        }
                    />
                    <SettingsItem
                        label="Facebook"
                        leftIcon="facebook"
                        iconColor="#1877F2"
                        type="value"
                        value={isFacebookLinked ? "Connected" : "Disconnected"}
                        onPress={() => isFacebookLinked
                            ? handleDisconnectAccount('Facebook', setIsFacebookLinked)
                            : handleConnectAccount('Facebook', setIsFacebookLinked)
                        }
                    />
                    <SettingsItem
                        label="LinkedIn"
                        leftIcon="linkedin"
                        iconColor="#0A66C2"
                        type="value"
                        value={isLinkedInLinked ? "Connected" : "Disconnected"}
                        onPress={() => isLinkedInLinked
                            ? handleDisconnectAccount('LinkedIn', setIsLinkedInLinked)
                            : handleConnectAccount('LinkedIn', setIsLinkedInLinked)
                        }
                        isLast
                    />
                </View>
                <Text style={styles.versionText}>App Version 1.0.0</Text>
            </ScrollView>

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
    safeArea: { flex: 1, backgroundColor: '#f2f2f6' },
    container: { paddingVertical: 20 },
    contentCard: {
        backgroundColor: '#ffffff',
        marginHorizontal: 15,
        borderRadius: 12,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 3,
        overflow: 'hidden',
    },
    contentText: { fontSize: 15, color: '#666', lineHeight: 22, marginBottom: 20, paddingHorizontal: 20, paddingTop: 20 },
    versionText: { marginTop: 20, color: '#aaa', fontSize: 12, textAlign: 'center' },
    toastContainer: { position: "absolute", top: 60, left: 20, right: 20, borderRadius: 10, padding: 15, flexDirection: "row", alignItems: "center", zIndex: 1000 },
    toastText: { color: "#fff", fontSize: 14, fontWeight: "bold", marginLeft: 10, flex: 1 },
});