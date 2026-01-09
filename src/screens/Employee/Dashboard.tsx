// src/screens/Employee/Dashboard.tsx


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

import { AppliedJob, JobStatus, JobDataItem } from '../../types';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const HEADER_HEIGHT = 60;
const FOOTER_HEIGHT = 100;
const AVAILABLE_HEIGHT = SCREEN_HEIGHT - HEADER_HEIGHT - FOOTER_HEIGHT - 70;
const CARD_HEIGHT = Math.min(AVAILABLE_HEIGHT, SCREEN_HEIGHT * 0.50);
const CARD_WIDTH = SCREEN_WIDTH * 0.9;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.1;
const VISIBLE_ITEMS = 3;

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
const JOBS_DATA: JobDataItem[] = [
    { id: 1, title: 'Frontend Developer', company: 'Infosys', location: 'Mohali, India', salary: '₹6L - ₹12L', tags: ['Full-Time', 'On-site'], logoColor: '#0072C6', logoInitial: 'I' },
    { id: 2, title: 'Backend Developer', company: 'Tech Mahindra', location: 'Chandigarh, India', salary: '₹7L - ₹14L', tags: ['Hybrid', 'Mid-Level'], logoColor: '#E60028', logoInitial: 'T' },
    { id: 3, title: 'Full Stack Engineer', company: 'TCS', location: 'Panchkula, India', salary: '₹8L - ₹15L', tags: ['Full-Time', 'Remote'], logoColor: '#00A1E0', logoInitial: 'T' },
    { id: 4, title: 'UI/UX Designer', company: 'Wipro', location: 'Mohali, India', salary: '₹5L - ₹10L', tags: ['On-site', 'Mid-Level'], logoColor: '#2CA02C', logoInitial: 'W' },
    { id: 5, title: 'Mobile App Developer', company: 'Cognizant', location: 'Chandigarh, India', salary: '₹6L - ₹11L', tags: ['Full-Time', 'Hybrid'], logoColor: '#1C75BC', logoInitial: 'C' },
    { id: 6, title: 'Data Scientist', company: 'Infosys', location: 'Mohali, India', salary: '₹10L - ₹18L', tags: ['Remote', 'Senior'], logoColor: '#0072C6', logoInitial: 'I' },
];

const Tag = ({ text }: { text: string }) => (
    <View style={styles.tag}>
        <Text style={styles.tagText}>{text}</Text>
    </View>
);
interface PremiumModalProps {
    visible: boolean;
    onClose: () => void;
    recommendedPlan: typeof PLANS[0] | null;
}
const PremiumModal = ({ visible, onClose, recommendedPlan }: PremiumModalProps) => {
    const [selectedPlan, setSelectedPlan] = useState<any>(PLANS[1]);
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
    item: JobDataItem; // Use JobDataItem type
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
// Add onJobApplied prop here
interface JobSeekerDashboardProps {
    navigation: any;
    onJobApplied: (job: AppliedJob) => void; // Define the new prop
}

export default function JobSeekerDashboard({ navigation, onJobApplied }: JobSeekerDashboardProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [rightSwipeCount, setRightSwipeCount] = useState(0);
    const [showPremiumModal, setShowPremiumModal] = useState(false);
    const [recommendedPlan, setRecommendedPlan] = useState<any>(null);

    const translationX = useSharedValue(0);
    const activeIndex = useSharedValue(0);

    const onSwipeComplete = useCallback((direction: 'left' | 'right') => {
        if (direction === 'right') {
            const newCount = rightSwipeCount + 1;
            setRightSwipeCount(newCount);
            console.log(`Right Swipe Count: ${newCount}`);

            // Logic to add the job to the applied list
            const currentJob = JOBS_DATA[currentIndex % JOBS_DATA.length];
            const newAppliedJob: AppliedJob = {
                id: currentJob.id,
                title: currentJob.title,
                company: currentJob.company,
                location: currentJob.location,
                salary: currentJob.salary,
                logoColor: currentJob.logoColor,
                logoInitial: currentJob.logoInitial,
                status: 'Pending', // Default status when applied
                appliedDate: 'Just now', // You can implement a dynamic date here
            };
            onJobApplied(newAppliedJob); // Call the callback from parent

            // Logic for premium modal
            if (newCount > 0 && newCount % 5 === 0) {
                const randomIndex = Math.floor(Math.random() * PLANS.length);
                const randomPlan = PLANS[randomIndex];
                setRecommendedPlan(randomPlan);
                setTimeout(() => {
                    setShowPremiumModal(true);
                }, 300);
            }
        }
        setCurrentIndex(prev => prev + 1);
        activeIndex.value = withTiming(activeIndex.value + 1, { duration: 0 });
        translationX.value = 0;
    }, [activeIndex, translationX, rightSwipeCount, currentIndex, onJobApplied]); // Add onJobApplied to dependencies

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
        // Ensure that JOBS_DATA is not empty before attempting modulo
        if (JOBS_DATA.length === 0) return null;

        const itemsToRender = [0, 1, 2].reverse().map(offset => {
            const actualIndex = currentIndex + offset;
            const dataIndex = actualIndex % JOBS_DATA.length;
            const item = JOBS_DATA[dataIndex];
            return (
                <Card
                    key={actualIndex} // Use actualIndex for key to avoid issues when rewinding/looping
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
    container: {
        flex: 1,
        backgroundColor: '#F7F8FA',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#F7F8FA',
    },
    subHeading: {
        fontSize: 14,
        color: '#8E8E93',
        fontWeight: '500',
    },
    heading: {
        fontSize: 28,
        fontWeight: '800',
        color: '#1C1C1E',
    },
    countBadge: {
        backgroundColor: '#E1E4E8',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        alignSelf: 'flex-start',
    },
    countText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#555',
    },
    stackContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stackWrapper: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContainer: {
        position: 'absolute',
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        padding: 20,
    },
    cardInner: {
        flex: 1,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    logoPlaceholder: {
        width: 50,
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    logoText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    companyName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1C1C1E',
    },
    location: {
        fontSize: 14,
        color: '#8E8E93',
        marginTop: 2,
    },
    cardBody: {
        flex: 1,
    },
    jobTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#1C1C1E',
        marginBottom: 8,
    },
    salary: {
        fontSize: 16,
        fontWeight: '600',
        color: '#4CAF50', // Green for salary
        marginBottom: 15,
    },
    divider: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginVertical: 15,
    },
    description: {
        fontSize: 14,
        color: '#6A6A6A',
        lineHeight: 20,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
    },
    tag: {
        backgroundColor: '#E1E4E8',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 8,
        marginBottom: 5,
    },
    tagText: {
        fontSize: 12,
        color: '#555',
        fontWeight: '600',
    },
    timestamp: {
        fontSize: 12,
        color: '#C7C7CC',
        fontWeight: '500',
    },
    overlay: {
        position: 'absolute',
        top: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 10,
        borderWidth: 2,
    },
    overlayLike: {
        left: 20,
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
    },
    overlayTextLike: {
        color: '#4CAF50',
        fontSize: 18,
        fontWeight: 'bold',
    },
    overlayNope: {
        right: 20,
        borderColor: '#F44336',
        backgroundColor: 'rgba(244, 67, 54, 0.2)',
    },
    overlayTextNope: {
        color: '#F44336',
        fontSize: 18,
        fontWeight: 'bold',
    },
    footerContainer: {
        height: FOOTER_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7F8FA',
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingHorizontal: 20,
    },
    circleBtn: {
        backgroundColor: 'white',
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 3,
    },
    btnSmall: {
        width: 50,
        height: 50,
    },
    btnLarge: {
        width: 70,
        height: 70,
    },
    // Premium Modal Styles
    modalBackdrop: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalCloser: {
        flex: 1,
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 20,
        paddingHorizontal: 10, // Adjusted for horizontal scroll view
        maxHeight: SCREEN_HEIGHT * 0.85,
    },
    modalHandle: {
        width: 40,
        height: 5,
        backgroundColor: '#D1D1D6',
        borderRadius: 2.5,
        alignSelf: 'center',
        marginBottom: 15,
    },
    modalHeading: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
        color: '#1C1C1E',
    },
    modalSubHeading: {
        fontSize: 15,
        color: '#8E8E93',
        textAlign: 'center',
        marginBottom: 15,
        paddingHorizontal: 20,
    },
    miniPlanCard: {
        borderRadius: 15,
        overflow: 'hidden',
        width: 140,
        height: 140,
        marginHorizontal: 8,
        borderWidth: 2,
        borderColor: 'transparent',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    miniPlanCardSelected: {
        borderColor: '#3B82F6', // Default selected border color, overridden by plan.accent
    },
    miniGradient: {
        flex: 1,
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    miniBadge: {
        backgroundColor: '#6B7280', // Default badge color
        borderRadius: 5,
        paddingHorizontal: 6,
        paddingVertical: 3,
        marginBottom: 5,
    },
    miniBadgeText: {
        fontSize: 9,
        fontWeight: 'bold',
        color: '#fff',
        textTransform: 'uppercase',
    },
    miniPlanTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1C1C1E',
        textAlign: 'center',
    },
    miniPlanPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1C1C1E',
        marginTop: 5,
    },
    detailsContainer: {
        backgroundColor: '#F9FAFB',
        borderRadius: 20,
        padding: 20,
        marginHorizontal: 10,
        marginTop: 10,
    },
    sectionLabel: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#6B7280',
        marginBottom: 15,
    },
    featureRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    featureText: {
        fontSize: 14,
        color: '#374151',
        marginLeft: 10,
        flex: 1,
    },
    modalCta: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        borderRadius: 15,
        marginHorizontal: 20,
        marginTop: 20,
    },
    modalCtaText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginRight: 10,
    },
});