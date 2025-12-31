import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  ActivityIndicator,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function ETCenterStep1() {
  const navigation = useNavigation<any>();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // Verification
  const [isVerified, setIsVerified] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpCode, setOtpCode] = useState("");

  const handleSendOtp = () => {
    if (!name.trim()) return Alert.alert("Missing Name", "Please enter Representative Name.");
    if (phone.length < 10) return Alert.alert("Invalid Phone", "Enter valid 10-digit number.");
    setShowOtpModal(true);
  };

  const verifyOtp = () => {
    if (otpCode.length !== 4) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowOtpModal(false);
      setIsVerified(true);
    }, 1500);
  };

  const handleNext = () => {
    if (!isVerified) return Alert.alert("Verification Required", "Please verify mobile number.");
    // Navigate to Step 2
    navigation.navigate("ETCenterStep2", { name, phone });
  };

  return (
    <ImageBackground
      source={require("../../assets/bg.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                <Icon name="arrow-left" size={24} color="#1c005e" />
              </TouchableOpacity>
              <Text style={styles.stepIndicator}>Step 1 of 3</Text>
            </View>

            {/* Progress Bar (33%) */}
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: "33%" }]} />
            </View>

            {/* Content */}
            <View style={styles.content}>
              <View style={styles.iconCircle}>
                <Icon name="account-tie" size={32} color="#1c005e" />
              </View>

              <Text style={styles.title}>Owner Details</Text>
              <Text style={styles.subtitle}>Enter details of the Center Representative.</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Representative Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex. Amit Kumar"
                  placeholderTextColor="#999"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Contact Number</Text>
                <View style={styles.rowInput}>
                  <TextInput
                    style={[styles.input, styles.inputFlex]}
                    placeholder="9876543210"
                    placeholderTextColor="#999"
                    keyboardType="number-pad"
                    maxLength={10}
                    value={phone}
                    onChangeText={(t) => { setIsVerified(false); setPhone(t.replace(/[^0-9]/g, "")); }}
                    editable={!isVerified}
                  />
                  <TouchableOpacity
                    style={[styles.verifyBtn, isVerified && styles.verifiedBtn]}
                    onPress={handleSendOtp}
                    disabled={isVerified}
                  >
                    {isVerified ? (
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="check-circle" size={16} color="#fff" />
                        <Text style={[styles.verifyText, { marginLeft: 4 }]}>Verified</Text>
                      </View>
                    ) : (
                      <Text style={styles.verifyText}>Send OTP</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <TouchableOpacity style={[styles.nextBtn, !isVerified && styles.disabledBtn]} onPress={handleNext} disabled={!isVerified}>
                <Text style={styles.nextText}>Next Step</Text>
                <Icon name="arrow-right" size={20} color="#fff" />
              </TouchableOpacity>

              <View style={styles.loginLink}>
                <Text style={{ color: '#666' }}>Already registered? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("ETCenterLogin")}>
                  <Text style={{ color: '#1c005e', fontWeight: 'bold' }}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>

          </ScrollView>
        </KeyboardAvoidingView>

        {/* OTP Modal */}
        <Modal visible={showOtpModal} transparent animationType="slide">
          <View style={styles.modalBg}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>Enter Mobile OTP</Text>
              <Text style={styles.modalSub}>Code sent to {phone}</Text>
              <TextInput style={styles.otpInput} placeholder="1234" keyboardType="number-pad" maxLength={4} value={otpCode} onChangeText={setOtpCode} autoFocus />
              <TouchableOpacity style={styles.modalVerifyBtn} onPress={verifyOtp}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.nextText}>Verify</Text>}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowOtpModal(false)}><Text style={styles.modalCancel}>Cancel</Text></TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ImageBackground>

  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  safeArea: { flex: 1 },
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
  rowInput: { flexDirection: "row", alignItems: "center" },
  inputFlex: { flex: 1, borderTopRightRadius: 0, borderBottomRightRadius: 0, borderRightWidth: 0 },
  verifyBtn: { backgroundColor: "#1c005e", paddingHorizontal: 16, height: 57, justifyContent: "center", alignItems: "center", borderTopRightRadius: 12, borderBottomRightRadius: 12 },
  verifiedBtn: { backgroundColor: "#10B981" },
  verifyText: { color: "#fff", fontWeight: "700", fontSize: 13 },
  footer: { padding: 24, marginTop: "auto" },
  nextBtn: { backgroundColor: "#1c005e", flexDirection: "row", justifyContent: "center", alignItems: "center", paddingVertical: 18, borderRadius: 16, shadowColor: "#1c005e", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
  disabledBtn: { backgroundColor: "#A0A0A0", shadowOpacity: 0, elevation: 0 },
  nextText: { color: "#fff", fontSize: 16, fontWeight: "bold", marginRight: 8 },
  loginLink: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  // Modal
  modalBg: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "center", alignItems: "center" },
  modalCard: { width: "85%", backgroundColor: "#fff", padding: 25, borderRadius: 24, alignItems: "center", elevation: 10 },
  modalTitle: { fontSize: 20, fontWeight: "bold", color: "#1c005e", marginBottom: 8 },
  modalSub: { color: "#666", fontSize: 14, marginBottom: 25 },
  otpInput: { borderWidth: 2, borderColor: "#1c005e", width: "100%", paddingVertical: 12, borderRadius: 12, fontSize: 24, textAlign: "center", letterSpacing: 10, marginBottom: 25, color: "#000", fontWeight: 'bold' },
  modalVerifyBtn: { backgroundColor: "#1c005e", width: "100%", paddingVertical: 15, borderRadius: 12, alignItems: "center", marginBottom: 10 },
  modalCancel: { color: "#888", fontWeight: "600" }
});