import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import Icon from "react-native-vector-icons/Ionicons";

type BdayNavProp = NativeStackNavigationProp<RootStackParamList, "BDAY">;

export default function BDAYScreen() {
  const navigation = useNavigation<BdayNavProp>();
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const handleNext = () => {
    if (!isValidDate()) return;
    navigation.navigate("Gender"); // change this to your next screen name
  };

  const isValidDate = () => {
    const d = parseInt(day);
    const m = parseInt(month);
    const y = parseInt(year);
    if (isNaN(d) || isNaN(m) || isNaN(y)) return false;
    return d > 0 && d <= 31 && m > 0 && m <= 12 && y > 1900 && y <= new Date().getFullYear();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Back button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="chevron-back" size={26} color="#000" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>Your b-day?</Text>

        {/* Date Input Fields */}
        <View style={styles.dateRow}>
          <TextInput
            style={styles.input}
            placeholder="DD"
            keyboardType="numeric"
            maxLength={2}
            value={day}
            onChangeText={setDay}
          />
          <Text style={styles.slash}>/</Text>
          <TextInput
            style={styles.input}
            placeholder="MM"
            keyboardType="numeric"
            maxLength={2}
            value={month}
            onChangeText={setMonth}
          />
          <Text style={styles.slash}>/</Text>
          <TextInput
            style={[styles.input, { width: 70 }]}
            placeholder="YYYY"
            keyboardType="numeric"
            maxLength={4}
            value={year}
            onChangeText={setYear}
          />
        </View>

        {/* Helper text */}
        <Text style={styles.helperText}>
          Your profile shows your age, not your date of birth.
        </Text>
      </View>

      {/* Bottom Next Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            { opacity: isValidDate() ? 1 : 0.4 },
          ]}
          onPress={handleNext}
          disabled={!isValidDate()}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  backButton: { marginBottom: 20 },
  title: { fontSize: 24, fontWeight: "700", color: "#000", marginBottom: 40 },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 11,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    fontSize: 20,
    color: "#000",
    textAlign: "center",
    paddingVertical: 6,
  },
  slash: {
    fontSize: 22,
    marginHorizontal: 12,
    color: "#000",
  },
  helperText: {
    fontSize: 14,
    color: "#555",
    marginTop: 10,
  },
  bottomContainer: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  nextButton: {
    backgroundColor: "#000",
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: "center",
  },
  nextButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
