// src/screens/LocationSelection.tsx

import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Animated,
  ImageBackground,
  Modal,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Keyboard
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

// --- DATA ---
const INDIA_LOCATIONS: Record<string, string[]> = {
    Punjab: ["Mohali", "Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Kharar"],
    Haryana: ["Panchkula", "Gurgaon", "Faridabad", "Panipat", "Ambala"],
    Chandigarh: ["Chandigarh"],
    HimachalPradesh: ["Shimla", "Solan", "Kullu", "Kangra", "Mandi"],
    UttarPradesh: ["Lucknow", "Noida", "Varanasi", "Kanpur", "Agra"],
    Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
    Delhi: ["New Delhi", "North Delhi", "South Delhi", "West Delhi"],
    Karnataka: ["Bengaluru", "Mysuru", "Mangalore"],
    Telangana: ["Hyderabad", "Warangal"],
    TamilNadu: ["Chennai", "Coimbatore", "Madurai"],
    Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
    Rajasthan: ["Jaipur", "Udaipur", "Jodhpur"],
};

const { height } = Dimensions.get("window");

const LocationSelection = () => {
  const navigation = useNavigation<any>();

  // Selection State
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  // Modal State
  const [modalVisible, setModalVisible] = useState(false);
  const [selectionType, setSelectionType] = useState<"STATE" | "DISTRICT">("STATE");
  const [searchText, setSearchText] = useState("");

  // Animation for Bottom Drawer
  const slideAnim = useRef(new Animated.Value(300)).current; // Start off-screen
  const [showDrawer, setShowDrawer] = useState(false);

  // --- DRAWER ANIMATION LOGIC ---
  useEffect(() => {
    if (selectedState && selectedDistrict) {
      setShowDrawer(true);
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        friction: 8,
        tension: 40,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setShowDrawer(false));
    }
  }, [selectedState, selectedDistrict]);

  // --- HANDLERS ---r
  const openModal = (type: "STATE" | "DISTRICT") => {
    if (type === "DISTRICT" && !selectedState) return; // Block dis trict if no state
    setSelectionType(type);
    setSearchText("");
    setModalVisible(true);
  };

  const handleSelect = (item: string) => {
    if (selectionType === "STATE") {
      setSelectedState(item);
      setSelectedDistrict(null); // Reset district when state changes
      setModalVisible(false);
      // Automatically open district selection after short delay
      setTimeout(() => openModal("DISTRICT"), 300);
    } else {
      setSelectedDistrict(item);
      setModalVisible(false);
    }
  };

  const handleConfirm = () => {
    navigation.navigate("PreferredCity", {
        state: selectedState,
        district: selectedDistrict
    });
  };

  // --- FILTER DATA ---
  const getData = () => {
    let data = [];
    if (selectionType === "STATE") {
      data = Object.keys(INDIA_LOCATIONS);
    } else {
      data = selectedState ? INDIA_LOCATIONS[selectedState] : [];
    }
    
    if (searchText) {
      return data.filter(item => item.toLowerCase().includes(searchText.toLowerCase()));
    }
    return data;
  };

  return (
    <ImageBackground
      source={require("../assets/bg.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        
        {/* Header */}
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Icon name="chevron-back" size={28} color="#000" />
            </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <Text style={styles.title}>Where are you located?</Text>
          <Text style={styles.subtitle}>
            Select your current location to find jobs near you.
          </Text>

          {/* --- CUSTOM DROPDOWN TRIGGER: STATE --- */}
          <Text style={styles.label}>State</Text>
          <TouchableOpacity 
            style={styles.dropdownTrigger} 
            onPress={() => openModal("STATE")}
            activeOpacity={0.8}
          >
            <View style={styles.triggerContent}>
                <Icon name="map-outline" size={20} color="#000" style={{marginRight: 10}}/>
                <Text style={[styles.triggerText, !selectedState && styles.placeholderText]}>
                    {selectedState || "Select State"}
                </Text>
            </View>
            <Icon name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>

          {/* --- CUSTOM DROPDOWN TRIGGER: DISTRICT --- */}
          <Text style={styles.label}>City / District</Text>
          <TouchableOpacity 
            style={[styles.dropdownTrigger, !selectedState && { opacity: 0.5 }]} 
            onPress={() => openModal("DISTRICT")}
            activeOpacity={0.8}
            disabled={!selectedState}
          >
            <View style={styles.triggerContent}>
                <Icon name="business-outline" size={20} color="#000" style={{marginRight: 10}}/>
                <Text style={[styles.triggerText, !selectedDistrict && styles.placeholderText]}>
                    {selectedDistrict || "Select City"}
                </Text>
            </View>
            <Icon name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>

        </View>

        {/* --- BOTTOM DRAWER CONFIRMATION --- */}
        {showDrawer && (
            <Animated.View style={[styles.bottomDrawer, { transform: [{ translateY: slideAnim }] }]}>
                {/* Handle Bar */}
                <View style={styles.drawerHandle} />
                
                <Text style={styles.drawerTitle}>Confirm Location</Text>
                
                <View style={styles.locationSummary}>
                    <Icon name="location-sharp" size={24} color="#000" />
                    <Text style={styles.summaryText}>
                        {selectedDistrict}, {selectedState}
                    </Text>
                </View>

                <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                    <Text style={styles.confirmButtonText}>Confirm Location</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.changeButton} 
                    onPress={() => {
                        setSelectedDistrict(null); // Reset to force re-selection or just hide drawer
                    }}
                >
                    <Text style={styles.changeButtonText}>Change</Text>
                </TouchableOpacity>
            </Animated.View>
        )}

        {/* --- FULL SCREEN SELECTION MODAL --- */}
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    
                    {/* Modal Header */}
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>
                            Select {selectionType === "STATE" ? "State" : "City"}
                        </Text>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeIcon}>
                            <Icon name="close" size={24} color="#000" />
                        </TouchableOpacity>
                    </View>

                    {/* Search Bar */}
                    <View style={styles.searchContainer}>
                        <Icon name="search" size={20} color="#666" />
                        <TextInput 
                            style={styles.searchInput}
                            placeholder="Search..."
                            value={searchText}
                            onChangeText={setSearchText}
                            autoFocus
                        />
                    </View>

                    {/* List */}
                    <FlatList 
                        data={getData()}
                        keyExtractor={(item) => item}
                        keyboardShouldPersistTaps="handled"
                        renderItem={({ item }) => (
                            <TouchableOpacity 
                                style={styles.listItem} 
                                onPress={() => handleSelect(item)}
                            >
                                <Text style={styles.listItemText}>{item}</Text>
                                <Icon name="chevron-forward" size={18} color="#ccc" />
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
        </Modal>

      </SafeAreaView>
    </ImageBackground>
  );
};

export default LocationSelection;

const styles = StyleSheet.create({
  background: { flex: 1 },
  safeArea: { flex: 1 },
  
  header: { paddingHorizontal: 24, paddingTop: 10 },
  backButton: { marginBottom: 10 },

  container: { flex: 1, paddingHorizontal: 24 },
  
  title: { fontSize: 28, fontWeight: "800", color: "#000", marginBottom: 8 },
  subtitle: { fontSize: 15, color: "#444", marginBottom: 30 },

  /* Dropdown Styles */
  label: {
      fontSize: 14,
      fontWeight: "600",
      color: "#333",
      marginBottom: 8,
      marginTop: 10,
      marginLeft: 4
  },
  dropdownTrigger: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: "#fff",
      // Shadow
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 5,
      elevation: 3,
      marginBottom: 10
  },
  triggerContent: { flexDirection: "row", alignItems: "center" },
  triggerText: { fontSize: 16, color: "#000", fontWeight: "500" },
  placeholderText: { color: "#888" },

  /* --- BOTTOM DRAWER STYLES --- */
  bottomDrawer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "#fff",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      padding: 24,
      paddingBottom: 40,
      // Deep Shadow
      shadowColor: "#000",
      shadowOffset: { width: 0, height: -5 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 20,
      alignItems: "center"
  },
  drawerHandle: {
      width: 40,
      height: 4,
      backgroundColor: "#ddd",
      borderRadius: 2,
      marginBottom: 20,
  },
  drawerTitle: { fontSize: 20, fontWeight: "700", marginBottom: 15 },
  locationSummary: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#f5f5f5",
      padding: 15,
      borderRadius: 12,
      marginBottom: 20,
      width: "100%",
      justifyContent: "center"
  },
  summaryText: { fontSize: 18, fontWeight: "600", marginLeft: 10 },
  
  confirmButton: {
      backgroundColor: "#000",
      width: "100%",
      paddingVertical: 18,
      borderRadius: 30,
      alignItems: "center",
      marginBottom: 10
  },
  confirmButtonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  
  changeButton: { paddingVertical: 10 },
  changeButtonText: { color: "#666", fontWeight: "600" },

  /* --- MODAL STYLES --- */
  modalContainer: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "flex-end",
  },
  modalContent: {
      backgroundColor: "#fff",
      height: "85%",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
  },
  modalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
  },
  modalTitle: { fontSize: 22, fontWeight: "700" },
  closeIcon: { padding: 5 },
  
  searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#f0f0f0",
      borderRadius: 12,
      paddingHorizontal: 15,
      height: 50,
      marginBottom: 20,
  },
  searchInput: {
      flex: 1,
      marginLeft: 10,
      fontSize: 16,
      color: "#000",
  },
  listItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: "#f0f0f0",
  },
  listItemText: { fontSize: 16, color: "#333" },
});