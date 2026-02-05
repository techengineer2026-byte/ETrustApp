// src/screens/LoginScreen.tsx

import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  const handleFacebookLogin = () => {
    navigation.navigate("Welcome");
    
  };

  const handlePhoneLogin = () => {
    navigation.navigate("Welcome");
  };

  return (
    <ImageBackground
      source={require("../assets/bg.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Logo section */}
      <View>
        <Image
          source={require("../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.title}>Sign in to your account</Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={handleGoogleLogin}>
          <Image
            source={require("../assets/google.webp")}
            style={styles.icon}
            resizeMode="contain"
          />
          <Text style={styles.loginText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleFacebookLogin}
        >
          <Image
            source={require("../assets/mail.png")}
            style={styles.icon}
            resizeMode="contain"
          />
          <Text style={styles.loginText}>Continue with mail</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handlePhoneLogin}>
          <Image
            source={require("../assets/phone.png")}
            style={styles.icon}
            resizeMode="contain"
          />
          <Text style={styles.loginText}>Continue with Phone</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          By signing in, you agree to our Terms and acknowledge our Privacy
          Policy.
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: height * 0.08, // 8% from top
  },
  logo: {
    width: 400,
    height: 105,
  },
  title: {
    fontSize: Math.min(width * 0.06, 22), // scales but caps at 22
    fontWeight: "bold",
    color: "#1c005e",
    marginVertical: height * 0.03,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  loginButton: {
    flexDirection: "row",
    alignItems: "center",
    width: width * 0.75, // 75% of screen width
    backgroundColor: "#fff",
    paddingVertical: height * 0.025,
    borderRadius: 30,
    marginVertical: height * 0.01,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  icon: {
    width: width * 0.07, // scales with screen width
    height: width * 0.07,
    marginLeft: width * 0.05,
    marginRight: width * 0.04,
  },
  loginText: {
    color: "#1c005e",
    fontWeight: "bold",
    fontSize: Math.min(width * 0.04, 16),
  },
  footer: {
    marginTop: "auto",
    marginBottom: height * 0.04,
    paddingHorizontal: width * 0.06,
  },
  footerText: {
    color: "#000",
    textAlign: "center",
    fontSize: Math.min(width * 0.035, 13),
    lineHeight: height * 0.025,
  },
});


export default LoginScreen;