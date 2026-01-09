import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, StatusBar, Alert, Modal, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    interpolate,
    runOnJS,
    withTiming,
    Extrapolation,
    useDerivedValue,
    SharedValue
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const HEADER_HEIGHT = 60;
const FOOTER_HEIGHT = 100;
const AVAILABLE_HEIGHT = SCREEN_HEIGHT - HEADER_HEIGHT - FOOTER_HEIGHT - 40;
const CARD_HEIGHT = Math.min(AVAILABLE_HEIGHT, SCREEN_HEIGHT * 0.65);
const CARD_WIDTH = SCREEN_WIDTH * 0.9;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;
const VISIBLE_ITEMS = 3;

// --- DATA ---
const PLANS = [
    {
        id: 'priority',
        title: 'Priority',
        subtitle: 'Get noticed faster',
        price: 399,
        gradient: ['#F0FDF4', '#DCFCE7'],
        accent: '#166534',
        buttonColor: '#22c55e',
        defaultBadge: null,
        features: ['Priority Interview Scheduling', 'Personalized Job Counselling', 'Guaranteed Job Guidance', 'Free Legal Support', 'Whatsapp Support'],
        disclaimer: "Valid for One Job Placement Opportunity Only."
    },
    {
        id: 'career',
        title: 'Career Pro',
        subtitle: 'Expert guidance',
        price: 799,
        gradient: ['#FEFCE8', '#FEF9C3'],
        accent: '#854D0E',
        buttonColor: '#EAB308',
        defaultBadge: 'MOST POPULAR',
        features: ['1-on-1 Career Counselling', 'Specialized Field Guidance', 'Dedicated Counsellor Support', 'Hand-holding till Placement', 'Profile Optimization'],
        disclaimer: "We don't guarantee employment, but we are committed."
    },
    {
        id: 'aip',
        title: 'AIP Premium',
        subtitle: 'The complete package',
        price: 1499,
        gradient: ['#EFF6FF', '#DBEAFE'],
        accent: '#1E40AF',
        buttonColor: '#3B82F6',
        defaultBadge: 'BEST VALUE',
        features: ['All Priority & Career Features', 'Premium Legal Support', 'Top Priority over others', 'Exclusive Govt Job Alerts', 'Instant Interview Info'],
        disclaimer: "Comprehensive support package."
    },
];

const JOBS_DATA = [
    { id: 1, title: 'Frontend Developer', company: 'Infosys', location: 'Mohali, India', salary: '₹6L - ₹12L', tags: ['Full-Time', 'On-site'], logoColor: '#0072C6', logoInitial: 'I' },
    { id: 2, title: 'Backend Developer', company: 'Tech Mahindra', location: 'Chandigarh, India', salary: '₹7L - ₹14L', tags: ['Hybrid', 'Mid-Level'], logoColor: '#E60028', logoInitial: 'T' },
    { id: 3, title: 'Full Stack Engineer', company: 'TCS', location: 'Panchkula, India', salary: '₹8L - ₹15L', tags: ['Full-Time', 'Remote'], logoColor: '#00A1E0', logoInitial: 'T' },
    { id: 4, title: 'UI/UX Designer', company: 'Wipro', location: 'Mohali, India', salary: '₹5L - ₹10L', tags: ['On-site', 'Mid-Level'], logoColor: '#2CA02C', logoInitial: 'W' },
    { id: 5, title: 'Mobile App Developer', company: 'Cognizant', location: 'Chandigarh, India', salary: '₹6L - ₹11L', tags: ['Full-Time', 'Hybrid'], logoColor: '#1C75BC', logoInitial: 'C' },
    { id: 6, title: 'Data Scientist', company: 'Infosys', location: 'Mohali, India', salary: '₹10L - ₹18L', tags: ['Remote', 'Senior'], logoColor: '#0072C6', logoInitial: 'I' },
];

// --- COMPONENTS ---

const Tag = ({ text }: { text: string }) => (
    <View style={styles.tag}>
        <Text style={styles.tagText}>{text}</Text>
    </View>
);

// --- PREMIUM MODAL COMPONENT ---
interface PremiumModalProps {
    visible: boolean;
    onClose: () => void;
    recommendedPlan: typeof PLANS[0] | null;
}

const PremiumModal = ({ visible, onClose, recommendedPlan }: PremiumModalProps) => {
    // Initialize with recommended plan if available, otherwise default to middle plan
    const [selectedPlan, setSelectedPlan] = useState<any>(PLANS[1]);

    // When modal opens or recommended plan changes, update the selected plan
    useEffect(() => {
        if (visible && recommendedPlan) {
            setSelectedPlan(recommendedPlan);
        } else if (visible && !recommendedPlan) {
            setSelectedPlan(PLANS[1]);
        }
    }, [visible, recommendedPlan]);

    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <View style={styles.modalBackdrop}>
                <TouchableOpacity style={styles.modalCloser} onPress={onClose} />
                <View style={styles.modalContent}>
                    <View style={styles.modalHandle} />

                    <Text style={styles.modalHeading}>Upgrade to Apply More</Text>
                    <Text style={styles.modalSubHeading}>You've swiped 5 jobs! Boost your chances now.</Text>

                    {/* Horizontal Plan Selector */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 20 }}>
                        {PLANS.map((plan) => {
                            const isSelected = selectedPlan.id === plan.id;
                            const isRecommended = recommendedPlan?.id === plan.id;

                            return (
                                <TouchableOpacity
                                    key={plan.id}
                                    activeOpacity={0.9}
                                    onPress={() => setSelectedPlan(plan)}
                                    style={[
                                        styles.miniPlanCard,
                                        isSelected && styles.miniPlanCardSelected,
                                        { borderColor: isSelected ? plan.accent : 'transparent' }
                                    ]}
                                >
                                    <LinearGradient colors={plan.gradient} style={styles.miniGradient}>
                                        {/* Dynamic Badge Logic */}
                                        {isRecommended ? (
                                            <View style={[styles.miniBadge, { backgroundColor: '#FF3B30' }]}>
                                                <Text style={styles.miniBadgeText}>✨ RECOMMENDED</Text>
                                            </View>
                                        ) : plan.defaultBadge ? (
                                            <View style={styles.miniBadge}>
                                                <Text style={styles.miniBadgeText}>{plan.defaultBadge}</Text>
                                            </View>
                                        ) : <View style={{ height: 16 }} />}

                                        <Text style={[styles.miniPlanTitle, { color: plan.accent }]}>{plan.title}</Text>
                                        <Text style={styles.miniPlanPrice}>₹{plan.price}</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>

                    {/* Selected Plan Details */}
                    <View style={styles.detailsContainer}>
                        <Text style={styles.sectionLabel}>WHAT'S INCLUDED IN {selectedPlan.title.toUpperCase()}</Text>
                        {selectedPlan.features.slice(0, 4).map((item: string, index: number) => (
                            <View key={index} style={styles.featureRow}>
                                <Icon name="check-circle" size={18} color={selectedPlan.accent} />
                                <Text style={styles.featureText}>{item}</Text>
                            </View>
                        ))}
                    </View>

                    <TouchableOpacity
                        style={[styles.modalCta, { backgroundColor: selectedPlan.buttonColor }]}
                        onPress={() => { Alert.alert("Payment", `Processing payment for ${selectedPlan.title}`); onClose(); }}
                    >
                        <Text style={styles.modalCtaText}>Pay ₹{selectedPlan.price} & Continue</Text>
                        <Icon name="arrow-right" size={18} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onClose} style={{ marginTop: 15 }}>
                        <Text style={{ color: '#999', fontSize: 13, textAlign: 'center' }}>No thanks, I'll continue swiping freely</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

// --- CARD COMPONENT ---
interface CardProps {
    item: typeof JOBS_DATA[0];
    index: number;
    translationX: SharedValue<number>;
    activeIndex: SharedValue<number>;
}

const Card: React.FC<CardProps> = ({ item, index, translationX, activeIndex }) => {
    const currentIndex = useDerivedValue(() => index - activeIndex.value);

    const rStyle = useAnimatedStyle(() => {
        if (currentIndex.value < -1 || currentIndex.value > VISIBLE_ITEMS) {
            return { display: 'none' };
        }

        const rotate = interpolate(
            translationX.value,
            [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            [-15, 0, 15],
            Extrapolation.CLAMP
        );

        if (currentIndex.value === 0) {
            return {
                transform: [
                    { translateX: translationX.value },
                    { rotate: `${rotate}deg` },
                    { scale: 1 },
                ],
                zIndex: 100,
            };
        }

        const swipeProgress = interpolate(Math.abs(translationX.value), [0, SWIPE_THRESHOLD], [0, 1], Extrapolation.CLAMP);
        const currentScale = interpolate(swipeProgress, [0, 1], [1 - currentIndex.value * 0.05, 1 - (currentIndex.value - 1) * 0.05]);
        const currentTranslateY = interpolate(swipeProgress, [0, 1], [currentIndex.value * 15, (currentIndex.value - 1) * 15]);

        return {
            transform: [{ scale: currentScale }, { translateY: currentTranslateY }],
            zIndex: -index,
        };
    });

    const likeOpacity = useAnimatedStyle(() => {
        if (currentIndex.value !== 0) return { opacity: 0 };
        return { opacity: interpolate(translationX.value, [0, SCREEN_WIDTH / 4], [0, 1]) };
    });

    const nopeOpacity = useAnimatedStyle(() => {
        if (currentIndex.value !== 0) return { opacity: 0 };
        return { opacity: interpolate(translationX.value, [-SCREEN_WIDTH / 4, 0], [1, 0]) };
    });

    return (
        <Animated.View style={[styles.cardContainer, rStyle]}>
            <Animated.View style={[styles.overlay, styles.overlayLike, likeOpacity]}>
                <Text style={styles.overlayTextLike}>APPLY</Text>
            </Animated.View>
            <Animated.View style={[styles.overlay, styles.overlayNope, nopeOpacity]}>
                <Text style={styles.overlayTextNope}>PASS</Text>
            </Animated.View>

            <View style={styles.cardInner}>
                <View style={styles.cardHeader}>
                    <View style={[styles.logoPlaceholder, { backgroundColor: item.logoColor }]}>
                        <Text style={styles.logoText}>{item.logoInitial}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.companyName}>{item.company}</Text>
                        <Text style={styles.location}>{item.location}</Text>
                    </View>
                </View>
                <View style={styles.cardBody}>
                    <Text style={styles.jobTitle}>{item.title}</Text>
                    <Text style={styles.salary}>{item.salary}</Text>
                    <View style={styles.divider} />
                    <Text style={styles.description}>
                        We are looking for a passionate {item.title} to join our team. This is a generic description for the demo.
                    </Text>
                </View>
                <View style={styles.cardFooter}>
                    <View style={styles.tagContainer}>
                        {item.tags.map((tag, i) => <Tag key={i} text={tag} />)}
                    </View>
                    <Text style={styles.timestamp}>Posted just now</Text>
                </View>
            </View>
        </Animated.View>
    );
};


// --- MAIN SCREEN ---
export default function JobSeekerDashboard() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [rightSwipeCount, setRightSwipeCount] = useState(0);
    const [showPremiumModal, setShowPremiumModal] = useState(false);

    // State for the randomly selected plan
    const [recommendedPlan, setRecommendedPlan] = useState<any>(null);

    const translationX = useSharedValue(0);
    const activeIndex = useSharedValue(0);

    const onSwipeComplete = useCallback((direction: 'left' | 'right') => {

        if (direction === 'right') {
            const newCount = rightSwipeCount + 1;
            setRightSwipeCount(newCount);
            console.log(`Right Swipe Count: ${newCount}`);

            // Logic: Every 5th application (5, 10, 15...)
            if (newCount > 0 && newCount % 5 === 0) {

                // 1. Pick a random plan from the 3 available plans
                const randomIndex = Math.floor(Math.random() * PLANS.length);
                const randomPlan = PLANS[randomIndex];
                setRecommendedPlan(randomPlan);

                // 2. Show Modal after a short delay
                setTimeout(() => {
                    setShowPremiumModal(true);
                }, 300);
            }
        }

        setCurrentIndex(prev => prev + 1);
        activeIndex.value = withTiming(activeIndex.value + 1, { duration: 0 });
        translationX.value = 0;

    }, [activeIndex, translationX, rightSwipeCount]);

    const gesture = Gesture.Pan()
        .onUpdate((event) => { translationX.value = event.translationX; })
        .onEnd((event) => {
            if (event.translationX > SWIPE_THRESHOLD) {
                translationX.value = withTiming(SCREEN_WIDTH * 1.5, { duration: 250 }, () => runOnJS(onSwipeComplete)('right'));
            } else if (event.translationX < -SWIPE_THRESHOLD) {
                translationX.value = withTiming(-SCREEN_WIDTH * 1.5, { duration: 250 }, () => runOnJS(onSwipeComplete)('left'));
            } else {
                translationX.value = withSpring(0, { damping: 15, stiffness: 150 });
            }
        });

    const handlePass = () => {
        translationX.value = withTiming(-SCREEN_WIDTH * 1.5, { duration: 300 }, () => runOnJS(onSwipeComplete)('left'));
    };

    const handleApply = () => {
        translationX.value = withTiming(SCREEN_WIDTH * 1.5, { duration: 300 }, () => runOnJS(onSwipeComplete)('right'));
    };

    const handleRewind = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
            activeIndex.value = withTiming(activeIndex.value - 1);
        }
    };

    const renderStack = () => {
        const itemsToRender = [0, 1, 2].reverse().map(offset => {
            const actualIndex = currentIndex + offset;
            const dataIndex = actualIndex % JOBS_DATA.length;
            const item = JOBS_DATA[dataIndex];

            return (
                <Card
                    key={actualIndex}
                    item={item}
                    index={actualIndex}
                    translationX={translationX}
                    activeIndex={activeIndex}
                />
            );
        });
        return itemsToRender;
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" />

                <View style={styles.header}>
                    <View>
                        <Text style={styles.subHeading}>Job Opportunities</Text>
                        <Text style={styles.heading}>Swipe Jobs</Text>
                    </View>
                    <View style={styles.countBadge}>
                        <Text style={styles.countText}>{rightSwipeCount} Applied</Text>
                    </View>
                </View>

                <View style={styles.stackContainer} pointerEvents="box-none">
                    <GestureDetector gesture={gesture}>
                        <Animated.View style={styles.stackWrapper}>
                            {renderStack()}
                        </Animated.View>
                    </GestureDetector>
                </View>

                <View style={styles.footerContainer}>
                    <View style={styles.actionRow}>
                        <TouchableOpacity style={[styles.circleBtn, styles.btnSmall]} onPress={handleRewind}>
                            <Icon name="refresh" size={24} color="#f5b915" />
                        </TouchableOpacity>

                         <TouchableOpacity style={[styles.circleBtn, styles.btnLarge]} onPress={handlePass}>
                            <Icon name="close" size={32} color="#ec5e67" />
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.circleBtn, styles.btnLarge]} onPress={handleApply}>
                            <Icon name="check" size={32} color="#4ccc93" />
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.circleBtn, styles.btnSmall]} onPress={() => Alert.alert("Super Like!")}>
                            <Icon name="star" size={24} color="#3ca4ff" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* --- PREMIUM POPUP --- */}
                <PremiumModal
                    visible={showPremiumModal}
                    onClose={() => setShowPremiumModal(false)}
                    recommendedPlan={recommendedPlan}
                />

            </SafeAreaView>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F7F8FA' },
    header: {
        position: 'absolute', top: 0, left: 0, right: 0,
        paddingTop: Platform.OS === 'android' ?40 : 10,
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        paddingHorizontal: 24, paddingVertical: 10, zIndex: 20,
    },
    subHeading: { fontSize: 14, color: '#8E8E93', fontWeight: '600' },
    heading: { fontSize: 26, fontWeight: '800', color: '#1C1C1E' },
    countBadge: { backgroundColor: '#E0F2FE', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
    countText: { color: '#0284C7', fontWeight: 'bold', fontSize: 12 },

    stackContainer: {
        alignItems: 'center', justifyContent: 'center',
        paddingTop: HEADER_HEIGHT, paddingBottom: FOOTER_HEIGHT, zIndex: 1, height: SCREEN_HEIGHT
    },
    stackWrapper: { width: SCREEN_WIDTH, height: CARD_HEIGHT, alignItems: 'center', justifyContent: 'center' },

    cardContainer: { position: 'absolute', width: CARD_WIDTH, height: CARD_HEIGHT },
    cardInner: {
        flex: 1, backgroundColor: 'white', borderRadius: 24, padding: 24,
        justifyContent: 'space-between', shadowColor: '#000', shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1, shadowRadius: 20, elevation: 5, borderWidth: 1, borderColor: '#F2F2F7',
    },
    cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    logoPlaceholder: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
    logoText: { color: 'white', fontSize: 22, fontWeight: 'bold' },
    companyName: { fontSize: 17, fontWeight: '700', color: '#1C1C1E' },
    location: { fontSize: 13, color: '#8E8E93', marginTop: 2 },
    cardBody: { flex: 1, justifyContent: 'center' },
    jobTitle: { fontSize: 28, fontWeight: '800', color: '#000', marginBottom: 8 },
    salary: { fontSize: 18, fontWeight: '600', color: '#2CB978', marginBottom: 15 },
    divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 15 },
    description: { fontSize: 15, color: '#636366', lineHeight: 22 },
    cardFooter: { marginTop: 10 },
    tagContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 },
    tag: { backgroundColor: '#F2F2F7', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, marginRight: 8, marginBottom: 8 },
    tagText: { fontSize: 12, fontWeight: '600', color: '#3A3A3C' },
    timestamp: { fontSize: 12, color: '#C7C7CC', textAlign: 'right' },

    overlay: { position: 'absolute', top: 40, zIndex: 999, paddingHorizontal: 20, paddingVertical: 5, borderWidth: 4, borderRadius: 12 },
    overlayLike: { left: 40, borderColor: '#4CD964', transform: [{ rotate: '-20deg' }] },
    overlayNope: { right: 40, borderColor: '#FF3B30', transform: [{ rotate: '20deg' }] },
    overlayTextLike: { color: '#4CD964', fontSize: 32, fontWeight: '900' },
    overlayTextNope: { color: '#FF3B30', fontSize: 32, fontWeight: '900' },

    footerContainer: {
        position: 'absolute', bottom: 0, left: 0, right: 0, height: FOOTER_HEIGHT + 20,
        backgroundColor: '#F7F8FA', justifyContent: 'center', paddingHorizontal: 30, paddingBottom: 20, zIndex: 20,
    },
    actionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    circleBtn: {
        backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderRadius: 50,
        shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4,
    },
    btnSmall: { width: 50, height: 50 },
    btnLarge: { width: 70, height: 70 },

    // --- MODAL STYLES ---
    modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
    modalCloser: { flex: 1 },
    modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingBottom: 40, maxHeight: '80%' },
    modalHandle: { width: 40, height: 4, backgroundColor: '#E5E7EB', borderRadius: 2, alignSelf: 'center', marginTop: 12, marginBottom: 15 },
    modalHeading: { fontSize: 22, fontWeight: '800', textAlign: 'center', color: '#111' },
    modalSubHeading: { fontSize: 14, textAlign: 'center', color: '#666', marginBottom: 10 },

    miniPlanCard: { width: 140, height: 160, borderRadius: 16, marginHorizontal: 6, borderWidth: 2, overflow: 'hidden' },
    miniPlanCardSelected: { transform: [{ scale: 1.05 }] },
    miniGradient: { flex: 1, padding: 12, justifyContent: 'space-between' },
    miniBadge: { backgroundColor: '#000', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, alignSelf: 'flex-start' },
    miniBadgeText: { color: '#fff', fontSize: 8, fontWeight: 'bold' },
    miniPlanTitle: { fontSize: 14, fontWeight: 'bold' },
    miniPlanPrice: { fontSize: 18, fontWeight: '900', color: '#333' },

    detailsContainer: { paddingHorizontal: 25, marginVertical: 10 },
    sectionLabel: { fontSize: 11, fontWeight: 'bold', color: '#999', marginBottom: 10 },
    featureRow: { flexDirection: 'row', marginBottom: 8, alignItems: 'center' },
    featureText: { fontSize: 14, color: '#333', marginLeft: 10 },

    modalCta: { flexDirection: 'row', marginHorizontal: 25, height: 50, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginTop: 10, shadowColor: '#000', shadowOpacity: 0.2, shadowOffset: { width: 0, height: 4 }, elevation: 5 },
    modalCtaText: { color: '#fff', fontWeight: 'bold', fontSize: 16, marginRight: 10 }
});