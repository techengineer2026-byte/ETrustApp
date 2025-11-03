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
// Define the route names and their parameters here
export type RootStackParamList = {
    Splash: undefined;
    Welcome: undefined;
    Firstname : undefined;
    PhoneNumber: undefined;
    HumanVerification: undefined;
    VerificationCode:undefined;
    Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="PhoneNumber" component={PhoneNumberScreen} />
                <Stack.Screen name="HumanVerification" component={HumanVerificationScreen} />
                <Stack.Screen name="VerificationCode" component={VerificationCode} />
                <Stack.Screen name="Firstname" component={FirstnameScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}