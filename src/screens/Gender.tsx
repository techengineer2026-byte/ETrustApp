import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  
  StyleSheet,
  Linking,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
type GenderNavProp = NativeStackNavigationProp<RootStackParamList, "Gender">;

export default function GenderScreen() {
  const navigation = useNavigation<GenderNavProp>();
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [showOnProfile, setShowOnProfile] = useState(false);

  const genders = ["Man", "Woman", "Beyond Binary"];

  const handleNext = () => {
    if (!selectedGender) return;
    navigation.navigate("JobType"); // replace with next screen name
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
        <Text style={styles.title}>What’s your gender?</Text>

        {/* Description */}
        <Text style={styles.desc}>
          Select all that describe you to help us show your profile to the right people.
          You can add more details if you’d like.
        </Text>

        {/* Gender options */}
        {genders.map((gender) => (
          <TouchableOpacity
            key={gender}
            style={[
              styles.option,
              selectedGender === gender && styles.optionSelected,
            ]}
            onPress={() => setSelectedGender(gender)}
          >
            <Text
              style={[
                styles.optionText,
                selectedGender === gender && styles.optionTextSelected,
              ]}
            >
              {gender}
            </Text>
          </TouchableOpacity>
        ))}


      </View>

      {/* Bottom Section */}
      <View style={styles.bottomContainer}>
        <View style={styles.checkboxRow}>
          <CheckBox
            value={showOnProfile}
            onValueChange={setShowOnProfile}
            tintColors={{ true: "#000", false: "#999" }}
          />
          <Text style={styles.checkboxLabel}>Show gender on profile</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.nextButton,
            { opacity: selectedGender ? 1 : 0.4 },
          ]}
          disabled={!selectedGender}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
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
  title: { fontSize: 24, fontWeight: "700", color: "#000", marginBottom: 10 },
  desc: {
    fontSize: 14,
    color: "#555",
    marginBottom: 30,
    lineHeight: 20,
  },
  option: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  optionSelected: {
    borderColor: "#000",
    backgroundColor: "#f5f5f5",
  },
  optionText: { fontSize: 16, color: "#000" },
  optionTextSelected: { fontWeight: "600" },
  link: {
    color: "#007AFF",
    fontSize: 14,
    marginTop: 6,
  },
  bottomContainer: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkboxLabel: { fontSize: 14, color: "#000" },
  nextButton: {
    backgroundColor: "#000",
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: "center",
  },
  nextButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
