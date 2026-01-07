// src/navigation/EmployeeBottomTabs.tsx

import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";
import Dashboard from "../screens/Employee/Dashboard";
import AppliedJobsScreen from "../screens/Employee/AppliedJobs";
import NotificationScreen from "../screens/Employee/NotificationScreen";
import ProfileScreen from "../screens/Employee/ProfileScreen";
const Tab = createBottomTabNavigator();

/* 
  TEMP SCREENS – Replace later with real screens
  ------------------------------------------------
  JobsScreen            → Nearby Jobs + Apply Now
  AppliedJobsScreen     → Applied Jobs + Status
  UploadResumeScreen    → Resume Upload
  NotificationScreen    → Job Alerts
  EmployeeProfileScreen → Candidate Details
*/

const Placeholder = ({ title }: { title: string }) => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text style={{ fontSize: 18 }}>{title}</Text>
  </View>
);



const UploadResumeScreen = () => (
  <Placeholder title="Upload Resume Screen (Coming Soon)" />
);

const EmployeeProfileScreen = () => (
  <Placeholder title="Profile Screen (Coming Soon)" />
);

const EmployeeBottomNav = () => {
  return (

    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 11,
          marginBottom: 4,
        },
        tabBarStyle: {
          height: 100,
          backgroundColor: "#ffffff",
          borderTopWidth: 0,
          elevation: 8,
        },
      }}
    >
      {/* JOB LIST */}
      <Tab.Screen
        name="Jobs"
        component={Dashboard}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="briefcase-search"
              size={26}
              color={focused ? "#2F80ED" : "#9E9E9E"}
            />
          ),
        }}
      />


      <Tab.Screen
        name="Applied"
        component={AppliedJobsScreen}
        options={{
          headerShown: false, // We created a custom header inside the component
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="file-check-outline"
              size={26}
              color={focused ? "#27AE60" : "#9E9E9E"}
            />
          ),
        }}
      />


      {/* ALERTS */}
      <Tab.Screen
        name="Alerts"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="bell"
              size={26}
              color={focused ? "#EB5757" : "#9E9E9E"}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="user"
              size={24}
              color={focused ? "#2F80ED" : "#9E9E9E"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default EmployeeBottomNav;
