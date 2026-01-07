import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
type EditItemProps = {
    icon: string;
    label: string;
    value?: string;
    screenName: string;
};

const EditItem: React.FC<EditItemProps> = ({
    icon,
    label,
    value,
    screenName,
}) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={styles.itemRow}
            onPress={() => navigation.navigate(screenName as never)}
            activeOpacity={0.8}
        >
            <View style={styles.itemIconBg}>
                <MaterialCommunityIcons name={icon} size={20} color="#2979FF" />
            </View>

            <View style={styles.itemContent}>
                <Text style={styles.itemLabel}>{label}</Text>
                <Text style={styles.itemValue} numberOfLines={1}>
                    {value || 'Not set'}
                </Text>
            </View>

            <MaterialCommunityIcons name="chevron-right" size={24} color="#C7C7CC" />
        </TouchableOpacity>
    );
};

const { width } = Dimensions.get('window');

// --- MOCK USER DATA ---
const USER = {
    name: 'Rishab Dubey',
    role: 'Creative Designer',
    company: 'Tecorb Technologies',
    completion: 72,
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
};
type StatHexagonProps = {
    value: string;
    label: string;
    icon: string;
};


const StatHexagon: React.FC<StatHexagonProps> = ({
    value,
    label,
    icon,
}) => {
    return (
        <View style={styles.hexContainer}>
            <View style={styles.hexShape}>
                <MaterialCommunityIcons name={icon} size={24} color="#1C1C1E" />
                <Text style={styles.hexValue}>{value}</Text>
            </View>
            <Text style={styles.hexLabel}>{label}</Text>
        </View>
    );
};
export default function ProfileScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#2979FF" />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

                {/* --- 1. BLUE CURVED HEADER --- */}
                <View style={styles.headerBackground}>
                    <SafeAreaView>
                        <View style={styles.topNav}>

                            <Text style={styles.headerTitle}>Profile</Text>
                            <TouchableOpacity style={styles.navBtn}>
                                <MaterialCommunityIcons name="email-outline" size={24} color="#FFF" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.profileSection}>
                            {/* Avatar with Ring */}
                            <View style={styles.avatarWrapper}>
                                <View style={styles.progressRing}>
                                    <Image source={{ uri: USER.photo }} style={styles.avatar} />
                                </View>
                                <View style={styles.editBadge}>
                                    <MaterialCommunityIcons name="camera" size={14} color="#FFF" />
                                </View>
                            </View>

                            {/* Text Info */}
                            <Text style={styles.completionText}>{USER.completion}% Profile Completed</Text>
                            <Text style={styles.userName}>{USER.name}</Text>
                            <Text style={styles.userRole}>{USER.role}</Text>
                            <Text style={styles.userCompany}>{USER.company}</Text>
                        </View>
                    </SafeAreaView>
                </View>

                {/* --- 2. FLOATING STATS (Matches image "52" style) --- */}
                <View style={styles.statsRow}>
                    <StatHexagon value="12" label="SAVED" icon="bookmark-outline" />
                    <StatHexagon value="22" label="APPLIED" icon="briefcase-check-outline" />
                    <StatHexagon value="14" label="NEW" icon="bell-outline" />
                </View>

                {/* --- 3. UPLOAD RESUME CARD --- */}
                <TouchableOpacity
                    style={styles.resumeCard}
                    onPress={() => navigation.navigate('UploadResumeScreen' as never)}
                >
                    <View>
                        <Text style={styles.resumeTitle}>My Resume</Text>
                        <Text style={styles.resumeSub}>Last updated today</Text>
                    </View>
                    <View style={styles.uploadBtn}>
                        <Text style={styles.uploadBtnText}>UPLOAD</Text>
                        <MaterialCommunityIcons name="arrow-right" size={16} color="#FFF" />
                    </View>
                </TouchableOpacity>

                {/* --- 4. DATA ENTRY LISTS --- */}

                <Text style={styles.sectionHeader}>PERSONAL INFO</Text>
                <View style={styles.listContainer}>
                    <EditItem
                        icon="account-outline"
                        label="Full Name"
                        value={USER.name}
                        screenName="FirstnameScreen"
                    />
                    <EditItem
                        icon="cake-variant-outline"
                        label="Date of Birth"
                        value="15 Aug 1996"
                        screenName="BDAY"
                    />
                    <EditItem
                        icon="gender-male-female"
                        label="Gender"
                        value="Male"
                        screenName="Gender"
                    />
                    <EditItem
                        icon="phone-outline"
                        label="Phone"
                        value="+91 98765 43210"
                        screenName="PhoneNumberScreen"
                    />
                </View>

                <Text style={styles.sectionHeader}>PROFESSIONAL INFO</Text>
                <View style={styles.listContainer}>
                    <EditItem
                        icon="school-outline"
                        label="Education"
                        value="B.Tech CS"
                        screenName="EducationForm"
                    />
                    <EditItem
                        icon="briefcase-outline"
                        label="Job Type"
                        value="Full-Time"
                        screenName="JobType"
                    />
                    <EditItem
                        icon="list-status"
                        label="Current Status"
                        value="Notice Period"
                        screenName="WorkStatusScreen"
                    />
                    <EditItem
                        icon="chart-timeline-variant"
                        label="Experience"
                        value="4 Years"
                        screenName="WorkExperienceScreen"
                    />
                    <EditItem
                        icon="flash-outline"
                        label="Skills"
                        value="React, Node, Figma"
                        screenName="SkillsScreen"
                    />
                </View>

                <Text style={styles.sectionHeader}>PREFERENCES & CTC</Text>
                <View style={styles.listContainer}>
                    <EditItem
                        icon="cash"
                        label="Current CTC"
                        value="₹12 LPA"
                        screenName="CurrentCTCScreen"
                    />
                    <EditItem
                        icon="cash-plus"
                        label="Expected Salary"
                        value="₹18 - 20 LPA"
                        screenName="SalaryRange"
                    />
                    <EditItem
                        icon="map-marker-distance"
                        label="Distance Pref"
                        value="20 km"
                        screenName="DistancePreference"
                    />
                    <EditItem
                        icon="city"
                        label="Location"
                        value="Mohali, India"
                        screenName="LocationSelection"
                    />
                </View>

                <TouchableOpacity
                    style={styles.logoutBtn}
                    onPress={() => navigation.navigate('Welcome' as never)}
                >
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },

    // --- BLUE HEADER ---
    headerBackground: {
        backgroundColor: '#2979FF', // Bright Blue
        paddingBottom: 50,
        borderBottomRightRadius: 80, // The Curve effect
        borderBottomLeftRadius: 0,
    },
    topNav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    navBtn: {
        padding: 8,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 20,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFF',
    },
    profileSection: {
        alignItems: 'center',
        marginTop: 20,
    },
    avatarWrapper: {
        marginBottom: 15,
        position: 'relative',
    },
    progressRing: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: '#FFD700', // Yellow Progress Ring
        justifyContent: 'center',
        alignItems: 'center',
        padding: 3,
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#2979FF',
    },
    editBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#1C1C1E',
        padding: 6,
        borderRadius: 15,
    },
    completionText: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 12,
        fontWeight: '600',
        marginBottom: 5,
    },
    userName: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
    },
    userRole: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 14,
        marginTop: 2,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    userCompany: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 13,
        marginTop: 2,
    },

    // --- STATS HEXAGONS ---
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: -35, // Pull up to overlap blue header
        marginBottom: 20,
    },
    hexContainer: {
        alignItems: 'center',
    },
    hexShape: {
        width: 70,
        height: 70,
        backgroundColor: '#FFF',
        borderRadius: 20, // Rounded square looking like a soft hex
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        transform: [{ rotate: '45deg' }], // Diamond shape
        marginBottom: 15,
    },
    hexValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1C1C1E',
        transform: [{ rotate: '-45deg' }], // Counter rotate text
        marginTop: 2,
    },
    hexLabel: {
        fontSize: 11,
        fontWeight: '700',
        color: '#8E8E93',
        marginTop: 5,
        letterSpacing: 0.5,
    },

    // --- RESUME CARD ---
    resumeCard: {
        marginHorizontal: 20,
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    resumeTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: '#1C1C1E',
    },
    resumeSub: {
        fontSize: 12,
        color: '#8E8E93',
        marginTop: 4,
    },
    uploadBtn: {
        backgroundColor: '#2ecc71', // Green
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    uploadBtnText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '700',
        marginRight: 4,
    },

    // --- EDIT LISTS ---
    sectionHeader: {
        marginLeft: 25,
        fontSize: 13,
        fontWeight: '700',
        color: '#A1A1A4',
        marginBottom: 10,
        marginTop: 10,
        letterSpacing: 1,
    },
    listContainer: {
        backgroundColor: '#FFF',
        marginHorizontal: 20,
        borderRadius: 20,
        paddingVertical: 5,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 5,
        elevation: 2,
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    itemIconBg: {
        width: 36,
        height: 36,
        borderRadius: 12,
        backgroundColor: '#F0F5FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    itemContent: {
        flex: 1,
    },
    itemLabel: {
        fontSize: 12,
        color: '#8E8E93',
    },
    itemValue: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1C1C1E',
        marginTop: 2,
    },

    // --- LOGOUT ---
    logoutBtn: {
        margin: 20,
        backgroundColor: '#FFEBEE',
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: 'center',
    },
    logoutText: {
        color: '#D32F2F',
        fontWeight: '700',
        fontSize: 16,
    },
});