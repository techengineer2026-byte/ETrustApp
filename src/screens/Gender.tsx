import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Platform,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

type GenderNavProp = NativeStackNavigationProp<RootStackParamList, "Gender">;

export default function GenderScreen() {
  const navigation = useNavigation<GenderNavProp>();
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [showOnProfile, setShowOnProfile] = useState(false);

  const genders = [
    { label: "Man", icon: "male-outline", activeIcon: "male" },
    { label: "Woman", icon: "female-outline", activeIcon: "female" },
    { label: "Beyond Binary", icon: "prism-outline", activeIcon: "prism" },
  ];

  const handleNext = () => {
    if (!selectedGender) return;
    navigation.navigate("EducationForm");
  };

  return (
    <ImageBackground
      source={require("../assets/bg.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          {/* Header Section */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icon name="chevron-back" size={28} color="#000" />
          </TouchableOpacity>

          <Text style={styles.title}>What’s your gender?</Text>

          <Text style={styles.desc}>
            Select what describes you best. This helps us find the right matches for you.
          </Text>

          {/* Gender Cards */}
          <View style={styles.optionsContainer}>
            {genders.map((item) => {
              const isSelected = selectedGender === item.label;
              return (
                <TouchableOpacity
                  key={item.label}
                  activeOpacity={0.7}
                  style={[
                    styles.optionCard,
                    isSelected && styles.optionCardSelected,
                  ]}
                  onPress={() => setSelectedGender(item.label)}
                >
                  <View style={styles.optionContent}>
                    {/* Left Icon */}
                    <View
                      style={[
                        styles.iconContainer,
                        isSelected && styles.iconContainerSelected,
                      ]}
                    >
                      <Icon
                        name={isSelected ? item.activeIcon : item.icon}
                        size={24}
                        color={isSelected ? "#fff" : "#000"}
                      />
                    </View>

                    {/* Text */}
                    <Text
                      style={[
                        styles.optionText,
                        isSelected && styles.optionTextSelected,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </View>

                  {/* Right Checkmark */}
                  {isSelected && (
                    <Icon name="checkmark-circle" size={24} color="#000" />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Footer Section */}
        <View style={styles.bottomContainer}>
          {/* Checkbox Row */}
          <TouchableOpacity 
            style={styles.checkboxRow} 
            activeOpacity={1}
            onPress={() => setShowOnProfile(!showOnProfile)}
          >
            <View style={{ transform: [{ scale: 0.9 }] }}>
              <CheckBox
                value={showOnProfile}
                onValueChange={setShowOnProfile}
                tintColors={{ true: "#000", false: "#555" }}
                boxType="square"
                onCheckColor="#fff"
                onFillColor="#000"
                onTintColor="#000"
                style={Platform.OS === 'ios' ? { width: 20, height: 20, marginRight: 10 } : {}}
              />
            </View>
            <Text style={styles.checkboxLabel}>Show gender on my profile</Text>
          </TouchableOpacity>

          {/* Next Button (Style matched to previous screens) */}
          <TouchableOpacity
            style={[
              styles.nextButton,
              { opacity: selectedGender ? 1 : 0.5 },
            ]}
            disabled={!selectedGender}
            onPress={handleNext}
          >
            <Text style={styles.nextButtonText}>Next</Text>
            <Icon name="arrow-forward" size={20} color="#fff" style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  background: { flex: 1 },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  backButton: {
    marginBottom: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    // alignItems: "center", // Uncomment if you want it centered in a circle
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#000",
    marginBottom: 10,
  },
  desc: {
    fontSize: 15,
    color: "#444",
    marginBottom: 30,
    lineHeight: 22,
    fontWeight: "400",
  },
  optionsContainer: {
    gap: 16, // Adds space between items (React Native 0.71+)
  },
  
  // --- CARD STYLES ---
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Semi-transparent white
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "transparent", // Invisible border by default
    // Shadow for depth
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  optionCardSelected: {
    backgroundColor: "#fff",
    borderColor: "#000", // Black border when selected
    shadowOpacity: 0.15,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  iconContainerSelected: {
    backgroundColor: "#000", // Black circle when selected
  },
  optionText: {
    fontSize: 17,
    color: "#333",
    fontWeight: "500",
  },
  optionTextSelected: {
    color: "#000",
    fontWeight: "700",
  },

  // --- FOOTER STYLES ---
  bottomContainer: {
    paddingHorizontal: 24,
    paddingBottom: 10, // Small padding at bottom
    justifyContent: "flex-end",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    opacity: 0.9,
  },
  checkboxLabel: {
    fontSize: 15,
    color: "#000",
    fontWeight: "500",
    marginLeft: Platform.OS === 'android' ? 0 : 0, 
  },
  nextButton: {
    backgroundColor: "#000",
    borderRadius: 30, // Rounded corners
    paddingVertical: 18, // Nice height
    width: "100%", // Full width
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});