import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,

  Alert,
} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
const { width } = Dimensions.get('window');

const JOBS = [
  {
    id: 1,
    company: 'Google',
    role: 'Senior React Native Dev',
    salary: '$140k - $180k',
    location: 'Remote / NY',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    company: 'Spotify',
    role: 'UI/UX Designer',
    salary: '$110k - $150k',
    location: 'Stockholm, Sweden',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    company: 'Tesla',
    role: 'Product Manager',
    salary: '$130k - $170k',
    location: 'Austin, TX',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    company: 'Airbnb',
    role: 'Backend Engineer',
    salary: '$150k - $200k',
    location: 'San Francisco, CA',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    company: 'Netflix',
    role: 'Data Scientist',
    salary: '$160k - $220k',
    location: 'Los Gatos, CA',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80'
  },
];

const JobSwipeScreen: React.FC = () => {
  const swiperRef = useRef<Swiper<any>>(null);
  const [index, setIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);


  // 1. REWIND (Undo)
  const handleRewind = () => swiperRef.current?.swipeBack();

  // 2. PASS (Not Interested)
  const handlePass = () => swiperRef.current?.swipeLeft();

  // 3. PRIORITY APPLY (Super Like)
  const handlePriorityApply = () => swiperRef.current?.swipeTop();

  // 4. APPLY (Like)
  const handleApply = () => swiperRef.current?.swipeRight();

  // 5. BOOST (Visibility)
  const handleBoost = () => {
    Alert.alert(
      "Profile Boosted! ⚡",
      "Your resume is now visible to top recruiters in your area for 30 minutes."
    );
  };

  // --- RENDER CARD ---
  const renderCard = (job: any) => {
    if (!job) return null;
    return (
      <View style={styles.card}>
        <Image source={{ uri: job.image }} style={styles.cardImage} />

        {/* Gradient Overlay for text readability */}
        <View style={styles.cardGradient} />

        <View style={styles.cardDetails}>
          <Text style={styles.role}>{job.role}</Text>
          <Text style={styles.company}>{job.company}</Text>
          <View style={styles.tagRow}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{job.salary}</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{job.location}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* --- SWIPER AREA --- */}
      <View style={styles.swiperContainer}>
        {isFinished ? (
          <View style={styles.noCardsView}>
            <Icon name="briefcase-search" size={60} color="#ddd" />
            <Text style={styles.noCardsText}>No more jobs in your area.</Text>
            <TouchableOpacity onPress={() => { setIndex(0); setIsFinished(false) }} style={styles.refreshBtn}>
              <Text style={styles.refreshText}>Refresh Listings</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Swiper
            ref={swiperRef}
            cards={JOBS}
            cardIndex={index}
            renderCard={renderCard}
            onSwipedAll={() => setIsFinished(true)}
            onSwiped={(cardIndex) => setIndex(cardIndex + 1)}
            stackSize={3}
            stackSeparation={15}
            backgroundColor={'transparent'}
            cardVerticalMargin={10}
            animateOverlayLabelsOpacity
            animateCardOpacity
            swipeBackCard

            // --- OVERLAY LABELS (The Text that appears when swiping) ---
            overlayLabels={{
              left: {
                title: 'PASS',
                style: {
                  label: { backgroundColor: 'transparent', borderColor: '#ec5e67', color: '#ec5e67', borderWidth: 4, fontSize: 32, transform: [{ rotate: '15deg' }] },
                  wrapper: { flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-start', marginTop: 30, marginLeft: -30 }
                }
              },
              right: {
                title: 'APPLY',
                style: {
                  label: { backgroundColor: 'transparent', borderColor: '#4ccc93', color: '#4ccc93', borderWidth: 4, fontSize: 32, transform: [{ rotate: '-15deg' }] },
                  wrapper: { flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', marginTop: 30, marginLeft: 30 }
                }
              },
              top: {
                title: 'PRIORITY',
                style: {
                  label: { backgroundColor: 'transparent', borderColor: '#3ca4ff', color: '#3ca4ff', borderWidth: 4, fontSize: 32 },
                  wrapper: { flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }
                }
              }
            }}
          />
        )}
      </View>

      {/* --- BOTTOM CONTROLS --- */}
      <View style={styles.bottomBar}>

        {/* 1. REWIND (Yellow) */}
        <TouchableOpacity style={[styles.roundButton, styles.smallButton]} onPress={handleRewind}>
          <Icon name="replay" size={24} color="#f5b915" />
        </TouchableOpacity>

        {/* 2. NOPE / PASS (Red) */}
        <TouchableOpacity style={[styles.roundButton, styles.largeButton]} onPress={handlePass}>
          <Icon name="close" size={36} color="#ec5e67" />
        </TouchableOpacity>

        {/* 3. PRIORITY / SUPER LIKE (Blue) */}
        <TouchableOpacity style={[styles.roundButton, styles.smallButton, styles.superLikeBtn]} onPress={handlePriorityApply}>
          <Icon name="star" size={24} color="#3ca4ff" />
        </TouchableOpacity>

        {/* 4. APPLY / LIKE (Green) */}
        {/* Changed Icon to CHECK (Checkmark) to signify 'Apply' */}
        <TouchableOpacity style={[styles.roundButton, styles.largeButton]} onPress={handleApply}>
          <Icon name="check" size={36} color="#4ccc93" />
        </TouchableOpacity>

        {/* 5. BOOST (Purple) */}
        <TouchableOpacity style={[styles.roundButton, styles.smallButton]} onPress={handleBoost}>
          <Icon name="flash" size={24} color="#915dd1" />
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

export default JobSwipeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
  },
  swiperContainer: {
    flex: 1,
    marginBottom: 90, // Space for bottom bar
  },

  // --- CARD STYLES ---
  card: {
    flex: 0.75,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 160,
    backgroundColor: 'rgba(0,0,0,0.6)', // Darken bottom for text
  },
  cardDetails: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
  },
  role: {
    fontSize: 28,
    color: 'white',
    fontWeight: '700',
    marginBottom: 5,
  },
  company: {
    fontSize: 20,
    color: '#ddd',
    fontWeight: '500',
    marginBottom: 10,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginTop: 5,
  },
  tagText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },

  // --- NO CARDS VIEW ---
  noCardsView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noCardsText: {
    fontSize: 16,
    color: '#757575',
    marginVertical: 20,
  },
  refreshBtn: {
    backgroundColor: '#000',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 30,
  },
  refreshText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

  // --- BOTTOM BAR ---
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  roundButton: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  smallButton: {
    width: 45,
    height: 45,
    borderRadius: 25,
  },
  largeButton: {
    width: 65,
    height: 65,
    borderRadius: 35,
  },
  superLikeBtn: {
    marginBottom: 10, // Slight offset
  }
});