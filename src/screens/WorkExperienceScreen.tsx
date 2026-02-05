import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation"; 
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import Slider from '@react-native-community/slider'; 

type ExpNavProp = NativeStackNavigationProp<RootStackParamList, "WorkExperience">;

export default function WorkExperienceScreen() {
  const navigation = useNavigation<ExpNavProp>();
  const [years, setYears] = useState<number>(0);

  const handleNext = () => {
    // Navigate to Screen 7: WorkStatus (Working or Not Working)
    navigation.navigate("WorkStatus"); 
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
      <SafeAreaView style={styles.safe}>
        
        <View style={styles.container}>
            {/* Header */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Icon name="chevron-back" size={28} color="#000" />
            </TouchableOpacity>

            <Text style={styles.title}>Work Experience</Text>
            <Text style={styles.subtitle}>
                How many years of relevant experience do you have?
            </Text>

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
                    minimumTrackTintColor="#000000" // Black active track
                    maximumTrackTintColor="#ccc"    // Grey inactive track
                    thumbTintColor="#000000"        // Black knob
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
                    activeOpacity={0.7}
                >
                    <Icon 
                        name={years === 0 ? "radio-button-on" : "radio-button-off"} 
                        size={20} 
                        color={years === 0 ? "#fff" : "#666"} 
                    />
                    <Text style={[styles.fresherText, years === 0 && styles.fresherTextActive]}>
                        I am a Fresher (0 Years)
                    </Text>
                </TouchableOpacity>

            </View>
        </View>

        {/* Footer */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNext}
          >
            <Text style={styles.nextButtonText}>Next</Text>
            <Icon name="arrow-forward" size={20} color="#fff" style={{marginLeft: 8}} />
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  safe: { flex: 1 },
  
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  
  /* Header Styles */
  backButton: { marginBottom: 15 },
  title: { fontSize: 28, fontWeight: "800", color: "#000", marginBottom: 8 },
  subtitle: { fontSize: 15, color: "#444", marginBottom: 30, lineHeight: 22 },

  /* Card */
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Glass effect
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  
  /* Counter (Big Number) */
  counterContainer: {
    alignItems: 'center',
    marginBottom: 5,
  },
  counterText: {
    fontSize: 70,
    fontWeight: "800",
    color: "#000",
    lineHeight: 80,
  },
  counterLabel: {
    fontSize: 18,
    color: "#555",
    fontWeight: "600",
    marginTop: -5
  },

  /* Badge */
  badgeContainer: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 30,
    marginTop: 10,
  },
  badgeText: {
    color: "#000",
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
    paddingHorizontal: 5,
    marginTop: 5,
  },
  sliderLabelText: {
    color: "#666",
    fontSize: 12,
    fontWeight: "600",
  },

  /* Fresher Button */
  fresherButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 16,
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "#ccc",
    width: '100%',
    justifyContent: 'center',
  },
  fresherButtonActive: {
    backgroundColor: "#000",
    borderColor: "#000",
  },
  fresherText: {
    marginLeft: 10,
    fontSize: 15,
    color: "#444",
    fontWeight: "600",
  },
  fresherTextActive: {
    color: "#fff",
  },

  /* Bottom Actions */
  bottomContainer: {
    paddingHorizontal: 24,
    paddingBottom: 10,
    justifyContent: 'flex-end',
  },
  nextButton: {
    backgroundColor: "#000",
    borderRadius: 30,
    paddingVertical: 18,
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  nextButtonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});