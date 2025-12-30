import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const Tab = createBottomTabNavigator();

/*
  TEMP SCREENS – Replace later with real screens
  ---------------------------------------------
  DashboardScreen     → Overall system stats
  EmployersScreen     → Employer list & verification
  EmployeesScreen     → Job seekers list & verification
  TransactionsScreen  → Payments, commissions, reports
  AdminProfileScreen  → Etrust admin profile & settings
*/

const Placeholder = ({ title }: { title: string }) => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text style={{ fontSize: 18 }}>{title}</Text>
  </View>
);

const DashboardScreen = () => (
  <Placeholder title="Etrust Dashboard (Coming Soon)" />
);
const EmployersScreen = () => (
  <Placeholder title="Employers Management (Coming Soon)" />
);
const EmployeesScreen = () => (
  <Placeholder title="Employees Management (Coming Soon)" />
);
const TransactionsScreen = () => (
  <Placeholder title="Transactions / Reports (Coming Soon)" />
);
const AdminProfileScreen = () => (
  <Placeholder title="Admin Profile (Coming Soon)" />
);

const EtrustBottomNav = () => {
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
              name="view-dashboard-outline"
              size={26}
              color={focused ? "#6C63FF" : "#9E9E9E"}
            />
          ),
        }}
      />

      {/* EMPLOYERS */}
      <Tab.Screen
        name="Employers"
        component={EmployersScreen}
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

      {/* EMPLOYEES */}
      <Tab.Screen
        name="Employees"
        component={EmployeesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="account-multiple-outline"
              size={26}
              color={focused ? "#27AE60" : "#9E9E9E"}
            />
          ),
        }}
      />

      {/* TRANSACTIONS */}
      <Tab.Screen
        name="Transactions"
        component={TransactionsScreen}
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

      {/* PROFILE */}
      <Tab.Screen
        name="Profile"
        component={AdminProfileScreen}
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
