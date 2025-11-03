import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import Icon from "react-native-vector-icons/Ionicons";

type FirstNameNavProp = NativeStackNavigationProp<
  RootStackParamList,
  "Firstname"
>;

export default function FirstnameScreen() {
  const navigation = useNavigation<FirstNameNavProp>();
  const [firstName, setFirstName] = useState("");

  const handleNext = () => {
    if (firstName.trim().length === 0) return;
    // Navigate to the next screen, e.g., HumanVerificationScreen
    navigation.navigate("HumanVerification");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Back button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="chevron-back" size={26} color="#000" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>What’s your first name?</Text>

        {/* Input */}
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Your first name"
          placeholderTextColor="#999"
        />

        {/* Helper text */}
        <Text style={styles.helperText}>
          This is how it’ll appear on your profile.{"\n"}
          <Text style={{ fontWeight: "600" }}>Can’t change it later.</Text>
        </Text>
      </View>

      {/* Bottom Next Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            { opacity: firstName.trim().length === 0 ? 0.4 : 1 },
          ]}
          onPress={handleNext}
          disabled={firstName.trim().length === 0}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginBottom: 40,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    fontSize: 18,
    color: "#000",
    paddingVertical: 8,
    marginBottom: 20,
  },
  helperText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
  bottomContainer: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  nextButton: {
    backgroundColor: "#000",
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: "center",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
