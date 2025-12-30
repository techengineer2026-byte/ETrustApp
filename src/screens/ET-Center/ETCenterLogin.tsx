import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
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

export default function ETCenterLogin() {
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
      showToast("Please enter your official ID and password."); // Replaced Alert
      return;
    }
    console.log("ET Center Logged In");
    navigation.replace("MainTabs");
  };

  return (
    <ImageBackground
      source={require("../../assets/bg.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Dark Overlay for readability */}
      <View style={styles.overlay}>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar barStyle="light-content" />

          {/* --- CUSTOM ERROR TOAST --- */}
          {toastMessage ? (
            <Animated.View style={[styles.toastContainer, { opacity: fadeAnim }]}>
              <Icon name="alert-circle-outline" size={24} color="#fff" />
              <Text style={styles.toastText}>{toastMessage}</Text>
            </Animated.View>
          ) : null}

          {/* BACK BUTTON SECTION */}
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
              
              {/* HEADER: Logo */}
              <View style={styles.headerContainer}>
                <View style={styles.logoWrapper}>
                  <Image
                    source={require("../../assets/logo.png")}
                    style={styles.logo}
                    resizeMode="contain"
                  />
                </View>
              </View>

              {/* Title Section */}
              <View style={styles.titleContainer}>
                <Text style={styles.title}>ET Center Access</Text>
                <Text style={styles.subtitle}>Authorized Personnel Only</Text>
              </View>

              {/* FORM SECTION */}
              <View style={styles.formContainer}>
                
                {/* Email/ID Input */}
                <View style={styles.inputWrapper}>
                  <Icon
                    name="badge-account-horizontal-outline"
                    size={22}
                    color="#1c005e"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Official Center ID / Email"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>

                {/* Password Input with Toggle */}
                <View style={styles.inputWrapper}>
                  <Icon
                    name="lock-outline"
                    size={22}
                    color="#1c005e"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    placeholderTextColor="#999"
                    secureTextEntry={!isPasswordVisible} // Toggle visibility
                    value={password}
                    onChangeText={setPassword}
                  />
                  {/* Eye Icon Button */}
                  <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                    <Icon 
                      name={isPasswordVisible ? "eye" : "eye-off"} 
                      size={22} 
                      color="#888" 
                    />
                  </TouchableOpacity>
                </View>

                {/* Forgot Password */}
                <TouchableOpacity style={styles.forgotBtn} onPress={() => navigation.navigate("ForgotPassword")}>
                  <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>



                {/* PRIMARY BUTTON: Login */}
                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={handleLogin}
                  activeOpacity={0.8}
                >
                  <Text style={styles.loginButtonText}>SECURE LOGIN</Text>
                  <Icon
                    name="shield-check"
                    size={18}
                    color="#1c005e"
                    style={{ marginLeft: 8 }}
                  />
                </TouchableOpacity>
              </View>

              {/* FOOTER */}
              <View style={styles.footer}>
                <Text style={styles.footerText}>New Center? </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("ETCenterStep1")}
                >
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
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  
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
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },

  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: 30,
    paddingTop: 10,
  },

  /* HEADER LOGO */
  headerContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 30,
    marginTop: 10,
  },
  logoWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: width * 0.85,
    alignItems: "center",
  },
  logo: {
    width: 400,
    height: 105,
  },

  /* TITLES */
  titleContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: "#e0e0e0",
    opacity: 0.9,
  },

  /* FORM AREA */
  formContainer: {
    width: "100%",
    paddingHorizontal: 25,
    alignItems: "center",
  },
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
  inputIcon: {
    marginRight: 10,
    opacity: 0.7,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    height: "100%",
  },

  /* FORGOT PASSWORD */
  forgotBtn: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 20,
  },
  forgotText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
    textDecorationLine: "underline",
  },

  /* SESSION INFO BOX (Glass Effect) */
  sessionInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Semi-transparent
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    padding: 12,
    borderRadius: 12,
    marginBottom: 25,
    width: "100%",
  },
  sessionTitle: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
  sessionSub: {
    color: "#e0e0e0",
    fontSize: 12,
    marginTop: 2,
  },

  /* BUTTONS */
  loginButton: {
    width: "100%",
    backgroundColor: "#ffffff",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  loginButtonText: {
    color: "#1c005e",
    fontWeight: "800",
    fontSize: 16,
    letterSpacing: 1,
  },

  /* FOOTER */
  footer: {
    flexDirection: "row",
    marginTop: 40,
    alignItems: "center",
  },
  footerText: {
    color: "#e0e0e0",
    fontSize: 15,
  },
  registerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    textDecorationLine: "underline",
  },

  // --- TOAST STYLES ---
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