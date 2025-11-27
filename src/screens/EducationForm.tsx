import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const EducationForm = ({ navigation }: any) => {
  const [degree, setDegree] = useState("");
  const [field, setField] = useState("");
  const [institution, setInstitution] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleNext = () => {
    const educationData = {
      degree,
      field,
      institution,
      location,
      startDate,
      endDate,
    };
    console.log("Education Data:", educationData);
    navigation.navigate("skillsScreen"); // next step, e.g., experience or skills
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Education Details</Text>
        <Text style={styles.subtitle}>
          Fill in your academic qualifications below.
        </Text>

        {/* Degree / Qualification */}
        <Text style={styles.label}>Degree / Qualification</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Bachelor of Science"
          value={degree}
          onChangeText={setDegree}
        />

        {/* Field of Study / Major */}
        <Text style={styles.label}>Field of Study / Major</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Computer Science"
          value={field}
          onChangeText={setField}
        />

        {/* Institution Name */}
        <Text style={styles.label}>Institution Name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Stanford University"
          value={institution}
          onChangeText={setInstitution}
        />

        {/* Location (Optional) */}
        <Text style={styles.label}>Location (Optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. New York, USA"
          value={location}
          onChangeText={setLocation}
        />

        {/* Start Date */}
        <Text style={styles.label}>Start Date</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. August 2018"
          value={startDate}
          onChangeText={setStartDate}
        />

        {/* End Date */}
        <Text style={styles.label}>End Date / Expected End Date</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. May 2022"
          value={endDate}
          onChangeText={setEndDate}
        />

        {/* Next Button */}
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EducationForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
  },
  title: { fontSize: 24, fontWeight: "700", color: "#000", marginBottom: 8 },
  subtitle: { color: "#555", marginBottom: 24 },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 14,
    marginBottom: 6,
    color: "#000",
  },
  input: {
    borderWidth: 1.3,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
  },
  button: {
    backgroundColor: "#000",
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
