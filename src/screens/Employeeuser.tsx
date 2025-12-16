import React, { useState } from "react";
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
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // Make sure to install vector icons or use Images

const { width, height } = Dimensions.get("window");

const EmployeeLogin = () => {
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Missing Info", "Please enter both email and password.");
      return;
    }
    // Navigate to your main employee dashboard
    console.log("Employee Login:", email);
    navigation.replace("MainTabs"); 
  };

  return (
    <ImageBackground
      source={require("../assets/bg.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, width: "100%" }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo Section (Same as LoginScreen) */}
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>Employee Login</Text>
          <Text style={styles.subtitle}>Sign in to manage jobs</Text>

          {/* Form Container */}
          <View style={styles.formContainer}>
            
            {/* Email Input */}
            <View style={styles.inputWrapper}>
              <Icon name="email-outline" size={24} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Email Address"
                placeholderTextColor="#888"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputWrapper}>
              <Icon name="lock-outline" size={24} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Password"
                placeholderTextColor="#888"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            {/* Forgot Password */}
            <TouchableOpacity style={styles.forgotBtn}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>LOGIN</Text>
            </TouchableOpacity>
          </View>

          {/* Footer (Register) */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("EmployeeRegister")}>
              <Text style={styles.registerText}>Sign Up</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: height * 0.08, // Matches LoginScreen padding
    paddingBottom: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  logo: {
    width: width * 0.6,
    height: height * 0.15, // Slightly smaller than Splash to fit form
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1c005e",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: height * 0.04,
    marginTop: 5,
  },
  formContainer: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  // --- Input Styling (Looks like the social buttons) ---
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: width * 0.85, // 85% width
    backgroundColor: "#fff",
    height: 55, // Fixed height for consistency
    borderRadius: 30,
    marginBottom: 15,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  // --- Button Styling ---
  forgotBtn: {
    width: width * 0.85,
    alignItems: "flex-end",
    marginBottom: 20,
    paddingRight: 10,
  },
  forgotText: {
    color: "#1c005e",
    fontWeight: "600",
    fontSize: 14,
  },
  loginButton: {
    width: width * 0.85,
    backgroundColor: "#1c005e", // Dark Blue/Purple from Logo
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 1,
  },
  // --- Footer ---
  footer: {
    flexDirection: "row",
    marginTop: "auto", // Pushes to bottom if space allows
    paddingTop: height * 0.05,
    marginBottom: 20,
  },
  footerText: {
    color: "#333",
    fontSize: 15,
  },
  registerText: {
    color: "#1c005e",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default EmployeeLogin;