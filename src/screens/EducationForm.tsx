import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  ImageBackground,

} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/* ===== REAL INDIAN DATA ===== */
const DEGREES = [
  "BA",
  "BSc",
  "BTech",
  "BCom",
  "BBA",
  "MA",
  "MSc",
  "MTech",
  "MBA",
  "Polytechnic",
  "Diploma",
  "PhD",
];

const FIELDS = [
  "Computer Science",
  "Information Technology",
  "Mechanical Engineering",
  "Civil Engineering",
  "Electrical Engineering",
  "Electronics & Communication",
  "Business Administration",
  "Commerce",
  "Arts",
  "Medical",
  "Nursing",
  "Pharmacy",
];

const COLLEGES = [
  "Panjab University, Chandigarh",
  "Punjab Engineering College (PEC), Chandigarh",
  "Chandigarh University",
  "DAV College, Chandigarh",
  "Post Graduate Government College, Chandigarh",
  "Punjabi University, Patiala",
  "Thapar Institute of Engineering & Technology, Patiala",
  "Guru Nanak Dev University, Amritsar",
  "Lovely Professional University, Phagwara",
  "Kurukshetra University, Haryana",
  "Maharshi Dayanand University, Rohtak",
  "Amity University, Haryana",
];

/* ===== AUTOCOMPLETE INPUT ===== */
const AutoComplete = ({
  label,
  placeholder,
  value,
  setValue,
  data,
}: any) => {
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

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
      />

      {show && (
        <View style={styles.dropdown}>
          <FlatList
            data={list}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => {
                  setValue(item);
                  setShow(false);
                }}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
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
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <ImageBackground
      source={require("../assets/bg.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Education Details</Text>


          <AutoComplete
            label="Degree"
            placeholder="e.g. BTech"
            value={degree}
            setValue={setDegree}
            data={DEGREES}
          />

          <AutoComplete
            label="Field of Study"
            placeholder="e.g. Computer Science"
            value={field}
            setValue={setField}
            data={FIELDS}
          />

          <AutoComplete
            label="College / University"
            placeholder="e.g. Panjab University"
            value={institution}
            setValue={setInstitution}
            data={COLLEGES}
          />

          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Chandigarh"
            value={location}
            onChangeText={setLocation}
          />


          <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate("JobType"); }}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default EducationForm;

/* ===== STYLES ===== */
const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flex: 1, padding: 24 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 6 },
  subtitle: { color: "#555", marginBottom: 20 },
  label: { fontSize: 16, fontWeight: "500", marginTop: 14, marginBottom: 6 },
  input: {
    borderWidth: 1.2,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    maxHeight: 160,
    marginTop: 4,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
  },
  button: {
    backgroundColor: "#000",
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});


