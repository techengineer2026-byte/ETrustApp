import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
  
  FlatList,
} from "react-native";
import {
  launchCamera,
  launchImageLibrary,
  ImageLibraryOptions,
  CameraOptions,
} from "react-native-image-picker";
import UpdatingCodeModal from "./UpdatingCodeModal";
import { SafeAreaView } from "react-native-safe-area-context";
const MAX_PHOTOS = 6;

const PhotoUploadScreen = ({ navigation }: any) => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [updating, setUpdating] = useState(false);

  const handlePickImage = async (fromCamera: boolean) => {
    const options: ImageLibraryOptions | CameraOptions = {
      mediaType: "photo",
      quality: 1,
    };

    const result = fromCamera
      ? await launchCamera(options)
      : await launchImageLibrary(options);

    if (result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri!;
      setPhotos((prev) => [...prev, uri]);
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
    }, 2000);
  };


  const renderPhotoSlot = ({ item }: any) => (
    <View style={styles.photoSlot}>
      {item ? (
        <View>
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
          onPress={() => setModalVisible(true)}
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
        />

        <TouchableOpacity
          style={[styles.nextBtn, { opacity: photos.length >= 2 ? 1 : 0.5 }]}
          disabled={photos.length < 2}
          onPress={handleNext}
        >
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>

        {/* Camera/Gallery Modal */}
        <Modal transparent visible={modalVisible} animationType="slide">
          <View style={styles.modalBg}>
            <View style={styles.modal}>
              <Text style={styles.modalTitle}>Select source</Text>
              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => handlePickImage(true)}
              >
                <Text style={styles.modalText}>📷 Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => handlePickImage(false)}
              >
                <Text style={styles.modalText}>🖼️ Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.cancel}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default PhotoUploadScreen;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, padding: 20, alignItems: "center" },
  title: { fontSize: 24, fontWeight: "700", color: "#000", marginTop: 20 },
  subtitle: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginVertical: 10,
  },
  grid: { alignItems: "center", marginTop: 10 },
  photoSlot: {
    width: 100,
    height: 100,
    margin: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  addBtn: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
  },
  plus: { fontSize: 28, color: "#999" },
  removeBtn: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "#00000080",
    borderRadius: 12,
    padding: 2,
  },
  removeText: { color: "#fff", fontSize: 12 },
  nextBtn: {
    width: "90%",
    backgroundColor: "#000",
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 30,
  },
  nextText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  modalBg: {
    flex: 1,
    backgroundColor: "#00000070",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: { fontSize: 18, fontWeight: "700", marginBottom: 15 },
  modalBtn: {
    width: "100%",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
  },
  modalText: { fontSize: 16, color: "#000" },
  cancel: { marginTop: 10, color: "#007AFF", fontSize: 16 },
});
