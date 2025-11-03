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
import { RootStackParamList } from "../navigation/AppNavigator";

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleGoogleLogin = () => {
    // implement your Google login logic here
    console.log("Google login clicked");
  };

  const handleFacebookLogin = () => {
    // implement your Facebook login logic here
    console.log("Facebook login clicked");
  };

  const handlePhoneLogin = () => {
    // implement your phone login logic here
  navigation.navigate("PhoneNumber");
  };

  return (
    <ImageBackground
      source={require("../assets/bg.png")}
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
            source={require("../assets/facebook.webp")}
            style={styles.icon}
            resizeMode="contain"
          />
          <Text style={styles.loginText}>Continue with Facebook</Text>
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
    paddingTop: 60,
  },
  logo: {
    width: 250,
    height: 140,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1c005e",
    marginVertical: 30,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  loginButton: {
    flexDirection: "row",
    alignItems: "center",
    width: "75%",
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderRadius: 30,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  icon: {
    width: 25,
    height: 25,
    marginLeft: 20,
    marginRight: 15,
  },
  loginText: {
    color: "#1c005e",
    fontWeight: "bold",
    fontSize: 16,
  },
  footer: {
    marginTop: "auto",
    marginBottom: 30,
    paddingHorizontal: 25,
  },
  footerText: {
    color: "#000",
    textAlign: "center",
    fontSize: 13,
    lineHeight: 18,
  },
});

export default LoginScreen;