// src/navigation/EmployerBottomNav.tsx

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";

// --- PLACEHOLDER SCREENS (Replace with your actual imports) ---
import EmployerDashboard from "../screens/Employer/EmployerDashboard";
import ApplicationsScreen from "../screens/Employer/ApplicationsScreen"; // Using this for "Jobs"
import PostJobScreen from "../screens/Employer/PostJobScreen";
import ChatScreen from "../screens/Employer/ChatScreen";
import EmployerProfileScreen from "../screens/Employer/EmployerProfileScreen";

const Tab = createBottomTabNavigator();

const PRIMARY_COLOR = "#6C63FF";
const GRAY_TEXT = "#9E9E9E";

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  return (
    <View style={styles.bottomTab}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        // --- 1. CENTER FAB (Post Job) ---
        if (route.name === "PostJob") {
          return (
            <TouchableOpacity
              key={index}
              style={styles.tabItem}
              onPress={onPress}
              activeOpacity={0.8}
            >
              <View style={styles.fabButton}>
                <Feather name="plus" size={28} color="white" />
              </View>
            </TouchableOpacity>
          );
        }

        // --- 2. STANDARD TABS ---
        let iconName = "";
        let label = "";

        // Define Icons and Labels based on Route Name
        switch (route.name) {
          case "Dashboard":
            iconName = isFocused ? "grid" : "grid-outline";
            label = "Home";
            break;
          case "Applicant":
            iconName = isFocused ? "briefcase" : "briefcase-outline";
            label = "Applicant";
            break;
          case "Chat":
            iconName = isFocused ? "chatbubble-ellipses" : "chatbubble-ellipses-outline";
            label = "Chat";
            break;
          case "Profile":
            iconName = isFocused ? "person" : "person-outline";
            label = "Profile";
            break;
          default:
            iconName = "ellipse";
            label = route.name;
        }

        const color = isFocused ? PRIMARY_COLOR : GRAY_TEXT;

        return (
          <TouchableOpacity
            key={index}
            style={styles.tabItem}
            onPress={onPress}
            activeOpacity={0.7}
          >
            <Ionicons name={iconName} size={24} color={color} />
            <Text style={[styles.tabText, { color }]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const EmployerBottomNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
      // This initialRouteName determines which tab opens first
      initialRouteName="Dashboard"
    >
      {/* 1. Home */}
      <Tab.Screen name="Dashboard" component={EmployerDashboard} />

      {/* 2. Jobs */}
      <Tab.Screen name="Applicant" component={ApplicationsScreen} />

      {/* 3. CENTER FAB */}
      <Tab.Screen name="PostJob" component={PostJobScreen} />

      {/* 4. Chat */}
      <Tab.Screen name="Chat" component={ChatScreen} />

      {/* 5. Profile */}
      <Tab.Screen name="Profile" component={EmployerProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  bottomTab: {
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between", // Ensures even spacing across 5 items
    alignItems: "center",
    // Platform specific height
    height: Platform.OS === 'ios' ? 100 : 120,
    paddingBottom: Platform.OS === 'ios' ? 20 : 30,
    paddingHorizontal: 10,
    // Shadows & Borders
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    elevation: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    fontSize: 10,
    marginTop: 4,
    fontWeight: "500",
  },
  fabButton: {
    width: 50,
    height: 50,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25, // Pushes the FAB up above the tab bar line
    elevation: 5,
    shadowColor: PRIMARY_COLOR,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});

export default EmployerBottomNav;