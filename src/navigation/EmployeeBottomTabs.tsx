// src/navigation/EmployeeBottomTabs.tsx


import React, { useState, useCallback } from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";

import Dashboard from "../screens/Employee/Dashboard";
import AppliedJobsScreen from "../screens/Employee/AppliedJobsScreen.tsx";
import NotificationScreen from "../screens/Employee/NotificationScreen";
import ProfileScreen from "../screens/Employee/ProfileScreen";

import { AppliedJob } from '../types';

const Tab = createBottomTabNavigator();


const Placeholder = ({ title }: { title: string }) => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text style={{ fontSize: 18 }}>{title}</Text>
  </View>
);

const EmployeeBottomNav = () => {
  const [appliedJobs, setAppliedJobs] = useState<AppliedJob[]>([]);

  const handleJobApplied = useCallback((job: AppliedJob) => {
    setAppliedJobs(prevJobs => {
      if (prevJobs.some(j => j.id === job.id)) {
        console.log(`Job ID ${job.id} already applied, skipping.`);
        return prevJobs;
      }
      console.log(`Job ID ${job.id} applied:`, job.title);
      return [...prevJobs, job];
    });
  }, []);

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
      <Tab.Screen
        name="Jobs"
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="briefcase-search"
              size={26}
              color={focused ? "#2F80ED" : "#9E9E9E"}
            />
          ),
        }}
      >
        {props => <Dashboard {...props} onJobApplied={handleJobApplied} />}
      </Tab.Screen>


      <Tab.Screen
        name="Applied"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="file-check-outline"
              size={26}
              color={focused ? "#27AE60" : "#9E9E9E"}
            />
          ),
        }}
      >
        {props => <AppliedJobsScreen {...props} appliedJobs={appliedJobs} />}
      </Tab.Screen>


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