    import React, { useState } from "react";
    import {
        View,
        Text,
        StyleSheet,
        TouchableOpacity,
        Image,
        ScrollView,
        Dimensions,
    } from "react-native";
    import { SafeAreaView } from "react-native-safe-area-context";
    import Icon from "react-native-vector-icons/MaterialCommunityIcons";
    import LinearGradient from 'react-native-linear-gradient';
    import Svg, { Path } from "react-native-svg";
    import { Modal } from "react-native";

    const { width } = Dimensions.get("window");

    const plans = [
        {
            title: 'Priority Package',
            price: 300,
            gradient: ['#fde0e1ff', '#ffffffff'], // pink Tinder-style gradient
            features: [
                { name: 'Priority over other Job Seekers for Job Interview', free: false, plus: true },
                { name: 'WhatsApp Support for Government Jobs.', free: false, plus: true },
                { name: '100% efforts till providing Jobs.', free: false, plus: true },
            ],

        },
        {
            title: 'Career Counselling',
            price: 600,
            gradient: ['#dce1ebff', '#ffffffff'], // pink Tinder-style gradient
            features: [
                { name: 'Career counselling by job counselor', free: false, plus: true },
                { name: 'Personalize Support.', free: false, plus: true },
                { name: 'One-time Job opportunity.', free: false, plus: true },
            ],

        },
        {
            title: 'AIP Package',
            price: 1000,
            gradient: ['#f8ecb6ff', '#ffffffff'], // pink Tinder-style gradient
            features: [
                { name: 'Job opportunity', free: false, plus: true },
                { name: 'Personalize Support from Counsellor', free: false, plus: true },
                { name: 'Career Counselling with Candidate', free: false, plus: true },
            ],

        },
    ];
    type FeatureType = {
        name: string;
        free: boolean;
        plus: boolean;
    };

    type PlanType = {
        title: string;
        price: number;
        gradient: string[];
        features: FeatureType[];
    };

    const ProfileScreen = () => {
        const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);
        const [showModal, setShowModal] = useState(false);

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
                {/* Header */}
                <View style={styles.header}>
                    <Image
                        source={require("../assets/logo2.png")}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity style={{ marginRight: 10 }}>
                            <Icon name="shield" size={28} color="#555" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon name="cog-outline" size={28} color="#555" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Scroll Content */}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Profile Info */}
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

                    {/* Try Double Date */}
                    <View style={styles.doubleDateBox}>
                        <Icon name="image-filter-center-focus-strong" size={24} color="#E74C3C" />
                        <Text style={styles.doubleDateText}>
                            Try <Text style={{ fontWeight: "600" }}>Fastest Job{"\n"}</Text>
                            Invite your friends and find other parts !!
                        </Text>
                        <Text style={styles.icon}>
                            <Icon name="chevron-right" size={39} color="#000000ff" />

                        </Text>
                    </View>
                    <View style={styles.backg}>
                        <Svg
                            height="80"
                            width="100%"
                            viewBox="0 0 1440 320"
                            style={styles.topWave}
                        >
                            <Path
                                fill="#ffffffff"
                                d="M0,160L60,165.3C120,171,240,181,360,197.3C480,213,600,235,720,229.3C840,224,960,192,1080,170.7C1200,149,1320,139,1380,133.3L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
                            />
                        </Svg>


                        {/* Small Feature Cards */}
                        <View style={styles.cardsRow}>
                            <View style={styles.card}>
                                <Icon name="star-outline" size={32} color="#2D9CDB" />
                                <Text style={styles.cardText}>0 Super Likes</Text>
                            </View>
                            <View style={styles.card}>
                                <Icon name="flash-outline" size={32} color="#9B51E0" />
                                <Text style={styles.cardText}>My Boosts</Text>
                            </View>
                            <View style={styles.card}>
                                <Icon name="fire" size={32} color="#F93E3E" />
                                <Text style={styles.cardText}>Subscriptions</Text>
                            </View>
                        </View>
                        <View style={styles.swipeSection}>
                            <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
                                {plans.map((plan, index) => (
                                    <LinearGradient key={index} colors={plan.gradient} style={styles.planCard}>
                                        {/* Top Title and Upgrade Button */}
                                        <View style={styles.headerRow}>
                                            <Text style={styles.planTitle}>{plan.title}</Text>
                                            <TouchableOpacity
                                                style={styles.upgradeBtn}
                                                onPress={() => {
                                                    setSelectedPlan(plan);
                                                    setShowModal(true);
                                                }}
                                            >
                                                <Text style={styles.upgradeBtnText}>UPGRADE</Text>
                                            </TouchableOpacity>
                                        </View>

                                        <View style={styles.tableHeader}>
                                            {/* What's Included */}
                                            <Text style={styles.subtitle}>What’s Included</Text>

                                            {/* Table Header */}
                                            <View style={styles.featureCol}></View>
                                            <Text style={styles.headerText}>Free</Text>
                                            <Text style={styles.headerText}>Plus</Text>
                                        </View>

                                        {/* Feature Rows */}
                                        {plan.features.map((f, i) => (
                                            <View key={i} style={styles.tableRow}>
                                                <Text style={styles.featureName}>{f.name}</Text>
                                                <Text style={styles.icon}>
                                                    <Icon name="lock" size={20} color="#000000ff" />

                                                </Text>
                                                <Text style={styles.icon}>
                                                    <Icon name="check-bold" size={20} color="#000000ff" />

                                                </Text>
                                            </View>
                                        ))}

                                        {/* See all features */}
                                        <Text style={styles.seeAll}>See all Features</Text>
                                    </LinearGradient>
                                ))}
                            </ScrollView>
                        </View>
                    </View>
                </ScrollView>
                <Modal
                    transparent
                    visible={showModal}
                    animationType="slide"
                >
                    <View style={styles.modalBg}>
                        <View style={styles.modalBox}>
                            <LinearGradient
                                colors={selectedPlan?.gradient || ["#fff", "#fff"]}
                                style={styles.modalHeader}
                            >
                                <Text style={styles.modalTitle}>{selectedPlan?.title}</Text>
                                <Text style={styles.modalPrice}>₹{selectedPlan?.price}</Text>
                            </LinearGradient>

                            <View style={{ padding: 20 }}>
                                {selectedPlan?.features?.map((f, i) => (
                                    <View key={i} style={styles.modalFeatureRow}>
                                        <Icon name="check-circle" size={22} color="#4CAF50" />
                                        <Text style={styles.modalFeatureText}>{f.name}</Text>
                                    </View>
                                ))}

                                <TouchableOpacity style={styles.modalBuyBtn}>
                                    <Text style={styles.modalBuyText}>BUY NOW</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.modalCloseBtn}
                                    onPress={() => setShowModal(false)}
                                >
                                    <Text style={styles.modalCloseText}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

            </SafeAreaView>
        );
    };

    export default ProfileScreen;

    const styles = StyleSheet.create({
        header: {
            height: 55,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 15,
            borderBottomColor: "#eee",
        },

        logo: {
            width: 150,
            height: 80,
        },
        settingsBtn: {
            padding: 5,
        },
        SafeBtn: {
        },
        profileSection: {
            flexDirection: "row",
            alignItems: "center",
            marginTop: 25,
            paddingHorizontal: 20,
        },
        profilePicContainer: {
            position: "relative",
        },
        profilePic: {
            width: 90,
            height: 90,
            borderRadius: 45,
        },
        progressBadge: {
            position: "absolute",
            bottom: 0,
            right: 0,
            backgroundColor: "#F93E3E",
            borderRadius: 15,
            paddingVertical: 3,
            paddingHorizontal: 8,
        },
        progressText: {
            color: "#fff",
            fontSize: 12,
            fontWeight: "bold",
        },
        profileTextBox: {
            marginLeft: 20,
        },
        userName: {
            fontSize: 22,
            fontWeight: "bold",
            color: "#222",
        },
        editProfileBtn: {
            marginTop: 8,
            backgroundColor: "#222",
            borderRadius: 20,
            paddingVertical: 6,
            paddingHorizontal: 15,
        },
        editProfileText: {
            color: "#fff",
            fontSize: 14,
            fontWeight: "600",
        },
        doubleDateBox: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#FFF4F4",
            padding: 15,
            marginHorizontal: 20,
            borderRadius: 10,
            marginTop: 25,
        },
        doubleDateText: {
            fontSize: 16,
            marginLeft: 10,
            width: width - 140,
        },
        cardsRow: {
            flexDirection: "row",
            justifyContent: "space-around",
            paddingVertical: 15,
        },
        backg: {
            marginTop: 20,
            backgroundColor: "#fff0f0ff",
            flex: 1,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            overflow: "hidden",
        },
        topWave: {
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -1, // ensures your content stays on top
        },
        card: {
            alignItems: "center",
            backgroundColor: "#fff",
            padding: 15,
            textAlign: "center",
            alignContent: "center",
            borderRadius: 10,
            width: (width - 60) / 3,
        },
        cardText: {
            fontSize: 10,
            color: "#444",
            marginTop: 8,
        },
        swipeSection: {
            paddingHorizontal: 10,
            height: 300,
            paddingVertical: 5,
        },
        planCard: {
            width: width - 20,

            padding: 25,
            borderRadius: 20,
            justifyContent: "flex-start",
        },
        headerRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },

        planTitle: {
            fontSize: 17,
            fontWeight: "bold",
            color: "#000",
        },
        subtitle: {
            fontSize: 16,
            color: '#000',
            fontWeight: '600',
        },
        tableHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 8,
            paddingHorizontal: 5,
        },
        tableRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 6,
            paddingHorizontal: 5,
        },
        headerText: {
            fontWeight: '600',
            color: '#333',
            width: 50,
            textAlign: 'center',
        },
        featureCol: {
            flex: 1,
        },
        featureName: {
            flex: 1,
            color: '#333',
            fontSize: 11,
        },
        icon: {
            width: 50,
            textAlign: 'center',
            fontSize: 18,
        },
        seeAll: {
            textAlign: 'center',
            marginTop: 10,
            color: '#000',
            fontWeight: '600',
        },
        upgradeBtn: {
            backgroundColor: '#F93E3E',
            paddingVertical: 8,
            paddingHorizontal: 15,
            borderRadius: 25,
        },
        upgradeBtnText: {
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 14,
        },
        planFeature: {
            fontSize: 15,
            color: "#333",
            marginVertical: 2,
        },
        modalBg: {
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
        },

        modalBox: {
            width: width - 40,
            backgroundColor: "#fff",
            borderRadius: 20,
            overflow: "hidden",
        },

        modalHeader: {
            padding: 25,
            alignItems: "center",
        },

        modalTitle: {
            fontSize: 22,
            color: "#fff",
            fontWeight: "bold",
        },

        modalPrice: {
            fontSize: 40,
            color: "#fff",
            fontWeight: "bold",
            marginTop: 10,
        },

        modalFeatureRow: {
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 8,
        },

        modalFeatureText: {
            marginLeft: 10,
            fontSize: 16,
            color: "#444",
        },

        modalBuyBtn: {
            backgroundColor: "#0066FF",
            paddingVertical: 12,
            borderRadius: 30,
            alignItems: "center",
            marginTop: 25,
        },

        modalBuyText: {
            color: "#fff",
            fontSize: 18,
            fontWeight: "bold",
        },

        modalCloseBtn: {
            marginTop: 15,
            alignItems: "center",
        },

        modalCloseText: {
            color: "#333",
            fontSize: 16,
        },

    });
