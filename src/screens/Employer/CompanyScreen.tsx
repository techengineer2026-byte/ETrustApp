import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function CompanyScreen() {
  const navigation = useNavigation<any>();
  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");

  const handleNext = () => {
    if (!companyName.trim() || !contactPerson.trim()) {
      Alert.alert("Missing Info", "Please fill in all details to proceed.");
      return;
    }
    // Navigate to Email Screen
    navigation.navigate("EmailScreen", { companyName, contactPerson });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Icon name="arrow-left" size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.stepIndicator}>1 of 4</Text>
      </View>

      <View style={styles.progressBarBg}>
        <View style={[styles.progressBarFill, { width: "25%" }]} />
      </View>

      <View style={styles.content}>
        <View style={styles.iconCircle}>
            <Icon name="domain" size={32} color="#0f172a" />
        </View>

        <Text style={styles.title}>Company Details</Text>
        <Text style={styles.subtitle}>Let's start with your organization info.</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Registered Company Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex. Tech Solutions Pvt Ltd"
            placeholderTextColor="#94a3b8"
            value={companyName}
            onChangeText={setCompanyName}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Contact Person Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex. John Doe (HR Manager)"
            placeholderTextColor="#94a3b8"
            value={contactPerson}
            onChangeText={setContactPerson}
          />
        </View>

        <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
          <Text style={styles.nextText}>Next</Text>
          <Icon name="arrow-right" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 20 },
  backBtn: { padding: 5, backgroundColor: '#f1f5f9', borderRadius: 8 },
  stepIndicator: { fontWeight: "bold", color: "#64748B" },
  progressBarBg: { height: 4, backgroundColor: "#E2E8F0", marginHorizontal: 20, borderRadius: 2 },
  progressBarFill: { height: "100%", backgroundColor: "#0f172a", borderRadius: 2 },
  content: { padding: 24, marginTop: 10 },
  iconCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#f1f5f9', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 26, fontWeight: "800", color: "#0f172a", marginBottom: 5 },
  subtitle: { fontSize: 16, color: "#64748B", marginBottom: 30 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: "600", color: "#334155", marginBottom: 8 },
  input: { borderWidth: 1, borderColor: "#CBD5E1", borderRadius: 12, padding: 16, fontSize: 16, color: "#0f172a", backgroundColor: "#F8FAFC" },
  nextBtn: { backgroundColor: "#0f172a", flexDirection: "row", justifyContent: "center", alignItems: "center", paddingVertical: 18, borderRadius: 12, marginTop: 10, shadowColor: "#0f172a", shadowOpacity: 0.3, shadowOffset: {width:0, height:4}, elevation: 5 },
  nextText: { color: "#fff", fontSize: 16, fontWeight: "bold", marginRight: 10 },
});