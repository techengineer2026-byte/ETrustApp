import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

const JobType = ({ navigation }: any) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [showOnProfile, setShowOnProfile] = useState(false);

  const jobOptions = [
    { 
      id: "full", 
      title: "Full-time", 
      desc: "Standard 40-hour work week", 
      icon: "briefcase-outline",
      activeIcon: "briefcase"
    },
    { 
      id: "part", 
      title: "Part-time", 
      desc: "Flexible or reduced hours", 
      icon: "time-outline",
      activeIcon: "time"
    },
    { 
      id: "contract", 
      title: "Contract / Freelance", 
      desc: "Project-based work", 
      icon: "document-text-outline",
      activeIcon: "document-text"
    },
  ];

  return (
    <ImageBackground
      source={require("../assets/bg.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          
          {/* Back Button */}
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="chevron-back" size={28} color="#000" />
          </TouchableOpacity>

          <Text style={styles.title}>What type of job?</Text>
          <Text style={styles.subtitle}>
            Select the work style that fits your current goals.
          </Text>

          {/* Options List */}
          <View style={styles.listContainer}>
            {jobOptions.map((option) => {
              const isSelected = selected === option.id;
              return (
                <TouchableOpacity
                  key={option.id}
                  activeOpacity={0.8}
                  style={[
                    styles.optionCard,
                    isSelected && styles.optionCardSelected,
                  ]}
                  onPress={() => setSelected(option.id)}
                >
                  {/* Icon Box */}
                  <View style={[styles.iconBox, isSelected && styles.iconBoxSelected]}>
                    <Icon 
                      name={isSelected ? option.activeIcon : option.icon} 
                      size={24} 
                      color={isSelected ? "#fff" : "#000"} 
                    />
                  </View>

                  {/* Text Content */}
                  <View style={styles.textContainer}>
                    <Text
                      style={[
                        styles.optionTitle,
                        isSelected && styles.optionTitleSelected,
                      ]}
                    >
                      {option.title}
                    </Text>
                    <Text style={styles.optionDesc}>{option.desc}</Text>
                  </View>

                  {/* Checkmark */}
                  {isSelected && (
                     <Icon name="checkmark-circle" size={24} color="#000" />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Bottom Section */}
        <View style={styles.bottomContainer}>
          
          {/* Checkbox */}
          <TouchableOpacity
            style={styles.checkboxRow}
            activeOpacity={1}
            onPress={() => setShowOnProfile(!showOnProfile)}
          >
             <View
              style={[
                styles.customCheckbox,
                showOnProfile && styles.customCheckboxChecked,
              ]}
            >
              {showOnProfile && <Icon name="checkmark" size={16} color="#fff" />}
            </View>
            <Text style={styles.checkboxLabel}>Show job type on profile</Text>
          </TouchableOpacity>

          {/* Next Button */}
          <TouchableOpacity
            style={[
              styles.nextButton,
              !selected && { opacity: 0.5 },
            ]}
            disabled={!selected}
            onPress={() => navigation.navigate("WorkExperience")}
          >
            <Text style={styles.nextText}>Next</Text>
            <Icon name="arrow-forward" size={20} color="#fff" style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </ImageBackground>
  );
};

export default JobType;

const styles = StyleSheet.create({
  background: { flex: 1 },
  safe: { flex: 1 },
  
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  
  /* Header */
  backButton: { marginBottom: 15 },
  title: { fontSize: 28, fontWeight: "800", color: "#000", marginBottom: 8 },
  subtitle: { fontSize: 15, color: "#444", marginBottom: 30, lineHeight: 22 },

  /* List */
  listContainer: { gap: 16 },

  /* Card Styling */
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 20,
    padding: 18,
    borderWidth: 2,
    borderColor: "transparent",
    // Shadows
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  optionCardSelected: {
    backgroundColor: "#fff",
    borderColor: "#000",
    shadowOpacity: 0.15,
  },
  
  /* Icon Box */
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  iconBoxSelected: {
    backgroundColor: "#000",
  },

  /* Text inside Card */
  textContainer: { flex: 1 },
  optionTitle: { fontSize: 17, fontWeight: "600", color: "#333", marginBottom: 2 },
  optionTitleSelected: { color: "#000", fontWeight: "700" },
  optionDesc: { color: "#666", fontSize: 13 },

  /* Bottom Section */
  bottomContainer: {
    paddingHorizontal: 24,
    paddingBottom: 10,
    justifyContent: "flex-end",
  },
  
  /* Checkbox */
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  customCheckbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    backgroundColor: "transparent",
  },
  customCheckboxChecked: {
    backgroundColor: "#000",
  },
  checkboxLabel: { color: "#000", fontSize: 15, fontWeight: "500" },

  /* Next Button */
  nextButton: {
    backgroundColor: "#000",
    borderRadius: 30, // Consistent with other screens
    paddingVertical: 18,
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
  nextText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});