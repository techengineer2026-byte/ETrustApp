import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

export default function TermsScreen() {
    const navigation = useNavigation();

    const renderSection = (title: string, content: string) => (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <Text style={styles.sectionContent}>{content}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Terms & Conditions</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <Text style={styles.lastUpdated}>Last Updated: October 26, 2023</Text>

                <Text style={styles.intro}>
                    Welcome to Employment Trust. By accessing or using our mobile application, you agree to be bound by these Terms.
                </Text>

                {renderSection("1. Acceptance of Terms", "By accessing and using this app, you accept and agree to be bound by the terms and provision of this agreement.")}
                {renderSection("2. Service Description", "Employment Trust provides a platform for job seekers to connect with potential employers. We do not guarantee employment but provide the tools to facilitate the process.")}
                {renderSection("3. User Accounts", "You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.")}
                {renderSection("4. Prohibited Conduct", "You agree not to use the App for any unlawful purpose or in any way that interrupts, damages, impairs or renders the App less efficient.")}
                {renderSection("5. Limitation of Liability", "Employment Trust shall not be liable for any indirect, incidental, special, consequential or punitive damages, or any loss of profits or revenues.")}

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#f8f9fa' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#eee' },
    backButton: { padding: 5 },
    headerTitle: { fontSize: 18, fontWeight: '700', color: '#111' },
    container: { padding: 24 },
    lastUpdated: { fontSize: 12, color: '#888', marginBottom: 16, fontStyle: 'italic' },
    intro: { fontSize: 15, color: '#444', lineHeight: 22, marginBottom: 24 },
    section: { marginBottom: 24 },
    sectionTitle: { fontSize: 16, fontWeight: '700', color: '#111', marginBottom: 8 },
    sectionContent: { fontSize: 14, color: '#555', lineHeight: 22, textAlign: 'justify' },
});