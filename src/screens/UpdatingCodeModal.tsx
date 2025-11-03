import React, { useEffect } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

interface UpdatingCodeModalProps {
  visible: boolean;
  onClose: () => void;
  autoClose?: boolean;
}

const UpdatingCodeModal: React.FC<UpdatingCodeModalProps> = ({
  visible,
  onClose,
  autoClose = true,
}) => {
  // Auto-close after 2 seconds
  useEffect(() => {
    if (visible && autoClose) {
      const timer = setTimeout(onClose, 2000);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.box}>
          <ActivityIndicator size="large" color="#000" />
          <Text style={styles.text}>We are updating code...</Text>

          {!autoClose && (
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default UpdatingCodeModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 25,
    width: 260,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "#000",
    marginTop: 15,
    fontWeight: "500",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#000",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
