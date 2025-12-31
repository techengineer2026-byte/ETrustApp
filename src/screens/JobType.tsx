import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const JobType = ({ navigation }: any) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [showOnProfile, setShowOnProfile] = useState(false);

  const jobOptions = [
    { id: "full", title: "Full-time", desc: "Work on a full-time schedule" },
    { id: "part", title: "Part-time", desc: "Work flexible or reduced hours" },
    { id: "contract", title: "Contract", desc: "Work on specific projects" },];

  return (
    <ImageBackground
      source={require("../assets/bg.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>What type of job are you looking for?</Text>
      <Text style={styles.subtitle}>
        Select one that best fits your goal.
      </Text>

      {jobOptions.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={[
            styles.option,
            selected === option.id && styles.optionSelected,
          ]}
          onPress={() => setSelected(option.id)}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={[
                styles.optionTitle,
                selected === option.id && styles.optionTitleSelected,
              ]}
            >
              {option.title}
            </Text>
            <Text style={styles.optionDesc}>{option.desc}</Text>
          </View>
          {selected === option.id && <Text style={styles.checkmark}>✓</Text>}
        </TouchableOpacity>
      ))}

      <View style={styles.checkboxRow}>
        <TouchableOpacity
          style={[
            styles.customCheckbox,
            showOnProfile && styles.customCheckboxChecked,
          ]}
          onPress={() => setShowOnProfile(!showOnProfile)}
        >
          {showOnProfile && <Text style={styles.checkMark}>✓</Text>}
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>Show job type on profile</Text>
      </View>

      <TouchableOpacity
        style={[
          styles.nextButton,
          !selected && { opacity: 0.5 },
        ]}
        disabled={!selected}
        onPress={() => navigation.navigate("WorkStatus")}
      >
        <Text style={styles.nextText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
    </ImageBackground>
  );
};

export default JobType;

const styles = StyleSheet.create({
  background: { flex: 1 },

  container: { flex: 1,  padding: 24 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 6 },
  subtitle: { color: "#555", marginBottom: 20 },
  option: {
    borderWidth: 1.5,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  optionSelected: { borderColor: "#ff3b30", backgroundColor: "#fff5f5" },
  optionTitle: { fontSize: 16, fontWeight: "600" },
  optionTitleSelected: { color: "#ff3b30" },
  optionDesc: { color: "#555", fontSize: 13, marginTop: 3 },
  checkmark: { fontSize: 18, color: "#ff3b30", marginLeft: 10 },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  customCheckbox: {
    width: 22,
    height: 22,
    borderWidth: 1.5,
    borderColor: "#888",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  customCheckboxChecked: { backgroundColor: "#000", borderColor: "#000" },
  checkMark: { color: "#fff", fontSize: 14, fontWeight: "bold" },
  checkboxLabel: { color: "#333", fontSize: 14 },
  nextButton: {
    backgroundColor: "#000",
    marginTop: 30,
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 30, // add this
    alignItems: "center",
    minWidth: 120, // optional: ensures text fits
  },

  nextText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
