import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function ContactPersonScreen({ navigation, route }: any) {
  const prevData = route.params || {}; // Data from previous screens (Logo, etc)
  const [name, setName] = useState("");

  const handleNext = () => {
    if (!name.trim()) {
      Alert.alert("Required", "Please enter the Contact Person's Name.");
      return;
    }
    // Pass data to the next screen
    navigation.navigate("ContactNumberScreen", { ...prevData, contactPerson: name });
  };

  return (
    <ImageBackground
      source={require("../../assets/bg.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Icon name="arrow-left" size={24} color="#0f172a" />
          </TouchableOpacity>
          <Text style={styles.stepIndicator}>Step 3 of 5</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Who is the contact person?</Text>
          <Text style={styles.subtitle}>Enter the name of the official representative.</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <View style={styles.inputWrapper}>
              <Icon name="account-tie" size={20} color="#64748B" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Ex. John Doe"
                placeholderTextColor="#94a3b8"
                value={name}
                onChangeText={setName}
                autoFocus
              />
            </View>
          </View>

          <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
            <Text style={styles.nextText}>Next</Text>
            <Icon name="arrow-right" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flex: 1 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 24 },
  backBtn: { padding: 8, backgroundColor: "#f1f5f9", borderRadius: 8 },
  stepIndicator: { fontWeight: "600", color: "#64748B" },
  content: { padding: 24, marginTop: 20 },
  title: { fontSize: 26, fontWeight: "800", color: "#0f172a", marginBottom: 8 },
  subtitle: { fontSize: 16, color: "#64748B", marginBottom: 30 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: "600", color: "#334155", marginBottom: 8 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 12, paddingHorizontal: 16, height: 56 },
  icon: { marginRight: 10 },
  input: { flex: 1, fontSize: 16, color: "#0f172a", height: '100%' },
  nextBtn: { backgroundColor: "#0f172a", flexDirection: "row", justifyContent: "center", alignItems: "center", paddingVertical: 18, borderRadius: 30, marginTop: 20 },
  nextText: { color: "#fff", fontSize: 16, fontWeight: "700", marginRight: 8 },
});