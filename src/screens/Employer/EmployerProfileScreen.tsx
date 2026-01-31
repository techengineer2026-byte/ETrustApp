// src/screens/Employer/EmployerProfileScreen.tsx

import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    Dimensions,
    Modal,
    Alert,
    StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.85;
const SPACING = (width - CARD_WIDTH) / 2;

// --- EMPLOYER PLAN DATA ---
const employerPlans = [
    {
        id: 'startup',
        title: 'Startup',
        subtitle: 'For small teams',
        price: 999,
        gradient: ['#F0F9FF', '#E0F2FE'], // Light Blue
        accent: '#0284C7',
        buttonColor: '#0EA5E9',
        badge: null,
        features: [
            '5 Active Job Posts',
            'Access to 50 Resumes',
            'Standard Support',
            'Company Branding Page',
            'Email Notifications',
        ],
        disclaimer: "Best for immediate, small-scale hiring needs."
    },
    {
        id: 'growth',
        title: 'Growth',
        subtitle: 'Rapid expansion',
        price: 2499,
        gradient: ['#F5F3FF', '#EDE9FE'], // Light Purple
        accent: '#7C3AED',
        buttonColor: '#8B5CF6',
        badge: 'POPULAR',
        features: [
            '20 Active Job Posts',
            'Access to 500 Resumes',
            'AI Candidate Matching',
            'Priority Support',
            'Featured Job Listings',
        ],
        disclaimer: "Accelerate your hiring with AI tools and better visibility."
    },
    {
        id: 'enterprise',
        title: 'Enterprise',
        subtitle: 'Maximum power',
        price: 4999,
        gradient: ['#FFF7ED', '#FFEDD5'], // Light Orange
        accent: '#C2410C',
        buttonColor: '#F97316',
        badge: 'UNLIMITED',
        features: [
            'Unlimited Job Posts',
            'Unlimited Database Access',
            'Dedicated Account Manager',
            'API Access',
            'Legal & Compliance Support',
        ],
        disclaimer: "Complete recruitment solution for large organizations."
    },
];

const EmployerProfileScreen = () => {
    const navigation = useNavigation<any>();
    const [selectedPlan, setSelectedPlan] = useState<any>(null);
    const [showModal, setShowModal] = useState(false);

    // Mock Company Data
    const companyData = {
        name: "Tech Solutions Pvt Ltd",
        person: "Anurag Kohli",
        role: "HR Manager",
        address: "Plot 45, Tech Park, Mohali",
        phone: "+91 98765 43210",
        email: "hr@techsolutions.com",
        verified: true
    };

    const handleBuy = (plan: any) => {
        setSelectedPlan(plan);
        setShowModal(true);
    };

    const handleLogout = () => {
        Alert.alert("Logout", "Are you sure?", [
            { text: "Cancel", style: "cancel" },
            { text: "Logout", style: "destructive", onPress: () => navigation.replace("Welcome") }
        ]);
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
            <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
            <SafeAreaView style={{ flex: 1 }}>

                {/* --- HEADER --- */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.headerTitle}>Employer Zone</Text>
                        <Text style={styles.headerSubtitle}>Manage hiring & subscriptions</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.iconBtn}
                        onPress={handleLogout}
                    >
                        <Icon name="logout" size={24} color="#EF4444" />
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>

                    {/* --- COMPANY PROFILE CARD --- */}
                    <View style={styles.profileSection}>
                        <View style={styles.profileCard}>
                            <View style={styles.profileHeaderRow}>
                                <Image
                                    source={{ uri: 'https://randomuser.me/api/portraits/lego/1.jpg' }}
                                    style={styles.avatar}
                                />
                                <View style={styles.profileInfo}>
                                    <Text style={styles.companyName}>{companyData.name}</Text>
                                    <View style={styles.verifiedRow}>
                                        <Text style={styles.contactPerson}>{companyData.person}</Text>
                                        {companyData.verified && (
                                            <Icon name="check-decagram" size={16} color="#10B981" style={{ marginLeft: 4 }} />
                                        )}
                                    </View>
                                </View>
                            </View>

                            <View style={styles.divider} />

                            {/* Missing Details Column Added Here */}
                            <View style={styles.detailsGrid}>
                                <View style={styles.detailItem}>
                                    <Icon name="email-outline" size={16} color="#64748B" />
                                    <Text style={styles.detailText}>{companyData.email}</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Icon name="phone-outline" size={16} color="#64748B" />
                                    <Text style={styles.detailText}>{companyData.phone}</Text>
                                </View>
                                <View style={styles.detailItemFull}>
                                    <Icon name="map-marker-outline" size={16} color="#64748B" />
                                    <Text style={styles.detailText}>{companyData.address}</Text>
                                </View>
                            </View>

                            <TouchableOpacity style={styles.editBtn}
                                onPress={() => navigation.navigate("EditEmployerProfileScreen")} // <--- ADD THIS
                            >
                                <Text style={styles.editBtnText}>Edit Company Profile</Text>
                                <Icon name="chevron-right" size={16} color="#2563EB" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* --- DASHBOARD STATS --- */}
                    <View style={styles.statsGrid}>
                        <View style={styles.statCard}>
                            <View style={[styles.iconBox, { backgroundColor: '#EFF6FF' }]}>
                                <Icon name="briefcase-outline" size={24} color="#2563EB" />
                            </View>
                            <Text style={styles.statValue}>12</Text>
                            <Text style={styles.statLabel}>Active Jobs</Text>
                        </View>
                        <View style={styles.statCard}>
                            <View style={[styles.iconBox, { backgroundColor: '#F0FDF4' }]}>
                                <Icon name="account-group-outline" size={24} color="#16A34A" />
                            </View>
                            <Text style={styles.statValue}>48</Text>
                            <Text style={styles.statLabel}>Applications</Text>
                        </View>
                        <View style={styles.statCard}>
                            <View style={[styles.iconBox, { backgroundColor: '#FFF7ED' }]}>
                                <Icon name="credit-card-outline" size={24} color="#EA580C" />
                            </View>
                            <Text style={styles.statValue}>Pro</Text>
                            <Text style={styles.statLabel}>Plan</Text>
                        </View>
                    </View>

                    {/* --- FLEXIBLE BUDGET HIRING (New Feature) --- */}
                    <TouchableOpacity onPress={() => Alert.alert("Flexible Hiring", "Define your own budget and pay per hire.")}>
                        <LinearGradient
                            colors={['#1E1B4B', '#312E81']} // Deep Indigo
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                            style={styles.flexBanner}
                        >
                            <View style={{ flex: 1 }}>
                                <View style={styles.flexBadge}>
                                    <Text style={styles.flexBadgeText}>NEW FEATURE</Text>
                                </View>
                                <Text style={styles.flexTitle}>Flexible Budget Hiring</Text>
                                <Text style={styles.flexText}>Don't want a subscription? Set your own budget and pay only when you hire.</Text>
                            </View>
                            <View style={styles.flexIcon}>
                                <Icon name="scale-balance" size={32} color="#818CF8" />
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>

                    {/* --- PLANS SECTION --- */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Recruitment Packages</Text>
                        <Text style={styles.sectionSubtitle}>Choose a plan that fits your hiring volume</Text>
                    </View>

                    {/* --- HORIZONTAL CARDS --- */}
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        snapToInterval={CARD_WIDTH + 20}
                        decelerationRate="fast"
                        contentContainerStyle={{ paddingHorizontal: SPACING, paddingBottom: 30 }}
                    >
                        {employerPlans.map((plan, index) => (
                            <TouchableOpacity
                                key={index}
                                activeOpacity={0.9}
                                onPress={() => handleBuy(plan)}
                                style={styles.planContainer}
                            >
                                <LinearGradient
                                    colors={plan.gradient}
                                    style={styles.planCard}
                                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                                >
                                    {plan.badge && (
                                        <View style={styles.badgeContainer}>
                                            <Text style={styles.badgeText}>{plan.badge}</Text>
                                        </View>
                                    )}

                                    <View style={styles.cardHeader}>
                                        <View>
                                            <Text style={[styles.planName, { color: plan.accent }]}>{plan.title}</Text>
                                            <Text style={styles.planSubtitle}>{plan.subtitle}</Text>
                                        </View>
                                        <View style={styles.priceBlock}>
                                            <Text style={[styles.currency, { color: plan.accent }]}>₹</Text>
                                            <Text style={[styles.amount, { color: plan.accent }]}>{plan.price}</Text>
                                            <Text style={{ fontSize: 12, color: plan.accent, marginBottom: 6 }}>/mo</Text>
                                        </View>
                                    </View>

                                    <View style={styles.cardDivider} />

                                    <View style={styles.featuresList}>
                                        {plan.features.slice(0, 4).map((feature: string, i: number) => (
                                            <View key={i} style={styles.featureItem}>
                                                <Icon name="check-circle" size={18} color={plan.accent} />
                                                <Text style={styles.featureText}>{feature}</Text>
                                            </View>
                                        ))}
                                    </View>

                                    <TouchableOpacity
                                        style={[styles.buyBtn, { backgroundColor: plan.buttonColor }]}
                                        onPress={() => handleBuy(plan)}
                                    >
                                        <Text style={styles.buyBtnText}>Upgrade Now</Text>
                                        <Icon name="arrow-right" size={18} color="#fff" />
                                    </TouchableOpacity>

                                </LinearGradient>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                </ScrollView>

                {/* --- PURCHASE MODAL --- */}
                <Modal
                    visible={showModal}
                    transparent
                    animationType="slide"
                    onRequestClose={() => setShowModal(false)}
                >
                    <View style={styles.modalBackdrop}>
                        <TouchableOpacity style={styles.modalCloser} onPress={() => setShowModal(false)} />
                        <View style={styles.modalContent}>
                            <View style={styles.modalHandle} />
                            {selectedPlan && (
                                <>
                                    <View style={styles.modalHeader}>
                                        <View>
                                            <Text style={styles.modalTitle}>{selectedPlan.title} Plan</Text>
                                            <Text style={styles.modalSubtitle}>Monthly Subscription</Text>
                                        </View>
                                        <View style={styles.modalPriceTag}>
                                            <Text style={styles.modalPrice}>₹{selectedPlan.price}</Text>
                                        </View>
                                    </View>

                                    <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
                                        <Text style={styles.sectionLabel}>INCLUDED FEATURES</Text>
                                        {selectedPlan.features.map((item: string, index: number) => (
                                            <View key={index} style={styles.modalFeatureRow}>
                                                <Icon name="star-four-points" size={16} color={selectedPlan.buttonColor} style={{ marginTop: 3 }} />
                                                <Text style={styles.modalFeatureText}>{item}</Text>
                                            </View>
                                        ))}

                                        <View style={styles.disclaimerBox}>
                                            <Icon name="information-outline" size={20} color="#666" style={{ marginRight: 8 }} />
                                            <Text style={styles.disclaimerText}>{selectedPlan.disclaimer}</Text>
                                        </View>
                                    </ScrollView>

                                    <View style={styles.modalFooter}>
                                        <TouchableOpacity
                                            style={[styles.modalCta, { backgroundColor: selectedPlan.buttonColor }]}
                                            onPress={() => Alert.alert("Payment Gateway", "Proceeding to secure payment...")}
                                        >
                                            <Text style={styles.modalCtaText}>Pay ₹{selectedPlan.price} & Subscribe</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.secureText}>Business GST Invoice available upon payment.</Text>
                                    </View>
                                </>
                            )}
                        </View>
                    </View>
                </Modal>

            </SafeAreaView>
        </View>
    );
};

export default EmployerProfileScreen;

const styles = StyleSheet.create({
    // Header
    header: { paddingHorizontal: 20, paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
    headerTitle: { fontSize: 22, fontWeight: '800', color: '#0F172A' },
    headerSubtitle: { fontSize: 13, color: '#64748B', marginTop: 2 },
    iconBtn: { padding: 8, backgroundColor: '#FEF2F2', borderRadius: 8 },

    // Profile Section
    profileSection: { paddingHorizontal: 20, marginTop: 20 },
    profileCard: { backgroundColor: '#fff', borderRadius: 20, padding: 20, shadowColor: '#64748B', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 4 },
    profileHeaderRow: { flexDirection: 'row', alignItems: 'center' },
    avatar: { width: 64, height: 64, borderRadius: 12, backgroundColor: '#F1F5F9' },
    profileInfo: { marginLeft: 16, flex: 1 },
    companyName: { fontSize: 18, fontWeight: '700', color: '#0F172A' },
    verifiedRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
    contactPerson: { fontSize: 13, color: '#64748B', fontWeight: '500' },

    divider: { height: 1, backgroundColor: '#F1F5F9', marginVertical: 16 },

    // Detail Columns
    detailsGrid: { marginBottom: 16 },
    detailItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
    detailItemFull: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
    detailText: { fontSize: 13, color: '#475569', marginLeft: 10, flex: 1 },

    editBtn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10, backgroundColor: '#F0F9FF', borderRadius: 10 },
    editBtnText: { color: '#2563EB', fontSize: 13, fontWeight: '600', marginRight: 4 },

    // Stats Grid
    statsGrid: { flexDirection: 'row', paddingHorizontal: 20, marginTop: 20, justifyContent: 'space-between' },
    statCard: { width: '31%', backgroundColor: '#fff', paddingVertical: 15, borderRadius: 16, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 6, elevation: 2 },
    iconBox: { width: 42, height: 42, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
    statValue: { fontSize: 18, fontWeight: '800', color: '#0F172A' },
    statLabel: { fontSize: 11, color: '#64748B', marginTop: 2, textTransform: 'uppercase', fontWeight: '600' },

    // Flex Banner
    flexBanner: { marginHorizontal: 20, marginTop: 24, borderRadius: 16, padding: 20, flexDirection: 'row', alignItems: 'center', shadowColor: '#312E81', shadowOpacity: 0.25, shadowRadius: 10, elevation: 6 },
    flexBadge: { backgroundColor: 'rgba(255,255,255,0.2)', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, marginBottom: 8 },
    flexBadgeText: { color: '#C7D2FE', fontSize: 10, fontWeight: '700' },
    flexTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    flexText: { color: '#A5B4FC', fontSize: 12, marginTop: 4, lineHeight: 18, paddingRight: 10 },
    flexIcon: { width: 48, height: 48, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 24, justifyContent: 'center', alignItems: 'center' },

    // Plans Section
    sectionHeader: { paddingHorizontal: 24, marginTop: 32, marginBottom: 16 },
    sectionTitle: { fontSize: 20, fontWeight: '800', color: '#0F172A' },
    sectionSubtitle: { fontSize: 13, color: '#64748B', marginTop: 4 },

    // Card Styles
    planContainer: { width: CARD_WIDTH, marginRight: 20, paddingVertical: 10 },
    planCard: { borderRadius: 24, padding: 24, height: 380, borderWidth: 1, borderColor: 'rgba(255,255,255,0.5)', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 15, elevation: 5, justifyContent: 'space-between' },
    badgeContainer: { position: 'absolute', top: 0, right: 0, backgroundColor: '#0F172A', paddingVertical: 6, paddingHorizontal: 12, borderBottomLeftRadius: 16, borderTopRightRadius: 24, zIndex: 10 },
    badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },

    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    planName: { fontSize: 22, fontWeight: '800', marginBottom: 4 },
    planSubtitle: { fontSize: 13, color: 'rgba(0,0,0,0.6)', fontWeight: '500' },
    priceBlock: {
        flexDirection: 'row',
        alignItems: 'baseline', // ✅ or 'flex-end'
    },
    currency: { fontSize: 16, fontWeight: '600', marginRight: 2 },
    amount: { fontSize: 28, fontWeight: '900' },

    cardDivider: { height: 1, backgroundColor: 'rgba(0,0,0,0.05)', marginVertical: 15 },

    featuresList: { flex: 1 },
    featureItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    featureText: { fontSize: 14, color: '#334155', marginLeft: 10, fontWeight: '500', flex: 1 },

    buyBtn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 14, borderRadius: 12, marginTop: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
    buyBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 15, marginRight: 8 },

    // Modal
    modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
    modalCloser: { flex: 1 },
    modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingHorizontal: 24, paddingBottom: 40, maxHeight: '85%' },
    modalHandle: { width: 40, height: 4, backgroundColor: '#E2E8F0', borderRadius: 2, alignSelf: 'center', marginTop: 12, marginBottom: 20 },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, borderBottomWidth: 1, borderBottomColor: '#F1F5F9', paddingBottom: 20 },
    modalTitle: { fontSize: 22, fontWeight: '800', color: '#0F172A' },
    modalSubtitle: { fontSize: 13, color: '#64748B' },
    modalPriceTag: { backgroundColor: '#F1F5F9', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 },
    modalPrice: { fontSize: 18, fontWeight: '800', color: '#0F172A' },
    modalScroll: { marginBottom: 20 },
    sectionLabel: { fontSize: 11, fontWeight: '700', color: '#94A3B8', letterSpacing: 1, marginBottom: 16 },
    modalFeatureRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 },
    modalFeatureText: { fontSize: 15, color: '#334155', lineHeight: 22, flex: 1, marginLeft: 12 },
    disclaimerBox: { backgroundColor: '#F8FAFC', padding: 16, borderRadius: 12, marginTop: 10, flexDirection: 'row' },
    disclaimerText: { fontSize: 12, color: '#64748B', flex: 1, lineHeight: 18 },
    modalFooter: { marginTop: 10 },
    modalCta: { paddingVertical: 16, borderRadius: 16, alignItems: 'center', justifyContent: 'center', shadowOpacity: 0.2, elevation: 4 },
    modalCtaText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    secureText: { textAlign: 'center', fontSize: 11, color: '#94A3B8', marginTop: 12, fontWeight: '500' }
});