import React from 'react';
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

// Define the route names and their parameters here
export type RootStackParamList = {
    Splash: undefined;
    Welcome: undefined;
    Firstname : undefined;
    PhoneNumber: undefined;
    HumanVerification: undefined;
    VerificationCode:undefined;
    Login: undefined;
    BDAY: undefined;
    Gender: undefined;
    JobType: undefined;
    DistancePreference: undefined;
    LocationSelection: undefined;
    EducationForm: undefined;
    PhotoUploadScreen: undefined;
    SalaryRange: undefined;
    skillsScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Splash" component={SplashScreen} />
                {/* <Stack.Screen name="Welcome" component={WelcomeScreen} /> */}
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
            </Stack.Navigator>
        </NavigationContainer>
    );
}