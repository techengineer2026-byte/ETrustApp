// src/screens/CurrentSalaryScreen.tsx

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
import Slider from '@react-native-community/slider';
import CheckBox from "@react-native-community/checkbox"; 

type SalaryNavProp = NativeStackNavigationProp<RootStackParamList, "CMS">;

export default function CurrentSalaryScreen() {
  const navigation = useNavigation<SalaryNavProp>();
  const [salary, setSalary] = useState<number>(30000); // Default 30k
  const [hideSalary, setHideSalary] = useState(false);

  const handleNext = () => {
    // Navigate to Expected Monthly Salary
    navigation.navigate("SalaryRange"); 
  };

  // Helper to format Indian Currency (e.g. 30000 -> 30,000)
  const formatSalary = (value: number) => {
    return value.toLocaleString("en-IN");
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
              <Icon name="chevron-back" size={28} color="#000" />
            </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.title}>Current Salary</Text>
          <Text style={styles.subtitle}>What is your current monthly take-home salary?</Text>

          {/* Main Card */}
          <View style={styles.card}>
            
            {/* Big Number Display */}
            <View style={styles.counterContainer}>
              <Text style={styles.currencySymbol}>₹</Text>
              <Text style={styles.counterText}>
                {formatSalary(salary)}
              </Text>
            </View>
            <Text style={styles.counterLabel}>per month</Text>

            {/* SLIDER COMPONENT */}
            <View style={styles.sliderContainer}>
              <Slider
                style={{width: '100%', height: 40}}
                minimumValue={5000}    // Min 5k
                maximumValue={200000}  // Max 2 Lakhs per month
                step={1000}            // 1k steps
                value={salary}
                onValueChange={setSalary}
                minimumTrackTintColor="#000" 
                maximumTrackTintColor="#ccc" 
                thumbTintColor="#000"       
              />
              <View style={styles.sliderLabels}>
                <Text style={styles.sliderLabelText}>₹5k</Text>
                <Text style={styles.sliderLabelText}>₹2L+</Text>
              </View>
            </View>

            {/* Hide Salary Checkbox */}
            <TouchableOpacity 
                style={styles.checkboxContainer}
                activeOpacity={1}
                onPress={() => setHideSalary(!hideSalary)}
            >
                <View style={{ transform: [{ scale: 0.9 }] }}>
                    <CheckBox
                        value={hideSalary}
                        onValueChange={setHideSalary}
                        tintColors={{ true: "#000", false: "#666" }}
                        boxType="square"
                        onCheckColor="#fff"
                        onFillColor="#000"
                        onTintColor="#000"
                        style={Platform.OS === 'ios' ? { width: 20, height: 20, marginRight: 10 } : {}}
                    />
                </View>
                <Text style={styles.checkboxLabel}>Hide from profile</Text>
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
  background: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  /* Header Styles */
  header: {
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  backButton: { marginBottom: 15 },

  /* Content */
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#000",
    marginBottom: 8,
  },
  subtitle: { fontSize: 15, color: "#444", marginBottom: 30, lineHeight: 22 },

  /* Card */
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Glass effect
    borderRadius: 24,
    padding: 24,
    borderWidth: 2,
    borderColor: "#fff",
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
    justifyContent: 'center',
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
    paddingHorizontal: 5,
    marginTop: 5,
  },
  sliderLabelText: {
    color: "#666",
    fontSize: 12,
    fontWeight: "600",
  },

  /* Checkbox Section */
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    width: "100%",
    borderWidth: 1,
    borderColor: "#eee",
  },
  checkboxLabel: {
    fontSize: 15,
    color: "#333",
    fontWeight: "500",
    marginLeft: Platform.OS === 'android' ? 0 : 5, 
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