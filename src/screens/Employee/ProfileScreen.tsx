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
    Platform,
    StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path, Defs, LinearGradient as SvgGradient, Stop } from "react-native-svg";
import { useNavigation, useRoute } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
const CARD_WIDTH = width * 0.85; // Cards take up 85% of screen width
const SPACING = (width - CARD_WIDTH) / 2;

const plans = [
    {
        id: 'priority',
        title: 'Priority',
        subtitle: 'Get noticed faster',
        price: 399,
        // Soft Elegant Green Gradient
        gradient: ['#F0FDF4', '#DCFCE7'],
        accent: '#166534', // Dark Green
        buttonColor: '#22c55e',
        badge: null,
        features: [
            'Priority Interview Scheduling',
            'Personalized Job Counselling',
            'Guaranteed Job Guidance',
            'Free Legal Support',
            'Whatsapp Support (Pvt & Govt)',
        ],
        disclaimer: "Valid for One Job Placement Opportunity Only. We are committed to providing job opportunities."
    },
    {
        id: 'career',
        title: 'Career Pro',
        subtitle: 'Expert guidance',
        price: 799,
        // Premium Gold/Yellow Gradient
        gradient: ['#FEFCE8', '#FEF9C3'],
        accent: '#854D0E', // Dark Gold
        buttonColor: '#EAB308',
        badge: 'MOST POPULAR',
        features: [
            '1-on-1 Career Counselling',
            'Specialized Field Guidance',
            'Dedicated Counsellor Support',
            'Hand-holding till Placement',
            'Profile Optimization',
        ],
        disclaimer: "We don't guarantee employment, but we are committed to providing job opportunities."
    },
    {
        id: 'aip',
        title: 'AIP Premium',
        subtitle: 'The complete package',
        price: 1499,
        // Professional Blue Gradient
        gradient: ['#EFF6FF', '#DBEAFE'],
        accent: '#1E40AF', // Dark Blue
        buttonColor: '#3B82F6',
        badge: 'BEST VALUE',
        features: [
            'All Priority & Career Features',
            'Premium Legal Support',
            'Top Priority over others',
            'Exclusive Govt Job Alerts',
            'Instant Interview Info',
        ],
        disclaimer: "Comprehensive support package. We are committed to providing job opportunities."
    },
];

const ProfileScreen = () => {
    const [selectedPlan, setSelectedPlan] = useState<any>(null);
    const [showModal, setShowModal] = useState(false);
    const navigation = useNavigation<any>();

    const handleBuy = (plan: any) => {
        setSelectedPlan(plan);
        setShowModal(true);
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
            <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
            <SafeAreaView >

                {/* --- HEADER --- */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.headerTitle}>Employment Trust</Text>
                        <Text style={styles.headerSubtitle}>Find your dream job</Text>
                    </View>
                    <View style={styles.headerIcons}>

                        <TouchableOpacity style={styles.iconBtn}
                            onPress={() => navigation.navigate("SettingsScreen")}
                        >
                            <Icon name="cog-outline" size={24} color="#333" />
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>

                    {/* --- PROFILE CARD --- */}
                    <View style={styles.profileSection}>
                        <View style={styles.profileCard}>
                            <View style={styles.profileInner}>
                                <Image source={require("../../assets/profile.png")} style={styles.avatar} />
                                <View style={styles.profileInfo}>
                                    <Text style={styles.userName}>Anurag Kohli</Text>
                                    <Text style={styles.userRole}>Job Seeker • ID: #9021</Text>
                                    <View style={styles.progressBar}>
                                        <View style={[styles.progressFill, { width: '15%' }]} />
                                    </View>
                                    <Text style={styles.progressLabel}>Profile 15% Complete</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.editBtn}>
                                <Text style={styles.editBtnText}>Edit Profile</Text>
                                <Icon name="chevron-right" size={16} color="#666" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* --- ACTION GRID --- */}
                    <View style={styles.statsGrid}>
                        <View style={styles.statCard}>
                            <View style={[styles.iconBox, { backgroundColor: '#E0F2FE' }]}>
                                <Icon name="eye-outline" size={24} color="#0284C7" />
                            </View>
                            <Text style={styles.statValue}>12</Text>
                            <Text style={styles.statLabel}>Views</Text>
                        </View>
                        <View style={styles.statCard}>
                            <View style={[styles.iconBox, { backgroundColor: '#F3E8FF' }]}>
                                <Icon name="flash-outline" size={24} color="#9333EA" />
                            </View>
                            <Text style={styles.statValue}>0</Text>
                            <Text style={styles.statLabel}>Boosts</Text>
                        </View>
                        <View style={styles.statCard}>
                            <View style={[styles.iconBox, { backgroundColor: '#FEE2E2' }]}>
                                <Icon name="crown-outline" size={24} color="#DC2626" />
                            </View>
                            <Text style={styles.statValue}>Free</Text>
                            <Text style={styles.statLabel}>Plan</Text>
                        </View>
                    </View>

                    {/* --- PROMO BANNER --- */}
                    <LinearGradient
                        colors={['#1F2937', '#111827']}
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                        style={styles.promoBanner}
                    >
                        <View style={{ flex: 1 }}>
                            <Text style={styles.promoTitle}>Boost your visibility</Text>
                            <Text style={styles.promoText}>Get 3x more interview calls with our premium plans.</Text>
                        </View>
                        <View style={styles.rocketIcon}>
                            <Icon name="rocket-launch" size={32} color="#FBBF24" />
                        </View>
                    </LinearGradient>

                    {/* --- PLANS SECTION TITLE --- */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Upgrade your Plan</Text>
                        <Text style={styles.sectionSubtitle}>Choose the best plan for your career</Text>
                    </View>

                    {/* --- HORIZONTAL CARDS --- */}
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        snapToInterval={CARD_WIDTH + 20} // width + margin
                        decelerationRate="fast"
                        contentContainerStyle={{ paddingHorizontal: SPACING, paddingBottom: 30 }}
                    >
                        {plans.map((plan, index) => (
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
                                        </View>
                                    </View>

                                    <View style={styles.divider} />

                                    <View style={styles.featuresList}>
                                        {plan.features.slice(0, 4).map((feature: string, i: number) => (
                                            <View key={i} style={styles.featureItem}>
                                                <Icon name="check-circle" size={18} color={plan.accent} />
                                                <Text style={styles.featureText}>{feature}</Text>
                                            </View>
                                        ))}
                                        {plan.features.length > 4 && (
                                            <Text style={[styles.moreFeatures, { color: plan.accent }]}>+ {plan.features.length - 4} more benefits</Text>
                                        )}
                                    </View>

                                    <TouchableOpacity
                                        style={[styles.buyBtn, { backgroundColor: plan.buttonColor }]}
                                        onPress={() => handleBuy(plan)}
                                    >
                                        <Text style={styles.buyBtnText}>Get Started</Text>
                                        <Icon name="arrow-right" size={18} color="#fff" />
                                    </TouchableOpacity>

                                </LinearGradient>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                </ScrollView>

                {/* --- MODERN MODAL --- */}
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
                                            <Text style={styles.modalTitle}>{selectedPlan.title}</Text>
                                            <Text style={styles.modalSubtitle}>Summary of benefits</Text>
                                        </View>
                                        <View style={styles.modalPriceTag}>
                                            <Text style={styles.modalPrice}>₹{selectedPlan.price}</Text>
                                        </View>
                                    </View>

                                    <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
                                        <Text style={styles.sectionLabel}>WHAT'S INCLUDED</Text>
                                        {selectedPlan.features.map((item: string, index: number) => (
                                            <View key={index} style={styles.modalFeatureRow}>
                                                <View style={[styles.bulletPoint, { backgroundColor: selectedPlan.buttonColor }]} />
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
                                            onPress={() => Alert.alert("Processing Payment...")}
                                        >
                                            <Text style={styles.modalCtaText}>Pay ₹{selectedPlan.price} Securely</Text>
                                            <Icon name="lock-outline" size={18} color="rgba(255,255,255,0.8)" />
                                        </TouchableOpacity>
                                        <Text style={styles.secureText}>Powered by Employment Trust Secure Payment</Text>
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

export default ProfileScreen;

const styles = StyleSheet.create({
    // Header
    header: { paddingHorizontal: 20, paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    headerTitle: { fontSize: 20, fontWeight: '800', color: '#111' },
    headerSubtitle: { fontSize: 13, color: '#666', marginTop: 2 },
    headerIcons: { flexDirection: 'row' },
    iconBtn: { marginLeft: 15, position: 'relative' },
    notifDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#EF4444', position: 'absolute', right: 2, top: 0, borderWidth: 1, borderColor: '#FAFAFA' },

    // Profile Section
    profileSection: { paddingHorizontal: 20, marginTop: 10 },
    profileCard: { backgroundColor: '#fff', borderRadius: 20, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
    profileInner: { flexDirection: 'row', alignItems: 'center' },
    avatar: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#eee' },
    profileInfo: { marginLeft: 15, flex: 1 },
    userName: { fontSize: 18, fontWeight: '700', color: '#1F2937' },
    userRole: { fontSize: 12, color: '#6B7280', marginTop: 2 },
    progressBar: { height: 6, backgroundColor: '#F3F4F6', borderRadius: 3, marginTop: 8, width: '100%' },
    progressFill: { height: '100%', backgroundColor: '#10B981', borderRadius: 3 },
    progressLabel: { fontSize: 10, color: '#10B981', marginTop: 4, fontWeight: '600' },
    editBtn: { marginTop: 15, paddingTop: 15, borderTopWidth: 1, borderTopColor: '#F3F4F6', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    editBtnText: { color: '#6B7280', fontSize: 13, fontWeight: '500' },

    // Stats Grid
    statsGrid: { flexDirection: 'row', paddingHorizontal: 20, marginTop: 20, justifyContent: 'space-between' },
    statCard: { width: '31%', backgroundColor: '#fff', paddingVertical: 15, borderRadius: 16, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 6, elevation: 2 },
    iconBox: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
    statValue: { fontSize: 18, fontWeight: '800', color: '#111' },
    statLabel: { fontSize: 11, color: '#888', marginTop: 2, textTransform: 'uppercase', letterSpacing: 0.5 },

    // Promo Banner
    promoBanner: { marginHorizontal: 20, marginTop: 24, borderRadius: 16, padding: 20, flexDirection: 'row', alignItems: 'center', shadowColor: '#1F2937', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 8 },
    promoTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    promoText: { color: '#9CA3AF', fontSize: 12, marginTop: 4, lineHeight: 18 },
    rocketIcon: { backgroundColor: 'rgba(255,255,255,0.1)', width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginLeft: 15 },

    // Plans Section
    sectionHeader: { paddingHorizontal: 24, marginTop: 32, marginBottom: 16 },
    sectionTitle: { fontSize: 22, fontWeight: '800', color: '#111' },
    sectionSubtitle: { fontSize: 14, color: '#666', marginTop: 4 },

    // Card Styles
    planContainer: { width: CARD_WIDTH, marginRight: 20, paddingVertical: 10 },
    planCard: { borderRadius: 24, padding: 24, height: 380, borderWidth: 1, borderColor: 'rgba(255,255,255,0.6)', shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.1, shadowRadius: 15, elevation: 6, justifyContent: 'space-between' },
    badgeContainer: { position: 'absolute', top: 0, right: 0, backgroundColor: '#111', paddingVertical: 6, paddingHorizontal: 12, borderBottomLeftRadius: 16, borderTopRightRadius: 24, zIndex: 10 },
    badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold', letterSpacing: 0.5 },

    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    planName: { fontSize: 22, fontWeight: '800', marginBottom: 4 },
    planSubtitle: { fontSize: 13, color: 'rgba(0,0,0,0.5)', fontWeight: '500' },
    priceBlock: { alignItems: 'flex-end', flexDirection: 'row' },
    currency: { fontSize: 18, fontWeight: '600', marginBottom: 4, marginRight: 2 },
    amount: { fontSize: 32, fontWeight: '900', letterSpacing: -1 },

    divider: { height: 1, backgroundColor: 'rgba(0,0,0,0.05)', marginVertical: 15, width: '100%' },

    featuresList: { flex: 1 },
    featureItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    featureText: { fontSize: 14, color: '#374151', marginLeft: 10, fontWeight: '500', flex: 1 },
    moreFeatures: { fontSize: 12, fontWeight: '700', marginTop: 5, marginLeft: 28 },

    buyBtn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 14, borderRadius: 14, marginTop: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 4 },
    buyBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 15, marginRight: 8 },

    // Modal Styles
    modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
    modalCloser: { flex: 1 },
    modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingHorizontal: 24, paddingBottom: 40, maxHeight: '85%' },
    modalHandle: { width: 40, height: 4, backgroundColor: '#E5E7EB', borderRadius: 2, alignSelf: 'center', marginTop: 12, marginBottom: 20 },

    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, borderBottomWidth: 1, borderBottomColor: '#F3F4F6', paddingBottom: 20 },
    modalTitle: { fontSize: 24, fontWeight: '800', color: '#111' },
    modalSubtitle: { fontSize: 14, color: '#6B7280' },
    modalPriceTag: { backgroundColor: '#F3F4F6', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 },
    modalPrice: { fontSize: 20, fontWeight: '800', color: '#111' },

    modalScroll: { marginBottom: 20 },
    sectionLabel: { fontSize: 12, fontWeight: '700', color: '#9CA3AF', letterSpacing: 1, marginBottom: 16 },
    modalFeatureRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 },
    bulletPoint: { width: 8, height: 8, borderRadius: 4, marginTop: 6, marginRight: 12 },
    modalFeatureText: { fontSize: 15, color: '#374151', lineHeight: 22, flex: 1 },

    disclaimerBox: { backgroundColor: '#F9FAFB', padding: 16, borderRadius: 12, marginTop: 10, flexDirection: 'row' },
    disclaimerText: { fontSize: 12, color: '#6B7280', flex: 1, lineHeight: 18 },

    modalFooter: { marginTop: 10 },
    modalCta: { paddingVertical: 16, borderRadius: 16, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 4 },
    modalCtaText: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginRight: 10 },
    secureText: { textAlign: 'center', fontSize: 10, color: '#9CA3AF', marginTop: 12, fontWeight: '500' }
});