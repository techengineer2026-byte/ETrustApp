import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  StatusBar,
  Dimensions,
} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');
const swiperRef = useRef<Swiper>(null);

// --- LAYOUT CONSTANTS ---
const HEADER_HEIGHT = 60;
const BOTTOM_BUTTONS_HEIGHT = 100;
const TAB_BAR_HEIGHT = 90;

const SWIPER_HEIGHT = height - HEADER_HEIGHT - BOTTOM_BUTTONS_HEIGHT - TAB_BAR_HEIGHT - 30; 

const JOBS = [
  {
    id: 1,
    company: 'Airbnb',
    role: 'Lead UX Researcher',
    salary: '$180k - $240k',
    location: 'San Francisco, CA',
    match: '98%',
    posted: '2h ago',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    description: 'Lead the future of travel experiences. We are looking for a visionary researcher.',
  },
  {
    id: 2,
    company: 'Stripe',
    role: 'Solutions Architect',
    salary: '$160k - $210k',
    location: 'Remote / Seattle',
    match: '92%',
    posted: '5h ago',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80',
    description: 'Help enterprise customers design scalable payment infrastructures.',
  },
  {
    id: 3,
    company: 'SpaceX',
    role: 'Flight Software Eng',
    salary: '$150k - $200k',
    location: 'Hawthorne, CA',
    match: '88%',
    posted: '1d ago',
    image: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=800&q=80',
    description: 'Write code that literally goes to space. C++ and Rust expertise required.',
  },
  {
    id: 4,
    company: 'Netflix',
    role: 'Data Scientist',
    salary: '$170k - $230k',
    location: 'Los Gatos, CA',
    match: '85%',
    posted: '1d ago',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    description: 'Analyze content performance and drive decision making.',
  },
  {
    id: 5,
    company: 'Tesla',
    role: 'Product Manager',
    salary: '$140k - $180k',
    location: 'Austin, TX',
    match: '82%',
    posted: '3d ago',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
    description: 'Manage the roadmap for Autopilot features.',
  },
];

const HomeScreen: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [userStatus, setUserStatus] = useState<'Searching' | 'Hired'>('Searching');
  
  // 1. New Ref to count swipes
  const swipeCountRef = useRef(0);

  const handleRewind = () => swiperRef.current?.swipeBack();
  const handlePass = () => swiperRef.current?.swipeLeft();
  const handleSuperLike = () => swiperRef.current?.swipeTop();
  const handleApply = () => swiperRef.current?.swipeRight();
  const handleBoost = () => Alert.alert("Boost 🚀", "Profile visibility increased!");

  const onSwiped = (cardIndex: number) => {
    setCurrentIndex((cardIndex + 1) % JOBS.length);

    // 2. Increment Swipe Count
    swipeCountRef.current += 1;
    console.log("Swipe Count:", swipeCountRef.current);

    // 3. Check if count is 5
    if (swipeCountRef.current === 5) {
      // Use small timeout to let the card finish animating off screen
      setTimeout(() => {
        setModalVisible(true);
      }, 300);
    }
  };

  const handleUpdateStatus = (status: 'Searching' | 'Hired') => {
    setUserStatus(status);
    setModalVisible(false);
    // Optional: Reset count if you want it to happen again later
    // swipeCountRef.current = 0; 
  };

  const renderCard = (job: any) => {
    // Safety check for infinite scroll
    if (!job) return <View style={styles.card} />;

    return (
      <View style={styles.card}>
        <Image source={{ uri: job.image }} style={styles.cardImage} />
        <View style={styles.gradientOverlay} />

        <View style={styles.topBadgesContainer}>
          <View style={styles.matchBadge}>
            <Icon name="fire" size={14} color="#FFF" />
            <Text style={styles.matchText}>{job.match} Match</Text>
          </View>
          <View style={styles.timeBadge}>
            <Text style={styles.timeText}>{job.posted}</Text>
          </View>
        </View>

        <View style={styles.cardContent}>
          <Text style={styles.companyText}>{job.company}</Text>
          <Text style={styles.roleText}>{job.role}</Text>
          <Text style={styles.descriptionText} numberOfLines={2}>{job.description}</Text>
          <View style={styles.divider} />
          <View style={styles.chipsContainer}>
            <View style={styles.chip}>
              <Icon name="cash" size={14} color="#FFF" style={{ marginRight: 4 }} />
              <Text style={styles.chipText}>{job.salary}</Text>
            </View>
            <View style={styles.chip}>
              <Icon name="map-marker" size={14} color="#FFF" style={{ marginRight: 4 }} />
              <Text style={styles.chipText}>{job.location}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fc" />

      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerSubtitle}>Hello, Alex 👋</Text>
          <Text style={styles.headerTitle}>Recommended</Text>
        </View>
        <TouchableOpacity
          style={[styles.statusPill, userStatus === 'Hired' ? styles.statusPillHired : styles.statusPillActive]}
          onPress={() => setModalVisible(true)}
        >
          <View style={[styles.statusDot, { backgroundColor: userStatus === 'Hired' ? '#fff' : '#4ccc93' }]} />
          <Text style={styles.statusPillText}>
            {userStatus === 'Searching' ? 'Open' : 'Hired'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* SWIPER */}
      <View style={styles.swiperContainer}>
        <Swiper
          ref={swiperRef}
          cards={JOBS}
          renderCard={renderCard}
          onSwiped={onSwiped}
          cardIndex={currentIndex}
          infinite={true}
          backgroundColor={'transparent'}
          stackSize={3}
          stackSeparation={14}
          cardVerticalMargin={10}
          overlayLabels={{
            left: {
              title: 'NOPE',
              style: {
                label: { borderColor: '#ec5e67', color: '#ec5e67', borderWidth: 4, fontSize: 32 },
                wrapper: { flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-start', marginTop: 30, marginLeft: -30 }
              }
            },
            right: {
              title: 'APPLY',
              style: {
                label: { borderColor: '#4ccc93', color: '#4ccc93', borderWidth: 4, fontSize: 32 },
                wrapper: { flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', marginTop: 30, marginLeft: 30 }
              }
            },
          }}
          animateOverlayLabelsOpacity
          animateCardOpacity
          swipeBackCard
        />
      </View>

      {/* FOOTER */}
      <View style={styles.footerContainer}>
        <View style={styles.actionRow}>
          <TouchableOpacity style={[styles.circleBtn, styles.btnSmall]} onPress={handleRewind}>
            <Icon name="refresh" size={22} color="#f5b915" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.circleBtn, styles.btnLarge]} onPress={handlePass}>
            <Icon name="close" size={30} color="#ec5e67" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.circleBtn, styles.btnSmall, styles.btnSuper]} onPress={handleSuperLike}>
            <Icon name="star" size={22} color="#3ca4ff" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.circleBtn, styles.btnLarge]} onPress={handleApply}>
            <Icon name="check" size={30} color="#4ccc93" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.circleBtn, styles.btnSmall]} onPress={handleBoost}>
            <Icon name="lightning-bolt" size={22} color="#915dd1" />
          </TouchableOpacity>
        </View>
      </View>

      {/* MODAL - Will open after 5 swipes */}
      <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Quick Check-in</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}><Icon name="close" size={24} color="#999" /></TouchableOpacity>
            </View>
            <Text style={styles.modalDescription}>
              You've swiped a few jobs! Are you still actively looking for new opportunities?
            </Text>
            
            <TouchableOpacity style={[styles.statusOption, userStatus === 'Searching' && styles.statusOptionActive]} onPress={() => handleUpdateStatus('Searching')}>
              <View style={[styles.iconCircle, { backgroundColor: '#e3f2fd' }]}><Icon name="briefcase-search" size={24} color="#2196F3" /></View>
              <View style={styles.optionText}><Text style={styles.optionTitle}>Still Searching</Text><Text style={styles.optionSub}>Keep profile visible</Text></View>
              {userStatus === 'Searching' && <Icon name="check-circle" size={24} color="#2196F3" />}
            </TouchableOpacity>

            <TouchableOpacity style={[styles.statusOption, userStatus === 'Hired' && styles.statusOptionHired]} onPress={() => handleUpdateStatus('Hired')}>
              <View style={[styles.iconCircle, { backgroundColor: '#e8f5e9' }]}><Icon name="party-popper" size={24} color="#4CAF50" /></View>
              <View style={styles.optionText}><Text style={styles.optionTitle}>I Got a Job!</Text><Text style={styles.optionSub}>Pause visibility</Text></View>
              {userStatus === 'Hired' && <Icon name="check-circle" size={24} color="#4CAF50" />}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fc',
  },

  header: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    zIndex: 10,
  },
  headerSubtitle: { color: '#888', fontSize: 12, fontWeight: '600' },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#1a1b1e' },
  statusPill: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
    paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, borderWidth: 1, borderColor: '#eee',
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2, elevation: 1
  },
  statusPillActive: { borderColor: '#eee' },
  statusPillHired: { backgroundColor: '#4ccc93', borderColor: '#4ccc93' },
  statusDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  statusPillText: { fontSize: 12, fontWeight: '700', color: '#333' },

  swiperContainer: {
    height: SWIPER_HEIGHT,
    width: width,
    zIndex: 1,
  },
  card: {
    height: SWIPER_HEIGHT - 20,
    borderRadius: 24,
    backgroundColor: '#fff',
    shadowColor: '#1a1b1e',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 4,
    overflow: 'hidden',
  },
  cardImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  gradientOverlay: {
    position: 'absolute', left: 0, right: 0, bottom: 0, height: '60%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  topBadgesContainer: { position: 'absolute', top: 20, right: 20, alignItems: 'flex-end', gap: 8 },
  matchBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ec5e67', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12, gap: 4 },
  matchText: { color: 'white', fontWeight: 'bold', fontSize: 12 },
  timeBadge: { backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12 },
  timeText: { color: 'white', fontSize: 12, fontWeight: '600' },

  cardContent: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, paddingBottom: 25 },
  companyText: { color: '#ccc', fontSize: 14, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1 },
  roleText: { color: 'white', fontSize: 28, fontWeight: '800', marginBottom: 6 },
  descriptionText: { color: 'rgba(255,255,255,0.9)', fontSize: 14, lineHeight: 20, marginBottom: 15 },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.2)', marginBottom: 15 },
  chipsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.15)', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8 },
  chipText: { color: 'white', fontSize: 13, fontWeight: '600' },

  footerContainer: {
    height: BOTTOM_BUTTONS_HEIGHT,
    justifyContent: 'center',
    paddingHorizontal: 20,
    zIndex: 999,
  },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 },
  circleBtn: {
    backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderRadius: 50,
    shadowColor: '#999', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 5,
  },
  btnSmall: { width: 48, height: 48 },
  btnLarge: { width: 68, height: 68 },
  btnSuper: { marginBottom: 20 },

  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalCard: { width: '100%', backgroundColor: 'white', borderRadius: 24, padding: 24, elevation: 10 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  modalTitle: { fontSize: 22, fontWeight: 'bold', color: '#1a1b1e' },
  modalDescription: { fontSize: 15, color: '#666', marginBottom: 24 },
  statusOption: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 16, borderWidth: 2, borderColor: '#f0f0f0', marginBottom: 12, backgroundColor: '#fff' },
  statusOptionActive: { borderColor: '#2196F3', backgroundColor: '#f5fbff' },
  statusOptionHired: { borderColor: '#4CAF50', backgroundColor: '#f0f9f0' },
  iconCircle: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  optionText: { flex: 1 },
  optionTitle: { fontSize: 16, fontWeight: '700', color: '#333', marginBottom: 2 },
  optionSub: { fontSize: 12, color: '#888' },
});