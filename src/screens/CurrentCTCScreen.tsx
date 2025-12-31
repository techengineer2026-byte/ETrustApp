import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Platform,
  Switch
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation"; 
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import Slider from '@react-native-community/slider';
import CheckBox from "@react-native-community/checkbox"; 

type CTCNavProp = NativeStackNavigationProp<RootStackParamList, "CurrentCTC">;

export default function CurrentCTCScreen() {
  const navigation = useNavigation<CTCNavProp>();
  const [ctc, setCtc] = useState<number>(500000); // Default 5 Lakhs
  const [hideCTC, setHideCTC] = useState(false);

  const handleNext = () => {
    console.log("CTC:", ctc, "Hidden:", hideCTC);
    // Navigate to Salary Range or next screen
    navigation.navigate("SalaryRange"); 
  };

  // Helper to format CTC (e.g., 550000 -> 5.5 Lakhs)
  const formatCTC = (value: number) => {
    if (value >= 10000000) {
        return `₹ ${(value / 10000000).toFixed(2)} Cr`;
    }
    return `₹ ${(value / 100000).toFixed(1)} LPA`;
  };

  return (
    <ImageBackground
      source={require("../assets/bg.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        
        {/* Header */}
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Icon name="chevron-back" size={26} color="#1F2937" />
            </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Current CTC</Text>
            <Text style={styles.subtitle}>What is your current annual compensation?</Text>
          </View>

          {/* Main Card */}
          <View style={styles.card}>
            
            {/* Big Number Display */}
            <View style={styles.counterContainer}>
              <Text style={styles.counterText}>
                {formatCTC(ctc)}
              </Text>
              <Text style={styles.counterLabel}>Annual Salary</Text>
            </View>

            {/* SLIDER COMPONENT */}
            <View style={styles.sliderContainer}>
              <Slider
                style={{width: '100%', height: 40}}
                minimumValue={100000}  // 1 Lakh
                maximumValue={5000000} // 50 Lakhs
                step={50000}           // 50k steps
                value={ctc}
                onValueChange={setCtc}
                minimumTrackTintColor="#2563EB" 
                maximumTrackTintColor="#E5E7EB" 
                thumbTintColor="#2563EB"       
              />
              <View style={styles.sliderLabels}>
                <Text style={styles.sliderLabelText}>₹1 L</Text>
                <Text style={styles.sliderLabelText}>₹50 L+</Text>
              </View>
            </View>

            {/* Hide CTC Checkbox */}
            <View style={styles.checkboxContainer}>
                <View style={styles.checkboxWrapper}>
                    <CheckBox
                        value={hideCTC}
                        onValueChange={setHideCTC}
                        tintColors={{ true: "#2563EB", false: "#9CA3AF" }}
                        boxType="square"
                        lineWidth={2}
                    />
                </View>
                <TouchableOpacity onPress={() => setHideCTC(!hideCTC)}>
                    <Text style={styles.checkboxLabel}>Hide my CTC </Text>
                </TouchableOpacity>
            </View>

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
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
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

  progressBarFill: {
    width: "90%", // Almost done
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
  titleContainer: { marginBottom: 24 },
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
    backgroundColor: "#fff",
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
    marginBottom: 30,
  },
  counterText: {
    fontSize: 42,
    fontWeight: "800",
    color: "#2563EB",
  },
  counterLabel: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "600",
    marginTop: 0
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

  /* Checkbox Section */
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    width: "100%",
    borderWidth: 1,
    borderColor: "#E5E7EB"
  },
  checkboxWrapper: {
      transform: Platform.OS === 'ios' ? [{scale: 0.8}] : [{scale: 1}],
      marginRight: 10
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "600",
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