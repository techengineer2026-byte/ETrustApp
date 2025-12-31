// src/navigation/EmployeeBottomTabs.tsx

import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
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


const AppliedJobsScreen = () => (
  <Placeholder title="Applied Jobs Screen (Coming Soon)" />
);
const UploadResumeScreen = () => (
  <Placeholder title="Upload Resume Screen (Coming Soon)" />
);
const NotificationScreen = () => (
  <Placeholder title="Notifications Screen (Coming Soon)" />
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
          height: 70,
          backgroundColor: "#ffffff",
          borderTopWidth: 0,
          elevation: 8,
        },
      }}
    >
      {/* JOB LIST */}
      <Tab.Screen
        name="Jobs"
        component={AppliedJobsScreen}
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

      {/* APPLIED JOBS */}
      <Tab.Screen
        name="Applied"
        component={AppliedJobsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="file-check"
              size={26}
              color={focused ? "#27AE60" : "#9E9E9E"}
            />
          ),
        }}
      />

      {/* UPLOAD RESUME */}
      <Tab.Screen
        name="Resume"
        component={UploadResumeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="upload"
              size={28}
              color={focused ? "#F2994A" : "#9E9E9E"}
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

      {/* PROFILE */}
      <Tab.Screen
        name="Profile"
        component={EmployeeProfileScreen}
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
