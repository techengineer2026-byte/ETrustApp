import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function EmployeeStep2() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const prevData = route.params; // { name, phone }

  const [email, setEmail] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const handleVerifyLink = () => {
    // Simple Email Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Alert.alert("Invalid Email", "Please enter a valid email address.");
    }
    
    // Simulate Verification
    Alert.alert("Verification Link Sent", `A verification link has been sent to ${email}. (Simulated: Verified)`);
    setIsVerified(true);
  };

  const handleNext = () => {
    if (!isVerified) {
      return Alert.alert("Verification Required", "Please verify your email to proceed.");
    }
    // Pass data to Step 3
    navigation.navigate("EmployeeStep3", { ...prevData, email });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer} 
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
              <Icon name="arrow-left" size={24} color="#1c005e" />
            </TouchableOpacity>
            <Text style={styles.stepIndicator}>Step 2 of 4</Text>
          </View>

          {/* Progress Bar (50%) */}
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: "50%" }]} />
          </View>

          {/* Main Content */}
          <View style={styles.content}>
            <View style={styles.iconCircle}>
                <Icon name="email-check-outline" size={32} color="#1c005e" />
            </View>

            <Text style={styles.title}>Email Address</Text>
            <Text style={styles.subtitle}>
              We'll send important job alerts and interview schedules here.
            </Text>

            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Official Email ID</Text>
              <View style={styles.rowInput}>
                <TextInput
                  style={[styles.input, styles.inputFlex]}
                  placeholder="john@example.com"
                  placeholderTextColor="#999"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={(t) => { 
                    setIsVerified(false); 
                    setEmail(t); 
                  }}
                  editable={!isVerified}
                />
                <TouchableOpacity 
                  style={[styles.verifyBtn, isVerified && styles.verifiedBtn]} 
                  onPress={handleVerifyLink}
                  disabled={isVerified}
                >
                  {isVerified ? (
                     <View style={{flexDirection:'row', alignItems:'center'}}>
                         <Icon name="check-circle" size={16} color="#fff" />
                         <Text style={[styles.verifyText, {marginLeft: 4}]}>Verified</Text>
                    </View>
                  ) : (
                    <Text style={styles.verifyText}>Verify Link</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity 
              style={[styles.nextBtn, !isVerified && styles.disabledBtn]} 
              onPress={handleNext} 
              disabled={!isVerified}
            >
              <Text style={styles.nextText}>Next Step</Text>
              <Icon name="arrow-right" size={20} color="#fff" />
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
  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 15,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#f3e5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  stepIndicator: { fontWeight: "700", color: "#666", fontSize: 14 },
  // Progress
  progressBarBg: { height: 6, backgroundColor: "#F0F0F0", marginHorizontal: 24, borderRadius: 3, marginBottom: 20 },
  progressBarFill: { height: "100%", backgroundColor: "#1c005e", borderRadius: 3 },
  // Content
  content: { paddingHorizontal: 24, flex: 1 },
  iconCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: "#f3e5f5", justifyContent: "center", alignItems: "center", marginBottom: 15 },
  title: { fontSize: 28, fontWeight: "800", color: "#1c005e", marginBottom: 8 },
  subtitle: { fontSize: 16, color: "#666", marginBottom: 30, lineHeight: 22 },
  // Inputs
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: "700", color: "#333", marginBottom: 8 },
  input: { borderWidth: 1, borderColor: "#E0E0E0", borderRadius: 12, paddingVertical: 14, paddingHorizontal: 16, fontSize: 16, color: "#000", backgroundColor: "#FAFAFA" },
  rowInput: { flexDirection: "row", alignItems: "center" },
  inputFlex: { flex: 1, borderTopRightRadius: 0, borderBottomRightRadius: 0, borderRightWidth: 0 },
  verifyBtn: { backgroundColor: "#1c005e", paddingHorizontal: 16, height: 57, justifyContent: "center", alignItems: "center", borderTopRightRadius: 12, borderBottomRightRadius: 12 },
  verifiedBtn: { backgroundColor: "#10B981" },
  verifyText: { color: "#fff", fontWeight: "700", fontSize: 13 },
  // Footer
  footer: { padding: 24, marginTop: "auto" },
  nextBtn: { backgroundColor: "#1c005e", flexDirection: "row", justifyContent: "center", alignItems: "center", paddingVertical: 18, borderRadius: 16, shadowColor: "#1c005e", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
  disabledBtn: { backgroundColor: "#A0A0A0", shadowOpacity: 0, elevation: 0 },
  nextText: { color: "#fff", fontSize: 16, fontWeight: "bold", marginRight: 8 },
});