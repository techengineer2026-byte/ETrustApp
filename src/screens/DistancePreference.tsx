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
const DistancePreference = ({ navigation }: any) => {
  const [distance, setDistance] = useState(25);

  const handleNext = () => {
    console.log("Selected distance:", distance);
    navigation.navigate("LocationSelection");
  };

  return (
    <ImageBackground
      source={require("../assets/bg.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
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
            minimumTrackTintColor="#700c07ff"
            maximumTrackTintColor="#d3d3d3"
            thumbTintColor="#700c07ff"
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
    </ImageBackground>
  );
};

export default DistancePreference;

const styles = StyleSheet.create({
  background: { flex: 1 },

  container: {
    flex: 1,
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
    paddingVertical: 16,
    paddingHorizontal: 30, // add this
    alignItems: "center",
    marginTop: 40,
    minWidth: 120, // optional: ensures text fits
  },

  nextText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
