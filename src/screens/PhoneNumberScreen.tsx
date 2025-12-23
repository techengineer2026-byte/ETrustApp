import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import CountryPicker, { CountryCode } from "react-native-country-picker-modal";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; 

type PhoneNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "PhoneNumber"
>;

export default function PhoneNumberScreen() {
  const navigation = useNavigation<PhoneNavigationProp>();
  const [confirmVisible, setConfirmVisible] = useState(false);

  const [countryCode, setCountryCode] = useState<CountryCode>("IN");
  const [callingCode, setCallingCode] = useState("91");
  const [phoneNumber, setPhoneNumber] = useState("");
  
  const isValidNumber = /^[0-9]{10}$/.test(phoneNumber); 

  const handlePhoneChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, "");
    setPhoneNumber(numericValue);
  };

  const handleVerify = () => {
    if (!isValidNumber) {
      Alert.alert("Invalid Number", "Please enter a valid 10-digit phone number");
      return;
    }
    setConfirmVisible(true);
  };

  const handleNext = () => {
    setConfirmVisible(false);
    navigation.navigate("HumanVerification", {
      phone: phoneNumber,
      country: callingCode,
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Icon name="arrow-left" size={28} color="#1c005e" />
            </TouchableOpacity>
          </View>

          {/* Main Content */}
          <View style={styles.content}>
            <Text style={styles.title} allowFontScaling={false}>What's your number?</Text>
            <Text style={styles.subTitle} allowFontScaling={false}>
              We'll send you a verification code to secure your account.
            </Text>

            <View style={styles.inputContainer}>
              <View style={styles.countrySection}>
                <CountryPicker
                  countryCode={countryCode}
                  withFilter
                  withFlag
                  withCallingCode
                  withEmoji
                  onSelect={(country) => {
                    setCountryCode(country.cca2);
                    setCallingCode(country.callingCode[0]);
                  }}
                  containerButtonStyle={styles.countryPickerBtn}
                  // Note: CountryPicker library might need internal prop adjustments or a custom button 
                  // to fully disable font scaling, but usually it inherits styles.
                />
                <Text style={styles.callingCode} allowFontScaling={false}>+{callingCode}</Text>
                <View style={styles.verticalDivider} />
              </View>
              
              <TextInput
                style={styles.input}
                placeholder="Mobile Number"
                placeholderTextColor="#A0A0A0"
                keyboardType="number-pad"
                value={phoneNumber}
                onChangeText={handlePhoneChange}
                maxLength={10}
                returnKeyType="done"
                allowFontScaling={false} // Prevents input text from being huge
              />
            </View>

            {!isValidNumber && phoneNumber.length > 0 && (
              <View style={styles.errorContainer}>
                <Icon name="alert-circle-outline" size={16} color="#D32F2F" />
                <Text style={styles.errorText} allowFontScaling={false}>Please enter exactly 10 digits</Text>
              </View>
            )}

            <Text style={styles.helperText} allowFontScaling={false}>
              By clicking Next, you agree to receive SMS for verification. Message and data rates may apply.
            </Text>

          </View>

          {/* Bottom Button */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.button, !isValidNumber && styles.buttonDisabled]}
              onPress={handleVerify}
              disabled={!isValidNumber}
            >
              <Text style={styles.buttonText} allowFontScaling={false}>Send Code</Text>
              <Icon name="arrow-right" size={20} color="#fff" style={{marginLeft: 10}} />
            </TouchableOpacity>
          </View>

        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>

      {/* Confirmation Modal */}
      <Modal
        visible={confirmVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setConfirmVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <View style={styles.modalIconBg}>
              <Icon name="cellphone-check" size={40} color="#1c005e" />
            </View>
            
            {/* FIX 1: Prevent Title Cutoff */}
            <Text style={styles.modalTitle} allowFontScaling={false}>
                Confirm Number
            </Text>
            
            <Text style={styles.modalSub} allowFontScaling={false}>
              Is this the correct number to send the verification code?
            </Text>
            
            {/* FIX 2: Ensure Number fits in one line and doesn't wrap/cutoff */}
            <Text 
                style={styles.modalNumber} 
                allowFontScaling={false}
                numberOfLines={1} 
                adjustsFontSizeToFit={true}
            >
                +{callingCode} {phoneNumber}
            </Text>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setConfirmVisible(false)}>
                {/* FIX 3: Prevent Button text cutoff */}
                <Text style={styles.modalCancelText} allowFontScaling={false}>Edit</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.modalConfirmBtn} onPress={handleNext}>
                {/* FIX 4: Prevent Button text cutoff */}
                <Text style={styles.modalConfirmText} allowFontScaling={false} numberOfLines={1}>Yes, Send</Text>
              </TouchableOpacity>
            </View>
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
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1c005e", 
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 15,
    color: "#666",
    marginBottom: 40,
    lineHeight: 22,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    height: 60,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  countrySection: {
    flexDirection: "row",
    alignItems: "center",
  },
  countryPickerBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  callingCode: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginLeft: 5,
  },
  verticalDivider: {
    width: 1,
    height: 24,
    backgroundColor: "#ddd",
    marginHorizontal: 12,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: "#1c005e",
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginLeft: 5,
  },
  errorText: {
    color: "#D32F2F",
    fontSize: 12,
    marginLeft: 5,
  },
  helperText: {
    fontSize: 12,
    color: "#888",
    marginTop: 20,
    textAlign: 'center',
    lineHeight: 18,
  },
  footer: {
    padding: 24,
  },
  button: {
    backgroundColor: "#1c005e", 
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    shadowColor: "#1c005e",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: "#A0A0A0",
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalBox: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 25,
    alignItems: "center",
    elevation: 10,
  },
  modalIconBg: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#F3E5F5",
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1c005e",
    marginBottom: 10,
    textAlign: 'center',
  },
  modalSub: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  modalNumber: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 30,
    textAlign: 'center',
    width: '100%', // Ensures it uses full width to center properly
  },
  modalActions: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  modalCancelBtn: {
    flex: 1,
    paddingVertical: 14,
    marginRight: 10,
    borderRadius: 12,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
  },
  modalCancelText: {
    color: "#555",
    fontSize: 16,
    fontWeight: "600",
  },
  modalConfirmBtn: {
    flex: 1,
    paddingVertical: 14,
    marginLeft: 10,
    borderRadius: 12,
    backgroundColor: "#1c005e",
    alignItems: "center",
    justifyContent: "center",
  },
  modalConfirmText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});