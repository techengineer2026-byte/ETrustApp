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
type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Welcome"
>;
const WelcomeScreen = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  return (
    <ImageBackground
      source={require("../assets/bg.jpg")} // background image
      style={styles.background}
      resizeMode="cover"
    >
      {/* Logo Section */}
      <View >
        <Image
          source={require("../assets/logo.png")} // your logo
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Center Icon */}
      <Image
        source={require("../assets/logo1.png")} // optional center image
        style={styles.centerImage}
        resizeMode="contain"
      />

      {/* Text */}
      <Text style={styles.infoText}>
        By tapping “Create account” or “Sign in”, you agree to our Terms. Learn
        how we process your data in our Privacy Policy and Cookies Policy.
      </Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}> 
        <TouchableOpacity
          style={styles.button} onPress={() => navigation.navigate("Employeeuser")}
        >
          <Text style={styles.buttonText}>EMPLOYEE</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Employeruser")}
          style={styles.button} 
        >
          <Text style={styles.buttonText}>EMPLOYER</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button} onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>ET CENTER</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("PhoneNumber")}>
          <Text style={styles.linkText}>Sign up </Text>
        </TouchableOpacity>
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
    width: 350,
    height: 190,
  },
  centerImage: {
    width: 130,
    height: 130,
  },
  infoText: {
    color: "#000000ff",
    textAlign: "center",
    paddingHorizontal: 15,
    fontSize: 14,
    lineHeight: 20,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 25,
  },

  button: {
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

  buttonText: {
    color: "#1c005e",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  linkText: {
    color: "#0f0047ff",
    marginTop: 20,
    textDecorationLine: "underline",
    fontSize: 19,
  },
});

export default WelcomeScreen;
