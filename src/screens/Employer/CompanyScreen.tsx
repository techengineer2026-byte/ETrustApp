// src/screens/employer/CompanyScreen.tsx

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
  Keyboard,
  ScrollView,
  ImageBackground
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

export default function CompanyScreen() {
  const navigation = useNavigation<any>();
  
  // Form State
  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  
  // UI State
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleNext = () => {
    Keyboard.dismiss();
    if (!companyName.trim() || !contactPerson.trim()) {
      return;
    }
    navigation.navigate("ContactVerification", { companyName, contactPerson });
  };

  return (
    <ImageBackground
      source={require("../../assets/bg.jpg")} // Keeping your BG
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />

        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            {/* --- HEADER --- */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="chevron-back" size={28} color="#000" />
                </TouchableOpacity>
                
                {/* Step Counter */}
                <View style={styles.stepContainer}>
                    <Text style={styles.stepText}>Step 1 of 2</Text>
                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: "50%" }]} />
                    </View>
                </View>
            </View>

            <ScrollView 
                contentContainerStyle={styles.scrollContent} 
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {/* --- TITLE SECTION --- */}
                <View style={styles.titleSection}>
                    <Text style={styles.title}>Company Details</Text>
                    <Text style={styles.subtitle}>
                        Let's start with your organization info.
                    </Text>
                </View>

                {/* --- FORM (No Card, Direct Inputs) --- */}
                <View style={styles.formContainer}>
                    
                    {/* Company Name */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Registered Company Name</Text>
                        <View style={[
                            styles.inputWrapper, 
                            focusedInput === 'company' && styles.inputWrapperFocused
                        ]}>
                            <Icon name="business-outline" size={22} color={focusedInput === 'company' ? "#000" : "#666"} style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Ex. Tech Solutions Pvt Ltd"
                                placeholderTextColor="#999"
                                value={companyName}
                                onChangeText={setCompanyName}
                                onFocus={() => setFocusedInput('company')}
                                onBlur={() => setFocusedInput(null)}
                            />
                        </View>
                    </View>

                    {/* Contact Person */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Person Name</Text>
                        <View style={[
                            styles.inputWrapper, 
                            focusedInput === 'person' && styles.inputWrapperFocused
                        ]}>
                            <Icon name="person-outline" size={22} color={focusedInput === 'person' ? "#000" : "#666"} style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Ex. John Doe (HR Manager)"
                                placeholderTextColor="#999"
                                value={contactPerson}
                                onChangeText={setContactPerson}
                                onFocus={() => setFocusedInput('person')}
                                onBlur={() => setFocusedInput(null)}
                            />
                        </View>
                    </View>

                    {/* Helper Info */}
                    <View style={styles.helperBox}>
                        <Icon name="information-circle-outline" size={20} color="#333" />
                        <Text style={styles.helperText}>
                            This info helps candidates identify you.
                        </Text>
                    </View>

                </View>
            </ScrollView>

            {/* --- BOTTOM BUTTON --- */}
            <View style={styles.bottomContainer}>
                <TouchableOpacity 
                    style={[
                        styles.nextButton,
                        (!companyName || !contactPerson) && styles.nextButtonDisabled
                    ]} 
                    onPress={handleNext}
                    disabled={!companyName || !contactPerson}
                >
                    <Text style={styles.nextText}>Next</Text>
                    <Icon name="arrow-forward" size={20} color="#fff" style={{ marginLeft: 8 }} />
                </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  safeArea: { flex: 1 },

  /* Header */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 10,
    marginBottom: 10,
  },
  backButton: { marginBottom: 5 },
  
  stepContainer: { alignItems: 'flex-end' },
  stepText: { fontSize: 12, fontWeight: "600", color: "#333", marginBottom: 4 },
  progressBar: {
      width: 70,
      height: 5,
      backgroundColor: "rgba(0,0,0,0.1)",
      borderRadius: 3,
  },
  progressFill: {
      height: '100%',
      backgroundColor: "#000",
      borderRadius: 3
  },

  /* Scroll Content */
  scrollContent: { 
      paddingHorizontal: 24,
      paddingTop: 10 
  },

  /* Title */
  titleSection: { marginBottom: 30 },
  title: { 
      fontSize: 30, 
      fontWeight: "800", 
      color: "#000", 
      marginBottom: 8 
  },
  subtitle: { 
      fontSize: 16, 
      color: "#333", 
      lineHeight: 22 
  },

  /* Form */
  formContainer: { marginBottom: 20 },
  
  inputGroup: { marginBottom: 20 },
  
  label: {
      fontSize: 14,
      fontWeight: "700",
      color: "#000",
      marginBottom: 8,
      marginLeft: 4
  },
  
  /* INPUT STYLE - Solid White, No Glass Card behind it */
  inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: "#fff", // Solid white background for input
      borderWidth: 1.5,
      borderColor: "#e0e0e0",
      borderRadius: 16, // Nice rounded corners
      paddingHorizontal: 16,
      height: 60, // Comfortable touch height
      // Shadow to make it pop off the background image
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
  },
  inputWrapperFocused: {
      borderColor: "#000", // Black border when typing
  },
  inputIcon: { marginRight: 12 },
  input: {
      flex: 1,
      fontSize: 16,
      color: "#000",
      fontWeight: "500",
  },

  helperBox: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5,
      paddingHorizontal: 5
  },
  helperText: {
      fontSize: 13,
      color: "#444",
      marginLeft: 8,
      fontWeight: "500"
  },

  /* Footer */
  bottomContainer: {
      paddingHorizontal: 24,
      paddingBottom: 20,
      justifyContent: 'flex-end',
      flex: 1,
  },
  nextButton: {
      backgroundColor: "#000",
      borderRadius: 30,
      paddingVertical: 18,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "100%", // Mobile dimensional width
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 5,
  },
  nextButtonDisabled: {
      backgroundColor: "#999",
      shadowOpacity: 0,
      elevation: 0
  },
  nextText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "700",
  },
});