import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
type CodeNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "VerificationCode"
>;


export default function HumanVerificationScreen() {
  const navigation = useNavigation<CodeNavigationProp>();

  const handleVerify = () => {
    console.log("Pressed Next"); // confirm click works
    navigation.navigate("VerificationCode");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Logo */}
        <Image
          source={require("../assets/logo.png")} // your logo
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Title */}
        <Text style={styles.title}>Let’s verify you’re human!</Text>

        {/* Recaptcha view */}
        <TouchableOpacity
          style={styles.recaptchaButton}
          onPress={handleVerify}
        >
          <Text style={styles.recaptchaButtonText}>Start Verification</Text>
        </TouchableOpacity>


      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  logo: {
    width: 300,
    height: 70,
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
    marginBottom: 40,
  },
  recaptchaButton: {
    backgroundColor: "#000",
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 40,
  },
  recaptchaButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});