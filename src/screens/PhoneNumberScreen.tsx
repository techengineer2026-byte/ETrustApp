import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import CountryPicker, { CountryCode } from "react-native-country-picker-modal";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
type PhoneNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "PhoneNumber"
>;

export default function PhoneNumberScreen() {
  const navigation = useNavigation<PhoneNavigationProp>();
  const [updating, setUpdating] = useState(false);

  const [countryCode, setCountryCode] = useState<CountryCode>("IN");
  const [callingCode, setCallingCode] = useState("91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const handleVerify = () => {
    console.log("Pressed Next"); // confirm click works
    navigation.navigate("HumanVerification");
  };
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Back arrow */}
        <Text style={styles.backArrow}>←</Text>

        {/* Title */}
        <Text style={styles.title}>Can we get your number?</Text>

        {/* Row for country code + phone input */}
        <View style={styles.inputRow}>
          <View style={styles.countryPickerContainer}>
            <CountryPicker
              countryCode={countryCode}
              withFilter
              withFlag
              withCallingCode
              onSelect={(country) => {
                setCountryCode(country.cca2);
                setCallingCode(country.callingCode[0]);
              }}
            />
            <Text style={styles.callingCode}>+{callingCode}</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="9872521392"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        {/* Helper text */}
        <Text style={styles.helperText}>
          We'll text you a code to verify you’re really you. Message and data
          rates may apply.{" "}
          <Text style={styles.linkText}>
            What happens if your number changes?
          </Text>
        </Text>

        {/* Next button */}
        <TouchableOpacity style={styles.button} onPress={handleVerify}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 24,
  },
  backArrow: {
    fontSize: 26,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginBottom: 25,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1.3,
    borderColor: "#ccc",
    paddingBottom: 4,
    marginBottom: 15,
  },
  countryPickerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  callingCode: {
    fontSize: 16,
    marginLeft: 4,
    color: "#000",
  },
  input: {
    flex: 1,
    fontSize: 17,
    color: "#000",
    marginLeft: 12,
  },
  helperText: {
    fontSize: 13,
    color: "#555",
    marginTop: 12,
    lineHeight: 18,
  },
  linkText: {
    color: "#0056b3",
  },
  button: {
    backgroundColor: "#000",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    marginTop: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
});