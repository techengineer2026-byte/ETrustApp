import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const ETEditProfileScreen = () => {
  const navigation = useNavigation();

  // --- State ---
  const [centerName, setCenterName] = useState('Skill India Training Hub');
  const [centerId] = useState('CNT-8821'); // Read Only
  const [contactPerson, setContactPerson] = useState('Rajesh Kumar');
  
  // Contact Fields (Locked & Verified)
  const [email] = useState('admin@skillindia.com'); 
  const [phone] = useState('+91 98765 43210');
  
  // Location Fields
  const [address, setAddress] = useState('Plot 45, Industrial Area, Phase 2');
  const [city, setCity] = useState('Noida');
  const [state, setState] = useState('Uttar Pradesh');
  const [pincode, setPincode] = useState('201301');
  
  const [isLoading, setIsLoading] = useState(false);

  // --- Actions ---
  const handleSave = () => {
    if (!centerName || !contactPerson || !city || !pincode) {
        Alert.alert("Missing Fields", "Please fill in all required details.");
        return;
    }
    setIsLoading(true);
    // Simulate API Update
    setTimeout(() => {
        setIsLoading(false);
        Alert.alert("Success", "Centre profile updated successfully!", [
            { text: "OK", onPress: () => navigation.goBack() }
        ]);
    }, 1500);
  };

  const handleImageUpload = () => {
      Alert.alert("Upload Logo", "Choose from Gallery or Camera");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* --- HEADER --- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Centre Profile</Text>
        <TouchableOpacity onPress={handleSave} disabled={isLoading}>
            <Text style={[styles.headerSave, isLoading && { color: '#94A3B8' }]}>
                {isLoading ? 'Saving...' : 'Save'}
            </Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          
          {/* --- 1. UPLOAD LOGO --- */}
          <View style={styles.logoSection}>
            <TouchableOpacity style={styles.logoWrapper} onPress={handleImageUpload}>
                <Image 
                    source={{ uri: 'https://randomuser.me/api/portraits/lego/6.jpg' }} 
                    style={styles.logo} 
                />
                <View style={styles.cameraOverlay}>
                    <MaterialCommunityIcons name="camera-outline" size={22} color="#fff" />
                </View>
            </TouchableOpacity>
            <Text style={styles.logoText}>Change Centre Logo</Text>
          </View>

          {/* --- 2. CENTRE INFO --- */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Centre Information</Text>
            
            {/* Center ID (Locked) */}
            <View style={styles.formGroup}>
                <Text style={styles.label}>Centre ID</Text>
                <View style={[styles.inputWrapper, styles.readOnly]}>
                    <MaterialCommunityIcons name="card-account-details-outline" size={20} color="#94A3B8" />
                    <TextInput 
                        style={[styles.inputField, { color: '#64748B', fontWeight:'700' }]}
                        value={centerId}
                        editable={false} 
                    />
                    <MaterialCommunityIcons name="lock-outline" size={16} color="#94A3B8" />
                </View>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Centre Name</Text>
                <TextInput 
                    style={styles.input}
                    value={centerName}
                    onChangeText={setCenterName}
                    placeholder="e.g. Skill India Hub"
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Contact Person Name</Text>
                <TextInput 
                    style={styles.input}
                    value={contactPerson}
                    onChangeText={setContactPerson}
                    placeholder="Full Name"
                />
            </View>
          </View>

          {/* --- 3. CONTACT DETAILS (LOCKED) --- */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Details</Text>
            
            {/* Email */}
            <View style={styles.formGroup}>
                <Text style={styles.label}>Email Address</Text>
                <View style={[styles.inputWrapper, styles.readOnly]}>
                    <MaterialCommunityIcons name="email-outline" size={20} color="#94A3B8" />
                    <TextInput 
                        style={[styles.inputField, { color: '#64748B' }]}
                        value={email}
                        editable={false} 
                    />
                    <View style={styles.verifiedBadge}>
                        <MaterialCommunityIcons name="check-decagram" size={14} color="#15803D" />
                        <Text style={styles.verifiedText}>Verified</Text>
                    </View>
                </View>
            </View>

            {/* Phone */}
            <View style={styles.formGroup}>
                <Text style={styles.label}>Phone Number</Text>
                <View style={[styles.inputWrapper, styles.readOnly]}>
                    <MaterialCommunityIcons name="phone-outline" size={20} color="#94A3B8" />
                    <TextInput 
                        style={[styles.inputField, { color: '#64748B' }]}
                        value={phone}
                        editable={false}
                    />
                    <View style={styles.verifiedBadge}>
                        <MaterialCommunityIcons name="check-decagram" size={14} color="#15803D" />
                        <Text style={styles.verifiedText}>Verified</Text>
                    </View>
                </View>
            </View>
          </View>

          {/* --- 4. LOCATION DETAILS --- */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Centre Location</Text>
            
            <View style={styles.formGroup}>
                <Text style={styles.label}>Address Line 1</Text>
                <TextInput 
                    style={[styles.input, { height: 80, textAlignVertical: 'top', paddingTop: 12 }]}
                    value={address}
                    onChangeText={setAddress}
                    multiline
                    placeholder="Floor, Building, Street..."
                />
            </View>

            <View style={styles.row}>
                <View style={[styles.formGroup, { flex: 1, marginRight: 12 }]}>
                    <Text style={styles.label}>City</Text>
                    <TextInput 
                        style={styles.input}
                        value={city}
                        onChangeText={setCity}
                        placeholder="City"
                    />
                </View>
                <View style={[styles.formGroup, { flex: 1 }]}>
                    <Text style={styles.label}>State</Text>
                    <TextInput 
                        style={styles.input}
                        value={state}
                        onChangeText={setState}
                        placeholder="State"
                    />
                </View>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Pincode</Text>
                <TextInput 
                    style={styles.input}
                    value={pincode}
                    onChangeText={setPincode}
                    keyboardType="numeric"
                    placeholder="000000"
                    maxLength={6}
                />
            </View>
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* --- Footer Save --- */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave} disabled={isLoading}>
             <Text style={styles.saveBtnText}>{isLoading ? "Updating Profile..." : "Update Profile"}</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

export default ETEditProfileScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, 
    borderBottomColor: '#F1F5F9', backgroundColor: '#fff',
  },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#0F172A' },
  headerSave: { fontSize: 16, fontWeight: '600', color: '#2563EB' },
  content: { padding: 20 },

  // Logo
  logoSection: { alignItems: 'center', marginBottom: 24 },
  logoWrapper: { position: 'relative', width: 100, height: 100 },
  logo: { width: 100, height: 100, borderRadius: 50, borderWidth: 1, borderColor: '#E2E8F0', backgroundColor:'#F1F5F9' },
  cameraOverlay: {
      position: 'absolute', bottom: 0, right: 0, backgroundColor: '#2563EB',
      width: 34, height: 34, borderRadius: 17, justifyContent: 'center', alignItems: 'center',
      borderWidth: 2, borderColor: '#fff'
  },
  logoText: { marginTop: 10, color: '#2563EB', fontSize: 14, fontWeight: '500' },

  // Sections
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#0F172A', marginBottom: 16 },
  formGroup: { marginBottom: 16 },
  row: { flexDirection: 'row' },
  label: { fontSize: 13, fontWeight: '600', color: '#64748B', marginBottom: 8 },
  
  // Standard Input
  input: {
      backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E2E8F0',
      borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12,
      fontSize: 15, color: '#0F172A',
  },

  // Icon Input Wrapper
  inputWrapper: {
      flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8FAFC',
      borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 12, paddingHorizontal: 12
  },
  inputField: { flex: 1, paddingVertical: 12, paddingHorizontal: 8, fontSize: 15, color: '#0F172A' },
  readOnly: { backgroundColor: '#F1F5F9', borderColor: '#E2E8F0' },

  // Verified Badge
  verifiedBadge: {
      flexDirection: 'row', alignItems: 'center', backgroundColor: '#DCFCE7', 
      paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, borderWidth: 1, borderColor: '#BBF7D0'
  },
  verifiedText: {
      fontSize: 11, fontWeight: '700', color: '#15803D', marginLeft: 4 
  },

  // Footer
  footer: {
      position: 'absolute', bottom: 0, left: 0, right: 0,
      padding: 20, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#F1F5F9'
  },
  saveBtn: {
      backgroundColor: '#2563EB', paddingVertical: 16, borderRadius: 14,
      alignItems: 'center', shadowColor: '#2563EB', shadowOpacity: 0.2, shadowRadius: 5, elevation: 4
  },
  saveBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' }
});