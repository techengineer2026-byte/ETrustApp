import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function ETCenterStep2() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const prevData = route.params; // { name, phone }

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [pincode, setPincode] = useState("");

  const handleNext = () => {
    if (!address.trim() || !city.trim() || !district.trim() || !pincode.trim()) {
      return Alert.alert("Missing Info", "Please fill all location details.");
    }
    navigation.navigate("ETCenterStep3", { ...prevData, address, city, district, pincode });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
              <Icon name="arrow-left" size={24} color="#1c005e" />
            </TouchableOpacity>
            <Text style={styles.stepIndicator}>Step 2 of 3</Text>
          </View>

          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: "66%" }]} />
          </View>

          <View style={styles.content}>
            <View style={styles.iconCircle}>
                <Icon name="map-marker-radius" size={32} color="#1c005e" />
            </View>

            <Text style={styles.title}>Center Location</Text>
            <Text style={styles.subtitle}>Where is your center located?</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Area Address</Text>
              <TextInput 
                style={[styles.input, { height: 100, textAlignVertical: 'top' }]} 
                placeholder="Shop No, Building, Street..." 
                placeholderTextColor="#999"
                multiline 
                numberOfLines={3}
                value={address} 
                onChangeText={setAddress} 
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, {width: '48%'}]}>
                  <Text style={styles.label}>City</Text>
                  <TextInput style={styles.input} placeholder="Mumbai" placeholderTextColor="#999" value={city} onChangeText={setCity} />
              </View>
              <View style={[styles.inputGroup, {width: '48%'}]}>
                  <Text style={styles.label}>District</Text>
                  <TextInput style={styles.input} placeholder="Thane" placeholderTextColor="#999" value={district} onChangeText={setDistrict} />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Pin Code</Text>
              <TextInput style={styles.input} placeholder="400001" placeholderTextColor="#999" keyboardType="number-pad" maxLength={6} value={pincode} onChangeText={setPincode} />
            </View>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
              <Text style={styles.nextText}>Next Step</Text>
              <Icon name="arrow-right" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Reusing styles from Step 1 for consistency
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  scrollContainer: { flexGrow: 1 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 24, paddingTop: 20 },
  backBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: "#f3e5f5", justifyContent: "center", alignItems: "center" },
  stepIndicator: { fontWeight: "700", color: "#666", fontSize: 14 },
  progressBarBg: { height: 6, backgroundColor: "#F0F0F0", marginHorizontal: 24, borderRadius: 3, marginBottom: 20 },
  progressBarFill: { height: "100%", backgroundColor: "#1c005e", borderRadius: 3 },
  content: { paddingHorizontal: 24, flex: 1 },
  iconCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: "#f3e5f5", justifyContent: "center", alignItems: "center", marginBottom: 15 },
  title: { fontSize: 28, fontWeight: "800", color: "#1c005e", marginBottom: 8 },
  subtitle: { fontSize: 16, color: "#666", marginBottom: 30 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: "700", color: "#333", marginBottom: 8 },
  input: { borderWidth: 1, borderColor: "#E0E0E0", borderRadius: 12, paddingVertical: 14, paddingHorizontal: 16, fontSize: 16, color: "#000", backgroundColor: "#FAFAFA" },
  row: { flexDirection: "row", justifyContent: "space-between" },
  footer: { padding: 24, marginTop: "auto" },
  nextBtn: { backgroundColor: "#1c005e", flexDirection: "row", justifyContent: "center", alignItems: "center", paddingVertical: 18, borderRadius: 16, shadowColor: "#1c005e", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
  nextText: { color: "#fff", fontSize: 16, fontWeight: "bold", marginRight: 8 },
});