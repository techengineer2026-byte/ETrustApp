import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const SkillsScreen = ({ navigation }: any) => {
  const [input, setInput] = useState("");
  const [skills, setSkills] = useState<string[]>([]);

  const handleAddSkill = () => {
    if (input.trim() !== "") {
      const newSkills = input
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);
      setSkills([...skills, ...newSkills]);
      setInput("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleNext = () => {
    console.log("Skills:", skills);
    navigation.navigate("PhotoUploadScreen");   
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Your Skills</Text>
        <Text style={styles.subtitle}>
          Add skills relevant to your job role. Press comma (,) or Enter to add.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Type a skill and press comma or Enter..."
          value={input}
          onChangeText={setInput}
          onSubmitEditing={handleAddSkill}
          onBlur={handleAddSkill}
        />

        {/* Skill Tags */}
        <View style={styles.tagsContainer}>
          {skills.map((skill, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{skill}</Text>
              <TouchableOpacity onPress={() => handleRemoveSkill(skill)}>
                <Text style={styles.remove}>✕</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Next Button */}
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SkillsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
  },
  title: { fontSize: 24, fontWeight: "700", color: "#000", marginBottom: 8 },
  subtitle: { color: "#555", marginBottom: 24 },
  input: {
    borderWidth: 1.3,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
  },
  tagText: { fontSize: 14, color: "#000", marginRight: 6 },
  remove: { color: "#ff5555", fontWeight: "bold", fontSize: 16 },
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
