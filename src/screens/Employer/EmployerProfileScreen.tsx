// src/screens/Employer/EmployerProfileScreen.tsx

import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    TouchableOpacity,
    StatusBar,
    Image,
    KeyboardTypeOptions,
    Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// CLI Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
interface SomeComponentProps {
    label: string;
    value: string;
    icon: string;
    onChange: (val: string) => void;
    isVerified?: boolean; // optional to avoid errors when not provided
    keyboardType?: KeyboardTypeOptions;
}

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
    EmployerProfile: undefined;
    Welcome: undefined;
};

type EmployerProfileScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'EmployerProfile'
>;

type Props = {
    navigation: EmployerProfileScreenNavigationProp;
};


// --- Configuration ---
const PRIMARY_COLOR = '#2563EB'; // Brand Blue
const DANGER_COLOR = '#EF4444';  // Red for Logout
const TEXT_COLOR = '#1F2937';
const GRAY_TEXT = '#6B7280';
const BG_COLOR = '#F9FAFB';

export default function EmployerProfileScreen({ navigation }: Props) {
    // --- State (Mock Data based on your list) ---
    const [companyName, setCompanyName] = useState('Tech Solutions Pvt Ltd');
    const [contactPerson, setContactPerson] = useState('Anurag kohli');
    const [email, setEmail] = useState('Anuragkohli@Techengineer.com');
    const [phone, setPhone] = useState('+91 98765 43210');
    const [address, setAddress] = useState('Plot No 45, Tech Park, Sector 5');
    const [city, setCity] = useState('Mohali');
    const [district, setDistrict] = useState('SAS Nagar');
    const [pincode, setPincode] = useState('140301');

    // Mock Image State
    const [logo, setLogo] = useState('https://randomuser.me/api/portraits/lego/1.jpg');

    // --- Logic ---
    const handleLogout = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Logout",
                    style: "destructive",
                    onPress: () => {
                        // In a real app: navigation.reset() or navigation.replace('Welcome')
                        console.log("Navigating to Welcome Screen...");
                        navigation.navigate('Welcome'); 
                    }
                }
            ]
        );
    };

    const handleGPSUpdate = () => {
        Alert.alert("GPS Location", "Fetching current coordinates...\nLocation Updated!");
    };

    const handleImageUpload = () => {
        Alert.alert("Upload Logo", "Open Gallery/Camera");
    };

    // --- Reusable Input Component ---
    const ProfileInput: React.FC<SomeComponentProps> = ({
        label,
        value,
        icon,
        onChange,
        isVerified, 
        keyboardType = 'default',
    }) => (
        <View style={styles.inputWrapper}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputContainer}>
                <Feather name={icon} size={20} color={GRAY_TEXT} style={styles.inputIcon} />
                <TextInput
                    style={styles.textInput}
                    value={value}
                    onChangeText={onChange}
                    keyboardType={keyboardType}
                />
                {isVerified && (
                    <View style={styles.verifiedBadge}>
                        <MaterialCommunityIcons name="check-decagram" size={18} color="#10B981" />
                        <Text style={styles.verifiedText}>Verified</Text>
                    </View>
                )}
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />

            {/* 🔝 Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Company Profile</Text>
                <TouchableOpacity>
                    <Text style={styles.editBtnText}>Save</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* 📸 Company Logo Section */}
                <View style={styles.logoSection}>
                    <View style={styles.imageWrapper}>
                        <Image source={{ uri: logo }} style={styles.logoImage} />
                        <TouchableOpacity style={styles.cameraBtn} onPress={handleImageUpload}>
                            <Ionicons name="camera" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.companyNameDisplay}>{companyName}</Text>
                    <Text style={styles.subText}>Employer Account</Text>
                </View>

                {/* 📝 Section 1: Contact Details */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionHeader}>Contact Information</Text>

                    <ProfileInput
                        label="Company Name"
                        value={companyName}
                        icon="briefcase"
                        onChange={setCompanyName}
                    />

                    <ProfileInput
                        label="Contact Person Name"
                        value={contactPerson}
                        icon="user"
                        onChange={setContactPerson}
                    />

                    <ProfileInput
                        label="Email ID"
                        value={email}
                        icon="mail"
                        onChange={setEmail}
                        isVerified={true} // From Login Step
                    />

                    <ProfileInput
                        label="Contact No (Official)"
                        value={phone}
                        icon="phone"
                        onChange={setPhone}
                        keyboardType="phone-pad"
                        isVerified={true} // From Login Step
                    />
                </View>

                {/* 📍 Section 2: Address & Location */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionHeader}>Office Address</Text>

                    <View style={styles.inputWrapper}>
                        <Text style={styles.label}>Full Address</Text>
                        <View style={[styles.inputContainer, { alignItems: 'flex-start' }]}>
                            <Feather name="map-pin" size={20} color={GRAY_TEXT} style={[styles.inputIcon, { marginTop: 12 }]} />
                            <TextInput
                                style={[styles.textInput, { height: 80, textAlignVertical: 'top', paddingTop: 10 }]}
                                value={address}
                                onChangeText={setAddress}
                                multiline
                            />
                        </View>
                    </View>

                    {/* Row for City/District */}
                    <View style={styles.row}>
                        <View style={{ flex: 1, marginRight: 10 }}>
                            <ProfileInput label="City" value={city} icon="map" onChange={setCity} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <ProfileInput label="District" value={district} icon="map" onChange={setDistrict} />
                        </View>
                    </View>

                    <ProfileInput label="Pin Code" value={pincode} icon="hash" onChange={setPincode} keyboardType="numeric" />

                    {/* GPS Button */}
                    <TouchableOpacity style={styles.gpsBtn} onPress={handleGPSUpdate}>
                        <MaterialCommunityIcons name="crosshairs-gps" size={20} color={PRIMARY_COLOR} />
                        <Text style={styles.gpsText}>Update Location on GPS</Text>
                    </TouchableOpacity>
                </View>

                {/* ⚙️ Section 3: Settings & Logout */}
                <View style={styles.sectionContainer}>
                    <TouchableOpacity style={styles.menuItem}>
                        <View style={styles.menuRow}>
                            <Feather name="settings" size={20} color={TEXT_COLOR} />
                            <Text style={styles.menuText}>Account Settings</Text>
                        </View>
                        <Feather name="chevron-right" size={20} color={GRAY_TEXT} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <View style={styles.menuRow}>
                            <Feather name="help-circle" size={20} color={TEXT_COLOR} />
                            <Text style={styles.menuText}>Help & Support</Text>
                        </View>
                        <Feather name="chevron-right" size={20} color={GRAY_TEXT} />
                    </TouchableOpacity>

                    {/* LOGOUT BUTTON */}
                    <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                        <Feather name="log-out" size={20} color={DANGER_COLOR} />
                        <Text style={styles.logoutText}>Logout to Welcome</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR,
    },
    // Header
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: TEXT_COLOR,
    },
    editBtnText: {
        color: PRIMARY_COLOR,
        fontWeight: '600',
        fontSize: 16,
    },

    // Scroll Content
    scrollContent: {
        padding: 16,
    },

    // Logo Section
    logoSection: {
        alignItems: 'center',
        marginBottom: 24,
    },
    imageWrapper: {
        position: 'relative',
        marginBottom: 12,
    },
    logoImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'white',
        backgroundColor: '#E5E7EB', // Placeholder color
    },
    cameraBtn: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: PRIMARY_COLOR,
        padding: 8,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'white',
    },
    companyNameDisplay: {
        fontSize: 22,
        fontWeight: 'bold',
        color: TEXT_COLOR,
    },
    subText: {
        color: GRAY_TEXT,
        fontSize: 14,
    },

    // Section Container
    sectionContainer: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        // Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    sectionHeader: {
        fontSize: 16,
        fontWeight: '700',
        color: TEXT_COLOR,
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
        paddingBottom: 8,
    },

    // Inputs
    inputWrapper: {
        marginBottom: 16,
    },
    label: {
        fontSize: 13,
        fontWeight: '500',
        color: '#4B5563',
        marginBottom: 6,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 8,
        paddingHorizontal: 12,
    },
    inputIcon: {
        marginRight: 10,
    },
    textInput: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 15,
        color: TEXT_COLOR,
    },

    // Verification Badge
    verifiedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ECFDF5',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#10B981',
    },
    verifiedText: {
        fontSize: 10,
        color: '#059669',
        fontWeight: '600',
        marginLeft: 2,
    },

    // Layout Utils
    row: {
        flexDirection: 'row',
    },

    // GPS Button
    gpsBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: PRIMARY_COLOR,
        backgroundColor: '#EFF6FF',
        marginTop: 8,
    },
    gpsText: {
        color: PRIMARY_COLOR,
        fontWeight: '600',
        marginLeft: 8,
    },

    // Settings & Logout
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    menuRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuText: {
        fontSize: 16,
        color: TEXT_COLOR,
        marginLeft: 12,
    },
    logoutBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        padding: 14,
        backgroundColor: '#FEE2E2',
        borderRadius: 8,
    },
    logoutText: {
        color: DANGER_COLOR,
        fontWeight: '700',
        fontSize: 16,
        marginLeft: 8,
    },
});