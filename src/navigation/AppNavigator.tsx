import React from 'react';
import { RootStackParamList } from "../types/navigation";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from '../screens/SplashIntroScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import PhoneNumberScreen from '../screens/PhoneNumberScreen';
import HumanVerificationScreen from '../screens/HumanVerificationScreen';
import VerificationCode from '../screens/VerificationCode';
import LoginScreen from '../screens/LoginScreen';
import FirstnameScreen from '../screens/FirstnameScreen';
import BDAYScreen from '../screens/BDAY';
import GenderScreen from '../screens/Gender';
import JobType from '../screens/JobType';
import DistancePreference from '../screens/DistancePreference';
import LocationSelection from '../screens/LocationSelection';
import EducationForm from '../screens/EducationForm';
import SkillsScreen from '../screens/SkillsScreen';
import PhotoUploadScreen from '../screens/PhotoUploadScreen';
import SalaryRange from '../screens/SalaryRange';
import ProfileScreen from '../screens/ProfileScreen';
import BottomTabNavigator from "./BottomTabNavigator";
import Invitefriend from '../screens/Invitefriend';
import ChatDetailsScreen from '../screens/ChatDetailsScreen';
import Employeeuser from '../screens/Employeeuser';
import Employeruser from '../screens/Employeruser';
import ETcenter from '../screens/ETcenter';
import CompanyScreen from '../screens/Employer/CompanyScreen';
import AddressScreen from '../screens/Employer/AddressScreen';
import EmailScreen from '../screens/Employer/EmailScreen';
import PhoneScreen from '../screens/Employer/PhoneScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        {/* For Testing → Bottom Tabs First */}

        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="PhoneNumber" component={PhoneNumberScreen} />
        <Stack.Screen name="HumanVerification" component={HumanVerificationScreen} />
        <Stack.Screen name="VerificationCode" component={VerificationCode} />
        <Stack.Screen name="Firstname" component={FirstnameScreen} />
        <Stack.Screen name="BDAY" component={BDAYScreen} />
        <Stack.Screen name="Gender" component={GenderScreen} />
        <Stack.Screen name="JobType" component={JobType} />
        <Stack.Screen name="SalaryRange" component={SalaryRange} />
        <Stack.Screen name="DistancePreference" component={DistancePreference} />
        <Stack.Screen name="LocationSelection" component={LocationSelection} />
        <Stack.Screen name="EducationForm" component={EducationForm} />
        <Stack.Screen name="skillsScreen" component={SkillsScreen} />
        <Stack.Screen name="PhotoUploadScreen" component={PhotoUploadScreen} />
        <Stack.Screen name="invitefriend" component={Invitefriend} />
        <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="ChatDetails" component={ChatDetailsScreen} />
        <Stack.Screen name="Employeeuser" component={Employeeuser} />
        <Stack.Screen name="Employeruser" component={Employeruser} />
        <Stack.Screen name="ETcenter" component={ETcenter} />

        <Stack.Screen name="CompanyScreen" component={CompanyScreen} />
        <Stack.Screen name="EmailScreen" component={EmailScreen} />
        <Stack.Screen name="PhoneScreen" component={PhoneScreen} />
        <Stack.Screen name="AddressScreen" component={AddressScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
