// src/screens/Employee/BoostProfileScreen.tsx

import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Dimensions,
    Alert,
    StatusBar,
    ScrollView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const BOOST_PACKS = [
    {
        id: 1,
        duration: '24 Hours',
        price: 99,
        label: 'Quick Boost',
        save: null,
        color: '#8B5CF6' // Violet
    },
    {
        id: 2,
        duration: '3 Days',
        price: 199,
        label: 'Standard',
        save: 'Save 33%',
        color: '#EC4899' // Pink
    },
    {
        id: 3,
        duration: '7 Days',
        price: 399,
        label: 'Max Visibility',
        save: 'Best Value',
        color: '#F59E0B' // Amber/Gold
    }
];

export default function BoostProfileScreen({ navigation }: any) {
    const [selectedPack, setSelectedPack] = useState(BOOST_PACKS[1]); // Default to middle option

    // Animation Values
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const rocketAnim = useRef(new Animated.Value(0)).current;

    // --- ANIMATION LOOP ---
    useEffect(() => {
        // Pulse Effect
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, { toValue: 1.2, duration: 1000, useNativeDriver: true }),
                Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true })
            ])
        ).start();

        // Rocket Hover Effect
        Animated.loop(
            Animated.sequence([
                Animated.timing(rocketAnim, { toValue: -10, duration: 1500, useNativeDriver: true }),
                Animated.timing(rocketAnim, { toValue: 0, duration: 1500, useNativeDriver: true })
            ])
        ).start();
    }, []);

    const handleBoost = () => {
        Alert.alert(
            "Activate Boost?",
            `This will deduct ₹${selectedPack.price} and boost your profile for ${selectedPack.duration}.`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Pay & Boost",
                    onPress: () => {
                        Alert.alert("Success!", "Your profile is now skyrocketing! 🚀");
                        navigation.goBack();
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1F1D2B" />

            {/* --- HERO SECTION (Dark Gradient) --- */}
            <LinearGradient
                colors={['#2E1065', '#4C1D95', '#1F1D2B']}
                style={styles.hero}
            >
                <SafeAreaView>
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
                            <Icon name="close" size={24} color="#fff" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Super Boost</Text>
                        <View style={{ width: 40 }} />
                    </View>

                    {/* Animation Center */}
                    <View style={styles.animContainer}>
                        {/* Background Pulsing Circles */}
                        <Animated.View style={[styles.pulseCircle, { transform: [{ scale: pulseAnim }], opacity: 0.3 }]} />
                        <Animated.View style={[styles.pulseCircle, { width: 150, height: 150, transform: [{ scale: pulseAnim }], opacity: 0.5 }]} />

                        {/* Rocket Icon */}
                        <Animated.View style={{ transform: [{ translateY: rocketAnim }] }}>
                            <Icon name="rocket-launch" size={80} color="#FBBF24" />
                        </Animated.View>
                    </View>

                    <Text style={styles.heroTitle}>Skyrocket your Profile!</Text>
                    <Text style={styles.heroSubtitle}>
                        Get up to <Text style={{ color: '#FBBF24', fontWeight: 'bold' }}>3x more views</Text> from top recruiters by pinning your profile to the top.
                    </Text>
                </SafeAreaView>
            </LinearGradient>

            {/* --- CONTENT SECTION (White Curve) --- */}
            <View style={styles.contentContainer}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

                    {/* Recruiter Preview */}
                    <View style={styles.previewSection}>
                        <Text style={styles.sectionTitle}>What Recruiters See:</Text>
                        <View style={styles.previewCard}>
                            <View style={styles.previewRow}>
                                <View style={styles.previewAvatar} />
                                <View style={{ marginLeft: 12 }}>
                                    <Text style={styles.previewName}>Anurag Kohli</Text>
                                    <Text style={styles.previewRole}>Senior Developer</Text>
                                </View>
                                {/* THE TAG */}
                                <View style={styles.featuredTag}>
                                    <Icon name="lightning-bolt" size={12} color="#fff" />
                                    <Text style={styles.featuredText}>FEATURED</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Package Selection */}
                    <Text style={styles.sectionTitle}>Select Duration</Text>

                    <View style={styles.packList}>
                        {BOOST_PACKS.map((pack) => {
                            const isSelected = selectedPack.id === pack.id;
                            return (
                                <TouchableOpacity
                                    key={pack.id}
                                    activeOpacity={0.9}
                                    onPress={() => setSelectedPack(pack)}
                                    style={[
                                        styles.packCard,
                                        isSelected && { borderColor: pack.color, backgroundColor: '#FDF2F8' }
                                    ]}
                                >
                                    {/* Radio Circle */}
                                    <View style={[styles.radio, isSelected && { borderColor: pack.color }]}>
                                        {isSelected && <View style={[styles.radioFill, { backgroundColor: pack.color }]} />}
                                    </View>

                                    {/* Content */}
                                    <View style={{ flex: 1 }}>
                                        <Text style={[styles.packDuration, isSelected && { color: '#111' }]}>{pack.duration}</Text>
                                        <Text style={styles.packLabel}>{pack.label}</Text>
                                    </View>

                                    {/* Price & Badge */}
                                    <View style={{ alignItems: 'flex-end' }}>
                                        <Text style={styles.packPrice}>₹{pack.price}</Text>
                                        {pack.save && (
                                            <View style={[styles.saveBadge, { backgroundColor: pack.color }]}>
                                                <Text style={styles.saveText}>{pack.save}</Text>
                                            </View>
                                        )}
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                </ScrollView>

                {/* --- FOOTER BUTTON --- */}
                <View style={styles.footer}>
                    <TouchableOpacity
                        style={styles.boostBtn}
                        onPress={handleBoost}
                    >
                        <LinearGradient
                            colors={['#F59E0B', '#D97706']}
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            style={styles.boostGradient}
                        >
                            <Text style={styles.boostBtnText}>BOOST NOW • ₹{selectedPack.price}</Text>
                            <Icon name="chevron-double-up" size={20} color="#fff" />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#1F1D2B' },

    // HERO
    hero: { height: '45%', alignItems: 'center' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10, width: '100%' },
    closeBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
    headerTitle: { color: 'white', fontSize: 18, fontWeight: '700' },

    animContainer: { alignItems: 'center', justifyContent: 'center', marginTop: 30, height: 120 },
    pulseCircle: { position: 'absolute', width: 200, height: 200, borderRadius: 100, backgroundColor: 'rgba(255,255,255,0.1)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },

    heroTitle: { color: 'white', fontSize: 26, fontWeight: '800', marginTop: 20, textAlign: 'center' },
    heroSubtitle: { color: '#D1D5DB', fontSize: 12, textAlign: 'center', marginTop: 8, paddingHorizontal: 40, lineHeight: 20 },

    // CONTENT
    contentContainer: {
        flex: 1, backgroundColor: '#fff',
        borderTopLeftRadius: 30, borderTopRightRadius: 30,
        marginTop: -10, paddingHorizontal: 24, paddingTop: 30
    },
    sectionTitle: { fontSize: 16, fontWeight: '700', color: '#374151', marginBottom: 15 },

    // PREVIEW CARD
    previewSection: { marginBottom: 30 },
    previewCard: {
        backgroundColor: '#fff', padding: 16, borderRadius: 16,
        borderWidth: 2, borderColor: '#F59E0B', // Gold border
        shadowColor: '#F59E0B', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 10, elevation: 5
    },
    previewRow: { flexDirection: 'row', alignItems: 'center' },
    previewAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#E5E7EB' },
    previewName: { fontSize: 16, fontWeight: '700', color: '#111' },
    previewRole: { fontSize: 12, color: '#6B7280' },
    featuredTag: {
        marginLeft: 'auto', backgroundColor: '#F59E0B', flexDirection: 'row',
        alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8
    },
    featuredText: { color: 'white', fontSize: 10, fontWeight: '800', marginLeft: 2 },

    // PACK LIST
    packList: { marginBottom: 20 },
    packCard: {
        flexDirection: 'row', alignItems: 'center', padding: 16,
        borderRadius: 16, borderWidth: 1, borderColor: '#E5E7EB', marginBottom: 12, backgroundColor: '#fff'
    },
    radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#D1D5DB', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    radioFill: { width: 10, height: 10, borderRadius: 5 },
    packDuration: { fontSize: 16, fontWeight: '700', color: '#374151' },
    packLabel: { fontSize: 13, color: '#6B7280' },
    packPrice: { fontSize: 18, fontWeight: '700', color: '#111', marginBottom: 4 },
    saveBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
    saveText: { color: 'white', fontSize: 10, fontWeight: '700' },

    // FOOTER
    footer: { position: 'absolute', bottom: 30, left: 24, right: 24 },
    boostBtn: { borderRadius: 20, overflow: 'hidden', shadowColor: '#F59E0B', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.4, shadowRadius: 20, elevation: 10 },
    boostGradient: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 18 },
    boostBtnText: { color: 'white', fontSize: 18, fontWeight: '800', marginRight: 8, letterSpacing: 0.5 }
});