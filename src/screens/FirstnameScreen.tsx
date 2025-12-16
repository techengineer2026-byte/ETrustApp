import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import Icon from "react-native-vector-icons/Ionicons";

type FirstNameNavProp = NativeStackNavigationProp<
  RootStackParamList,
  "Firstname"
>;

export default function FirstnameScreen() {
  const navigation = useNavigation<FirstNameNavProp>();
  const [firstName, setFirstName] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleNext = () => {
    if (firstName.trim().length === 0) return;
    setShowPopup(true); // show the popup instead of navigate
  };

  const handleGo = () => {
    setShowPopup(false);
    navigation.navigate("BDAY"); // go to birthday screen
  };

  const handleEdit = () => {
    setShowPopup(false);
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

      {/* Popup Modal */}
      <Modal
        visible={showPopup}
        transparent
        animationType="fade"
        onRequestClose={() => setShowPopup(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.popup}>
            <Text style={styles.wave}>👋</Text>
            <Text style={styles.welcome}>Welcome, {firstName}!</Text>
            <Text style={styles.subtitle}>
              There’s a lot to discover out there.{"\n"}
              But let’s get your profile set up first.
            </Text>

            <TouchableOpacity style={styles.goButton} onPress={handleGo}>
              <Text style={styles.goButtonText}>Let’s go</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleEdit}>
              <Text style={styles.editText}>Edit name</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  backButton: { marginBottom: 20 },
  title: { fontSize: 24, fontWeight: "700", color: "#000", marginBottom: 40 },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    fontSize: 18,
    color: "#000",
    paddingVertical: 8,
    marginBottom: 20,
  },
  helperText: { fontSize: 14, color: "#555", lineHeight: 20 },
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
  nextButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },

  // Popup styles
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    width: "80%",
  },
  wave: { fontSize: 40, marginBottom: 10 },
  welcome: { fontSize: 20, fontWeight: "700", color: "#000", marginBottom: 10 },
  subtitle: {
    textAlign: "center",
    fontSize: 14,
    color: "#555",
    marginBottom: 25,
    lineHeight: 20,
  },
  goButton: {
    backgroundColor: "#000",
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 40,
    marginBottom: 10,
  },
  goButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  editText: { color: "#000", fontSize: 14, fontWeight: "500" },
});
