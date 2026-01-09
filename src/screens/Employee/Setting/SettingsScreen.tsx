import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Switch,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Make sure to install: npm install react-native-vector-icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

/* ---------------- TYPES ---------------- */

type FormState = {
    jobAlerts: boolean;
    whatsapp: boolean;
    emailNotif: boolean;
};

type ToggleKey = keyof FormState;

// Base props shared by all types
interface BaseSettingsItemProps {
    label: string;
    leftIcon?: string; // Name of MaterialCommunityIcon
    iconColor?: string;
    isDestructive?: boolean;
}

type SettingsItemProps =
    | (BaseSettingsItemProps & {
        type?: 'link';
        onPress: () => void;
    })
    | (BaseSettingsItemProps & {
        type: 'toggle';
        value: ToggleKey;
    })
    | (BaseSettingsItemProps & {
        type: 'value';
        value: string;
        onPress: () => void;
    });

type SectionHeaderProps = {
    title: string;
    icon: string; // Keep emoji or swap for vector icon
};

/* ---------------- SCREEN ---------------- */

export default function SettingsScreen() {
    const [form, setForm] = useState<FormState>({
        jobAlerts: true,
        whatsapp: true,
        emailNotif: false,
    });

    /* -------- Settings Item Component -------- */

    const SettingsItem: React.FC<SettingsItemProps> = (props) => {
        // Default icon color is gray, unless destructive (red) or specified
        const iconColor = props.isDestructive 
            ? '#ff3b30' 
            : props.iconColor || '#555';

        return (
            <TouchableOpacity
                style={styles.row}
                activeOpacity={props.type === 'toggle' ? 1 : 0.7}
                onPress={
                    props.type === 'link' || props.type === 'value'
                        ? props.onPress
                        : undefined
                }
            >
                {/* LEFT ICON (New Addition) */}
                {props.leftIcon && (
                    <View style={styles.iconContainer}>
                        <MaterialCommunityIcons 
                            name={props.leftIcon} 
                            size={20} 
                            color={iconColor} 
                        />
                    </View>
                )}

                <Text
                    style={[
                        styles.rowLabel,
                        props.isDestructive && styles.destructiveLabel,
                    ]}
                >
                    {props.label}
                </Text>

                <View style={styles.rowSpacer} />

                {/* TOGGLE */}
                {props.type === 'toggle' && (
                    <Switch
                        value={form[props.value]}
                        onValueChange={(val) =>
                            setForm((prev) => ({ ...prev, [props.value]: val }))
                        }
                    />
                )}

                {/* VALUE */}
                {props.type === 'value' && (
                    <Text style={styles.rowValue}>{props.value}</Text>
                )}

                {/* CHEVRON (LINK) */}
                {(props.type === undefined || props.type === 'link') && (
                    <MaterialCommunityIcons name="chevron-right" size={20} color="#c4c4c4" />
                )}
            </TouchableOpacity>
        );
    };

    /* -------- Section Header -------- */

    const SectionHeader: React.FC<SectionHeaderProps> = ({ title, icon }) => (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>
                {icon} {title}
            </Text>
        </View>
    );

    /* ---------------- UI ---------------- */

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.headerTitle}>Settings</Text>

                {/* 🧑‍💼 ACCOUNT */}
                <View style={styles.section}>
                    <SectionHeader title="ACCOUNT" icon="🧑‍💼" />
                    <View style={styles.sectionBody}>

                        <SettingsItem 
                            label="Change Mobile Number" 
                            leftIcon="cellphone" 
                            onPress={() => { }} 
                        />
                        <SettingsItem 
                            label="Email Verification" 
                            leftIcon="email-check" 
                            onPress={() => { }} 
                        />
                        <SettingsItem 
                            label="KYC / Documents" 
                            leftIcon="file-document-outline" 
                            onPress={() => { }} 
                        />
                    </View>
                </View>

                {/* 🔔 PREFERENCES */}
                <View style={styles.section}>
                    <SectionHeader title="PREFERENCES" icon="🔔" />
                    <View style={styles.sectionBody}>
                        <SettingsItem 
                            label="Job Alerts" 
                            leftIcon="bell-ring" 
                            iconColor="#FFA500" // Example custom color
                            type="toggle" 
                            value="jobAlerts" 
                        />
                        <SettingsItem 
                            label="WhatsApp Notifications" 
                            leftIcon="whatsapp" 
                            iconColor="#25D366" // WhatsApp Green
                            type="toggle" 
                            value="whatsapp" 
                        />
                        <SettingsItem 
                            label="Email Notifications" 
                            leftIcon="email" 
                            type="toggle" 
                            value="emailNotif" 
                        />
                        <SettingsItem
                            label="Language Selection"
                            leftIcon="web"
                            type="value"
                            value="English"
                            onPress={() => { }}
                        />
                        <SettingsItem 
                            label="Location Preferences" 
                            leftIcon="map-marker" 
                            onPress={() => { }}  
                        />
                    </View>
                </View>

                {/* 💳 SUBSCRIPTION */}
                <View style={styles.section}>
                    <SectionHeader title="SUBSCRIPTION" icon="💳" />
                    <View style={styles.sectionBody}>
                        <SettingsItem 
                            label="Current Plan" 
                            leftIcon="star-circle"
                            type="value"
                            value="Free"
                            onPress={() => { }}
                        />
                        <SettingsItem 
                            label="Upgrade Plan" 
                            leftIcon="rocket-launch"
                            onPress={() => { }} 
                        />
                        <SettingsItem 
                            label="Billing History" 
                            leftIcon="receipt"
                            onPress={() => { }} 
                        />
                        <SettingsItem 
                            label="Refund Policy" 
                            leftIcon="cash-refund"
                            onPress={() => { }} 
                        />
                    </View>
                </View>

                {/* 🔐 SECURITY */}
                <View style={styles.section}>
                    <SectionHeader title="SECURITY" icon="🔐" />
                    <View style={styles.sectionBody}>
                        <SettingsItem 
                            label="Change Password" 
                            leftIcon="lock-reset"
                            onPress={() => { }} 
                        />
                        <SettingsItem 
                            label="Logout from All Devices" 
                            leftIcon="logout-variant"
                            onPress={() => { }} 
                        />
                        <SettingsItem
                            label="Delete Account"
                            leftIcon="delete"
                            isDestructive
                            onPress={() => Alert.alert('Warning', 'Are you sure?')}
                        />
                    </View>
                </View>

                {/* 📄 LEGAL & SUPPORT */}
                <View style={styles.section}>
                    <SectionHeader title="LEGAL & SUPPORT" icon="📄" />
                    <View style={styles.sectionBody}>
                        <SettingsItem label="Terms & Conditions" leftIcon="file-document" onPress={() => {}} />
                        <SettingsItem label="Privacy Policy" leftIcon="shield-account" onPress={() => {}} />
                        <SettingsItem label="Contact Support" leftIcon="face-agent" onPress={() => {}} />
                        <SettingsItem label="FAQs" leftIcon="help-circle" onPress={() => {}} />
                    </View>
                </View>

                {/* 🚪 LOGOUT */}
                <View style={styles.logoutSection}>
                    <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={() => Alert.alert('Logged Out')}
                    >
                        <MaterialCommunityIcons name="exit-to-app" size={20} color="#d11a2a" style={{marginRight: 8}} />
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                    <Text style={styles.versionText}>App Version 1.0.0</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f6f6f6',
    },
    container: {
        paddingVertical: 24,
        paddingHorizontal: 0,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: '700',
        color: '#1d1d1d',
        marginBottom: 12,
        paddingHorizontal: 24,
    },
    section: {
        marginBottom: 24,
    },
    sectionHeader: {
        paddingHorizontal: 24,
        marginBottom: 8,
    },
    sectionHeaderText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#a7a7a7',
        textTransform: 'uppercase',
        letterSpacing: 1.2,
    },
    sectionBody: {
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#e3e3e3',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 50,
        paddingHorizontal: 24,
        borderBottomWidth: 1,
        borderColor: '#e3e3e3',
    },
    // New Style for Icon
    iconContainer: {
        width: 30, // Fixed width helps align labels if icons have different widths
        marginRight: 10,
        alignItems: 'center', // Center icon within its width
    },
    rowLabel: {
        fontSize: 16,
        color: '#000',
    },
    destructiveLabel: {
        color: '#ff3b30',
    },
    rowSpacer: {
        flex: 1,
    },
    rowValue: {
        fontSize: 16,
        color: '#8a8a8a',
        marginRight: 4,
    },
    logoutSection: {
        marginTop: 10,
        alignItems: 'center',
    },
    logoutButton: {
        backgroundColor: '#ffe5e5',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        width: '90%',
        alignItems: 'center',
        flexDirection: 'row', // Align icon and text
        justifyContent: 'center',
    },
    logoutText: {
        color: '#d11a2a',
        fontSize: 16,
        fontWeight: '600',
    },
    versionText: {
        marginTop: 16,
        color: '#aaa',
        fontSize: 12,
    },
});