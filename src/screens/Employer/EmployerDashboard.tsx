import React, { useState, memo, useCallback, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    StatusBar,
    Modal,
    Dimensions,
    Alert, // Added Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
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
import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';

const { width, height: SCREEN_HEIGHT } = Dimensions.get('window');

const COLORS = {
    primary: '#0F172A',
    accent: '#3B82F6',
    success: '#10B981',
    warning: '#F59E0B',
    background: '#F8FAFC',
    surface: '#FFFFFF',
    textPrimary: '#1E293B',
    textSecondary: '#64748B',
    border: '#E2E8F0'
};
const DANGER_COLOR = '#EF4444';

// --- DATA INTERFACES ---
interface StatItem {
    label: string;
    value: string;
    icon: string;
    color: string;
    trend: string;
}
interface ApplicantItem {
    id: string;
    name: string;
    role: string;
    match: string;
    img: string;
    experience?: string;
    location?: string;
}
interface JobItem {
    id: string;
    title: string;
    type: string;
    applicants: number;
    daysLeft: number;
}
interface CustomAlertModalProps {
    visible: boolean;
    onClose: () => void;
    title: string;
    message: string;
    isError?: boolean;
}

// --- MOCK DATA ---
const STATS: StatItem[] = [
    { label: 'Total Applicants', value: '1,240', icon: 'account-group', color: COLORS.accent, trend: '+12%' },
    { label: 'Active Jobs', value: '05', icon: 'briefcase', color: COLORS.success, trend: '+2' },
    { label: 'Shortlisted', value: '28', icon: 'star', color: COLORS.warning, trend: '+5' },
];
const RECENT_APPLICANTS: ApplicantItem[] = [
    { id: '1', name: 'Rahul Sharma', role: 'Senior React Dev', match: '95%', img: 'https://randomuser.me/api/portraits/men/32.jpg', experience: '4 Yrs', location: 'Noida' },
    { id: '2', name: 'Priya Verma', role: 'Product Designer', match: '88%', img: 'https://randomuser.me/api/portraits/women/44.jpg', experience: '3 Yrs', location: 'Bengaluru' },
    { id: '3', name: 'Amit Kumar', role: 'Backend Engineer', match: '72%', img: 'https://randomuser.me/api/portraits/men/85.jpg', experience: '5 Yrs', location: 'Pune' },
    { id: '4', name: 'Sneha Singh', role: 'Data Scientist', match: '90%', img: 'https://randomuser.me/api/portraits/women/66.jpg', experience: '6 Yrs', location: 'Hyderabad' },
    { id: '5', name: 'Vikram Patel', role: 'DevOps Engineer', match: '78%', img: 'https://randomuser.me/api/portraits/men/78.jpg', experience: '3 Yrs', location: 'Mumbai' },
    { id: '6', name: 'Anjali Desai', role: 'Cloud Architect', match: '82%', img: 'https://randomuser.me/api/portraits/women/22.jpg', experience: '8 Yrs', location: 'Chennai' },
];

// --- PREMIUM PLANS DATA ---
const PLANS = [
    {
        id: 'priority',
        title: 'Priority',
        subtitle: 'Get noticed faster',
        price: 399,
        bgColor: '#F0FDF4', // Fallback for gradient
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
        bgColor: '#FEFCE8',
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
        bgColor: '#EFF6FF',
        accent: '#1E40AF',
        buttonColor: '#3B82F6',
        defaultBadge: 'BEST VALUE',
        features: ['All Priority & Career Features', 'Premium Legal Support', 'Top Priority over others', 'Exclusive Govt Job Alerts', 'Instant Interview Info'],
        disclaimer: "Comprehensive support package."
    },
];

const SWIPE_CARD_WIDTH = width * 0.9;
const SWIPE_CARD_HEIGHT = width * 1.1;
const SWIPE_THRESHOLD = SWIPE_CARD_WIDTH * 0.25;
const VISIBLE_SWIPE_ITEMS = 3;

// --- COMPONENTS ---

interface DashboardHeaderProps {
    userName: string;
    greeting?: string;
    profileImageUri?: string;
    onProfilePress?: () => void;
}
const DashboardHeader: React.FC<DashboardHeaderProps> = memo(({ userName, greeting = 'Good Morning,', profileImageUri = 'https://randomuser.me/api/portraits/lego/1.jpg', onProfilePress }) => (
    <View style={headerStyles.header}>
        <View>
            <Text style={headerStyles.greeting}>{greeting}</Text>
            <Text style={headerStyles.userName}>{userName}</Text>
        </View>
        <TouchableOpacity style={headerStyles.profileBtn} onPress={onProfilePress} activeOpacity={0.8}>
            <Image
                source={{ uri: profileImageUri }}
                style={headerStyles.profileImg}
            />
            <View style={headerStyles.notifyBadge} />
        </TouchableOpacity>
    </View>
));

// --- PREMIUM MODAL COMPONENT ---
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
            <View style={premiumStyles.modalBackdrop}>
                <TouchableOpacity style={premiumStyles.modalCloser} onPress={onClose} />
                <View style={premiumStyles.modalContent}>
                    <View style={premiumStyles.modalHandle} />
                    <Text style={premiumStyles.modalHeading}>Upgrade to Apply More</Text>
                    <Text style={premiumStyles.modalSubHeading}>You've shortlised 5 candidates! Boost your chances now.</Text>

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
                                        premiumStyles.miniPlanCard,
                                        isSelected && premiumStyles.miniPlanCardSelected,
                                        { borderColor: isSelected ? plan.accent : 'transparent' }
                                    ]}
                                >
                                    {/* Simulating Gradient with View since LinearGradient needs linking */}
                                    <View style={[premiumStyles.miniGradient, { backgroundColor: plan.bgColor }]}>
                                        {/* Dynamic Badge Logic */}
                                        {isRecommended ? (
                                            <View style={[premiumStyles.miniBadge, { backgroundColor: '#FF3B30' }]}>
                                                <Text style={premiumStyles.miniBadgeText}>✨ RECOMMENDED</Text>
                                            </View>
                                        ) : plan.defaultBadge ? (
                                            <View style={premiumStyles.miniBadge}>
                                                <Text style={premiumStyles.miniBadgeText}>{plan.defaultBadge}</Text>
                                            </View>
                                        ) : <View style={{ height: 16 }} />}
                                        <Text style={[premiumStyles.miniPlanTitle, { color: plan.accent }]}>{plan.title}</Text>
                                        <Text style={premiumStyles.miniPlanPrice}>₹{plan.price}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>

                    {/* Selected Plan Details */}
                    <View style={premiumStyles.detailsContainer}>
                        <Text style={premiumStyles.sectionLabel}>WHAT'S INCLUDED IN {selectedPlan.title.toUpperCase()}</Text>
                        {selectedPlan.features.slice(0, 4).map((item: string, index: number) => (
                            <View key={index} style={premiumStyles.featureRow}>
                                <MaterialCommunityIcons name="check-circle" size={18} color={selectedPlan.accent} />
                                <Text style={premiumStyles.featureText}>{item}</Text>
                            </View>
                        ))}
                    </View>

                    <TouchableOpacity
                        style={[premiumStyles.modalCta, { backgroundColor: selectedPlan.buttonColor }]}
                        onPress={() => { Alert.alert("Payment", `Processing payment for ${selectedPlan.title}`); onClose(); }}
                    >
                        <Text style={premiumStyles.modalCtaText}>Pay ₹{selectedPlan.price} & Continue</Text>
                        <MaterialCommunityIcons name="arrow-right" size={18} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onClose} style={{ marginTop: 15 }}>
                        <Text style={{ color: '#999', fontSize: 13, textAlign: 'center' }}>No thanks, I'll continue swiping freely</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

// --- EXISTING COMPONENTS ---
interface CandidateProfileModalProps {
    visible: boolean;
    onClose: () => void;
    applicant: ApplicantItem | null;
    onViewResumePress?: (applicant: ApplicantItem) => void;
}
const CandidateProfileModal: React.FC<CandidateProfileModalProps> = memo(({ visible, onClose, applicant, onViewResumePress }) => {
    if (!applicant) return null;
    return (
        <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
            <View style={modalStyles.modalOverlay}>
                <View style={modalStyles.modalContent}>
                    <View style={modalStyles.modalHeader}>
                        <Text style={modalStyles.modalTitle}>Candidate Profile</Text>
                        <TouchableOpacity onPress={onClose} style={modalStyles.closeBtn} activeOpacity={0.7}>
                            <Ionicons name="close" size={20} color={COLORS.textPrimary} />
                        </TouchableOpacity>
                    </View>
                    <View style={modalStyles.modalBody}>
                        <Image source={{ uri: applicant.img }} style={modalStyles.modalImg} />
                        <Text style={modalStyles.modalName}>{applicant.name}</Text>
                        <Text style={modalStyles.modalRole}>{applicant.role}</Text>
                        <View style={modalStyles.modalDivider} />
                        <View style={modalStyles.modalStats}>
                            <View style={modalStyles.modalStatItem}>
                                <Text style={modalStyles.modalStatLabel}>Match</Text>
                                <Text style={[modalStyles.modalStatValue, { color: COLORS.success }]}>{applicant.match}</Text>
                            </View>
                            <View style={modalStyles.modalStatItem}>
                                <Text style={modalStyles.modalStatLabel}>Experience</Text>
                                <Text style={modalStyles.modalStatValue}>{applicant.experience || 'N/A'}</Text>
                            </View>
                            <View style={modalStyles.modalStatItem}>
                                <Text style={modalStyles.modalStatLabel}>Location</Text>
                                <Text style={modalStyles.modalStatValue}>{applicant.location || 'N/A'}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={modalStyles.modalActionBtn} onPress={() => onViewResumePress?.(applicant)} activeOpacity={0.8}>
                            <Text style={modalStyles.modalActionText}>View Full Resume</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
});
const CustomAlertModal: React.FC<CustomAlertModalProps> = memo(({ visible, onClose, title, message, isError }) => (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
        <View style={customAlertModalStyles.modalBackdrop}>
            <TouchableOpacity style={customAlertModalStyles.modalCloser} onPress={onClose} />
            <View style={customAlertModalStyles.modalContent}>
                <View style={customAlertModalStyles.modalHandle} />
                <Text style={customAlertModalStyles.modalHeading}>{title}</Text>
                <Text style={customAlertModalStyles.modalSubHeading}>{message}</Text>
                <TouchableOpacity
                    style={[customAlertModalStyles.modalCta, { backgroundColor: isError ? DANGER_COLOR : COLORS.accent }]}
                    onPress={onClose}
                    activeOpacity={0.8}
                >
                    <Text style={customAlertModalStyles.modalCtaText}>OK</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
));
interface ApplicantSwipeCardProps {
    applicant: ApplicantItem;
    index: number;
    translationX: SharedValue<number>;
    activeIndex: SharedValue<number>;
    onCardPress: (applicant: ApplicantItem) => void;
}
const ApplicantSwipeCard: React.FC<ApplicantSwipeCardProps> = memo(({ applicant, index, translationX, activeIndex, onCardPress }) => {
    const currentIndex = useDerivedValue(() => index - activeIndex.value);
    const rStyle = useAnimatedStyle(() => {
        if (currentIndex.value < -1 || currentIndex.value > VISIBLE_SWIPE_ITEMS) {
            return { display: 'none' };
        }
        const rotate = interpolate(
            translationX.value,
            [-SWIPE_CARD_WIDTH / 2, 0, SWIPE_CARD_WIDTH / 2],
            [-10, 0, 10],
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
        const currentScale = interpolate(
            swipeProgress,
            [0, 1],
            [1 - currentIndex.value * 0.05, 1 - (currentIndex.value - 1) * 0.05],
            Extrapolation.CLAMP
        );
        const currentTranslateY = interpolate(
            swipeProgress,
            [0, 1],
            [currentIndex.value * 15, (currentIndex.value - 1) * 15],
            Extrapolation.CLAMP
        );
        return {
            transform: [{ scale: currentScale }, { translateY: currentTranslateY }],
            zIndex: -index,
        };
    });
    const shortlistOpacity = useAnimatedStyle(() => {
        if (currentIndex.value !== 0) return { opacity: 0 };
        return { opacity: interpolate(translationX.value, [0, SWIPE_CARD_WIDTH / 4], [0, 1]) };
    });
    const rejectOpacity = useAnimatedStyle(() => {
        if (currentIndex.value !== 0) return { opacity: 0 };
        return { opacity: interpolate(translationX.value, [-SWIPE_CARD_WIDTH / 4, 0], [1, 0]) };
    });
    return (
        <Animated.View style={[swipeCardStyles.cardContainer, rStyle]}>
            <Animated.View style={[swipeCardStyles.overlay, swipeCardStyles.overlayShortlist, shortlistOpacity]}>
                <Text style={swipeCardStyles.overlayTextShortlist}>SHORTLIST</Text>
            </Animated.View>
            <Animated.View style={[swipeCardStyles.overlay, swipeCardStyles.overlayReject, rejectOpacity]}>
                <Text style={swipeCardStyles.overlayTextReject}>REJECT</Text>
            </Animated.View>
            <TouchableOpacity style={swipeCardStyles.cardInner} activeOpacity={0.9} onPress={() => onCardPress(applicant)}>
                <View style={swipeCardStyles.applicantImageContainer}>
                    <Image source={{ uri: applicant.img }} style={swipeCardStyles.applicantMainImg} />
                    <View style={swipeCardStyles.matchBadgeOverlay}>
                        <Text style={swipeCardStyles.matchTextOverlay}>{applicant.match}</Text>
                    </View>
                </View>
                <View style={swipeCardStyles.applicantDetails}>
                    <Text style={swipeCardStyles.applicantName}>{applicant.name}</Text>
                    <Text style={swipeCardStyles.applicantRole}>{applicant.role}</Text>
                    <View style={swipeCardStyles.detailsRow}>
                        <Feather name="briefcase" size={16} color={COLORS.textSecondary} />
                        <Text style={swipeCardStyles.detailText}>{applicant.experience || 'N/A'}</Text>
                    </View>
                    <View style={swipeCardStyles.detailsRow}>
                        <Feather name="map-pin" size={16} color={COLORS.textSecondary} />
                        <Text style={swipeCardStyles.detailText}>{applicant.location || 'N/A'}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
});

// --- MAIN DASHBOARD SCREEN ---
export default function EmployerDashboard({ navigation }: any) {
    const [applicantModalVisible, setApplicantModalVisible] = useState(false);
    const [selectedApplicant, setSelectedApplicant] = useState<ApplicantItem | null>(null);
    const [alertModalVisible, setAlertModalVisible] = useState(false);
    const [alertModalTitle, setAlertModalTitle] = useState('');
    const [alertModalMessage, setAlertModalMessage] = useState('');
    const [alertModalIsError, setAlertModalIsError] = useState(false);
    const [currentApplicantIndex, setCurrentApplicantIndex] = useState(0);
    const [shortlistedCount, setShortlistedCount] = useState(0);

    // Premium Modal State
    const [showPremiumModal, setShowPremiumModal] = useState(false);
    const [recommendedPlan, setRecommendedPlan] = useState<typeof PLANS[0] | null>(null);

    const translationX = useSharedValue(0);
    const activeApplicantIndex = useSharedValue(0);

    const showAlert = useCallback((title: string, message: string, isError: boolean = false) => {
        setAlertModalTitle(title);
        setAlertModalMessage(message);
        setAlertModalIsError(isError);
        setAlertModalVisible(true);
    }, []);

    const handleApplicantCardPress = useCallback((applicant: ApplicantItem) => {
        setSelectedApplicant(applicant);
        setApplicantModalVisible(true);
    }, []);

    const handleProfilePress = useCallback(() => {
        showAlert('Profile Access', 'Accessing profile settings. You can update your company details here.');
    }, [showAlert]);

    const handleViewResumePress = useCallback((applicant: ApplicantItem) => {
        console.log("Viewing resume for:", applicant.name);
        showAlert('Resume Viewer', `Viewing resume for: ${applicant.name}. This will open the resume in a new screen.`);
        setApplicantModalVisible(false);
    }, [showAlert]);

    const onSwipeComplete = useCallback((direction: 'left' | 'right') => {
        if (direction === 'right') {
            // Update shortlist count
            setShortlistedCount(prev => {
                const newCount = prev + 1;

                // --- TRIGGER LOGIC: Open modal every 5th shortlist ---
                if (newCount > 0 && newCount % 5 === 0) {
                    const randomIndex = Math.floor(Math.random() * PLANS.length);
                    const randomPlan = PLANS[randomIndex];
                    setRecommendedPlan(randomPlan);

                    // Small delay to allow the swipe animation to finish visually
                    setTimeout(() => {
                        setShowPremiumModal(true);
                    }, 400);
                }

                return newCount;
            });

            const swipedApplicant = RECENT_APPLICANTS[currentApplicantIndex % RECENT_APPLICANTS.length];
            // Don't show alert if modal is about to pop up to avoid UI clutter, or keep it.
            // Keeping it simple here:
            console.log(`Shortlisted ${swipedApplicant.name}`);
        } else {
            const swipedApplicant = RECENT_APPLICANTS[currentApplicantIndex % RECENT_APPLICANTS.length];
            console.log(`Rejected ${swipedApplicant.name}`);
        }

        setCurrentApplicantIndex(prev => prev + 1);
        activeApplicantIndex.value = withTiming(activeApplicantIndex.value + 1, { duration: 0 });
        translationX.value = 0;
    }, [activeApplicantIndex, translationX, currentApplicantIndex, showAlert]);

    const gesture = Gesture.Pan()
        .onUpdate((event) => { translationX.value = event.translationX; })
        .onEnd((event) => {
            if (event.translationX > SWIPE_THRESHOLD) {
                translationX.value = withTiming(width * 1.5, { duration: 250 }, () => runOnJS(onSwipeComplete)('right'));
            } else if (event.translationX < -SWIPE_THRESHOLD) {
                translationX.value = withTiming(-width * 1.5, { duration: 250 }, () => runOnJS(onSwipeComplete)('left'));
            } else {
                translationX.value = withSpring(0, { damping: 15, stiffness: 150 });
            }
        });

    const handleRejectButton = useCallback(() => {
        translationX.value = withTiming(-width * 1.5, { duration: 300 }, () => runOnJS(onSwipeComplete)('left'));
    }, [translationX, onSwipeComplete]);

    const handleShortlistButton = useCallback(() => {
        translationX.value = withTiming(width * 1.5, { duration: 300 }, () => runOnJS(onSwipeComplete)('right'));
    }, [translationX, onSwipeComplete]);

    const handleRewindButton = useCallback(() => {
        if (currentApplicantIndex > 0) {
            setCurrentApplicantIndex(prev => prev - 1);
            activeApplicantIndex.value = withTiming(activeApplicantIndex.value - 1);
            translationX.value = withSpring(0, { damping: 15, stiffness: 150 });
        } else {
            showAlert('Rewind', 'No previous applicants to rewind to.');
        }
    }, [currentApplicantIndex, activeApplicantIndex, translationX, showAlert]);

    const handleSuperShortlistButton = useCallback(() => {
        if (RECENT_APPLICANTS.length === 0) {
            showAlert('Super Shortlist', 'No applicants to super shortlist.', true);
            return;
        }
        const swipedApplicant = RECENT_APPLICANTS[currentApplicantIndex % RECENT_APPLICANTS.length];
        showAlert('Super Shortlisted!', `${swipedApplicant.name} has been super shortlisted for an immediate interview!`, false);
        onSwipeComplete('right');
    }, [currentApplicantIndex, onSwipeComplete, showAlert]);

    const renderApplicantStack = () => {
        if (RECENT_APPLICANTS.length === 0) {
            return (
                <View style={swipeCardStyles.noApplicantsContainer}>
                    <Text style={swipeCardStyles.noApplicantsText}>No new applicants to review!</Text>
                    <TouchableOpacity style={swipeCardStyles.refreshButton} onPress={() => { showAlert('Refresh', 'Refreshing applicant list...'); }}>
                        <Feather name="refresh-cw" size={20} color={COLORS.primary} />
                        <Text style={swipeCardStyles.refreshButtonText}>Refresh</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        const applicantsToRender = [];
        for (let i = 0; i < VISIBLE_SWIPE_ITEMS; i++) {
            const actualIndex = currentApplicantIndex + i;
            const dataIndex = actualIndex % RECENT_APPLICANTS.length;
            applicantsToRender.push(
                <ApplicantSwipeCard
                    key={actualIndex}
                    applicant={RECENT_APPLICANTS[dataIndex]}
                    index={actualIndex}
                    translationX={translationX}
                    activeIndex={activeApplicantIndex}
                    onCardPress={handleApplicantCardPress}
                />
            );
        }
        return applicantsToRender.reverse();
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={styles.safeArea}>
                <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
                <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                    <DashboardHeader
                        userName="Employment Trust"
                        onProfilePress={handleProfilePress}
                    />
                    <View style={swipeCardStyles.swipeStackContainer} pointerEvents="box-none">
                        <GestureDetector gesture={gesture}>
                            <Animated.View style={swipeCardStyles.swipeStackWrapper}>
                                {renderApplicantStack()}
                            </Animated.View>
                        </GestureDetector>
                    </View>
                    <View style={swipeCardStyles.actionRow}>
                        <TouchableOpacity style={[swipeCardStyles.circleBtn, swipeCardStyles.btnSmall]} onPress={handleRewindButton} activeOpacity={0.7}>
                            <Feather name="rotate-ccw" size={24} color={COLORS.warning} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[swipeCardStyles.circleBtn, swipeCardStyles.btnLarge]} onPress={handleRejectButton} activeOpacity={0.7}>
                            <Ionicons name="close" size={32} color={DANGER_COLOR} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[swipeCardStyles.circleBtn, swipeCardStyles.btnLarge]} onPress={handleShortlistButton} activeOpacity={0.7}>
                            <Feather name="check" size={32} color={COLORS.success} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[swipeCardStyles.circleBtn, swipeCardStyles.btnSmall]} onPress={handleSuperShortlistButton} activeOpacity={0.7}>
                            <Ionicons name="star" size={24} color={COLORS.accent} />
                        </TouchableOpacity>
                    </View>

                </ScrollView>
                <CandidateProfileModal
                    visible={applicantModalVisible}
                    onClose={() => setApplicantModalVisible(false)}
                    applicant={selectedApplicant}
                    onViewResumePress={handleViewResumePress}
                />
                <CustomAlertModal
                    visible={alertModalVisible}
                    onClose={() => setAlertModalVisible(false)}
                    title={alertModalTitle}
                    message={alertModalMessage}
                    isError={alertModalIsError}
                />
                {/* PREMIUM MODAL */}
                <PremiumModal
                    visible={showPremiumModal}
                    onClose={() => setShowPremiumModal(false)}
                    recommendedPlan={recommendedPlan}
                />
            </SafeAreaView>
        </GestureHandlerRootView>
    );
}

// --- STYLES ---

const headerStyles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    greeting: {
        fontSize: 14,
        color: COLORS.textSecondary,
        fontFamily: 'System',
    },
    userName: {
        fontSize: 22,
        fontWeight: '700',
        color: COLORS.primary,
        letterSpacing: -0.5,
    },
    profileBtn: {
        position: 'relative',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    profileImg: {
        width: 48,
        height: 48,
        borderRadius: 14,
        borderWidth: 2,
        borderColor: COLORS.surface,
    },
    notifyBadge: {
        position: 'absolute',
        top: -2,
        right: -2,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#EF4444',
        borderWidth: 2,
        borderColor: COLORS.surface,
    },
});

const modalStyles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        minHeight: '45%',
        maxHeight: '90%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#111',
        flex: 1,
        textAlign: 'center',
        marginLeft: 20,
        marginRight: 20,
    },
    closeBtn: {
        padding: 6,
        backgroundColor: '#F1F5F9',
        borderRadius: 20,
    },
    modalBody: {
        alignItems: 'center',
    },
    modalImg: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 12,
    },
    modalName: {
        fontSize: 20,
        fontWeight: '800',
        color: COLORS.textPrimary,
    },
    modalRole: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginBottom: 20,
    },
    modalDivider: {
        width: '100%',
        height: 1,
        backgroundColor: '#F1F5F9',
        marginVertical: 20,
    },
    modalStats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 24,
    },
    modalStatItem: {
        alignItems: 'center',
        flex: 1,
    },
    modalStatLabel: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginBottom: 4,
    },
    modalStatValue: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.textPrimary,
    },
    modalActionBtn: {
        width: '100%',
        backgroundColor: COLORS.primary,
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
    },
    modalActionText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
});

// --- PREMIUM MODAL STYLES ---
const premiumStyles = StyleSheet.create({
    modalBackdrop: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    modalCloser: {
        flex: 1,
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 15,
        paddingBottom: 40,
        paddingHorizontal: 20,
        height: SCREEN_HEIGHT * 0.75, // Takes up 75% of screen
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 20,
    },
    modalHandle: {
        width: 40,
        height: 5,
        backgroundColor: '#D1D1D6',
        borderRadius: 2.5,
        alignSelf: 'center',
        marginBottom: 20,
    },
    modalHeading: {
        fontSize: 24,
        fontWeight: '800',
        textAlign: 'center',
        color: '#1e293b',
        marginBottom: 8,
    },
    modalSubHeading: {
        fontSize: 14,
        color: '#64748b',
        textAlign: 'center',
        marginBottom: 10,
        paddingHorizontal: 20,
    },
    miniPlanCard: {
        width: 140,
        height: 160,
        marginRight: 12,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: 'transparent',
        overflow: 'hidden',
        backgroundColor: '#fff',
    },
    miniPlanCardSelected: {
        // Border color handled in inline style
        transform: [{ scale: 1.02 }],
    },
    miniGradient: {
        flex: 1,
        padding: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    miniBadge: {
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 4,
        backgroundColor: '#F59E0B',
        marginBottom: 5,
    },
    miniBadgeText: {
        fontSize: 9,
        fontWeight: '700',
        color: '#fff',
    },
    miniPlanTitle: {
        fontSize: 14,
        fontWeight: '700',
        textAlign: 'center',
        marginTop: 5,
    },
    miniPlanPrice: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0F172A',
    },
    detailsContainer: {
        backgroundColor: '#F8FAFC',
        padding: 20,
        borderRadius: 16,
        marginBottom: 20,
    },
    sectionLabel: {
        fontSize: 11,
        fontWeight: '700',
        color: '#94A3B8',
        marginBottom: 12,
        letterSpacing: 0.5,
    },
    featureRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    featureText: {
        fontSize: 14,
        color: '#334155',
        marginLeft: 10,
        flex: 1,
    },
    modalCta: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 16,
        width: '100%',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    modalCtaText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
        marginRight: 8,
    },
});

const customAlertModalStyles = StyleSheet.create({
    modalBackdrop: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalCloser: {
        flex: 1,
    },
    modalContent: {
        backgroundColor: COLORS.surface,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 20,
        paddingHorizontal: 20,
        maxHeight: SCREEN_HEIGHT * 0.5,
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
        color: COLORS.textPrimary,
    },
    modalSubHeading: {
        fontSize: 15,
        color: COLORS.textSecondary,
        textAlign: 'center',
        marginBottom: 25,
        paddingHorizontal: 10,
    },
    modalCta: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        borderRadius: 15,
    },
    modalCtaText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
});
const swipeCardStyles = StyleSheet.create({
    swipeStackContainer: {
        height: SWIPE_CARD_HEIGHT + 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    swipeStackWrapper: {
        width: SWIPE_CARD_WIDTH,
        height: SWIPE_CARD_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContainer: {
        position: 'absolute',
        width: SWIPE_CARD_WIDTH,
        height: SWIPE_CARD_HEIGHT,
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        overflow: 'hidden',
    },
    cardInner: {
        flex: 1,
        padding: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    applicantImageContainer: {
        width: '100%',
        height: '60%',
        borderRadius: 15,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginBottom: 10,
        backgroundColor: COLORS.background,
    },
    applicantMainImg: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    matchBadgeOverlay: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 4,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    matchTextOverlay: {
        color: COLORS.primary,
        fontSize: 14,
        fontWeight: '700',
    },
    applicantDetails: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 10,
    },
    applicantName: {
        fontSize: 22,
        fontWeight: '800',
        color: COLORS.textPrimary,
        marginBottom: 4,
    },
    applicantRole: {
        fontSize: 16,
        color: COLORS.textSecondary,
        marginBottom: 10,
    },
    detailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        width: '80%',
        justifyContent: 'center',
    },
    detailText: {
        fontSize: 14,
        color: COLORS.textPrimary,
        marginLeft: 8,
        fontWeight: '500',
    },
    overlay: {
        position: 'absolute',
        top: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 10,
        borderWidth: 2,
        opacity: 0,
        zIndex: 101,
    },
    overlayShortlist: {
        left: 20,
        borderColor: COLORS.success,
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
    },
    overlayTextShortlist: {
        color: COLORS.success,
        fontSize: 18,
        fontWeight: 'bold',
    },
    overlayReject: {
        right: 20,
        borderColor: DANGER_COLOR,
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
    },
    overlayTextReject: {
        color: DANGER_COLOR,
        fontSize: 18,
        fontWeight: 'bold',
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 20,
        marginBottom: 30,
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
    noApplicantsContainer: {
        height: SWIPE_CARD_HEIGHT,
        width: SWIPE_CARD_WIDTH,
        backgroundColor: COLORS.surface,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    noApplicantsText: {
        fontSize: 18,
        color: COLORS.textSecondary,
        marginBottom: 20,
        fontWeight: '600',
        textAlign: 'center',
    },
    refreshButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.background,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    refreshButtonText: {
        marginLeft: 8,
        fontSize: 16,
        color: COLORS.primary,
        fontWeight: '700',
    }
});
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    container: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.textPrimary,
    },
    seeAll: {
        fontSize: 14,
        color: COLORS.accent,
        fontWeight: '600',
    },
});