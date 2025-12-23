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

export default function EmployeeStep4() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const prevData = route.params; // { name, phone, email, address, city... }

  // --- STATE ---
  const [qualification, setQualification] = useState("");
  const [jobType, setJobType] = useState("Full-Time");
  const [salary, setSalary] = useState("");
  const [resume, setResume] = useState<string | null>(null);

  // --- HANDLERS ---
  const handleResumeUpload = () => {
    // Simulating File Picker
    setResume("Resume_Rahul_Verma.pdf");
    Alert.alert("Upload Successful", "Your resume has been attached.");
  };

  const handleSubmit = () => {
    if (!qualification.trim() || !salary.trim()) {
      return Alert.alert("Missing Info", "Please fill in all professional details.");
    }
    
    // Combine ALL data from previous steps
    const finalData = { 
      ...prevData, 
      qualification, 
      jobType, 
      salary, 
      resume 
    };

    console.log("FINAL EMPLOYEE DATA:", finalData);

    // Success Alert & Navigation
    Alert.alert(
      "Account Created!",
      "Your profile has been set up successfully. Welcome aboard!",
      [
        { 
          text: "Go to Dashboard", 
          onPress: () => navigation.replace("MainTabs") // Navigate to App Home
        }
      ]
    );
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
            <Text style={styles.stepIndicator}>Step 4 of 4</Text>
          </View>

          {/* Progress Bar (100%) */}
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: "100%" }]} />
          </View>

          {/* Main Content */}
          <View style={styles.content}>
            <View style={styles.iconCircle}>
                <Icon name="briefcase-check" size={32} color="#1c005e" />
            </View>

            <Text style={styles.title}>Professional Profile</Text>
            <Text style={styles.subtitle}>
              Help us match you with the best jobs based on your skills.
            </Text>

            {/* Qualification Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Highest Qualification</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex. B.Tech / MBA / 12th Pass"
                placeholderTextColor="#999"
                value={qualification}
                onChangeText={setQualification}
              />
            </View>

            {/* Job Type Selector (Pills) */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Job Type</Text>
              <View style={styles.pillsContainer}>
                {["Full-Time", "Part-Time", "Contract"].map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.pill, 
                      jobType === type && styles.activePill
                    ]}
                    onPress={() => setJobType(type)}
                  >
                    <Text style={[
                      styles.pillText, 
                      jobType === type && styles.activePillText
                    ]}>
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Salary Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Expected Monthly Salary (₹)</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex. 25000"
                placeholderTextColor="#999"
                keyboardType="number-pad"
                value={salary}
                onChangeText={setSalary}
              />
            </View>

            {/* Resume Upload Box */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Upload Resume</Text>
              <TouchableOpacity style={styles.uploadBox} onPress={handleResumeUpload}>
                {resume ? (
                  <View style={styles.uploadContent}>
                    <Icon name="file-check" size={32} color="#10B981" />
                    <Text style={styles.resumeText}>{resume}</Text>
                    <Text style={styles.changeText}>Tap to change</Text>
                  </View>
                ) : (
                  <View style={styles.uploadContent}>
                    <Icon name="cloud-upload" size={32} color="#1c005e" />
                    <Text style={styles.uploadText}>Tap to Upload (PDF/Word)</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={styles.nextText}>Finish Registration</Text>
              <Icon name="check-circle" size={20} color="#fff" />
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
  
  // Custom Components (Pills & Upload)
  pillsContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  pill: { 
    flex: 1, 
    alignItems: 'center', 
    paddingVertical: 12, 
    borderWidth: 1, 
    borderColor: '#E0E0E0', 
    borderRadius: 20, 
    marginHorizontal: 4,
    backgroundColor: '#FAFAFA'
  },
  activePill: { backgroundColor: '#1c005e', borderColor: '#1c005e' },
  pillText: { color: '#666', fontWeight: '600', fontSize: 13 },
  activePillText: { color: '#fff', fontWeight: 'bold' },

  uploadBox: { 
    height: 110, 
    borderStyle: 'dashed', 
    borderWidth: 1.5, 
    borderColor: '#1c005e', 
    borderRadius: 12, 
    backgroundColor: '#f8f4fa', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  uploadContent: { alignItems: 'center' },
  uploadText: { color: "#1c005e", fontWeight: "600", marginTop: 8 },
  resumeText: { color: "#10B981", fontWeight: "bold", marginTop: 5, fontSize: 14 },
  changeText: { color: "#666", fontSize: 11, marginTop: 2 },

  // Footer
  footer: { padding: 24, marginTop: "auto" },
  submitBtn: { backgroundColor: "#1c005e", flexDirection: "row", justifyContent: "center", alignItems: "center", paddingVertical: 18, borderRadius: 16, shadowColor: "#1c005e", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
  nextText: { color: "#fff", fontSize: 16, fontWeight: "bold", marginRight: 8 },
});