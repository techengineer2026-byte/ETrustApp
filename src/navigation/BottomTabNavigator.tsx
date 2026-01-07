// BottomTabNavigator.tsx
import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

// Screens
import ChatScreen from "../screens/ChatScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ExplorScreen from "../screens/ExplorScreen";
import Likescreen from "../screens/LikesScreen";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0,
          elevation: 5,
          height: 910,
        },
      }}
    >
      {/* 🔥 Home */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="fire"
              size={30}
              color={focused ? "#FF5864" : "gray"}
            />
          ),
        }}
      />

      {/* 🔍 Explore + Red dot badge */}
      <Tab.Screen
        name="Explore"
        component={ExplorScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="compass-outline"
              size={30}
              color={focused ? "#FF5864" : "gray"}
            />

          ),
        }}
      />

      <Tab.Screen
        name="Matches"
        component={Likescreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="mother-heart"
              size={30}
              color={focused ? "#FF5864" : "gray"}
            />
          ),
        }}
      />


      {/* 💬 Chat */}
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="chatbubbles"
              size={30}
              color={focused ? "#FF5864" : "gray"}
            />
          ),
        }}
      />

      {/* 👤 Profile */}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="user"
              size={30}
              color={focused ? "#FF5864" : "gray"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
