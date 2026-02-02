// src/navigation/EtrustBottomTabNavigator.tsx

import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

// --- Screens ---
import Dashboard from "../screens/ET-Center/Dashboard";
import ETEmployees from "../screens/ET-Center/ETemployees";
import ETEmployers from "../screens/ET-Center/ETemployers";
import Transactions from "../screens/ET-Center/Transactions";
import ETProfile from "../screens/ET-Center/ETProfile";
import ETChatScreen from "../screens/ET-Center/ETChatScreen"; // Real Chat Screen

// --- Context for Dynamic Badges ---
import { useChat } from "../context/ChatContext";

const Tab = createBottomTabNavigator();

const EtrustBottomNav = () => {
  // 1. Get Real Data from Context
  const { tickets } = useChat();

  // 2. Calculate Total Unread Messages dynamically
  const totalUnread = tickets.reduce((sum, ticket) => sum + ticket.unreadCount, 0);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 10,
          marginBottom: 4,
          fontWeight: '600'
        },
        tabBarStyle: {
          height: 90,
          backgroundColor: "#ffffff",
          borderTopWidth: 0,
          elevation: 15,
          paddingTop: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarActiveTintColor: '#333',
        tabBarInactiveTintColor: '#9E9E9E',
      }}
    >
      {/* 1. DASHBOARD */}
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="view-dashboard-outline"
              size={26}
              color={focused ? "#6C63FF" : "#9E9E9E"}
            />
          ),
        }}
      />

      {/* 2. EMPLOYERS */}
      <Tab.Screen
        name="Employers"
        component={ETEmployers}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="office-building"
              size={26}
              color={focused ? "#2F80ED" : "#9E9E9E"}
            />
          ),
        }}
      />

      {/* 3. EMPLOYEES (SEEKERS) */}
      <Tab.Screen
        name="Seekers"
        component={ETEmployees}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="account-tie-outline"
              size={26}
              color={focused ? "#27AE60" : "#9E9E9E"}
            />
          ),
        }}
      />

      {/* 4. CHAT (Dynamic Badge from Context) */}
      <Tab.Screen
        name="Chat"
        component={ETChatScreen}
        options={{
          tabBarLabel: 'Support',
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="message-processing-outline"
              size={26}
              color={focused ? "#E91E63" : "#9E9E9E"}
            />
          ),
          // Dynamic Badge: Only show if there are unread messages
          tabBarBadge: totalUnread > 0 ? totalUnread : undefined,
          tabBarBadgeStyle: {
            backgroundColor: '#E91E63',
            color: 'white',
            fontSize: 10,
            fontWeight: 'bold'
          }
        }}
      />

      {/* 5. FINANCE */}
      <Tab.Screen
        name="Finance"
        component={Transactions}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="file-invoice-dollar"
              size={22}
              color={focused ? "#F2994A" : "#9E9E9E"}
            />
          ),
        }}
      />

      {/* 6. PROFILE */}
      <Tab.Screen
        name="Profile"
        component={ETProfile}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="user-shield"
              size={22}
              color={focused ? "#6C63FF" : "#9E9E9E"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default EtrustBottomNav;