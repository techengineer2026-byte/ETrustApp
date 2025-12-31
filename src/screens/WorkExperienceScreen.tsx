import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation"; 
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import Slider from '@react-native-community/slider'; // npm install @react-native-community/slider

type ExpNavProp = NativeStackNavigationProp<RootStackParamList, "WorkExperience">;

export default function WorkExperienceScreen() {
  const navigation = useNavigation<ExpNavProp>();
  const [years, setYears] = useState<number>(0);

  const handleNext = () => {
    // Navigate to next screen
    navigation.navigate("JobProfile"); 
  };

  // Dynamic label based on years
  const getExperienceLevel = (y: number) => {
    if (y === 0) return "Fresher / New Grad";
    if (y >= 1 && y <= 3) return "Junior Level";
    if (y >= 4 && y <= 7) return "Mid-Senior Level";
    if (y >= 8 && y <= 12) return "Senior Level";
    return "Expert / Leadership";
  };

  return (
    <ImageBackground
      source={require("../assets/bg.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Dark Overlay for better contrast */}
      {/* <View style={styles.overlay} /> */}

      <SafeAreaView style={styles.safeArea}>
        
        {/* Header */}
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Icon name="chevron-back" size={26} color="#1F2937" />
            </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Work Experience</Text>
            <Text style={styles.subtitle}>How many years of relevant experience do you have?</Text>
          </View>

          {/* Main Card */}
          <View style={styles.card}>
            
            {/* Big Number Display */}
            <View style={styles.counterContainer}>
              <Text style={styles.counterText}>{years}</Text>
              <Text style={styles.counterLabel}>{years === 1 ? "Year" : "Years"}</Text>
            </View>

            {/* Experience Level Badge */}
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{getExperienceLevel(years)}</Text>
            </View>

            {/* SLIDER COMPONENT */}
            <View style={styles.sliderContainer}>
              <Slider
                style={{width: '100%', height: 40}}
                minimumValue={0}
                maximumValue={20}
                step={1}
                value={years}
                onValueChange={setYears}
                minimumTrackTintColor="#2563EB" // Blue active track
                maximumTrackTintColor="#E5E7EB" // Grey inactive track
                thumbTintColor="#2563EB"        // Blue knob
              />
              <View style={styles.sliderLabels}>
                <Text style={styles.sliderLabelText}>0 Years</Text>
                <Text style={styles.sliderLabelText}>20+ Years</Text>
              </View>
            </View>

            {/* Quick Fresher Button */}
            <TouchableOpacity 
                style={[styles.fresherButton, years === 0 && styles.fresherButtonActive]}
                onPress={() => setYears(0)}
            >
                <Icon name={years === 0 ? "radio-button-on" : "radio-button-off"} size={20} color={years === 0 ? "#2563EB" : "#6B7280"} />
                <Text style={[styles.fresherText, years === 0 && styles.fresherTextActive]}>I am a Fresher (0 Years)</Text>
            </TouchableOpacity>

          </View>
        </View>

        {/* Footer */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNext}
          >
            <Text style={styles.nextButtonText}>Save & Continue</Text>
            <Icon name="arrow-forward" size={20} color="#fff" style={{marginLeft: 8}} />
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.4)", // Slight white tint
  },
  safeArea: {
    flex: 1,
  },
  /* Header Styles */
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  backButton: { marginRight: 15 },
  progressBarContainer: {
    flex: 1,
    height: 6,
    backgroundColor: "#E5E7EB",
    borderRadius: 3,
    marginRight: 15,
  },
  progressBarFill: {
    width: "100%", // Full progress
    height: "100%",
    backgroundColor: "#2563EB",
    borderRadius: 3,
  },
  stepText: { fontSize: 12, fontWeight: "600", color: "#6B7280" },

  /* Content */
  contentContainer: {
    flex: 1,
    padding: 24,
  },
  titleContainer: { marginBottom: 24, marginTop: 10 },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 8,
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
  },
  subtitle: { fontSize: 15, color: "#4B5563", fontWeight: "500", lineHeight: 22 },

  /* Card */
  card: {
    backgroundColor: "#ffffffff",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 5,
    alignItems: 'center',
  },
  
  /* Counter (Big Number) */
  counterContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  counterText: {
    fontSize: 64,
    fontWeight: "800",
    color: "#2563EB",
    lineHeight: 70,
  },
  counterLabel: {
    fontSize: 18,
    color: "#6B7280",
    fontWeight: "600",
    marginTop: -5
  },

  /* Badge */
  badgeContainer: {
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 30,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#DBEAFE",
  },
  badgeText: {
    color: "#2563EB",
    fontWeight: "700",
    fontSize: 14,
  },

  /* Slider Section */
  sliderContainer: {
    width: '100%',
    marginBottom: 30,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 5,
  },
  sliderLabelText: {
    color: "#9CA3AF",
    fontSize: 12,
    fontWeight: "600",
  },

  /* Fresher Button */
  fresherButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    width: '100%',
    justifyContent: 'center',
  },
  fresherButtonActive: {
    backgroundColor: "#EFF6FF",
    borderColor: "#2563EB",
  },
  fresherText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#4B5563",
    fontWeight: "600",
  },
  fresherTextActive: {
    color: "#2563EB",
  },

  /* Bottom Actions */
  bottomContainer: {
    padding: 24,
    paddingBottom: 20,
  },
  nextButton: {
    backgroundColor: "#111827",
    borderRadius: 30,
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  nextButtonText: { color: "#fff", fontSize: 18, fontWeight: "700" },
});