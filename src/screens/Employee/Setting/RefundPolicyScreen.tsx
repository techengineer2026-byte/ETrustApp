import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

export default function RefundPolicyScreen() {
    const navigation = useNavigation();

    const handleContactSupport = () => {
        // Replace with your actual support email
        Linking.openURL('mailto:support@employmenttrust.com?subject=Refund Query');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* --- HEADER --- */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Refund Policy</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

                {/* --- COMPANY HEADER --- */}
                <View style={styles.companyHeader}>
                    <View style={styles.iconCircle}>
                        <MaterialCommunityIcons name="scale-balance" size={32} color="#1E40AF" />
                    </View>
                    <Text style={styles.companyName}>Employment Trust</Text>
                    <Text style={styles.lastUpdated}>Last Updated: Oct 2023</Text>
                </View>

                {/* --- POLICY CONTENT --- */}
                <View style={styles.contentCard}>
                    <Text style={styles.sectionTitle}>8. Refund/Cancellation Policy</Text>

                    <View style={styles.highlightBox}>
                        <MaterialCommunityIcons name="alert-circle-outline" size={20} color="#C5221F" style={{ marginRight: 8, marginTop: 2 }} />
                        <Text style={styles.highlightText}>
                            The Company follows a <Text style={{ fontWeight: '700' }}>“no cancellation”</Text> and <Text style={{ fontWeight: '700' }}>“no refund”</Text> policy.
                        </Text>
                    </View>

                    <Text style={styles.paragraph}>
                        The user may however be offered use of services on a <Text style={styles.bold}>“trial basis”</Text>, on such terms as may specifically be provided separately for each service offered by the Company.
                    </Text>

                    <Text style={styles.paragraph}>
                        After successful subscription of any of the service offered by the Company, such service shall continue to be in force for the term and manner, as specified in the terms and conditions of such service.
                    </Text>

                    <Text style={styles.paragraph}>
                        You are advised to read the specific terms and conditions of each service before subscribing.
                    </Text>
                </View>

                {/* --- SUPPORT SECTION --- */}
                <View style={styles.supportSection}>
                    <Text style={styles.supportTitle}>Have questions?</Text>
                    <Text style={styles.supportSubtitle}>
                        If you believe there was a billing error or technical issue, please contact our support team.
                    </Text>

                    <TouchableOpacity style={styles.contactButton} onPress={handleContactSupport}>
                        <MaterialCommunityIcons name="email-outline" size={20} color="#1E40AF" />
                        <Text style={styles.contactButtonText}>Contact Support</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111',
    },
    container: {
        padding: 20,
    },
    // --- COMPANY HEADER ---
    companyHeader: {
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 10,
    },
    iconCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#DBEAFE', // Light blue bg
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    companyName: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1F2937',
    },
    lastUpdated: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 4,
    },
    // --- CONTENT CARD ---
    contentCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111',
        marginBottom: 16,
    },
    highlightBox: {
        flexDirection: 'row',
        backgroundColor: '#FEF2F2', // Light red
        padding: 12,
        borderRadius: 8,
        borderLeftWidth: 3,
        borderLeftColor: '#EF4444',
        marginBottom: 20,
    },
    highlightText: {
        fontSize: 14,
        color: '#991B1B', // Dark red text
        flex: 1,
        lineHeight: 20,
    },
    paragraph: {
        fontSize: 15,
        color: '#4B5563',
        lineHeight: 24,
        marginBottom: 16,
        textAlign: 'justify',
    },
    bold: {
        fontWeight: '700',
        color: '#374151',
    },
    // --- SUPPORT ---
    supportSection: {
        alignItems: 'center',
        padding: 10,
    },
    supportTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
    },
    supportSubtitle: {
        fontSize: 13,
        color: '#6B7280',
        textAlign: 'center',
        marginBottom: 20,
        maxWidth: '80%',
        lineHeight: 20,
    },
    contactButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EFF6FF',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#BFDBFE',
    },
    contactButtonText: {
        color: '#1E40AF',
        fontWeight: '600',
        marginLeft: 8,
        fontSize: 14,
    },
});