// src/screens/Employee/Dashboard.tsx

import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView, GestureDetector, Gesture, PureNativeButton } from 'react-native-gesture-handler';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    interpolate,
    runOnJS,
    withTiming,
    Extrapolation
} from 'react-native-reanimated';
import { kebabizeCamelCase } from 'react-native-reanimated/lib/typescript/common';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;
interface Job {
    id: number;
    title: string;
    company: string;
    location: string;
    exp: string;
    color: string;
}

interface CardProps {
    item: Job;
    index: number;
    totalCards: number;
    onSwipeLeft: (id: number) => void;
    onSwipeRight: (id: number) => void;
}

const JOBS_DATA: Job[] = [
    { id: 1, title: 'Operation Executive', company: 'Nanuans Automobile', location: 'Mohali', exp: '0-1 year', color: '#e3f2fd' },
    { id: 2, title: 'Drivers - Positions (20)', company: 'Logistics Co', location: 'Delhi', exp: '1-2 year', color: '#e8f5e9' },
    { id: 3, title: 'Restaurant Manager', company: 'Florence Oriental', location: 'Mohali', exp: '2-3 year', color: '#fff3e0' },
    { id: 4, title: 'Steward', company: 'Florence Oriental', location: 'Mohali', exp: '0-1 year', color: '#f3e5f5' },
];


const Card: React.FC<CardProps> = ({
    item,
    index,
    onSwipeLeft,
    onSwipeRight,
    totalCards,
}) => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const scale = useSharedValue(1);

    // 1. Handle the Swipe Gesture
    const gesture = Gesture.Pan()
        .onBegin(() => {
            scale.value = withTiming(1.05); // Slight pop effect
        })
        .onUpdate((event) => {
            translateX.value = event.translationX;
            translateY.value = event.translationY;
        })
        .onEnd(() => {
            // Swipe Right (Apply)
            if (translateX.value > SWIPE_THRESHOLD) {
                translateX.value = withTiming(SCREEN_WIDTH + 100, {}, () => {
                    runOnJS(onSwipeRight)(item.id);
                });
            }
            // Swipe Left (Trash)
            else if (translateX.value < -SWIPE_THRESHOLD) {
                translateX.value = withTiming(-SCREEN_WIDTH - 100, {}, () => {
                    runOnJS(onSwipeLeft)(item.id);
                });
            }
            // Return to center
            else {
                translateX.value = withSpring(0);
                translateY.value = withSpring(0);
                scale.value = withSpring(1);
            }
        });

    // 2. Animations for the Card (Movement & Rotation)
    const rStyle = useAnimatedStyle(() => {
        const rotate = interpolate(
            translateX.value,
            [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
            [-10, 0, 10], // Rotate -10deg to 10deg
            Extrapolation.CLAMP
        );

        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value },
                { rotate: `${rotate}deg` },
                { scale: scale.value }
            ],
        };
    });

    // 3. Animations for the "Like/Apply" Text overlay
    const likeOpacityStyle = useAnimatedStyle(() => {
        const opacity = interpolate(translateX.value, [0, SCREEN_WIDTH / 4], [0, 1]);
        return { opacity };
    });

    // 4. Animations for the "Trash" Text overlay
    const nopeOpacityStyle = useAnimatedStyle(() => {
        const opacity = interpolate(translateX.value, [-SCREEN_WIDTH / 4, 0], [1, 0]);
        return { opacity };
    });

    return (
        <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.cardContainer, rStyle, { zIndex: totalCards - index }]}>
                {/* The Card Content */}
                <View style={styles.cardInner}>

                    {/* OVERLAY: APPLY */}
                    <Animated.View style={[styles.overlay, styles.overlayLike, likeOpacityStyle]}>
                        <Text style={styles.overlayTextLike}>APPLY</Text>
                    </Animated.View>

                    {/* OVERLAY: TRASH */}
                    <Animated.View style={[styles.overlay, styles.overlayNope, nopeOpacityStyle]}>
                        <Text style={styles.overlayTextNope}>TRASH</Text>
                    </Animated.View>

                    {/* Job Content similar to your image */}
                    <View style={styles.row}>
                        <View style={styles.logoBox}>
                            <Text style={styles.logoText}>LOGO</Text>
                        </View>
                        <View style={styles.contentBox}>
                            <Text style={styles.jobTitle}>{item.title}</Text>
                            <Text style={styles.companyName}>{item.company}</Text>
                            <Text style={styles.details}>{item.location}</Text>
                            <Text style={styles.details}>{item.exp}</Text>
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        <Text style={styles.applyBtnText}>Swipe Right to Apply</Text>
                    </View>
                </View>
            </Animated.View>
        </GestureDetector>
    );
};
export default function Dashboard() {


    
    const [jobs, setJobs] = useState<Job[]>(JOBS_DATA);

    const handleSwipeLeft = useCallback((id: number) => {
        setJobs((prev) => prev.filter((job) => job.id !== id));
    }, []);

    const handleSwipeRight = useCallback((id: number) => {
        setJobs((prev) => prev.filter((job) => job.id !== id));
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Find Jobs You Love</Text>
            </View>

            <View style={styles.cardStack}>
                {jobs.length > 0 ? (
                    jobs.map((item, index) => (
                        // Rendering in reverse so the first item in array is on top of the stack visually
                        <Card
                            key={item.id}
                            item={item}
                            index={index}
                            totalCards={jobs.length}
                            onSwipeLeft={handleSwipeLeft}
                            onSwipeRight={handleSwipeRight}
                        />
                    )).reverse()
                ) : (
                    <View style={styles.noJobs}>
                        <Text>No more jobs!</Text>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        marginTop: 60,
        marginBottom: 20,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    cardStack: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardContainer: {
        position: 'absolute', // Stack them on top of each other
        width: SCREEN_WIDTH * 0.9,
        height: 250,
    },
    cardInner: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5, // Android Shadow
        borderWidth: 1,
        borderColor: '#eee'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoBox: {
        width: 60,
        height: 60,
        backgroundColor: '#eee',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    logoText: {
        fontSize: 10,
        color: '#888',
    },
    contentBox: {
        flex: 1,
    },
    jobTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 4,
    },
    companyName: {
        fontSize: 14,
        color: '#2196F3',
        marginBottom: 2,
        fontWeight: '600',
    },
    details: {
        fontSize: 12,
        color: '#666',
    },
    buttonContainer: {
        backgroundColor: '#3b6ebb',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    applyBtnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    noJobs: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    // OVERLAY STYLES
    overlay: {
        position: 'absolute',
        top: 20,
        zIndex: 100,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 4,
        borderRadius: 10,
        transform: [{ rotate: '-15deg' }]
    },
    overlayLike: {
        left: 20,
        borderColor: '#4caf50', // Green
    },
    overlayNope: {
        right: 20,
        borderColor: '#f44336', // Red
        transform: [{ rotate: '15deg' }]
    },
    overlayTextLike: {
        color: '#4caf50',
        fontSize: 32,
        fontWeight: 'bold',
    },
    overlayTextNope: {
        color: '#f44336',
        fontSize: 32,
        fontWeight: 'bold',
    },
});