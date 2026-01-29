import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    Dimensions,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

interface PlanData {
    id: string;
    title: string;
    subtitle: string;
    price: number;
    gradient: string[];
    accent: string;
    buttonColor: string;
    defaultBadge: string | null;
    features: string[];
    disclaimer: string;
}

const PLANS: PlanData[] = [
    {
        id: 'priority',
        title: 'Priority',
        subtitle: 'Get noticed faster',
        price: 399,
        gradient: ['#F0FDF4', '#DCFCE7'],
        accent: '#166534',
        buttonColor: '#22c55e',
        defaultBadge: null,
        features: [
            'Priority Interview Scheduling',
            'Personalized Job Counselling',
            'Guaranteed Job Guidance',
            'Free Legal Support',
            'Whatsapp Support'
        ],
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
        features: [
            '1-on-1 Career Counselling',
            'Specialized Field Guidance',
            'Dedicated Counsellor Support',
            'Hand-holding till Placement',
            'Profile Optimization'
        ],
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
        features: [
            'All Priority & Career Features',
            'Premium Legal Support',
            'Top Priority over others',
            'Exclusive Govt Job Alerts',
            'Instant Interview Info'
        ],
        disclaimer: "Comprehensive support package."
    },
];

export default function UpgradePlanScreen() {
    const navigation = useNavigation();

    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [currentPlanId, setCurrentPlanId] = useState<string>('free');

    const handlePurchase = (plan: PlanData) => {
        setLoadingId(plan.id);

        setTimeout(() => {
            setLoadingId(null);
            Alert.alert(
                "Purchase Successful",
                `You have upgraded to the ${plan.title} plan!`,
                [
                    {
                        text: "Awesome",
                        onPress: () => {
                            setCurrentPlanId(plan.id);
                            navigation.goBack();
                        }
                    }
                ]
            );
        }, 2000);
    };

    const renderPlanCard = (item: PlanData) => {
        const isCurrent = currentPlanId === item.id;
        const isLoading = loadingId === item.id;

        const backgroundColor = item.gradient[1];
        const borderColor = item.accent;

        return (
            <View
                key={item.id}
                style={[
                    styles.cardContainer,
                    { backgroundColor, borderColor: borderColor, borderBottomWidth: 4 }
                ]}
            >
                {item.defaultBadge && (
                    <View style={[styles.badgeContainer, { backgroundColor: item.buttonColor }]}>
                        <Text style={styles.badgeText}>{item.defaultBadge}</Text>
                    </View>
                )}

                <View style={styles.cardHeader}>
                    <View>
                        <Text style={[styles.planTitle, { color: item.accent }]}>{item.title}</Text>
                        <Text style={styles.planSubtitle}>{item.subtitle}</Text>
                    </View>
                    <View style={styles.priceBlock}>
                        <Text style={[styles.currency, { color: item.accent }]}>₹</Text>
                        <Text style={[styles.price, { color: item.accent }]}>{item.price}</Text>
                    </View>
                </View>

                <View style={[styles.divider, { backgroundColor: item.accent, opacity: 0.1 }]} />

                <View style={styles.featuresList}>
                    {item.features.map((feature, index) => (
                        <View key={index} style={styles.featureRow}>
                            <MaterialCommunityIcons
                                name="check-decagram"
                                size={18}
                                color={item.accent}
                                style={{ marginTop: 2 }}
                            />
                            <Text style={styles.featureText}>{feature}</Text>
                        </View>
                    ))}
                </View>

                <View style={[styles.disclaimerBox, { backgroundColor: 'rgba(255,255,255,0.5)' }]}>
                    <Text style={[styles.disclaimerText, { color: item.accent }]}>
                        * {item.disclaimer}
                    </Text>
                </View>

                <TouchableOpacity
                    activeOpacity={0.8}
                    disabled={isCurrent || isLoading}
                    onPress={() => handlePurchase(item)}
                    style={[
                        styles.actionButton,
                        { backgroundColor: isCurrent ? '#fff' : item.buttonColor }
                    ]}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={[
                            styles.actionButtonText,
                            { color: isCurrent ? '#999' : '#fff' }
                        ]}>
                            {isCurrent ? 'Current Plan' : 'Get Started'}
                        </Text>
                    )}
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.navHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.navTitle}>Choose Your Plan</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.heroSection}>
                    <Text style={styles.heroTitle}>Accelerate Your Career</Text>
                    <Text style={styles.heroSubtitle}>
                        Select a premium package to unlock exclusive features and get hired faster.
                    </Text>
                </View>

                <View style={styles.listContainer}>
                    {PLANS.map(renderPlanCard)}
                </View>

                <Text style={styles.footerText}>
                    Secure payment powered by Razorpay/Stripe. {'\n'}
                    Need help? Contact support@jobapp.com
                </Text>
                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    navHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#fff',
    },
    backButton: {
        padding: 5,
    },
    navTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111',
    },
    scrollContainer: {
        paddingBottom: 40,
    },
    heroSection: {
        padding: 24,
        alignItems: 'center',
    },
    heroTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: '#1F2937',
        textAlign: 'center',
        marginBottom: 8,
    },
    heroSubtitle: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: 20,
        maxWidth: '90%',
    },
    listContainer: {
        paddingHorizontal: 20,
    },
    cardContainer: {
        borderRadius: 20,
        padding: 20,
        marginBottom: 24,
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
        position: 'relative',
    },
    badgeContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        borderTopRightRadius: 18,
        borderBottomLeftRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    badgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    planTitle: {
        fontSize: 20,
        fontWeight: '800',
        marginBottom: 4,
    },
    planSubtitle: {
        fontSize: 13,
        color: '#555',
        fontWeight: '500',
    },
    priceBlock: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    currency: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 4,
        marginRight: 2,
    },
    price: {
        fontSize: 32,
        fontWeight: '800',
    },
    divider: {
        height: 1,
        width: '100%',
        marginBottom: 16,
    },
    featuresList: {
        marginBottom: 16,
    },
    featureRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    featureText: {
        fontSize: 14,
        color: '#374151',
        marginLeft: 10,
        flex: 1,
        lineHeight: 20,
    },
    disclaimerBox: {
        padding: 10,
        borderRadius: 8,
        marginBottom: 20,
    },
    disclaimerText: {
        fontSize: 11,
        fontStyle: 'italic',
        textAlign: 'center',
    },
    actionButton: {
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    actionButtonText: {
        fontSize: 16,
        fontWeight: '700',
    },
    footerText: {
        textAlign: 'center',
        color: '#9CA3AF',
        fontSize: 12,
        lineHeight: 18,
        marginTop: 10,
    }
});