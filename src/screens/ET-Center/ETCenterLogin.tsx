import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  StatusBar
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const { height, width } = Dimensions.get("window");

export default function ETCenterLogin() {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      return Alert.alert("Missing Credentials", "Please enter your email and password.");
    }
    console.log("ET Center Logged In");
    navigation.replace("MainTabs"); // Redirect to Dashboard
  };

  return (
    <ImageBackground source={require("../../assets/bg.jpg")} style={styles.background} resizeMode="cover">
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          
          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <Image source={require("../../assets/logo.png")} style={styles.logo} resizeMode="contain" />
          </View>

          <Text style={styles.title}>ET Center Login</Text>
          <Text style={styles.subtitle}>Authorized Center Access</Text>

          {/* Login Form Card */}
          <View style={styles.formCard}>
            
            {/* Email */}
            <View style={styles.inputWrapper}>
              <Icon name="email-outline" size={24} color="#666" style={styles.icon} />
              <TextInput 
                style={styles.input} 
                placeholder="Official Email ID" 
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* Password */}
            <View style={styles.inputWrapper}>
              <Icon name="lock-outline" size={24} color="#666" style={styles.icon} />
              <TextInput 
                style={styles.input} 
                placeholder="Password" 
                placeholderTextColor="#999"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <TouchableOpacity style={{alignSelf: 'flex-end', marginBottom: 20}}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Session Rule Note */}
            <View style={styles.sessionInfo}>
                <Icon name="clock-time-eight-outline" size={20} color="#059669" />
                <View style={{marginLeft: 10, flex: 1}}>
                    <Text style={styles.sessionTitle}>Session Active All Day</Text>
                    <Text style={styles.sessionSub}>You will remain logged in for the entire day.</Text>
                </View>
            </View>

            {/* Login Button */}
            <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                <Text style={styles.loginText}>LOGIN</Text>
                <Icon name="login" size={20} color="#fff" style={{marginLeft: 10}} />
            </TouchableOpacity>

            {/* Register Link */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>New Center? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("ETCenterStep1")}>
                    <Text style={styles.registerText}>Register Here</Text>
                </TouchableOpacity>
            </View>

          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: "100%", height: "100%" },
  scrollContainer: { flexGrow: 1, alignItems: "center", paddingTop: height * 0.08, paddingBottom: 30 },
  logoContainer: { marginBottom: 15 },
  logo: { width: width * 0.55, height: 90 },
  title: { fontSize: 26, fontWeight: "800", color: "#0f172a" },
  subtitle: { fontSize: 16, color: "#555", marginBottom: 30 },
  formCard: { width: width * 0.9, backgroundColor: "rgba(255,255,255,0.96)", borderRadius: 20, padding: 25, elevation: 8, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 5 },
  inputWrapper: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderWidth: 1, borderColor: "#E2E8F0", borderRadius: 12, paddingHorizontal: 15, height: 55, marginBottom: 15 },
  icon: { marginRight: 10 },
  input: { flex: 1, fontSize: 16, color: "#333" },
  forgotText: { color: "#1c005e", fontWeight: "600", fontSize: 13 },
  
  // Session Note Style
  sessionInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, backgroundColor: '#ECFDF5', padding: 12, borderRadius: 12, borderLeftWidth: 4, borderLeftColor: '#059669' },
  sessionTitle: { color: '#047857', fontSize: 13, fontWeight: 'bold' },
  sessionSub: { color: '#065F46', fontSize: 11 },

  loginBtn: { backgroundColor: "#1c005e", borderRadius: 12, paddingVertical: 16, flexDirection: 'row', justifyContent: 'center', alignItems: "center", marginBottom: 20, shadowColor: "#000", shadowOpacity: 0.2, elevation: 3 },
  loginText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  footer: { flexDirection: "row", justifyContent: "center" },
  footerText: { color: "#555" },
  registerText: { color: "#1c005e", fontWeight: "bold" },
});