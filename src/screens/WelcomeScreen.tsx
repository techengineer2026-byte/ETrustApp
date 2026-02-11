// src/screens/WelcomeScreen.tsx

import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
  StatusBar,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Welcome"
>;

const WelcomeScreen = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  return (
    <ImageBackground
      source={require("../assets/bg.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Dark Overlay to make text readable */}
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="light-content" />

          {/* TOP SECTION: Logo */}
          <View style={styles.headerContainer}>
            <View style={styles.logoWrapper}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
          </View>

          {/* MIDDLE SECTION: Hero Image */}
          <View style={styles.heroContainer}>
            <Image
              source={require("../assets/logo1.png")}
              style={styles.heroImage}
              resizeMode="contain"
            />
          </View>

          {/* BOTTOM SECTION: Content & Buttons */}
          <View style={styles.bottomContainer}>
            <Text style={styles.infoText}>
              By tapping “Create account” or “Sign in”, you agree to our Terms.
              Learn how we process your data in our Privacy Policy.
            </Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={() => navigation.navigate("Employeeuser")}
              >
                <Text style={styles.buttonText}>EMPLOYEE</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={() => navigation.navigate("Employeruser")}
              >
                <Text style={styles.buttonText}>EMPLOYER</Text>
              </TouchableOpacity>

              {/* Secondary Style for ET Center to differentiate it */}
              <TouchableOpacity
                style={[styles.button]}
                activeOpacity={0.8}
                onPress={() => navigation.navigate("ETcenteruser")}
              >
                <Text style={styles.buttonText}>
                  ET CENTER
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Platform.OS === "android" ? 40 : 0,
    
  },

  /* HEADER */
  headerContainer: {
    width: "100%",
    alignItems: "center",
  },
  logoWrapper: {
    // backgroundColor: "rgba(248, 76, 76, 0.97)", // Semi-transparent white
    paddingVertical: 10,
    paddingHorizontal: 20,
    // borderRadius: 20,
    width: width * 0.9,
    alignItems: "center",
    // elevation: 5,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    //shadowRadius: 4,
  },
  logo: {
    width: 400,
    height: 105,
  },

  /* HERO IMAGE */
  heroContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heroImage: {
    width: width * 0.5,
    height: width * 0.5,
    opacity: 0.9,
  },

  /* BOTTOM SECTION */
  bottomContainer: {
    width: "100%",
    alignItems: "center",
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  infoText: {
    color: "#ffffffff", // Light gray for readability
    textAlign: "center",
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 25,
    opacity: 0.8,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    gap: 15, // Creates space between buttons (React Native 0.71+)
  },
  button: {
    width: "90%",
    backgroundColor: "#ffffff",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    // Shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginBottom: 10, // Fallback for older RN versions without 'gap'
  },
  buttonText: {
    color: "#1c005e",
    fontWeight: "800",
    fontSize: 16,
    letterSpacing: 1,
  },
  
  // Optional: Different style for the last button
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#ffffff",
    elevation: 0,
  },
  secondaryButtonText: {
    color: "#ffffff",
  },
});

export default WelcomeScreen;
