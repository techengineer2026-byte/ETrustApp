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

const EmployeeLogin = () => {
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Missing Info", "Please enter both email and password.");
      return;
    }
    console.log("Employee Login:", email);
    navigation.replace("MainTabs");
  };

  return (
    <ImageBackground
      source={require("../assets/bg.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Darker overlay to make White text pop and form easier to read */}
      <View style={styles.overlay} />

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

          {/* Title - Changed to White for visibility */}
          <Text style={styles.title} allowFontScaling={false}>
            Employee Login
          </Text>
          <Text style={styles.subtitle} allowFontScaling={false}>
            Sign in to manage jobs
          </Text>

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
                allowFontScaling={false} // Prevents input text from becoming huge
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
                allowFontScaling={false} // Prevents input text from becoming huge
              />
            </View>

            {/* Forgot Password - Changed to White */}
            <TouchableOpacity style={styles.forgotBtn}>
              <Text style={styles.forgotText} allowFontScaling={false}>
                Forgot Password?
              </Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text
                style={styles.loginButtonText}
                allowFontScaling={false} // FIX: Prevents "LOGI" cutoff
                numberOfLines={1}
                adjustsFontSizeToFit={true} // Shrinks text if it's still too big
              >
                LOGIN
              </Text>
            </TouchableOpacity>
            {/* OR Divider */}
            <View style={styles.orContainer}>
              <View style={styles.orLine} />
              <Text style={styles.orText}>OR</Text>
              <View style={styles.orLine} />
            </View>

            {/* One Time Click Button */}
            <TouchableOpacity
              style={styles.oneTimeButton}
              onPress={() => {
                navigation.navigate("PhoneNumber");
              }}
            >
              <Text style={styles.oneTimeButtonText} allowFontScaling={false}>
                CLICK ONE TIME
              </Text>
            </TouchableOpacity>

          </View>

          {/* Footer (Register) - Changed to White */}
          <View style={styles.footer}>
            <Text style={styles.footerText} allowFontScaling={false}>
              Don't have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("EmployeeStep1")}>
              <Text style={styles.registerText} allowFontScaling={false}>
                Sign Up
              </Text>
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.15)', // Adds slight dim to background so text is readable
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
    // Add a white pill behind logo if logo has transparency issues on red bg
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 15,
    width: width * 0.85,
    elevation: 5,
  },
  logo: {
    width: '100%',
    height: height * 0.1,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff", // CHANGED TO WHITE
    textAlign: "center",
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 16,
    color: "#f0f0f0", // CHANGED TO OFF-WHITE
    marginBottom: height * 0.04,
    marginTop: 5,
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: width * 0.85,
    marginVertical: 25,
  },

  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.6)",
  },

  orText: {
    marginHorizontal: 10,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowRadius: 2,
  },

  oneTimeButton: {
    width: width * 0.85,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderWidth: 1,
    borderColor: "#fff",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  oneTimeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
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
    height: '100%', // Ensures input takes full height of wrapper
  },
  forgotBtn: {
    width: width * 0.85,
    alignItems: "flex-end",
    marginBottom: 20,
    paddingRight: 10,
  },
  forgotText: {
    color: "#fff", // CHANGED TO WHITE
    fontWeight: "600",
    fontSize: 14,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowRadius: 2,
  },
  loginButton: {
    width: width * 0.85,
    backgroundColor: "#1c005e",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: 'center', // Ensures text is centered vertically
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: "#fff", // CHANGED TO WHITE
    fontSize: 15,
  },
  registerText: {
    color: "#fff", // CHANGED TO WHITE
    fontWeight: "bold",
    fontSize: 15,
    textDecorationLine: 'underline',
  },
});

export default EmployeeLogin;