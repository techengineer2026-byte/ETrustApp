import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

/* ===== REAL INDIAN DATA ===== */
const DEGREES = ["BA", "BSc", "BTech", "BCom", "BCA", "BBA", "MA", "MSc", "MTech", "MBA", "PhD"];
const FIELDS = ["Computer Science", "Information Technology", "Mechanical", "Civil", "Electrical", "Commerce", "Arts", "Medical"];
const COLLEGES = ["Panjab University", "Chandigarh University", "Thapar University", "LPU", "Delhi University", "IIT Delhi", "IIT Bombay"];

/* ===== AUTOCOMPLETE COMPONENT ===== */
// We pass zIndex to control stacking order (Top input needs higher zIndex)
const AutoComplete = ({ label, placeholder, value, setValue, data, zIndex }: any) => {
  const [list, setList] = useState<string[]>([]);
  const [show, setShow] = useState(false);

  const onChange = (text: string) => {
    setValue(text);
    if (text.length > 0) {
      const filtered = data.filter((item: string) =>
        item.toLowerCase().includes(text.toLowerCase())
      );
      setList(filtered);
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const handleSelect = (item: string) => {
    setValue(item);
    setShow(false);
    Keyboard.dismiss();
  };

  return (
    // The container needs the zIndex so the dropdown floats OVER the next input
    <View style={[styles.inputContainer, { zIndex: zIndex }]}>
      <Text style={styles.label}>{label}</Text>
      
      <View>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChange}
          onFocus={() => {
            if(value.length > 0) setShow(true);
          }}
        />
        
        {/* Right Icon for visuals */}
        <Icon name="chevron-down" size={20} color="#ccc" style={styles.inputIcon} />
      </View>

      {/* Floating Dropdown */}
      {show && list.length > 0 && (
        <View style={styles.dropdown}>
          <FlatList
            data={list}
            keyExtractor={(item) => item}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.dropdownItem} onPress={() => handleSelect(item)}>
                <Text style={styles.dropdownText}>{item}</Text>
              </TouchableOpacity>
            )}
            style={{ maxHeight: 150 }} // Limit height so it scrolls
          />
        </View>
      )}
    </View>
  );
};

/* ===== MAIN SCREEN ===== */
const EducationForm = ({ navigation }: any) => {
  const [degree, setDegree] = useState("");
  const [field, setField] = useState("");
  const [institution, setInstitution] = useState("");
  
  // Validation check
  const isFormValid = degree.length > 0 && field.length > 0 && institution.length > 0;

  return (
    <ImageBackground
      source={require("../assets/bg.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Icon name="chevron-back" size={28} color="#000" />
            </TouchableOpacity>
            <Text style={styles.title}>Education Details</Text>
            <Text style={styles.subtitle}>Add your academic background.</Text>
          </View>

          {/* 
            SCROLLVIEW TIP: 
            keyboardShouldPersistTaps="handled" allows clicking dropdown items 
            without closing keyboard immediately.
          */}
          <ScrollView 
            contentContainerStyle={styles.scrollContent} 
            keyboardShouldPersistTaps="handled"
          >
            
            {/* 
              Z-INDEX TRICK:
              Top inputs must have HIGHER zIndex than bottom inputs. 
              Otherwise, the list opens *behind* the next input box.
            */}
            
            <AutoComplete
              label="Degree"
              placeholder="e.g. BTech, BCA"
              value={degree}
              setValue={setDegree}
              data={DEGREES}
              zIndex={3000} 
            />

            <AutoComplete
              label="Field of Study"
              placeholder="e.g. Computer Science"
              value={field}
              setValue={setField}
              data={FIELDS}
              zIndex={2000}
            />

            <AutoComplete
              label="College / University"
              placeholder="e.g. Panjab University"
              value={institution}
              setValue={setInstitution}
              data={COLLEGES}
              zIndex={1000}
            />

          </ScrollView>

          {/* Fixed Bottom Button */}
          <View style={styles.bottomContainer}>
            <TouchableOpacity 
              style={[styles.nextButton, { opacity: isFormValid ? 1 : 0.5 }]} 
              onPress={() => navigation.navigate("JobType")}
              disabled={!isFormValid}
            >
              <Text style={styles.nextButtonText}>Next</Text>
              <Icon name="arrow-forward" size={20} color="#fff" style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          </View>

        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default EducationForm;

/* ===== STYLES ===== */
const styles = StyleSheet.create({
  background: { flex: 1 },
  safe: { flex: 1 },
  
  headerContainer: {
    paddingHorizontal: 24,
    paddingTop: 10,
    zIndex: 1,
  },
  backButton: { marginBottom: 15 },
  title: { fontSize: 28, fontWeight: "800", color: "#000", marginBottom: 5 },
  subtitle: { fontSize: 15, color: "#555", marginBottom: 20 },

  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 100, // Extra space so last dropdown isn't cut off
  },

  /* INPUT STYLES */
  inputContainer: {
    marginBottom: 20,
    // Position relative is default, but zIndex is handled via props
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#000",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  inputIcon: {
    position: "absolute",
    right: 15,
    top: 15,
  },

  /* DROPDOWN STYLES (Floating) */
  dropdown: {
    position: "absolute", // THIS FLOATS IT
    top: 85, // Distance from top of container (Label + Input height)
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eee",
    // Strong shadow so it pops out
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  dropdownItem: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  dropdownText: {
    fontSize: 15,
    color: "#333",
  },

  /* BUTTON STYLES (Consistent with previous screens) */
  bottomContainer: {
    paddingHorizontal: 24,
    paddingBottom: 10,
    justifyContent: "flex-end",
    backgroundColor: 'transparent' // or white if you want it opaque
  },
  nextButton: {
    backgroundColor: "#000",
    borderRadius: 30,
    paddingVertical: 16,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  nextButtonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});