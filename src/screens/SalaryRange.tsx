// src/screens/SalaryRange.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Slider from "@react-native-community/slider";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const SalaryRange = () => {
  const navigation = useNavigation<any>();
  const [salary, setSalary] = useState(15000);

  const handleNext = () => {
    console.log("Selected salary:", salary);
    navigation.navigate("DistancePreference");
  };

  // Helper to format currency (e.g. 15,000)
  const formatSalary = (val: number) => {
    return val.toLocaleString('en-IN');
  };

  return (
    <ImageBackground
      source={require("../assets/bg.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        
        <View style={styles.container}>
            {/* Simple Back Button */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Icon name="chevron-back" size={26} color="#000" />
            </TouchableOpacity>

            <View style={styles.titleContainer}>
                <Text style={styles.title} allowFontScaling={false}>Expected Salary</Text>
                <Text style={styles.subtitle} allowFontScaling={false}>
                    What is your expected monthly salary?
                </Text>
            </View>

            {/* Main Card */}
            <View style={styles.card}>
                
                {/* Big Number Display */}
                <View style={styles.counterContainer}>
                    <Text style={styles.counterText} allowFontScaling={false}>
                        ₹ {formatSalary(salary)}
                    </Text>
                    <Text style={styles.counterLabel} allowFontScaling={false}>Monthly</Text>
                </View>

                {/* SLIDER COMPONENT */}
                <View style={styles.sliderContainer}>
                    <Slider
                        style={{ width: "100%", height: 50 }}
                        minimumValue={10000}
                        maximumValue={300000}
                        step={1000}
                        minimumTrackTintColor="#2563EB" // Blue
                        maximumTrackTintColor="#E5E7EB" // Light Grey
                        thumbTintColor="#2563EB"        // Blue Knob
                        value={salary}
                        onValueChange={(value) => setSalary(Math.round(value))}
                    />
                    <View style={styles.sliderLabels}>
                        <Text style={styles.sliderLabelText}>₹10k</Text>
                        <Text style={styles.sliderLabelText}>₹3L+</Text>
                    </View>
                </View>

                {/* Info Badge */}
                <View style={styles.infoBox}>
                    <Icon name="information-circle-outline" size={20} color="#2563EB" />
                    <Text style={styles.infoText}>
                        We will find jobs matching your expectation.
                    </Text>
                </View>

            </View>
        </View>

        {/* Footer */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Next</Text>
            <Icon name="arrow-forward" size={20} color="#fff" style={{marginLeft: 8}} />
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </ImageBackground>
  );
};

export default SalaryRange;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  
  /* Simple Header Elements */
  backButton: { marginBottom: 20 },
  
  titleContainer: { marginBottom: 24 },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 8,
  },
  subtitle: { 
    fontSize: 15, 
    color: "#4B5563", 
    fontWeight: "500", 
    lineHeight: 22 
  },

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
    marginTop: 10,
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
    marginBottom: 4,
  },
  counterLabel: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "600",
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

  /* Info Box */
  infoBox: {
    flexDirection: 'row',
    backgroundColor: "#EFF6FF",
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
  },
  infoText: {
    marginLeft: 10,
    fontSize: 13,
    color: "#2563EB",
    flex: 1,
    fontWeight: "500",
  },

  /* Bottom Actions */
  bottomContainer: {
    padding: 24,
    paddingBottom: 20,
    alignItems: 'flex-end',
  },
  nextButton: {
    backgroundColor: "#000", 
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    minWidth: 120,
  },
  nextButtonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
