// src/screens/BDAY.tsx

import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Platform,
  Modal,
  Keyboard
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import Icon from "react-native-vector-icons/Ionicons";
import DateTimePicker from '@react-native-community/datetimepicker'; // npm install @react-native-community/datetimepicker

type BdayNavProp = NativeStackNavigationProp<RootStackParamList, "BDAY">;

export default function BDAYScreen() {
  const navigation = useNavigation<BdayNavProp>();
  
  // Text Input States
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  // Picker States
  const [date, setDate] = useState(new Date(2000, 0, 1)); // Default to year 2000
  const [showPicker, setShowPicker] = useState(false);

  // Refs for auto-focus
  const monthRef = useRef<TextInput>(null);
  const yearRef = useRef<TextInput>(null);

  const handleNext = () => {
    if (!isValidDate()) return;
    navigation.navigate("Gender");
  };

  const isValidDate = () => {
    const d = parseInt(day);
    const m = parseInt(month);
    const y = parseInt(year);
    if (isNaN(d) || isNaN(m) || isNaN(y)) return false;
    
    // Basic validation
    const currentYear = new Date().getFullYear();
    return (
      d > 0 && d <= 31 &&
      m > 0 && m <= 12 &&
      y > 1900 && y <= currentYear - 14 // Assuming user must be at least 14
    );
  };

  /* --- TEXT INPUT HANDLERS --- */
  const handleDayChange = (text: string) => {
    setDay(text);
    if (text.length === 2) monthRef.current?.focus();
  };

  const handleMonthChange = (text: string) => {
    setMonth(text);
    if (text.length === 2) yearRef.current?.focus();
  };

  /* --- DATE PICKER HANDLERS --- */
  const togglePicker = () => {
    Keyboard.dismiss();
    setShowPicker(true);
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
        setShowPicker(false);
    }
    
    if (selectedDate) {
      setDate(selectedDate);
      // Sync Text Inputs with Picker Selection
      setDay(selectedDate.getDate().toString().padStart(2, '0'));
      setMonth((selectedDate.getMonth() + 1).toString().padStart(2, '0'));
      setYear(selectedDate.getFullYear().toString());
    }
  };

  return (
    <ImageBackground
      source={require("../assets/bg.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          
          {/* Header */}
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="chevron-back" size={26} color="#1F2937" />
          </TouchableOpacity>

          <View style={styles.contentContainer}>
             <Text style={styles.title}>When is your Date of birth?</Text>
             <Text style={styles.subtitle}>Your age will be displayed on your profile, not your birth date.</Text>
             
             {/* Card Input Area */}
             <View style={styles.card}>
                <View style={styles.row}>
                    
                    {/* Manual Inputs */}
                    <View style={styles.inputsWrapper}>
                        <TextInput
                            style={styles.input}
                            placeholder="DD"
                            placeholderTextColor="#9CA3AF"
                            keyboardType="numeric"
                            maxLength={2}
                            value={day}
                            onChangeText={handleDayChange}
                        />
                        <Text style={styles.slash}>/</Text>
                        <TextInput
                            ref={monthRef}
                            style={styles.input}
                            placeholder="MM"
                            placeholderTextColor="#9CA3AF"
                            keyboardType="numeric"
                            maxLength={2}
                            value={month}
                            onChangeText={handleMonthChange}
                        />
                        <Text style={styles.slash}>/</Text>
                        <TextInput
                            ref={yearRef}
                            style={[styles.input, { width: 60 }]}
                            placeholder="YYYY"
                            placeholderTextColor="#9CA3AF"
                            keyboardType="numeric"
                            maxLength={4}
                            value={year}
                            onChangeText={setYear}
                        />
                    </View>

                    {/* Calendar Icon Button */}
                    <TouchableOpacity style={styles.iconButton} onPress={togglePicker}>
                        <Icon name="calendar" size={24} color="#2563EB" />
                    </TouchableOpacity>

                </View>
             </View>
          </View>
        </View>

        {/* Next Button */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[styles.nextButton, { opacity: isValidDate() ? 1 : 0.5 }]}
            onPress={handleNext}
            disabled={!isValidDate()}
          >
            <Text style={styles.nextButtonText}>Next</Text>
            <Icon name="arrow-forward" size={20} color="#fff" style={{marginLeft: 8}} />
          </TouchableOpacity>
        </View>

        {/* --- DATE PICKER LOGIC --- */}
        
        {/* Android Picker (Shows automatically when requested) */}
        {showPicker && Platform.OS === 'android' && (
            <DateTimePicker
                value={date}
                mode="date"
                display="spinner" // This creates the wheel effect
                onChange={onDateChange}
                maximumDate={new Date()}
            />
        )}

        {/* iOS Picker (Needs a Modal to pop up from bottom) */}
        {Platform.OS === 'ios' && (
            <Modal
                transparent={true}
                visible={showPicker}
                animationType="slide"
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <TouchableOpacity onPress={() => setShowPicker(false)}>
                                <Text style={styles.modalBtnText}>Done</Text>
                            </TouchableOpacity>
                        </View>
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="spinner" // Wheel effect
                            onChange={onDateChange}
                            maximumDate={new Date()}
                            textColor="#000"
                        />
                    </View>
                </View>
            </Modal>
        )}

      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  background: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 24, paddingTop: 10 },
  backButton: { marginBottom: 20 },
  
  contentContainer: { marginTop: 10 },
  title: { fontSize: 28, fontWeight: "800", color: "#111827", marginBottom: 8 },
  subtitle: { fontSize: 15, color: "#4B5563", marginBottom: 30, lineHeight: 22 },

  /* Card Style for Inputs */
  card: {
      backgroundColor: "#fff",
      padding: 24,
      borderRadius: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 5,
  },
  row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
  },
  inputsWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  input: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    paddingVertical: 5,
    textAlign: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#E5E7EB",
    minWidth: 40,
  },
  slash: {
      fontSize: 24,
      color: "#9CA3AF",
      marginHorizontal: 8,
      fontWeight: "300"
  },
  
  /* Icon Button */
  iconButton: {
      backgroundColor: "#EFF6FF",
      padding: 12,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: "#DBEAFE"
  },

  /* Footer */
  bottomContainer: { padding: 24, paddingBottom: 20, alignItems: 'flex-end' },
  nextButton: {
    backgroundColor: "#000",
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  nextButtonText: { color: "#fff", fontSize: 16, fontWeight: "700" },

  /* iOS Modal Styles */
  modalOverlay: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0,0,0,0.4)'
  },
  modalContent: {
      backgroundColor: '#fff',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingBottom: 40,
  },
  modalHeader: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
      alignItems: 'flex-end',
      backgroundColor: '#F9FAFB',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
  },
  modalBtnText: {
      fontSize: 16,
      color: '#2563EB',
      fontWeight: '600'
  }
});