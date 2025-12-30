import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const Tab = createBottomTabNavigator();

/*
  TEMP SCREENS – Replace later with real screens
  ---------------------------------------------
  DashboardScreen     → Posted jobs + applied count
  PostJobScreen       → Create new job
  ApplicantsScreen    → Applied candidates + download resume
  WalletScreen        → Recharge & payment gateway
  EmployerProfile     → Company details
*/

const Placeholder = ({ title }: { title: string }) => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text style={{ fontSize: 18 }}>{title}</Text>
  </View>
);

const DashboardScreen = () => (
  <Placeholder title="Dashboard (Coming Soon)" />
);
const PostJobScreen = () => (
  <Placeholder title="Post Job (Coming Soon)" />
);
const ApplicantsScreen = () => (
  <Placeholder title="Applicants (Coming Soon)" />
);
const WalletScreen = () => (
  <Placeholder title="Wallet / Payment (Coming Soon)" />
);
const EmployerProfileScreen = () => (
  <Placeholder title="Employer Profile (Coming Soon)" />
);

const EmployerBottomNav = () => {
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
      {/* DASHBOARD */}
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="view-dashboard"
              size={26}
              color={focused ? "#2F80ED" : "#9E9E9E"}
            />
          ),
        }}
      />

      {/* POST JOB */}
      <Tab.Screen
        name="Post Job"
        component={PostJobScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="briefcase-plus"
              size={28}
              color={focused ? "#27AE60" : "#9E9E9E"}
            />
          ),
        }}
      />

      {/* APPLICANTS */}
      <Tab.Screen
        name="Applicants"
        component={ApplicantsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="account-group"
              size={26}
              color={focused ? "#2F80ED" : "#9E9E9E"}
            />
          ),
        }}
      />

      {/* WALLET */}
      <Tab.Screen
        name="Wallet"
        component={WalletScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="wallet"
              size={24}
              color={focused ? "#F2994A" : "#9E9E9E"}
            />
          ),
        }}
      />

      {/* PROFILE */}
      <Tab.Screen
        name="Profile"
        component={EmployerProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="user-tie"
              size={24}
              color={focused ? "#2F80ED" : "#9E9E9E"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default EmployerBottomNav;
