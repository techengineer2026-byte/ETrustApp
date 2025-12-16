import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Linking,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Mock Data for Centers
const centersData = [
  {
    id: 1,
    city: "New Delhi (HQ)",
    address: "123, Connaught Place, Inner Circle, New Delhi - 110001",
    manager: "Mr. Amit Sharma",
    phone: "7380000739",
    isOpen: true,
  },
  {
    id: 2,
    city: "Mumbai Branch",
    address: "Office 402, Andheri West, Near Metro Station, Mumbai - 400053",
    manager: "Ms. Priya Patil",
    phone: "9876543210",
    isOpen: true,
  },
  {
    id: 3,
    city: "Lucknow Center",
    address: "Gomti Nagar, Sector 4, Main Road, Lucknow - 226010",
    manager: "Mr. Rajesh Kumar",
    phone: "8888888888",
    isOpen: false, // Closed right now example
  },
  {
    id: 4,
    city: "Patna Center",
    address: "Boring Road, Crossing 2, Patna, Bihar - 800001",
    manager: "Mr. Snajay Singh",
    phone: "7777777777",
    isOpen: true,
  },
];

export default function ETcenter() {
  const [search, setSearch] = useState('');

  // Filter logic
  const filteredCenters = centersData.filter((item) =>
    item.city.toLowerCase().includes(search.toLowerCase())
  );

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f4f7f6" />
      
      <View style={styles.container}>
        
        {/* --- Header Section --- */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>ET Centers</Text>
            <Text style={styles.headerSubtitle}>Locate a branch near you</Text>
          </View>
          <View style={styles.iconBg}>
            <Icon name="office-building-marker" size={28} color="#2E7D32" />
          </View>
        </View>

        {/* --- Search Bar --- */}
        <View style={styles.searchContainer}>
          <Icon name="magnify" size={24} color="#999" style={{ marginRight: 10 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by City (e.g., Delhi)"
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* --- Quick Action Grid --- */}
        <View style={styles.gridContainer}>
          <TouchableOpacity style={styles.gridButton} onPress={() => {}}>
            <View style={[styles.gridIcon, { backgroundColor: '#E3F2FD' }]}>
              <Icon name="face-agent" size={24} color="#1565C0" />
            </View>
            <Text style={styles.gridText}>Support</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridButton} onPress={() => {}}>
            <View style={[styles.gridIcon, { backgroundColor: '#E8F5E9' }]}>
              <Icon name="whatsapp" size={24} color="#2E7D32" />
            </View>
            <Text style={styles.gridText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridButton} onPress={() => {}}>
            <View style={[styles.gridIcon, { backgroundColor: '#FFF3E0' }]}>
              <Icon name="handshake" size={24} color="#EF6C00" />
            </View>
            <Text style={styles.gridText}>Partner</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridButton} onPress={() => {}}>
            <View style={[styles.gridIcon, { backgroundColor: '#F3E5F5' }]}>
              <Icon name="map-marker-radius" size={24} color="#7B1FA2" />
            </View>
            <Text style={styles.gridText}>Map View</Text>
          </TouchableOpacity>
        </View>

        {/* --- List Title --- */}
        <Text style={styles.sectionTitle}>Authorized Centers</Text>

        {/* --- Center List --- */}
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {filteredCenters.map((center) => (
            <View key={center.id} style={styles.card}>
              
              {/* Card Header */}
              <View style={styles.cardHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon name="map-marker" size={20} color="#E74C3C" />
                  <Text style={styles.cityText}>{center.city}</Text>
                </View>
                {center.isOpen ? (
                  <View style={styles.statusOpen}>
                    <Text style={styles.statusTextOpen}>Open Now</Text>
                  </View>
                ) : (
                  <View style={styles.statusClosed}>
                    <Text style={styles.statusTextClosed}>Closed</Text>
                  </View>
                )}
              </View>

              {/* Address */}
              <Text style={styles.addressText}>{center.address}</Text>

              {/* Manager & Line */}
              <View style={styles.divider} />
              
              <View style={styles.cardFooter}>
                <View>
                  <Text style={styles.label}>Center Manager</Text>
                  <Text style={styles.managerName}>{center.manager}</Text>
                </View>
                
                {/* Call Button */}
                <TouchableOpacity 
                  style={styles.callButton}
                  onPress={() => handleCall(center.phone)}
                >
                  <Icon name="phone" size={18} color="#fff" />
                  <Text style={styles.callButtonText}>Call</Text>
                </TouchableOpacity>
              </View>

            </View>
          ))}
          
          {filteredCenters.length === 0 && (
            <View style={{ alignItems: 'center', marginTop: 50 }}>
              <Icon name="map-search-outline" size={50} color="#ccc" />
              <Text style={{ color: '#999', marginTop: 10 }}>No centers found</Text>
            </View>
          )}

        </ScrollView>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f7f6',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  // --- Header ---
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1c005e',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  iconBg: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 12,
    elevation: 2,
  },
  // --- Search Bar ---
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  // --- Grid Menu ---
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  gridButton: {
    alignItems: 'center',
    width: '22%',
  },
  gridIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  gridText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#444',
  },
  // --- Section Title ---
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
  },
  // --- Card Style ---
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 5,
  },
  statusOpen: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusTextOpen: {
    color: '#2E7D32',
    fontSize: 10,
    fontWeight: 'bold',
  },
  statusClosed: {
    backgroundColor: '#FFEBEE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusTextClosed: {
    color: '#C62828',
    fontSize: 10,
    fontWeight: 'bold',
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 10,
    color: '#999',
    textTransform: 'uppercase',
  },
  managerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  callButton: {
    flexDirection: 'row',
    backgroundColor: '#2E7D32', // Trust Green
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
  },
  callButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: 5,
  },
});