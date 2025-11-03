import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Slider from "@react-native-community/slider";
import { SafeAreaView } from "react-native-safe-area-context";
const DistancePreference = ({ navigation }: any) => {
  const [distance, setDistance] = useState(25);

  const handleNext = () => {
    console.log("Selected distance:", distance);
    navigation.navigate("LocationSelection");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Your distance preference?</Text>
      <Text style={styles.subtitle}>
        Use the slider to set the maximum distance you’d like jobs or matches to
        appear.
      </Text>

      <View style={styles.sliderContainer}>
        <View style={styles.labelRow}>
          <Text style={styles.label}>Distance preference</Text>
          <Text style={styles.value}>{distance} km</Text>
        </View>

        <Slider
          style={{ width: "100%", height: 40 }}
          minimumValue={1}
          maximumValue={50}
          step={1}
          minimumTrackTintColor="#ff3b30"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#ff3b30"
          value={distance}
          onValueChange={(val) => setDistance(Math.round(val))}
        />
      </View>

      <Text style={styles.footerText}>
        You can change this preference later in Settings.
      </Text>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DistancePreference;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
    justifyContent: "center",
  },
  title: { fontSize: 24, fontWeight: "700", color: "#000", marginBottom: 8 },
  subtitle: { color: "#555", marginBottom: 40 },
  sliderContainer: { marginBottom: 30 },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: { fontSize: 16, color: "#000" },
  value: { fontSize: 16, fontWeight: "600", color: "#000" },
  footerText: {
    textAlign: "center",
    color: "#777",
    marginTop: 10,
  },
  nextButton: {
    backgroundColor: "#000",
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 40,
  },
  nextText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
