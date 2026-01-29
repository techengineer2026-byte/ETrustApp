// src/screens/ForgetPassword/ForgotPasswordScreen.tsx

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
  Animated,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native"; // ✅ Added imports
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../../types/navigation"; // ✅ Import types

const { width } = Dimensions.get("window");

// ✅ Define Route Type
type ForgotPassRoute = RouteProp<RootStackParamList, 'ForgotPassword'>;

const ForgotPassword = () => {
  const navigation = useNavigation<any>();
  
  // ✅ Get Route Params
  const route = useRoute<ForgotPassRoute>();
  const source = route.params?.source; 

  const [email, setEmail] = useState("");

  // --- TOAST STATE & ANIMATION ---
  const [toastMessage, setToastMessage] = useState("");
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const showToast = (message: string) => {
    setToastMessage(message);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setToastMessage(""));
    }, 3000);
  };
  // -------------------------------

  const handleSendCode = () => {
    if (!email) {
      showToast("Please enter your email address.");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      showToast("Please enter a valid email address.");
      return;
    }

    console.log("Sending OTP to:", email);

    // ✅ Pass 'source' to the next screen (OTPScreen)
    navigation.navigate("OTPScreen", { 
        email: email,
        source: source // Pass it along
    });
  };

  return (
    <ImageBackground
      source={require("../../assets/bg.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.safeArea}>

          {/* --- CUSTOM ERROR TOAST --- */}
          {toastMessage ? (
            <Animated.View style={[styles.toastContainer, { opacity: fadeAnim }]}>
              <Icon name="alert-circle-outline" size={24} color="#fff" />
              <Text style={styles.toastText}>{toastMessage}</Text>
            </Animated.View>
          ) : null}

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
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <View style={styles.logoWrapper}>
                <Image
                  source={require("../../assets/logo.png")}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>

              <Text style={styles.title}>Forgot Password?</Text>
              <Text style={styles.subtitle}>
                Enter your email to receive a 4-digit verification code.
              </Text>

              <View style={styles.formContainer}>
                <View style={styles.inputWrapper}>
                  <Icon
                    name="email-outline"
                    size={22}
                    color="#1c005e"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter your email"
                    placeholderTextColor="#999"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <TouchableOpacity style={styles.btn} onPress={handleSendCode}>
                  <Text style={styles.btnText}>SEND CODE</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

// ... Styles remain exactly the same as your code ...
const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1, backgroundColor: "rgba(0, 0, 0, 0.1)" },
  safeArea: { flex: 1 },
  navBar: { paddingHorizontal: 20, marginTop: 10 },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: { flexGrow: 1, alignItems: "center", paddingBottom: 30 },
  logoWrapper: {
    padding: 10,
    borderRadius: 20,
    width: width * 0.85,
    alignItems: "center",
    marginBottom: 40,
    marginTop: 20,
  },
  logo: {
    width: 400,
    height: 105,
  },
  title: { fontSize: 28, fontWeight: "bold", color: "#fff", marginBottom: 10 },
  subtitle: {
    fontSize: 15,
    color: "#e0e0e0",
    textAlign: "center",
    paddingHorizontal: 40,
    marginBottom: 30,
  },
  formContainer: { width: "100%", paddingHorizontal: 25 },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    height: 55,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  inputIcon: { marginRight: 10 },
  textInput: { flex: 1, fontSize: 16, color: "#333", height: "100%" },
  btn: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    width: "100%",
    elevation: 5,
  },
  btnText: { color: "#1c005e", fontWeight: "800", fontSize: 16 },
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

export default ForgotPassword;