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

export default function ETCenterStep3() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const prevData = route.params;

  const [email, setEmail] = useState("");
  const [centerName, setCenterName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    if (!email || !centerName || !password || !confirmPassword) {
      return Alert.alert("Missing Info", "Please fill all security details.");
    }
    if (password !== confirmPassword) {
      return Alert.alert("Password Mismatch", "Passwords do not match.");
    }

    const finalData = { ...prevData, email, centerName, password };
    console.log("REGISTERING ET CENTER:", finalData);

    Alert.alert(
      "Registration Successful", 
      "Your Center ID has been created. You can now login.", 
      [{ text: "Login Now", onPress: () => navigation.replace("ETCenterLogin") }]
    );
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
            <Text style={styles.stepIndicator}>Step 3 of 3</Text>
          </View>

          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: "100%" }]} />
          </View>

          <View style={styles.content}>
            <View style={styles.iconCircle}>
                <Icon name="shield-account" size={32} color="#1c005e" />
            </View>

            <Text style={styles.title}>Security & Info</Text>
            <Text style={styles.subtitle}>Set up your official login credentials.</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Official Email ID</Text>
              <TextInput style={styles.input} placeholder="center@et.com" placeholderTextColor="#999" keyboardType="email-address" value={email} onChangeText={setEmail} autoCapitalize="none" />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Suggested Center Name</Text>
              <TextInput style={styles.input} placeholder="Ex. ET Center – Andheri East" placeholderTextColor="#999" value={centerName} onChangeText={setCenterName} />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Create Password</Text>
              <TextInput style={styles.input} placeholder="********" placeholderTextColor="#999" secureTextEntry value={password} onChangeText={setPassword} />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput style={styles.input} placeholder="********" placeholderTextColor="#999" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
            </View>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.submitBtn} onPress={handleRegister}>
              <Text style={styles.nextText}>Finish Registration</Text>
              <Icon name="check-decagram" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

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
  footer: { padding: 24, marginTop: "auto" },
  submitBtn: { backgroundColor: "#1c005e", flexDirection: "row", justifyContent: "center", alignItems: "center", paddingVertical: 18, borderRadius: 16, shadowColor: "#1c005e", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
  nextText: { color: "#fff", fontSize: 16, fontWeight: "bold", marginRight: 8 },
});