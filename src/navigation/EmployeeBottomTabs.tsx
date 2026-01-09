// src/navigation/EmployeeBottomTabs.tsx


import React, { useState, useCallback } from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import Dashboard from "../screens/Employee/Dashboard";
import AppliedJobsScreen from "../screens/Employee/AppliedJobsScreen";
import NotificationScreen from "../screens/Employee/NotificationScreen";
import ProfileScreen from "../screens/Employee/ProfileScreen";

import { AppliedJob, JobStatus, NotificationItem, INITIAL_NOTIFICATIONS_DATA } from '../types';


const Tab = createBottomTabNavigator();

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
  const [appliedJobs, setAppliedJobs] = useState<AppliedJob[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS_DATA);

  const addNotification = useCallback((newNotification: NotificationItem) => {
    setNotifications(prev => [newNotification, ...prev]);
  }, []);

  const handleJobApplied = useCallback((job: AppliedJob) => {
    setAppliedJobs(prevJobs => {
      if (prevJobs.some(j => j.id === job.id)) {
        console.log(`Job ID ${job.id} already applied.`);
        return prevJobs;
      }
      const appNotification: NotificationItem = {
        id: `app-${job.id}-${Date.now()}`,
        type: 'application',
        title: 'Application Submitted',
        message: `You applied for ${job.title} at ${job.company}. Status: Pending.`,
        time: 'Just now',
        read: false,
      };
      addNotification(appNotification);

      return [...prevJobs, job];
    });
  }, [addNotification]);

  const updateJobStatusAndNotify = useCallback((jobId: number, newStatus: JobStatus, message: string) => {
    let updatedJob: AppliedJob | undefined;
    setAppliedJobs(prevJobs => {
      const newJobs = prevJobs.map(job => {
        if (job.id === jobId) {
          updatedJob = { ...job, status: newStatus };
          return updatedJob;
        }
        return job;
      });
      return newJobs;
    });

    if (updatedJob) {
      let notificationType: NotificationItem['type'] = 'application';
      let notificationTitle = `Application Status: ${newStatus}`;

      if (newStatus === 'Interview') {
        notificationType = 'interview';
        notificationTitle = 'Interview Scheduled!';
      } else if (newStatus === 'Offer') {
        notificationType = 'application';
        notificationTitle = 'Job Offer Received!';
      } else if (newStatus === 'Rejected') {
        notificationType = 'application';
        notificationTitle = 'Application Rejected';
      }

      const statusNotification: NotificationItem = {
        id: `status-${jobId}-${Date.now()}`,
        type: notificationType,
        title: notificationTitle,
        message: `Your application for ${updatedJob.title} at ${updatedJob.company} is now ${newStatus}. ${message}`,
        time: 'Just now',
        read: false,
      };
      addNotification(statusNotification);
    }
  }, [addNotification]);


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
        {props => (
          <AppliedJobsScreen
            {...props}
            appliedJobs={appliedJobs}
            onUpdateJobStatus={updateJobStatusAndNotify}
          />
        )}
      </Tab.Screen>


      <Tab.Screen
        name="Alerts"
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="bell"
              size={26}
              color={focused ? "#EB5757" : "#9E9E9E"}
            />
          ),
          tabBarBadge: notifications.filter(n => !n.read).length > 0
            ? notifications.filter(n => !n.read).length
            : undefined,
          tabBarBadgeStyle: { backgroundColor: '#EB5757', color: 'white' }
        }}
      >
        {props => (
          <NotificationScreen
            {...props}
            notifications={notifications}
            setNotifications={setNotifications}
          />
        )}
      </Tab.Screen>

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