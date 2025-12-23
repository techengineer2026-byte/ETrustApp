import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Animated,
  Alert,
  Dimensions // Imported Dimensions
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

// --- PUZZLE DATA (Simulating images with Icons) ---
const PUZZLE_ITEMS = [
  { id: 1, icon: "car-sports", isTarget: true },
  { id: 2, icon: "pine-tree", isTarget: false },
  { id: 3, icon: "car-hatchback", isTarget: true },
  { id: 4, icon: "fire-hydrant", isTarget: false },
  { id: 5, icon: "car-convertible", isTarget: true }, // Target
  { id: 6, icon: "traffic-light", isTarget: false },
  { id: 7, icon: "bus", isTarget: false },
  { id: 8, icon: "car-pickup", isTarget: true },      // Target
  { id: 9, icon: "bicycle", isTarget: false },
];

export default function HumanVerification() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  
  // State
  const [showPuzzle, setShowPuzzle] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [verifying, setVerifying] = useState(false); // Spinner inside checkbox
  const [isVerified, setIsVerified] = useState(false); // Green Checkmark

  // Animation for the checkmark
  const scaleAnim = useRef(new Animated.Value(0)).current;

  const handleCheckboxClick = () => {
    if (!isVerified) {
      setShowPuzzle(true);
      setSelectedIds([]); // Reset selection
    }
  };

  const toggleSelection = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleVerifyPuzzle = () => {
    const targetIds = PUZZLE_ITEMS.filter(i => i.isTarget).map(i => i.id);
    
    const isCorrect = 
      selectedIds.length === targetIds.length && 
      selectedIds.every(id => targetIds.includes(id));

    if (isCorrect) {
      setShowPuzzle(false);
      setVerifying(true);

      setTimeout(() => {
        setVerifying(false);
        setIsVerified(true);
        
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 5,
          useNativeDriver: true,
        }).start();

        setTimeout(() => {
          navigation.replace("Firstname");
        }, 1200);

      }, 1500);
    } else {
      Alert.alert("Verification Failed", "Please select all the cars.");
      setSelectedIds([]); 
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={28} color="#1c005e" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} allowFontScaling={false}>
          Security Check
        </Text>
      </View>

      <View style={styles.content}>
        {/* FIX: Prevent text from blowing up on large phones */}
        <Text style={styles.title} allowFontScaling={false}>
          Are you human?
        </Text>
        <Text style={styles.subtitle} allowFontScaling={false}>
          Please complete the security check to proceed.
        </Text>

        {/* --- THE RECAPTCHA WIDGET --- */}
        <TouchableOpacity 
          style={[styles.captchaBox, isVerified && styles.captchaBoxSuccess]} 
          onPress={handleCheckboxClick}
          activeOpacity={1}
        >
          {/* Left Side: Checkbox / Spinner */}
          <View style={styles.checkboxContainer}>
            {isVerified ? (
              <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                <Icon name="check-bold" size={26} color="#0F9D58" />
              </Animated.View>
            ) : verifying ? (
              <ActivityIndicator size="small" color="#4285F4" />
            ) : (
              <View style={styles.emptyCheckbox} />
            )}
          </View>

          {/* Middle: Text */}
          <Text style={styles.captchaText} allowFontScaling={false}>
            I'm not a robot
          </Text>

          {/* Right: Logo */}
          <View style={styles.logoContainer}>
            <Icon name="shield-check" size={28} color="#555" />
            <Text style={styles.logoText} allowFontScaling={false}>
              reCAPTCHA
            </Text>
            <Text style={styles.privacyText} allowFontScaling={false}>
              Privacy - Terms
            </Text>
          </View>
        </TouchableOpacity>

      </View>

      {/* --- PUZZLE MODAL --- */}
      <Modal visible={showPuzzle} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.puzzleCard}>
            
            {/* Blue Header */}
            <View style={styles.puzzleHeader}>
              <View>
                <Text style={styles.puzzleTitle} allowFontScaling={false}>
                  Select all images with
                </Text>
                <Text style={styles.puzzleTarget} allowFontScaling={false}>
                  CARS
                </Text>
              </View>
              <Icon name="car-side" size={40} color="#fff" style={{ opacity: 0.9 }} />
            </View>

            {/* Grid */}
            <View style={styles.gridContainer}>
              {PUZZLE_ITEMS.map((item) => {
                const isSelected = selectedIds.includes(item.id);
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.gridItem}
                    activeOpacity={0.8}
                    onPress={() => toggleSelection(item.id)}
                  >
                    <View style={styles.iconWrapper}>
                      <Icon name={item.icon} size={40} color="#555" />
                    </View>

                    {isSelected && (
                      <View style={styles.selectedOverlay}>
                        <Icon name="check-circle" size={24} color="#fff" />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Footer */}
            <View style={styles.puzzleFooter}>
              <TouchableOpacity onPress={() => setShowPuzzle(false)}>
                <Icon name="refresh" size={24} color="#555" />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.verifyBtn} 
                onPress={handleVerifyPuzzle}
              >
                {/* FIX: "VERIF" -> "VERIFY" */}
                {/* 1. allowFontScaling={false} stops it from getting huge */}
                {/* 2. adjustsFontSizeToFit shrinks it if it is still too big */}
                <Text 
                  style={styles.verifyText} 
                  allowFontScaling={false}
                  numberOfLines={1}
                  adjustsFontSizeToFit={true}
                >
                  VERIFY
                </Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1c005e',
    marginLeft: 15,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    paddingBottom: 100,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 40,
  },
  // --- CAPTCHA BOX STYLES ---
  captchaBox: {
    width: "100%",
    backgroundColor: "#F9F9F9",
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 4,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    height: 78,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  captchaBoxSuccess: {
    borderColor: "#0F9D58", 
  },
  checkboxContainer: {
    width: 28,
    height: 28,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCheckbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#C1C1C1",
    borderRadius: 2,
    backgroundColor: "#fff",
  },
  captchaText: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 10,
  },
  logoText: {
    fontSize: 10,
    color: "#555",
    fontWeight: "bold",
    marginTop: 2,
  },
  privacyText: {
    fontSize: 8,
    color: "#999",
    marginTop: 2,
  },
  // --- MODAL STYLES ---
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  puzzleCard: {
    width: width * 0.85, // Changed from fixed 320 to 85% of screen width
    maxWidth: 350,       // Max limit so it doesn't get too big on tablets
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 20,
  },
  puzzleHeader: {
    backgroundColor: "#4285F4", 
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  puzzleTitle: {
    color: "#fff",
    fontSize: 16,
  },
  puzzleTarget: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "900",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 5,
  },
  gridItem: {
    width: "33.33%",
    aspectRatio: 1,
    padding: 3,
  },
  iconWrapper: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(66, 133, 244, 0.4)",
    borderWidth: 3,
    borderColor: "#4285F4",
    justifyContent: "center",
    alignItems: "center",
  },
  puzzleFooter: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  verifyBtn: {
    backgroundColor: "#4285F4",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 4,
    minWidth: 100, // Ensure button has minimum width
    alignItems: 'center',
  },
  verifyText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});