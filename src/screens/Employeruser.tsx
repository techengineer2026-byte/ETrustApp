// src/screens/Employeruser.tsx

import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  StatusBar,
  Animated, // Import Animated
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function EmployerUser() {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // --- PASSWORD VISIBILITY STATE ---
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // --- TOAST STATE & ANIMATION ---
  const [toastMessage, setToastMessage] = useState("");
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const showToast = (message: string) => {
    setToastMessage(message);
    // Fade In
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Wait 3 seconds, then Fade Out
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setToastMessage(""));
    }, 3000);
  };
  // -------------------------------

  const handleLogin = () => {
    if (!email || !password) {
      showToast("Please enter your company email and password.");
      return;
    }
    console.log("Employer Login:", email);
    navigation.navigate("UploadLogo");
  };

  return (
    <ImageBackground
      source={require("../assets/bg.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar barStyle="light-content" />

          {/* --- CUSTOM ERROR TOAST (Added this) --- */}
          {toastMessage ? (
            <Animated.View style={[styles.toastContainer, { opacity: fadeAnim }]}>
              <Icon name="alert-circle-outline" size={24} color="#fff" />
              <Text style={styles.toastText}>{toastMessage}</Text>
            </Animated.View>
          ) : null}

          {/* BACK BUTTON */}
          <View style={styles.navBar}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backBtn}
            >
              <Icon name="arrow-left" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <ScrollView
              contentContainerStyle={styles.scrollContainer}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.headerContainer}>
                <View style={styles.logoWrapper}>
                  <Image
                    source={require("../assets/logo.png")}
                    style={styles.logo}
                    resizeMode="contain"
                  />
                </View>
              </View>

              <View style={styles.titleContainer}>
                <Text style={styles.title}>Employer Portal</Text>
                <Text style={styles.subtitle}>Login to hire top talent</Text>
              </View>

              <View style={styles.formContainer}>

                {/* Email Input */}
                <View style={styles.inputWrapper}>
                  <Icon name="domain" size={22} color="#1c005e" style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Company Email / Username"
                    placeholderTextColor="#999"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                {/* Password Input with Toggle */}
                <View style={styles.inputWrapper}>
                  <Icon name="lock-outline" size={22} color="#1c005e" style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    placeholderTextColor="#999"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!isPasswordVisible} // Toggle visibility logic
                  />
                  {/* Eye Icon Button (Moved inside wrapper) */}
                  <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                    <Icon
                      name={isPasswordVisible ? "eye" : "eye-off"}
                      size={22}
                      color="#888"
                    />
                  </TouchableOpacity>
                </View>

                {/* <TouchableOpacity style={styles.forgotBtn} onPress={() => navigation.navigate("EmployerBottomNav")}> */}
                <TouchableOpacity style={styles.forgotBtn} onPress={() => navigation.navigate("ForgotPassword")}>
                  <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.loginButton} onPress={handleLogin} activeOpacity={0.8}>
                  <Text style={styles.loginButtonText}>Sign in</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.footer}>
                <Text style={styles.footerText}>New Company? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("CompanyScreen")}>
                  <Text style={styles.registerText}>Register Here</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1 },
  safeArea: { flex: 1 },

  // Back Button Styles
  navBar: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 10,
    zIndex: 10,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.31)",
    alignItems: "center",
    justifyContent: "center",
  },

  scrollContainer: { flexGrow: 1, alignItems: "center", paddingBottom: 30 },
  headerContainer: { width: "100%", alignItems: "center", marginBottom: 30, marginTop: 10 },
  logoWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: width * 0.85,
    alignItems: "center",
  },
  logo: {
    width: 400,
    height: 105,
  },
  titleContainer: { alignItems: "center", marginBottom: 30 },
  title: { fontSize: 28, fontWeight: "bold", color: "#fff", marginBottom: 5 },
  subtitle: { fontSize: 16, color: "#e0e0e0", opacity: 0.9 },

  formContainer: { width: "100%", paddingHorizontal: 25, alignItems: "center" },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    width: "100%",
    height: 55,
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 15,
    elevation: 2,
  },
  inputIcon: { marginRight: 10, opacity: 0.7 },
  textInput: { flex: 1, fontSize: 16, color: "#333", height: "100%" },

  forgotBtn: { width: "100%", alignItems: "flex-end", marginBottom: 25 },
  forgotText: { color: "#fff", fontWeight: "600", fontSize: 14, textDecorationLine: "underline" },

  loginButton: {
    width: "100%",
    backgroundColor: "#ffffff",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  loginButtonText: { color: "#1c005e", fontWeight: "800", fontSize: 16, letterSpacing: 1 },

  footer: { flexDirection: "row", marginTop: 40, alignItems: "center" },
  footerText: { color: "#e0e0e0", fontSize: 15 },
  registerText: { color: "#fff", fontWeight: "bold", fontSize: 15, textDecorationLine: "underline" },

  // --- TOAST STYLES (Added these) ---
  toastContainer: {
    position: "absolute",
    top: 60,
    left: 20,
    right: 20,
    backgroundColor: "#FF5252",
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    elevation: 10,
    zIndex: 1000,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  toastText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 10,
    flex: 1,
  },
});