import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// --- SCREENS ---
import EmployerDashboard from "../screens/Employer/EmployerDashboard"; // The Swipe Screen
import ApplicationsScreen from "../screens/Employer/ApplicationsScreen"; 
import PostJobScreen from "../screens/Employer/PostJobScreen"; // Used for the Middle Button
import ChatScreen from "../screens/Employer/ChatScreen";
import EmployerProfileScreen from "../screens/Employer/EmployerProfileScreen";
import JobPostDashboard from "../screens/Employer/JobPostDashboard";
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

        // --- SPECIAL LOGIC FOR MIDDLE BUTTON (Post New Job) ---
        if (route.name === "PostNewJob") {
           return (
             <TouchableOpacity
               key={index}
               style={styles.fabButton} // Makes it a Round Circle
               onPress={onPress}
               activeOpacity={0.8}
             >
               <Ionicons name="add" size={32} color="white" />
             </TouchableOpacity>
           );
        }

        // --- STANDARD TABS ---
        let iconName = "";
        let label = "";

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
      initialRouteName="Dashboard"
    >
      {/* 1. Home / Swipe Screen */}
      <Tab.Screen name="Dashboard" component={EmployerDashboard} />

      {/* 2. Applicant List */}
      <Tab.Screen name="Applicant" component={ApplicationsScreen} />

      {/* 3. MIDDLE BUTTON: Post New Job */}
      <Tab.Screen 
        name="PostNewJob" 
        component={JobPostDashboard} 
        options={{
            // This hides the bottom tab bar when you are on the "Post Job" screen
            tabBarStyle: { display: "none" } 
        }}
      />

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
    justifyContent: "space-between",
    alignItems: "center",
    height: Platform.OS === 'ios' ? 100 : 120,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    elevation: 10,
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
    width: 55,
    height: 55,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -25, // This pushes the button UP above the bar
    elevation: 5,
    shadowColor: PRIMARY_COLOR,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    borderWidth: 3,
    borderColor: "white"
  },
});

export default EmployerBottomNav;