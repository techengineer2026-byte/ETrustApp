import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Slider from "@react-native-community/slider";
import { SafeAreaView } from "react-native-safe-area-context";

const SalaryRange = ({ navigation }: any) => {
  const [salary, setSalary] = useState(15000);

  const handleNext = () => {
    console.log("Selected salary:", salary);
    navigation.navigate("DistancePreference"); 
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Added allowFontScaling={false} to keep layout consistent */}
      <Text style={styles.title} allowFontScaling={false}>
        Select your salary range
      </Text>
      <Text style={styles.subtitle} allowFontScaling={false}>
        Move the slider to set your expected monthly salary.
      </Text>

      {/* Large numbers often break layouts, so we disable scaling here too */}
      <Text style={styles.salaryText} allowFontScaling={false}>
        ₹{salary.toLocaleString()}
      </Text>

      {/* Slider control */}
      <Slider
        style={{ width: "100%", height: 40 }}
        minimumValue={10000}
        maximumValue={30000}
        step={1000}
        minimumTrackTintColor="#ff3b30"
        maximumTrackTintColor="#d3d3d3"
        thumbTintColor="#ff3b30"
        value={salary}
        onValueChange={(value) => setSalary(Math.round(value))}
      />

      {/* Range label */}
      <View style={styles.rangeLabels}>
        <Text style={styles.rangeText} allowFontScaling={false}>₹10K</Text>
        <Text style={styles.rangeText} allowFontScaling={false}>₹30K+</Text>
      </View>

      {/* Next button - FIXED */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text 
          style={styles.nextText}
          allowFontScaling={false}      // 1. Prevents "Large Text" from blowing up the font
          numberOfLines={1}             // 2. Keeps text on one line
          adjustsFontSizeToFit={true}   // 3. Shrinks text slightly if it's still too big
        >
          Next
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SalaryRange;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginBottom: 8,
  },
  subtitle: {
    color: "#555",
    marginBottom: 40,
    fontSize: 14, 
  },
  salaryText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#ff3b30",
    textAlign: "center",
    marginBottom: 20,
  },
  rangeLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  rangeText: {
    color: "#555",
    fontSize: 14,
  },
  nextButton: {
    backgroundColor: "#000",
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 50,
    width: '100%', // Ensures button uses full available width
  },
  nextText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});