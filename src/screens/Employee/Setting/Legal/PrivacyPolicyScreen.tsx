import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

export default function PrivacyPolicyScreen() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Privacy Policy</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.iconContainer}>
                    <MaterialCommunityIcons name="shield-lock-outline" size={48} color="#3B82F6" />
                </View>
                
                <Text style={styles.intro}>
                    Your privacy is important to us. It is Employment Trust's policy to respect your privacy regarding any information we may collect from you.
                </Text>

                <View style={styles.card}>
                    <View style={styles.row}>
                        <MaterialCommunityIcons name="database-eye" size={20} color="#555" style={{marginTop: 2}} />
                        <View style={styles.textCol}>
                            <Text style={styles.cardTitle}>Information We Collect</Text>
                            <Text style={styles.cardBody}>We collect information you provide directly to us, such as when you create an account, update your profile, or communicate with us.</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={styles.row}>
                        <MaterialCommunityIcons name="share-variant" size={20} color="#555" style={{marginTop: 2}} />
                        <View style={styles.textCol}>
                            <Text style={styles.cardTitle}>How We Share Information</Text>
                            <Text style={styles.cardBody}>We may share your information with employers when you apply for jobs. We do not sell your personal data to third parties.</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={styles.row}>
                        <MaterialCommunityIcons name="lock-check" size={20} color="#555" style={{marginTop: 2}} />
                        <View style={styles.textCol}>
                            <Text style={styles.cardTitle}>Data Security</Text>
                            <Text style={styles.cardBody}>We use administrative, technical, and physical security measures to help protect your personal information.</Text>
                        </View>
                    </View>
                </View>

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
    iconContainer: { alignItems: 'center', marginBottom: 20 },
    intro: { fontSize: 15, color: '#444', lineHeight: 22, marginBottom: 24, textAlign: 'center' },
    card: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 16, shadowColor: "#000", shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.05, shadowRadius: 3, elevation: 2 },
    row: { flexDirection: 'row', alignItems: 'flex-start' },
    textCol: { marginLeft: 12, flex: 1 },
    cardTitle: { fontSize: 16, fontWeight: '700', color: '#111', marginBottom: 4 },
    cardBody: { fontSize: 14, color: '#666', lineHeight: 20 },
});