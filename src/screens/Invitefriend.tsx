import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const InviteFriend = () => {
    return (
        <SafeAreaView style={styles.container}>
            {/* Gradient Background */}
            <LinearGradient
                colors={['#F94144', '#FF595E', '#EF476F', '#A53860', '#000']}
                locations={[0, 0.25, 0.5, 0.75, 1]}
                style={StyleSheet.absoluteFillObject}
            />

            {/* Top Section */}
            <View style={styles.topContainer}>
                {/* Card Stack Mockup */}
                <View style={styles.cardStack}>
                    <Image
                        source={{ uri: 'https://i.imgur.com/2nCt3Sbl.png' }}
                        style={[styles.card, { left: -60 }]}
                    />
                    <Image
                        source={{ uri: 'https://i.imgur.com/HnY0gUhb.png' }}
                        style={[styles.card, { zIndex: 2 }]}
                    />

                    {/* White card with two person images */}
                    <View style={[styles.card, styles.emptyCard]}>
                        <View style={styles.doubleImageContainer}>
                            <Image
                                source={{ uri: 'https://i.imgur.com/5EOyTDQ.png' }}
                                style={styles.smallPerson}
                            />
                            <Image
                                source={{ uri: 'https://i.imgur.com/0y8Ftya.png' }}
                                style={styles.smallPerson}
                            />
                        </View>
                    </View>

                    <Image
                        source={{ uri: 'https://i.imgur.com/w1XJ0Qgb.png' }}
                        style={[styles.card, { right: -60 }]}
                    />
                </View>

                {/* Buttons below cards */}
                <View style={styles.actionButtons}>
                    <View style={styles.circleButton}>
                        <Text style={styles.cross}>✕</Text>
                    </View>
                    <View style={[styles.circleButton, { backgroundColor: '#4ADE80' }]}>
                        <Text style={styles.heart}>❤</Text>
                    </View>
                </View>
            </View>

            {/* Text Section */}
            <View style={styles.textContainer}>
                <Text style={styles.title}>You’re in — try Double Date!</Text>
                <Text style={styles.description}>
                    Friends make everything better, even dates! Pair up with yours to ease first-date stress.
                </Text>
            </View>

            {/* Buttons */}
            <View style={styles.bottomButtons}>
                <TouchableOpacity style={styles.primaryButton}>
                    <Text style={styles.primaryButtonText}>Invite friends</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.secondaryButtonText}>Maybe later</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default InviteFriend;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 40,
    },
    topContainer: {
        alignItems: 'center',
    },
    cardStack: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    card: {
        width: 100,
        height: 140,
        borderRadius: 10,
        backgroundColor: '#222',
        marginHorizontal: 5,
        transform: [{ rotateX: '41deg' }, { rotateZ: '0.1rad' }],

    },
    emptyCard: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    doubleImageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    smallPerson: {
        width: 45,
        height: 125,
        borderRadius: 8,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    circleButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    cross: {
        color: '#ff3b30',
        fontSize: 28,
        fontWeight: 'bold',
    },
    heart: {
        color: '#fff',
        fontSize: 22,
    },
    textContainer: {
        paddingHorizontal: 30,
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 10,
    },
    description: {
        fontSize: 15,
        color: '#eee',
        textAlign: 'center',
        lineHeight: 22,
    },
    bottomButtons: {
        alignItems: 'center',
    },
    primaryButton: {
        backgroundColor: '#fff',
        paddingVertical: 14,
        paddingHorizontal: 60,
        borderRadius: 30,
        marginBottom: 12,
    },
    primaryButtonText: {
        color: '#000',
        fontWeight: '600',
        fontSize: 16,
    },
    secondaryButtonText: {
        color: '#ddd',
        fontSize: 15,
    },
});
