// src/screens/Employee/Dashboard.tsx

import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, Dimensions, StatusBar, Alert } from 'react-native'; // Removed TouchableOpacity from here
// 1. IMPORT TOUCHABLE FROM GESTURE HANDLER
import { GestureDetector, Gesture, GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    interpolate,
    runOnJS,
    withTiming,
    Extrapolation,
    useDerivedValue,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// --- CONSTANTS ---
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const HEADER_HEIGHT = 80;
const FOOTER_HEIGHT = 100; // Slightly reduced for better fit

// 2. DYNAMIC CARD HEIGHT CALCULATION
// This ensures cards fill the space but NEVER go behind the buttons
const AVAILABLE_HEIGHT = SCREEN_HEIGHT - HEADER_HEIGHT - FOOTER_HEIGHT - 60; // 60 is buffer/padding
const CARD_HEIGHT = Math.min(AVAILABLE_HEIGHT, SCREEN_HEIGHT * 0.65);
const CARD_WIDTH = SCREEN_WIDTH * 0.9;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;
const VISIBLE_ITEMS = 3;

// --- DATA TYPES ---
interface Job {
    id: number;
    title: string;
    company: string;
    location: string;
    salary: string;
    tags: string[];
    logoColor: string;
    logoInitial: string;
}

const JOBS_DATA: Job[] = [
    { id: 1, title: 'Frontend Developer', company: 'Infosys', location: 'Mohali, India', salary: '₹6L - ₹12L', tags: ['Full-Time', 'On-site'], logoColor: '#0072C6', logoInitial: 'I' },
    { id: 2, title: 'Backend Developer', company: 'Tech Mahindra', location: 'Chandigarh, India', salary: '₹7L - ₹14L', tags: ['Hybrid', 'Mid-Level'], logoColor: '#E60028', logoInitial: 'T' },
    { id: 3, title: 'Full Stack Engineer', company: 'TCS', location: 'Panchkula, India', salary: '₹8L - ₹15L', tags: ['Full-Time', 'Remote'], logoColor: '#00A1E0', logoInitial: 'T' },
    { id: 4, title: 'UI/UX Designer', company: 'Wipro', location: 'Mohali, India', salary: '₹5L - ₹10L', tags: ['On-site', 'Mid-Level'], logoColor: '#2CA02C', logoInitial: 'W' },
    { id: 5, title: 'Mobile App Developer', company: 'Cognizant', location: 'Chandigarh, India', salary: '₹6L - ₹11L', tags: ['Full-Time', 'Hybrid'], logoColor: '#1C75BC', logoInitial: 'C' },
    { id: 6, title: 'Data Scientist', company: 'Infosys', location: 'Mohali, India', salary: '₹10L - ₹18L', tags: ['Remote', 'Senior'], logoColor: '#0072C6', logoInitial: 'I' },
    { id: 7, title: 'Cloud Engineer', company: 'Capgemini', location: 'Panchkula, India', salary: '₹9L - ₹16L', tags: ['Full-Time', 'Hybrid'], logoColor: '#003399', logoInitial: 'C' },
    { id: 8, title: 'DevOps Engineer', company: 'HCL Technologies', location: 'Chandigarh, India', salary: '₹8L - ₹15L', tags: ['On-site', 'Mid-Level'], logoColor: '#FF6600', logoInitial: 'H' },
    { id: 9, title: 'AI/ML Engineer', company: 'Infosys', location: 'Mohali, India', salary: '₹12L - ₹20L', tags: ['Remote', 'Senior'], logoColor: '#0072C6', logoInitial: 'I' },
    { id: 10, title: 'QA Engineer', company: 'Tech Mahindra', location: 'Chandigarh, India', salary: '₹5L - ₹9L', tags: ['Full-Time', 'On-site'], logoColor: '#E60028', logoInitial: 'T' },
    { id: 11, title: 'Project Manager', company: 'TCS', location: 'Panchkula, India', salary: '₹15L - ₹25L', tags: ['Full-Time', 'Senior'], logoColor: '#00A1E0', logoInitial: 'T' },
    { id: 12, title: 'Product Manager', company: 'Wipro', location: 'Mohali, India', salary: '₹14L - ₹22L', tags: ['Hybrid', 'Senior'], logoColor: '#2CA02C', logoInitial: 'W' },
    { id: 13, title: 'UI Developer', company: 'Cognizant', location: 'Chandigarh, India', salary: '₹6L - ₹11L', tags: ['Full-Time', 'On-site'], logoColor: '#1C75BC', logoInitial: 'C' },
    { id: 14, title: 'Business Analyst', company: 'Infosys', location: 'Mohali, India', salary: '₹7L - ₹13L', tags: ['Full-Time', 'Mid-Level'], logoColor: '#0072C6', logoInitial: 'I' },
    { id: 15, title: 'Software Architect', company: 'HCL Technologies', location: 'Chandigarh, India', salary: '₹18L - ₹30L', tags: ['Full-Time', 'Senior'], logoColor: '#FF6600', logoInitial: 'H' },
    { id: 16, title: 'Frontend React Developer', company: 'Tech Mahindra', location: 'Panchkula, India', salary: '₹8L - ₹14L', tags: ['Hybrid', 'Mid-Level'], logoColor: '#E60028', logoInitial: 'T' },
    { id: 17, title: 'Backend Node.js Developer', company: 'TCS', location: 'Mohali, India', salary: '₹9L - ₹16L', tags: ['Remote', 'Mid-Level'], logoColor: '#00A1E0', logoInitial: 'T' },
    { id: 18, title: 'UI/UX Lead', company: 'Wipro', location: 'Chandigarh, India', salary: '₹12L - ₹20L', tags: ['On-site', 'Senior'], logoColor: '#2CA02C', logoInitial: 'W' },
    { id: 19, title: 'Mobile iOS Developer', company: 'Cognizant', location: 'Panchkula, India', salary: '₹7L - ₹12L', tags: ['Full-Time', 'On-site'], logoColor: '#1C75BC', logoInitial: 'C' },
    { id: 20, title: 'Machine Learning Engineer', company: 'Infosys', location: 'Mohali, India', salary: '₹12L - ₹22L', tags: ['Remote', 'Mid-Level'], logoColor: '#0072C6', logoInitial: 'I' },
    { id: 21, title: 'DevOps Lead', company: 'HCL Technologies', location: 'Chandigarh, India', salary: '₹14L - ₹24L', tags: ['Full-Time', 'Senior'], logoColor: '#FF6600', logoInitial: 'H' },
    { id: 22, title: 'Cloud Solutions Architect', company: 'Capgemini', location: 'Panchkula, India', salary: '₹18L - ₹28L', tags: ['Remote', 'Senior'], logoColor: '#003399', logoInitial: 'C' },
];

// --- COMPONENTS ---

const Tag = ({ text }: { text: string }) => (
    <View style={styles.tag}>
        <Text style={styles.tagText}>{text}</Text>
    </View>
);

interface CardProps {
    item: Job;
    index: number;
    translationX: Animated.SharedValue<number>;
    activeIndex: Animated.SharedValue<number>;
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
                opacity: 1,
            };
        }

        const swipeProgress = interpolate(Math.abs(translationX.value), [0, SWIPE_THRESHOLD], [0, 1], Extrapolation.CLAMP);
        const currentScale = interpolate(swipeProgress, [0, 1], [1 - currentIndex.value * 0.05, 1 - (currentIndex.value - 1) * 0.05]);
        const currentTranslateY = interpolate(swipeProgress, [0, 1], [currentIndex.value * 15, (currentIndex.value - 1) * 15]);

        return {
            transform: [{ scale: currentScale }, { translateY: currentTranslateY }],
            zIndex: -index,
            opacity: 1,
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
                        We are looking for a passionate {item.title} to join our team.
                    </Text>
                </View>
                <View style={styles.cardFooter}>
                    <View style={styles.tagContainer}>
                        {item.tags.map((tag, i) => <Tag key={i} text={tag} />)}
                    </View>
                    <Text style={styles.timestamp}>Posted 2d ago</Text>
                </View>
            </View>
        </Animated.View>
    );
};

// --- MAIN SCREEN ---

export default function JobSeekerDashboard() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const translationX = useSharedValue(0);
    const activeIndex = useSharedValue(0);

    const onSwipeComplete = useCallback((direction: 'left' | 'right') => {
        console.log(`Action: ${direction}`);
        setCurrentIndex(prev => prev + 1);
        activeIndex.value = withTiming(activeIndex.value + 1, { duration: 0 });
        translationX.value = 0;
    }, [activeIndex, translationX]);

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
        } else {
            Alert.alert("No more history");
        }
    };

    const isFinished = currentIndex >= JOBS_DATA.length;

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" />

                <View style={styles.header}>
                    <View>
                        <Text style={styles.subHeading}>Welcome back,</Text>
                        <Text style={styles.heading}>Discover Jobs</Text>
                    </View>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>JD</Text>
                    </View>
                </View>

                {/* 3. POINTER EVENTS: Allow touches to pass through empty space */}
                <View style={styles.stackContainer} pointerEvents="box-none">
                    {!isFinished ? (
                        <GestureDetector gesture={gesture}>
                            <Animated.View style={styles.stackWrapper}>
                                {JOBS_DATA.map((item, index) => (
                                    <Card
                                        key={item.id}
                                        item={item}
                                        index={index}
                                        translationX={translationX}
                                        activeIndex={activeIndex}
                                    />
                                ))}
                            </Animated.View>
                        </GestureDetector>
                    ) : (
                        <View style={styles.emptyState}>
                            <Icon name="check-circle-outline" size={80} color="#2CB978" />
                            <Text style={styles.emptyText}>All Caught Up!</Text>
                            <TouchableOpacity onPress={() => { setCurrentIndex(0); activeIndex.value = 0; }} style={styles.reloadBtn}>
                                <Text style={styles.reloadText}>Start Over</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                {!isFinished && (
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
                )}
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
        position: 'absolute',
        top: 0, left: 0, right: 0,
        backgroundColor: '#F7F8FA',
        paddingTop: StatusBar.currentHeight || 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 10,
        zIndex: 20, // Increased zIndex
    },
    subHeading: { fontSize: 14, color: '#8E8E93', fontWeight: '600' },
    heading: { fontSize: 26, fontWeight: '800', color: '#1C1C1E' },
    avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#E1E4E8', justifyContent: 'center', alignItems: 'center' },
    avatarText: { fontWeight: 'bold', color: '#555' },

    stackContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: HEADER_HEIGHT,
        paddingBottom: FOOTER_HEIGHT,
        zIndex: 1,
    },
    stackWrapper: {
        width: SCREEN_WIDTH,
        height: CARD_HEIGHT, // Constrain wrapper height to card height
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardContainer: {
        position: 'absolute',
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
    },
    cardInner: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 24,
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#F2F2F7',
    },
    // ... Card internals (Header, Body, Footer) same as before ...
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

    // Overlays
    overlay: { position: 'absolute', top: 40, zIndex: 999, paddingHorizontal: 20, paddingVertical: 5, borderWidth: 4, borderRadius: 12 },
    overlayLike: { left: 40, borderColor: '#4CD964', transform: [{ rotate: '-20deg' }] },
    overlayNope: { right: 40, borderColor: '#FF3B30', transform: [{ rotate: '20deg' }] },
    overlayTextLike: { color: '#4CD964', fontSize: 32, fontWeight: '900' },
    overlayTextNope: { color: '#FF3B30', fontSize: 32, fontWeight: '900' },

    footerContainer: {
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: FOOTER_HEIGHT + 20, // Give it explicit height
        backgroundColor: '#F7F8FA',
        justifyContent: 'center',
        paddingHorizontal: 30,
        paddingBottom: 20,
        zIndex: 20, // Ensure high zIndex
    },
    actionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    circleBtn: {
        backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderRadius: 50,
        shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4,
    },
    btnSmall: { width: 50, height: 50 },
    btnLarge: { width: 70, height: 70 },

    emptyState: { alignItems: 'center', justifyContent: 'center', padding: 20 },
    emptyText: { fontSize: 22, fontWeight: '800', color: '#333', marginTop: 20 },
    reloadBtn: { backgroundColor: '#000', paddingHorizontal: 24, paddingVertical: 14, borderRadius: 30, marginTop: 20 },
    reloadText: { color: 'white', fontWeight: '700', fontSize: 16 }
});