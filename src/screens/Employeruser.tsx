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
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const { width, height } = Dimensions.get("window");

export default function EmployerUser() {
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Missing Info", "Please enter your company email and password.");
      return;
    }
    console.log("Employer Login:", email);
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
          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>Employer Portal</Text>
          <Text style={styles.subtitle}>Login to hire top talent</Text>

          {/* Form Container */}
          <View style={styles.formContainer}>

            {/* Company Email Input */}
            <View style={styles.inputWrapper}>
              <Icon name="domain" size={24} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Company Email / Username"
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
            <Text style={styles.footerText}>New Company? </Text>
            {/* 👇 UPDATED THIS LINE 👇 */}
            <TouchableOpacity onPress={() => navigation.navigate("CompanyScreen")}>
              <Text style={styles.registerText}>Register Here</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: height * 0.08,
    paddingBottom: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  logo: {
    width: width * 0.6,
    height: height * 0.15,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#0f172a",
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
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: width * 0.85,
    backgroundColor: "#fff",
    height: 55,
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
  forgotBtn: {
    width: width * 0.85,
    alignItems: "flex-end",
    marginBottom: 20,
    paddingRight: 10,
  },
  forgotText: {
    color: "#0f172a",
    fontWeight: "600",
    fontSize: 14,
  },
  loginButton: {
    width: width * 0.85,
    backgroundColor: "#0f172a",
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
  footer: {
    flexDirection: "row",
    marginTop: "auto",
    paddingTop: height * 0.05,
    marginBottom: 20,
  },
  footerText: {
    color: "#333",
    fontSize: 15,
  },
  registerText: {
    color: "#0f172a",
    fontWeight: "bold",
    fontSize: 15,
  },
});