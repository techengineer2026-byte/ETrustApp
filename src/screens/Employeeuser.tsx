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

          {/* Title */}
          <Text style={styles.title} allowFontScaling={false}>
            Employee
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
                allowFontScaling={false}
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
                allowFontScaling={false}
              />
            </View>

            {/* Forgot Password - Updated text to "Forgot" */}
            <TouchableOpacity style={styles.forgotBtn}>
              <Text style={styles.forgotText} allowFontScaling={false}>
                Forgot password
              </Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text
                style={styles.loginButtonText}
                allowFontScaling={false}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
              >
                LOGIN
              </Text>
            </TouchableOpacity>

            {/* Divider with Circle (Replaced "OR" text) */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* One Time Click Button - Updated Text to "CLICK ONE" */}
            <TouchableOpacity
              style={styles.oneTimeButton}
              onPress={() => {
                navigation.navigate("PhoneNumber");
              }}
            >
              <Text style={styles.oneTimeButtonText} allowFontScaling={false}>
                CLICK ONE
              </Text>
            </TouchableOpacity>

          </View>

          {/* Footer - Updated Text to "Sign" */}
          <View style={styles.footer}>
            <Text style={styles.footerText} allowFontScaling={false}>
              Don't have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("EmployeeStep1")}>
              <Text style={styles.registerText} allowFontScaling={false}>
                Sign
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
    backgroundColor: 'rgba(0,0,0,0.1)', 
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
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 15,
    width: width * 0.85,
    elevation: 5,
  },
  logo: {
    width: '100%',
    height: height * 0.08, // Adjusted slightly to fit card better
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#f0f0f0",
    marginBottom: height * 0.04,
    textAlign: "center",
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
    height: '100%',
  },
  forgotBtn: {
    width: width * 0.85,
    alignItems: "flex-end",
    marginBottom: 20,
    paddingRight: 10,
  },
  forgotText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  loginButton: {
    width: width * 0.85,
    backgroundColor: "#1c005e",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: 'center',
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
  
  // New Styles for the Circle Divider
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: width * 0.85,
    marginVertical: 30,
    justifyContent: 'center',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  dividerText: {
    borderRadius: 6,
    marginHorizontal: 10,
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },

  oneTimeButton: {
    width: width * 0.85,
    backgroundColor: "rgba(255,255,255,0.15)", // Slightly more transparent
    borderWidth: 1.5,
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
    textTransform: 'uppercase',
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
    color: "#fff",
    fontSize: 15,
  },
  registerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    textDecorationLine: 'underline',
  },
});

export default EmployeeLogin;