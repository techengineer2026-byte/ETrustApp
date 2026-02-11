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
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

type SalaryRangeProp = NativeStackNavigationProp<RootStackParamList, "SalaryRange">;

const SalaryRange = () => {
  const navigation = useNavigation<SalaryRangeProp>();
  const [salary, setSalary] = useState(25000);

  const handleNext = () => {
    // Navigate to Location Selection (Screen 10)
    navigation.navigate("LocationSelection");
  };

  // Helper to format currency
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
            {/* Header */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Icon name="chevron-back" size={28} color="#000" />
            </TouchableOpacity>

            <View style={styles.titleContainer}>
                <Text style={styles.title}>Expected Salary</Text>
                <Text style={styles.subtitle}>
                    What is your expected monthly salary?
                </Text>
            </View>

            {/* Main Card */}
            <View style={styles.card}>
                
                {/* Big Number Display */}
                <View style={styles.counterContainer}>
                    <Text style={styles.currencySymbol}>₹</Text>
                    <Text style={styles.counterText}>
                        {formatSalary(salary)}
                    </Text>
                </View>
                <Text style={styles.counterLabel}>Monthly</Text>

                {/* SLIDER COMPONENT */}
                <View style={styles.sliderContainer}>
                    <Slider
                        style={{ width: "100%", height: 50 }}
                        minimumValue={10000}
                        maximumValue={300000}
                        step={1000}
                        minimumTrackTintColor="#000" // Black Track
                        maximumTrackTintColor="#ccc" // Grey Track
                        thumbTintColor="#000"        // Black Knob
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
                    <Icon name="information-circle-outline" size={22} color="#333" />
                    <Text style={styles.infoText}>
                        We use this to filter jobs that match your financial goals.
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
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  
  /* Header Elements */
  backButton: { marginBottom: 15 },
  
  titleContainer: { marginBottom: 10 },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#000",
    marginBottom: 8,
  },
  subtitle: { 
    fontSize: 15, 
    color: "#444", 
    fontWeight: "400", 
    lineHeight: 22,
    marginBottom: 20,
  },

  /* Card */
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Glass effect
    borderRadius: 24,
    padding: 24,
    borderWidth: 2,
    borderColor: "transparent",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  
  /* Counter (Big Number) */
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 0,
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
    marginTop: 8,
    marginRight: 4,
  },
  counterText: {
    fontSize: 48,
    fontWeight: "800",
    color: "#000",
  },
  counterLabel: {
    fontSize: 14,
    color: "#555",
    fontWeight: "600",
    marginBottom: 30,
    marginTop: -5,
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
    color: "#666",
    fontSize: 12,
    fontWeight: "600",
  },

  /* Info Box */
  infoBox: {
    flexDirection: 'row',
    backgroundColor: "#fff", // White box inside glass card
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    width: '100%',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  infoText: {
    marginLeft: 12,
    fontSize: 13,
    color: "#444",
    flex: 1,
    fontWeight: "500",
    lineHeight: 18,
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
    width: "100%", // Full Width
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  nextButtonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});