import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
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
import { Modal } from "react-native";

export default function PhoneNumberScreen() {
  const navigation = useNavigation<PhoneNavigationProp>();
  const [updating, setUpdating] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const [countryCode, setCountryCode] = useState<CountryCode>("IN");
  const [callingCode, setCallingCode] = useState("91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const isValidNumber = /^[0-9]{10}$/.test(phoneNumber); // exactly 10 digits

  const handleVerify = () => {
    if (!isValidNumber) {
      Alert.alert("Enter a valid 10-digit phone number");
      return;
    }
    setConfirmVisible(true);
  };
  const handlenext = () => {
    navigation.navigate("HumanVerification", {
      phone: phoneNumber,
      country: callingCode,
    });
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
        <TouchableOpacity
          style={[styles.button, !isValidNumber && styles.buttonDisabled]}
          onPress={handleVerify}
          disabled={!isValidNumber}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
        {!isValidNumber && phoneNumber.length > 0 && (
          <Text style={{ color: "red", marginTop: 5 }}>
            Phone number must be 10 digits
          </Text>
        )}

      </View>
      <Modal
        visible={confirmVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setConfirmVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Is this your number?</Text>
            <Text style={styles.modalNumber}>+{callingCode} {phoneNumber}</Text>

            <TouchableOpacity style={styles.modalConfirmBtn} onPress={handlenext}>
              <Text style={styles.modalConfirmText}>Yes, continue</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setConfirmVisible(false)}>
              <Text style={styles.modalCancelText}>Edit</Text>
            </TouchableOpacity>
          </View> 
        </View>
      </Modal>

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
  buttonDisabled: {
    backgroundColor: "#999", // gray out
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
    paddingVertical: 16,
    marginTop: 30,
    minHeight: 52,           // ← fixes clipping
  },

  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
    includeFontPadding: false,  // fix android trimming
    textAlignVertical: "center", // android fix
  },

  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },

  modalBox: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    color: "#000",
  },

  modalNumber: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
    color: "#000",
  },

  modalConfirmBtn: {
    width: "100%",
    backgroundColor: "#000",
    paddingVertical: 1,
    borderRadius: 8,
    alignItems: "center",
    minHeight: 48,   // important to stop cutting
  },


  modalConfirmText: {
    color: "#fff",
    fontSize: 16,
    marginTop: 8,
    fontWeight: "600",
    includeFontPadding: false,
    textAlignVertical: "center",
  },


  modalCancelBtn: {
    width: "100%",
    paddingVertical: 10,
    alignItems: "center",
  },

  modalCancelText: {
    marginTop: 8,
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
  },

});