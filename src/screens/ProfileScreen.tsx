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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path } from "react-native-svg";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 40;

const plans = [
    {
        id: 'priority',
        title: 'Priority Package',
        subtitle: 'Value Added Service',
        price: 399,
        gradient: ['#FFF8E1', '#ffffff', '#E8F5E9'],
        accent: '#2E7D32',
        features: [
            { name: 'Priority over other Job Seekers for Job Interview', free: false, plus: true },
            { name: 'Personalized Support of Job Guidance & Counselling', free: false, plus: true },
            { name: '100% efforts till Providing Jobs', free: false, plus: true },
            { name: 'Free Legal Guidance', free: false, plus: true },
            { name: 'Whatsapp Support for Private Jobs', free: false, plus: true },
            { name: 'Whatsapp Support for Government Jobs', free: false, plus: true },
        ],
        disclaimer: "Note : Employment Trust don't Guarantee Employment, But we are committed to provide Job opportunity. Employment Trust don't charge for providing of Job.\nThis Priority package is Valid for One Job Placement Opportunity Only."
    },
    {
        id: 'career',
        title: 'Career Counselling',
        subtitle: 'Value Added Service',
        price: 799,
        gradient: ['#FFF59D', '#FFFFFF', '#FFFFFF'],
        accent: '#FBC02D',
        features: [
            { name: 'Career counselling by job counselor', free: false, plus: true },
            { name: 'Guidance and on specialized field', free: false, plus: true },
            { name: 'One-time Job opportunity.', free: false, plus: true },
            { name: 'Personalize Support.', free: false, plus: true },
            { name: 'Hand holding Support on Job\'s Opportunity', free: false, plus: true },
        ],
        disclaimer: "Note : We don't guaranty Employment, but we are committed to provide Job opportunity."
    },
    {
        id: 'aip',
        title: 'AIP Package',
        subtitle: 'Value Added Service',
        price: 1499,
        gradient: ['#FFF9C4', '#FFFFFF', '#FFFFFF'],
        accent: '#1565C0',
        features: [
            { name: 'Job opportunity', free: false, plus: true },
            { name: 'Legal Support', free: false, plus: true },
            { name: 'Personalize Support from Counsellor', free: false, plus: true },
            { name: 'Career Counselling with Candidate.', free: false, plus: true },
            { name: 'Priority over other Job Seekers', free: false, plus: true },
            { name: 'What\'s app Information for interview', free: false, plus: true },
            { name: 'Govt Job alert (optional) on WhatsApp.', free: false, plus: true },
        ],
        disclaimer: "Note : We don't guaranty Employment, but we are committed to provide Job opportunity."
    },
];

type FeatureType = {
    name: string;
    free: boolean;
    plus: boolean;
};

type PlanType = {
    id: string;
    title: string;
    subtitle: string;
    price: number;
    gradient: string[];
    accent: string;
    features: FeatureType[];
    disclaimer: string | null;
};

const ProfileScreen = () => {
    const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);
    const [showModal, setShowModal] = useState(false);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>

            <View style={styles.header}>
                <Image
                    source={require("../assets/logo2.png")}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity style={{ marginRight: 10 }}>
                        <Icon name="shield-check-outline" size={28} color="#555" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name="cog-outline" size={28} color="#555" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={styles.profileSection}>
                    <View style={styles.profilePicContainer}>
                        <Image
                            source={require("../assets/profile.png")}
                            style={styles.profilePic}
                        />
                        <View style={styles.progressBadge}>
                            <Text style={styles.progressText}>15%</Text>
                        </View>
                    </View>

                    <View style={styles.profileTextBox}>
                        <Text style={styles.userName}>Anurag, 24</Text>
                        <TouchableOpacity style={styles.editProfileBtn}>
                            <Text style={styles.editProfileText}>Edit Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.doubleDateBox}>
                    <Icon name="rocket-launch-outline" size={24} color="#E74C3C" />
                    <Text style={styles.doubleDateText}>
                        Try <Text style={{ fontWeight: "600" }}>Fastest Job Search{"\n"}</Text>
                        Boost your profile visibility now!
                    </Text>
                    <Icon name="chevron-right" size={30} color="#000" />
                </View>

                <View style={styles.backg}>
                    <Svg height="80" width="100%" viewBox="0 0 1440 320" style={styles.topWave}>
                        <Path fill="#ffffff" d="M0,160L60,165.3C120,171,240,181,360,197.3C480,213,600,235,720,229.3C840,224,960,192,1080,170.7C1200,149,1320,139,1380,133.3L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z" />
                    </Svg>

                    <View style={styles.cardsRow}>
                        <View style={styles.card}>
                            <Icon name="eye-outline" size={30} color="#2D9CDB" />
                            <Text style={styles.cardText}>0 Views</Text>
                        </View>
                        <View style={styles.card}>
                            <Icon name="flash-outline" size={30} color="#9B51E0" />
                            <Text style={styles.cardText}>My Boosts</Text>
                        </View>
                        <View style={styles.card}>
                            <Icon name="crown-outline" size={30} color="#F93E3E" />
                            <Text style={styles.cardText}>Premium</Text>
                        </View>
                    </View>

                    <View style={styles.swipeSection}>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            snapToInterval={CARD_WIDTH}
                            snapToAlignment="center"
                            decelerationRate="fast"
                            contentContainerStyle={{ paddingHorizontal: 20 }}
                        >
                            {plans.map((plan, index) => (
                                <View key={index} style={styles.cardContainer}>
                                    <LinearGradient
                                        colors={plan.gradient}
                                        style={styles.planCard}
                                        start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }}
                                    >
                                        <View style={styles.headerRow}>
                                            <View style={{ flex: 1, paddingRight: 5 }}>
                                                <Text style={styles.planTitle} numberOfLines={1} adjustsFontSizeToFit>
                                                    {plan.title}
                                                </Text>
                                                <Text style={[styles.planPriceSmall, { color: plan.accent }]}>
                                                    ₹{plan.price}<Text style={{ fontSize: 12, color: '#777', fontWeight: 'normal' }}>/mo</Text>
                                                </Text>
                                            </View>

                                            <TouchableOpacity
                                                style={[styles.upgradeBtn, { backgroundColor: plan.accent }]}
                                                onPress={() => {
                                                    setSelectedPlan(plan);
                                                    setShowModal(true);
                                                }}
                                            >
                                                <Text style={styles.upgradeBtnText}>UPGRADE</Text>
                                            </TouchableOpacity>
                                        </View>

                                        <View style={styles.tableHeader}>
                                            <Text style={styles.subtitle}>What's Included</Text>
                                            <View style={styles.headerLabels}>
                                                <Text style={styles.headerTextDisabled}>Free</Text>
                                                <Text style={[styles.headerTextActive, { color: plan.accent }]}>Plus</Text>
                                            </View>
                                        </View>
                                        <View style={styles.divider} />

                                        {/* Features Preview */}
                                        <View style={styles.featuresContainer}>
                                            {plan.features.slice(0, 3).map((f, i) => (
                                                <View key={i} style={styles.tableRow}>
                                                    <Text style={styles.featureName} numberOfLines={1}>{f.name}</Text>
                                                    <View style={styles.iconRow}>
                                                        <Icon name="lock-outline" size={16} color="#bbb" />
                                                        <Icon name="check-decagram" size={18} color={plan.accent} />
                                                    </View>
                                                </View>
                                            ))}
                                        </View>

                                        <TouchableOpacity onPress={() => { setSelectedPlan(plan); setShowModal(true); }}>
                                            <Text style={[styles.seeAll, { color: plan.accent }]}>View Full Details</Text>
                                        </TouchableOpacity>
                                    </LinearGradient>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>

            {/* --- CARD REPLICA MODAL --- */}
            <Modal
                transparent
                visible={showModal}
                animationType="fade"
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.modalOverlay}>
                    {/* Background tap to close */}
                    <TouchableOpacity style={styles.closeArea} onPress={() => setShowModal(false)} />

                    <View style={styles.modalContentContainer}>
                        <LinearGradient
                            colors={selectedPlan?.gradient || ['#fff', '#fff']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.realCardLook}
                        >
                            {/* --- Card Header --- */}
                            <View style={styles.realCardHeader}>
                                <View style={styles.titleWrapper}>
                                    <View style={styles.titleUnderlineContainer}>
                                        <Text style={styles.realCardTitle}>{selectedPlan?.title}</Text>
                                    </View>
                                    <Text style={styles.realCardSubtitle}>{selectedPlan?.subtitle}</Text>
                                </View>
                                <View style={styles.priceTagBox}>
                                    <Text style={styles.priceTagLabel}>Price</Text>
                                    <Text style={styles.priceTagValue}>₹{selectedPlan?.price}</Text>
                                </View>
                            </View>

                            {/* --- Card Body --- */}
                            <ScrollView style={styles.cardBodyScroll} showsVerticalScrollIndicator={true}>
                                {selectedPlan?.features.map((f, i) => (
                                    <View key={i} style={styles.bulletRow}>
                                        <Text style={styles.bulletDot}>•</Text>
                                        <Text style={styles.bulletText}>{f.name}</Text>
                                    </View>
                                ))}

                                {/* --- Disclaimer (Moved inside ScrollView to ensure fit) --- */}
                                {selectedPlan?.disclaimer && (
                                    <View style={styles.disclaimerBox}>
                                        <Text style={styles.disclaimerText}>
                                            {selectedPlan.disclaimer}
                                        </Text>
                                    </View>
                                )}
                            </ScrollView>

                            {/* --- Bottom Contact Strip --- */}
                            <View style={styles.bottomStrip}>
                                <Text style={styles.bottomStripText}>Toll Free No - 7380000739</Text>
                                <Text style={styles.bottomStripText}>www.employmenttrust.org</Text>
                            </View>
                        </LinearGradient>

                        {/* Payment Button */}
                        <TouchableOpacity
                            style={[styles.payNowBtn, { backgroundColor: selectedPlan?.accent || '#333' }]}
                            onPress={() => Alert.alert('Proceed to Payment')}
                        >
                            <Text style={styles.payNowText}>BUY</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setShowModal(false)} style={styles.closeBtnTextWrapper}>
                            <Text style={styles.closeBtnText}>Close</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    // ... (Standard Styles)
    header: { height: 60, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 15, backgroundColor: '#fff' },
    logo: { width: 140, height: 50 },
    profileSection: { flexDirection: "row", alignItems: "center", marginTop: 20, paddingHorizontal: 20 },
    profilePicContainer: { position: "relative" },
    profilePic: { width: 80, height: 80, borderRadius: 40, borderWidth: 2, borderColor: '#f0f0f0' },
    progressBadge: { position: "absolute", bottom: 0, right: -5, backgroundColor: "#F93E3E", borderRadius: 12, paddingVertical: 4, paddingHorizontal: 8, borderWidth: 2, borderColor: '#fff' },
    progressText: { color: "#fff", fontSize: 10, fontWeight: "bold" },
    profileTextBox: { marginLeft: 15 }, 
    userName: { fontSize: 22, fontWeight: "bold", color: "#222" },
    editProfileBtn: { marginTop: 5, backgroundColor: "#f0f0f0", borderRadius: 20, paddingVertical: 6, paddingHorizontal: 15 },
    editProfileText: { color: "#333", fontSize: 12, fontWeight: "600" },
    doubleDateBox: { flexDirection: "row", alignItems: "center", backgroundColor: "#FFF4F4", padding: 15, marginHorizontal: 20, borderRadius: 12, marginTop: 25 },
    doubleDateText: { fontSize: 14, marginLeft: 10, flex: 1, color: '#333', lineHeight: 20 },
    backg: { marginTop: 20, backgroundColor: "#f4f7f6", flex: 1, minHeight: 500 },
    topWave: { position: "absolute", top: 0, left: 0, zIndex: -1 },
    cardsRow: { flexDirection: "row", justifyContent: "space-around", paddingVertical: 20 },
    card: { alignItems: "center", backgroundColor: "#fff", padding: 15, borderRadius: 12, width: (width - 60) / 3, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
    cardText: { fontSize: 11, color: "#555", marginTop: 8, fontWeight: '600' },
    tableHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 },
    subtitle: { fontSize: 14, color: '#777', fontWeight: '600' },
    headerTextDisabled: { fontWeight: '600', color: '#aaa', fontSize: 12 },
    headerTextActive: { fontWeight: 'bold', fontSize: 12 },
    divider: { height: 1, backgroundColor: 'rgba(0,0,0,0.05)', marginVertical: 10 },
    featuresContainer: { flex: 1 },
    tableRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
    featureName: { flex: 1, color: '#444', fontSize: 13, fontWeight: '500', marginRight: 10 },
    seeAll: { textAlign: 'center', marginTop: 10, fontWeight: 'bold', fontSize: 13 },
    
    // --- Card List Styles ---
    swipeSection: {
        height: 360,
        marginTop: 10,
        marginBottom: 30
    },
    cardContainer: {
        width: CARD_WIDTH,
        paddingHorizontal: 8, // Added gap between cards
        justifyContent: 'center'
    },
    planCard: {
        borderRadius: 20,
        padding: 15, // REDUCED from 20 to 15 to give content more room
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        height: 320,
        justifyContent: 'space-between',
        backgroundColor: '#fff'
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', // Aligns the button with the text vertically
        marginBottom: 5
    },
    planTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: "#333",
        marginBottom: 2
    },
    planPriceSmall: {
        fontSize: 20,
        fontWeight: "bold"
    },
    upgradeBtn: {
        paddingVertical: 8,
        paddingHorizontal: 12, // REDUCED from 16 to fit smoothly
        borderRadius: 20,
        elevation: 2,
        minWidth: 80, // Ensures button doesn't get crushed
        alignItems: 'center'
    },
    upgradeBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 10
    },
    headerLabels: {
        flexDirection: 'row',
        width: 80,
        justifyContent: 'space-between'
    },
    iconRow: {
        flexDirection: 'row',
        width: 80,
        justifyContent: 'space-between'
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.8)",
        justifyContent: "center",
        alignItems: "center",
    },
    closeArea: {
        ...StyleSheet.absoluteFillObject,
    },
    modalContentContainer: {
        width: width - 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    realCardLook: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingVertical: 25,
        paddingHorizontal: 20,
        elevation: 10,
    },
    realCardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 15,
    },
    titleWrapper: {
        flex: 1,
        paddingRight: 10,
    },
    titleUnderlineContainer: {
        borderBottomWidth: 2,
        alignSelf: 'flex-start',
        marginBottom: 4,
        borderColor: '#000',
        paddingBottom: 2,
    },
    realCardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    realCardSubtitle: {
        fontSize: 13,
        fontWeight: '600',
        color: '#333',
    },
    priceTagBox: {
        alignItems: 'flex-end',
        minWidth: 80,
    },
    priceTagLabel: {
        fontSize: 12,
        color: '#000',
        fontWeight: 'bold',
        marginBottom: -5,
    },
    priceTagValue: {
        fontSize: 30,
        fontWeight: '900',
        color: '#000',
    },
    cardBodyScroll: {
        maxHeight: 280,
        marginVertical: 10,
    },
    bulletRow: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'flex-start',
    },
    bulletDot: {
        fontSize: 22,
        lineHeight: 22,
        marginRight: 10,
        color: '#000',
        fontWeight: 'bold',
    },
    bulletText: {
        fontSize: 15,
        color: '#000',
        fontWeight: '600',
        flex: 1,
        lineHeight: 22,
    },
    disclaimerBox: {
        marginTop: 20,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.1)',
    },
    disclaimerText: {
        fontSize: 11,
        color: '#000',
        fontWeight: '600',
        lineHeight: 15,
        fontStyle: 'italic',
    },
    bottomStrip: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    bottomStripText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#000',
    },
    payNowBtn: {
        width: '85%',
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 25,
        elevation: 5,
        borderWidth: 2,
        borderColor: '#fff',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    payNowText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
    },
    closeBtnTextWrapper: {
        marginTop: 15,
        padding: 10,
    },
    closeBtnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        textDecorationLine: 'underline',
    },
});