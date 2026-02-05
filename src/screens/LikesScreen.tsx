// src/screens/LikesScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

// Mock Data: Companies that "Liked" the user
const CONNECTIONS = [
  {
    id: '1',
    company: 'Google',
    role: 'React Native Dev',
    logo: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png',
    status: 'New Invitation',
    time: '2m ago',
    isNew: true,
  },
  {
    id: '2',
    company: 'Spotify',
    role: 'UI/UX Designer',
    logo: 'https://cdn-icons-png.flaticon.com/512/174/174872.png',
    status: 'Interview Request',
    time: '1h ago',
    isNew: true,
  },
  {
    id: '3',
    company: 'Airbnb',
    role: 'Frontend Engineer',
    logo: 'https://cdn-icons-png.flaticon.com/512/2111/2111320.png',
    status: 'Matched',
    time: 'Yesterday',
    isNew: false,
  },
  {
    id: '4',
    company: 'Tesla',
    role: 'Product Manager',
    logo: 'https://cdn-icons-png.flaticon.com/512/5968/5968850.png',
    status: 'Matched',
    time: '2 days ago',
    isNew: false,
  },
  {
    id: '5',
    company: 'Microsoft',
    role: 'Data Scientist',
    logo: 'https://cdn-icons-png.flaticon.com/512/732/732221.png',
    status: 'Matched',
    time: '3 days ago',
    isNew: false,
  },
  {
    id: '6',
    company: 'Amazon',
    role: 'Backend Dev',
    logo: 'https://cdn-icons-png.flaticon.com/512/5968/5968269.png',
    status: 'Matched',
    time: '1 week ago',
    isNew: false,
  },
];

const LikesScreen = () => {
  const [searchText, setSearchText] = useState('');

  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.9}>
      
      {/* New Badge */}
      {item.isNew && (
        <View style={styles.newBadge}>
          <Text style={styles.newBadgeText}>NEW</Text>
        </View>
      )}

      {/* Company Logo */}
      <Image source={{ uri: item.logo }} style={styles.logo} resizeMode="contain" />

      {/* Info */}
      <View style={styles.cardContent}>
        <Text style={styles.role} numberOfLines={1}>{item.role}</Text>
        <Text style={styles.company}>{item.company}</Text>
        
        {/* Status Indicator */}
        <View style={styles.statusRow}>
          <Icon 
            name={item.isNew ? "email-alert-outline" : "handshake-outline"} 
            size={14} 
            color={item.isNew ? "#E74C3C" : "#27AE60"} 
          />
          <Text style={[
            styles.statusText, 
            { color: item.isNew ? "#E74C3C" : "#27AE60" }
          ]}>
            {item.status}
          </Text>
        </View>
      </View>

      {/* Action Button */}
      <TouchableOpacity style={styles.chatBtn}>
        <Icon name="message-text-outline" size={20} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      
      {/* --- HEADER --- */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Connections</Text>
          <Text style={styles.headerSubtitle}>6 Companies want to interview you</Text>
        </View>
        <View style={styles.headerIconBg}>
           <Icon name="briefcase-check-outline" size={28} color="#000" />
        </View>
      </View>

      {/* --- SEARCH BAR --- */}
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={24} color="#999" style={styles.searchIcon} />
        <TextInput 
          style={styles.searchInput}
          placeholder="Search recruiters or companies..."
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* --- GOLD UPSELL BANNER (Blurred Likes) --- */}
      <TouchableOpacity style={styles.goldBanner}>
        <View style={styles.goldIconCircle}>
            <Icon name="eye-outline" size={24} color="#D4AF37" />
        </View>
        <View style={styles.goldTextContainer}>
            <Text style={styles.goldTitle}>See who viewed your profile</Text>
            <Text style={styles.goldSubtitle}>32 Recruiters checked you out recently</Text>
        </View>
        <Icon name="chevron-right" size={24} color="#D4AF37" />
      </TouchableOpacity>

      {/* --- MATCH GRID --- */}
      <Text style={styles.sectionTitle}>Your Matches</Text>
      
      <FlatList
        data={CONNECTIONS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

    </SafeAreaView>
  );
};

export default LikesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  // Header
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  headerIconBg: {
    width: 45,
    height: 45,
    backgroundColor: '#F0F2F5',
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Search
  searchContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },

  // Gold Banner
  goldBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 25,
    padding: 15,
    backgroundColor: '#FFF9E6', // Light Gold
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#FFE082',
  },
  goldIconCircle: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  goldTextContainer: {
    flex: 1,
  },
  goldTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#B7950B',
  },
  goldSubtitle: {
    fontSize: 12,
    color: '#D4AC0D',
  },

  // Grid
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    marginLeft: 20,
    marginBottom: 15,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  // Card
  card: {
    width: (width - 55) / 2, // 2 columns with spacing
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 15,
    alignItems: 'center',
    
    // Shadow
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  newBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#E74C3C',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  newBadgeText: {
    color: '#fff',
    fontSize: 8,
    fontWeight: 'bold',
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 12,
    borderRadius: 12,
  },
  cardContent: {
    alignItems: 'center',
    width: '100%',
  },
  role: {
    fontSize: 14,
    fontWeight: '700',
    color: '#222',
    marginBottom: 4,
    textAlign: 'center',
  },
  company: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 4,
  },
  chatBtn: {
    backgroundColor: '#000',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});