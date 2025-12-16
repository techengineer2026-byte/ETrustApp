import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
  FlatList,
  Dimensions,
  Alert,
} from "react-native";
import {
  launchCamera,
  launchImageLibrary,
  ImageLibraryOptions,
  CameraOptions,
} from "react-native-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import UpdatingCodeModal from "./UpdatingCodeModal";

const MAX_PHOTOS = 6;
const { width } = Dimensions.get("window");
const IMAGE_SIZE = (width - 48) / 3;

const PhotoUploadScreen = () => {
  const navigation = useNavigation<any>();
  const [photos, setPhotos] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [updating, setUpdating] = useState(false);

  const handlePickImage = async (fromCamera: boolean) => {
    try {
      const options: ImageLibraryOptions | CameraOptions = {
        mediaType: "photo",
        quality: 0.8,
        selectionLimit: 1,
      };

      const result = fromCamera
        ? await launchCamera(options)
        : await launchImageLibrary(options);

      if (result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri!;
        setPhotos((prev) => [...prev, uri]);
      }
    } catch (error) {
      Alert.alert("Error", "Could not open camera or gallery.");
    }
    setModalVisible(false);
  };

  const handleRemove = (uri: string) => {
    setPhotos((prev) => prev.filter((photo) => photo !== uri));
  };

  const handleNext = () => {
    setUpdating(true);
    setTimeout(() => {
      setUpdating(false);
      navigation.navigate("MainTabs");
    }, 2000);
  };

  const renderPhotoSlot = ({ item }: any) => (
    <View style={styles.photoSlot}>
      {item ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: item }} style={styles.image} />
          <TouchableOpacity
            style={styles.removeBtn}
            onPress={() => handleRemove(item)}
          >
            <Text style={styles.removeText}>✕</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => {
            if (photos.length < MAX_PHOTOS) setModalVisible(true);
            else Alert.alert("Limit Reached", "You can only upload 6 photos.");
          }}
        >
          <Text style={styles.plus}>＋</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const data = [...photos, ...Array(MAX_PHOTOS - photos.length).fill(null)];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Add your recent pics</Text>
        <Text style={styles.subtitle}>
          Upload 2 photos to start. Add 4 or more to make your profile stand out.
        </Text>

        <FlatList
          data={data}
          renderItem={renderPhotoSlot}
          numColumns={3}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={{ justifyContent: "space-between" }}
        />

        <TouchableOpacity
          style={[
            styles.nextBtn,
            { opacity: photos.length >= 2 ? 1 : 0.5, backgroundColor: "#000" },
          ]}
          disabled={photos.length < 2}
          onPress={handleNext}
        >
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>

        {/* --- MODERN BOTTOM SHEET MODAL --- */}
        <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            {/* Invisible touchable to close modal when clicking background */}
            <TouchableOpacity
              style={styles.modalBackdrop}
              onPress={() => setModalVisible(false)}
            />

            <View style={styles.bottomSheet}>
              {/* Little Handle Bar */}
              <View style={styles.handleBar} />

              <Text style={styles.sheetTitle}>Upload Photo</Text>

              <TouchableOpacity
                style={styles.sheetOption}
                onPress={() => handlePickImage(true)}
              >
                <Text style={styles.sheetIcon}>📷</Text>
                <Text style={styles.sheetText}>Take a Photo</Text>
              </TouchableOpacity>

              <View style={styles.divider} />

              <TouchableOpacity
                style={styles.sheetOption}
                onPress={() => handlePickImage(false)}
              >
                <Text style={styles.sheetIcon}>🖼️</Text>
                <Text style={styles.sheetText}>Choose from Gallery</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <UpdatingCodeModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      </View>
    </SafeAreaView>
  );
};

export default PhotoUploadScreen;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, padding: 20 },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 15,
    color: "#666",
    marginTop: 8,
    marginBottom: 20,
    lineHeight: 22,
  },
  grid: { marginTop: 10, paddingBottom: 20 },
  photoSlot: { width: IMAGE_SIZE, height: IMAGE_SIZE, marginBottom: 12 },
  imageContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    overflow: "hidden",
  },
  image: { width: "100%", height: "100%", resizeMode: "cover" },
  addBtn: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    backgroundColor: "#F2F2F7",
    borderWidth: 1,
    borderColor: "#E5E5EA",
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
  plus: { fontSize: 32, color: "#C7C7CC" },
  removeBtn: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 15,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  removeText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
  nextBtn: {
    width: "100%",
    borderRadius: 30,
    paddingVertical: 18,
    alignItems: "center",
    marginBottom: 10,
  },
  nextText: { color: "#fff", fontSize: 17, fontWeight: "600" },

  /* --- NEW MODAL STYLES --- */
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end", // Pushes content to bottom
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBackdrop: {
    flex: 1, // Takes up remaining space so you can click to close
  },
  bottomSheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40, // Extra padding for iPhone home bar
    alignItems: "center",
  },
  handleBar: {
    width: 40,
    height: 5,
    backgroundColor: "#E5E5EA",
    borderRadius: 3,
    marginBottom: 15,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    marginBottom: 20,
  },
  sheetOption: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 18,
  },
  sheetIcon: {
    fontSize: 22,
    marginRight: 15,
  },
  sheetText: {
    fontSize: 17,
    fontWeight: "500",
    color: "#000",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#F2F2F7",
  },
  cancelButton: {
    marginTop: 20,
    width: "100%",
    paddingVertical: 16,
    backgroundColor: "#F2F2F7",
    borderRadius: 12,
    alignItems: "center",
  },
  cancelText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000",
  },
});