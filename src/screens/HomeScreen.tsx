import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Animated } from 'react-native';
import Swiper from 'react-native-deck-swiper';

const { width, height } = Dimensions.get('window');
  
const profiles = [
  { id: 1, name: 'John Doe', profession: 'Software Engineer', image: 'https://randomuser.me/api/portraits/men/11.jpg' },
  { id: 2, name: 'Jane Smith', profession: 'UI/UX Designer', image: 'https://randomuser.me/api/portraits/women/21.jpg' },
  { id: 3, name: 'Michael Johnson', profession: 'Product Manager', image: 'https://randomuser.me/api/portraits/men/31.jpg' },
  { id: 4, name: 'Emily Clark', profession: 'QA Tester', image: 'https://randomuser.me/api/portraits/women/41.jpg' },
  { id: 5, name: 'David Lee', profession: 'DevOps Engineer', image: 'https://randomuser.me/api/portraits/men/51.jpg' },
  { id: 6, name: 'Sophia Brown', profession: 'Data Analyst', image: 'https://randomuser.me/api/portraits/women/61.jpg' },
  { id: 7, name: 'Chris Wilson', profession: 'Mobile Developer', image: 'https://randomuser.me/api/portraits/men/71.jpg' },
  { id: 8, name: 'Olivia Taylor', profession: 'Frontend Developer', image: 'https://randomuser.me/api/portraits/women/81.jpg' },
  { id: 9, name: 'Daniel Martinez', profession: 'Backend Developer', image: 'https://randomuser.me/api/portraits/men/91.jpg' },
];

const HomeScreen: React.FC = () => {
  const swiperRef = useRef<Swiper<any>>(null);
  const [swipedAll, setSwipedAll] = useState(false);

  // Animations
  const shake = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(1)).current;

  const triggerShake = () => {
    shake.setValue(0);
    Animated.sequence([
      Animated.timing(shake, { toValue: 1, duration: 70, useNativeDriver: true }),
      Animated.timing(shake, { toValue: -1, duration: 70, useNativeDriver: true }),
      Animated.timing(shake, { toValue: 0, duration: 70, useNativeDriver: true }),
    ]).start();
  };

  const triggerPulse = () => {
    pulse.setValue(1);
    Animated.sequence([
      Animated.timing(pulse, { toValue: 1.2, duration: 120, useNativeDriver: true }),
      Animated.timing(pulse, { toValue: 1, duration: 120, useNativeDriver: true }),
    ]).start();
  };

  const shakeAnimStyle = {
    transform: [{
      translateX: shake.interpolate({ inputRange: [-1, 1], outputRange: [-10, 10] })
    }]
  };

  const pulseAnimStyle = {
    transform: [{ scale: pulse }]
  };

  const renderCard = (profile: any) => (
    <View style={styles.card}>
      <Image source={{ uri: profile.image }} style={styles.cardImage} />

      {/* DARKEN OVERLAY */}
      <View style={styles.swipeOverlay} />

      <View style={styles.cardOverlay}>
        <Text style={styles.name}>{profile.name}, {profile.age}</Text>
        <Text style={styles.bio}>{profile.bio}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {swipedAll ? (
        <Text style={styles.noMoreCards}>No more profiles! Check back later.</Text>
      ) : (
        <Swiper
          ref={swiperRef}
          cards={profiles}
          renderCard={renderCard}
          onSwipedAll={() => setSwipedAll(true)}
          stackSize={5}
          stackSeparation={20}
          cardVerticalMargin={20} // vertical margin so cards peek from bottom

          animateOverlayLabelsOpacity
          animateCardOpacity
          swipeBackCard
          verticalSwipe={true}
          disableBottomSwipe={true}

          onSwipedLeft={triggerShake}
          onSwipedRight={triggerPulse}
          onSwipedTop={() => console.log("SUPERLIKE!")}

          overlayLabels={{
            left: {
              element: (
                <Animated.View style={[styles.leftOverlay, shakeAnimStyle]}>
                  <Text style={styles.leftOverlayText}>❌ LOSE</Text>
                </Animated.View>
              ),
              style: { wrapper: styles.leftOverlayWrapper }
            },
            right: {
              element: (
                <Animated.View style={[styles.rightOverlay, pulseAnimStyle]}>
                  <Text style={styles.rightOverlayText}>😄🔥 LIKE</Text>
                </Animated.View>
              ),
              style: { wrapper: styles.rightOverlayWrapper }
            },
            top: {
              element: (
                <View style={styles.superLikeOverlay}>
                  <Text style={styles.superLikeText}>⭐ SUPERLIKE ✨</Text>
                </View>
              ),
              style: { wrapper: styles.superLikeWrapper }
            }
          }}
        />
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f8f8' },
  card: {
    width: width * 0.9,
    height: height * 0.7,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  cardImage: { width: '100%', height: '100%' },
  cardOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, backgroundColor: 'rgba(0,0,0,0.4)' },
  name: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  bio: { color: 'white', fontSize: 16 },
  noMoreCards: { fontSize: 20, color: '#666' },

  // LEFT swipe overlay
  leftOverlay: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 4,
    borderColor: 'red',
    backgroundColor: 'rgba(255,0,0,0.65)',
    borderRadius: 12,
    transform: [{ rotate: '-12deg' }]
  },
  leftOverlayText: { color: 'white', fontSize: 32, fontWeight: 'bold', letterSpacing: 1 },
  leftOverlayWrapper: { position: 'absolute', top: 45, left: 20 },

  // RIGHT swipe overlay
  rightOverlay: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 4,
    borderColor: 'green',
    backgroundColor: 'rgba(0,200,0,0.65)',
    borderRadius: 12,
    transform: [{ rotate: '12deg' }]
  },
  rightOverlayText: { color: 'white', fontSize: 32, fontWeight: 'bold', letterSpacing: 1 },
  rightOverlayWrapper: { position: 'absolute', top: 45, right: 20 },

  // TOP swipe overlay (SUPERLIKE)
  superLikeOverlay: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderWidth: 4,
    borderColor: '#0095ff',
    backgroundColor: 'rgba(0,150,255,0.75)',
    borderRadius: 12,
    transform: [{ rotate: '0deg' }]
  },
  superLikeText: { color: 'white', fontSize: 32, fontWeight: 'bold', letterSpacing: 1 },
  superLikeWrapper: { position: 'absolute', top: 20, alignSelf: 'center' },
  swipeOverlay: {
    ...StyleSheet.absoluteFillObject, // cover the whole card
    backgroundColor: 'black',
    opacity: 0.1, // start invisible
  },

});
