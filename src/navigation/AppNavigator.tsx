// src/navigation/AppNavigator.tsx

// import React from 'react';
// import { RootStackParamList } from "../types/navigation";
// import { GestureHandlerRootView } from 'react-native-gesture-handler';

// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { SplashScreen } from '../screens/SplashIntroScreen';


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
import CompanyScreen from '../screens/Employer/CompanyScreen';
import AddressScreen from '../screens/Employer/AddressScreen';
import EmployeeStep1 from '../screens/Employee/EmployeeStep1';
import EmployeeStep2 from '../screens/Employee/EmployeeStep2';
import EmployeeStep3 from '../screens/Employee/EmployeeStep3';
import EmployeeStep4 from '../screens/Employee/EmployeeStep4';
import ForgotPassword from '../screens/ForgetPassword/ForgotPasswordScreen';
import ResetPassword from '../screens/ForgetPassword/ResetPassword';
import OTPScreen from '../screens/ForgetPassword/OTPScreen';
import EmployeeBottomNav from './EmployeeBottomTabs';
import SettingsScreen from '../screens/Employee/Setting/SettingsScreen';


import EmployerBottomNav from './EmployerBottomNav';
import CurrentCTCScreen from '../screens/CurrentCTCScreen';
import JobProfileScreen from '../screens/JobProfileScreen';
import PreferredCityScreen from '../screens/PreferredCityScreen';
import ReferenceScreen from '../screens/ReferenceScreen';
import UploadResumeScreen from '../screens/UploadResumeScreen';
import WorkExperienceScreen from '../screens/WorkExperienceScreen';
import WorkStatusScreen from '../screens/WorkStatusScreen';
import SyncLoading from '../screens/SyncLoading';

import ContactVerificationScreen from '../screens/Employer/ContactVerificationScreen';
import ContactNumberScreen from '../screens/Employer/ContactNumberScreen';
import ContactPersonScreen from '../screens/Employer/ContactPersonScreen';
import OfficeAddressScreen from '../screens/Employer/OfficeAddressScreen';
import UploadLogo from '../screens/Employer/UploadLogo';

//Etrust auth
import CenterName from '../screens/ET-Center/CenterName';
import EtrustBottomNav from './EtrustBottomTabNavigator';
import ETcenteruser from '../screens/ETcenteruser';
import ETContactVerify from '../screens/ET-Center/ETContactVerify';
import ETpasswordReg from '../screens/ET-Center/ETpasswordReg';
import SyncLoadingET from '../screens/ET-Center/SyncLoadingET';
import ETname from '../screens/ET-Center/ETname';
import OfficeAddressET from '../screens/ET-Center/OfficeAddressET';
import TransactionDetail from '../screens/ET-Center/TransactionDetail';
import CompanyProfile from '../screens/ET-Center/CompanyProfile';
import EmployerJobs from '../screens/ET-Center/EmployerJobs';

import 'react-native-gesture-handler';
import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SplashScreen } from '../screens/SplashIntroScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="EmployeeBottomNav" component={EmployeeBottomNav} />

          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Firstname" component={FirstnameScreen} />
          <Stack.Screen name="BDAY" component={BDAYScreen} />
          <Stack.Screen name="Gender" component={GenderScreen} />
          <Stack.Screen name="EducationForm" component={EducationForm} />
          <Stack.Screen name="JobType" component={JobType} />
          <Stack.Screen name="WorkStatus" component={WorkStatusScreen} />
          <Stack.Screen name="WorkExperience" component={WorkExperienceScreen} />
          <Stack.Screen name="JobProfile" component={JobProfileScreen} />
          <Stack.Screen name="CurrentCTC" component={CurrentCTCScreen} />
          <Stack.Screen name="SalaryRange" component={SalaryRange} />
          <Stack.Screen name="DistancePreference" component={DistancePreference} />
          <Stack.Screen name="LocationSelection" component={LocationSelection} />
          <Stack.Screen name="UploadResume" component={UploadResumeScreen} />
          <Stack.Screen name="Reference" component={ReferenceScreen} />
          <Stack.Screen name="PreferredCity" component={PreferredCityScreen} />
          <Stack.Screen name="SyncLoading" component={SyncLoading} />
          <Stack.Screen name="CompanyScreen" component={CompanyScreen} />
          <Stack.Screen name="AddressScreen" component={AddressScreen} />
          {/* <Stack.Screen name="EmployeeBottomNav" component={EmployeeBottomNav} /> */}

          <Stack.Screen name="Employeruser" component={Employeruser} />
          <Stack.Screen name="ContactVerification" component={ContactVerificationScreen} />
          <Stack.Screen name="UploadLogo" component={UploadLogo} />
          <Stack.Screen name="ContactPersonScreen" component={ContactPersonScreen} />
          <Stack.Screen name="ContactNumberScreen" component={ContactNumberScreen} />
          <Stack.Screen name="OfficeAddressScreen" component={OfficeAddressScreen} />
          <Stack.Screen name="EmployerBottomNav" component={EmployerBottomNav} />

          <Stack.Screen name="ETcenteruser" component={ETcenteruser} />
          <Stack.Screen name="EtrustBottomNav" component={EtrustBottomNav} />
          <Stack.Screen name='ETContactVerify' component={ETContactVerify} />
          <Stack.Screen name='ETpasswordreg' component={ETpasswordReg} />
          <Stack.Screen name="SyncLoadingET" component={SyncLoadingET} />
          <Stack.Screen name="CenterName" component={CenterName} />
          <Stack.Screen name="OfficeAddressET" component={OfficeAddressET} />
          <Stack.Screen name='ETname' component={ETname} />


          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="OTPScreen" component={OTPScreen} />

          <Stack.Screen name='TransactionDetail' component={TransactionDetail} />
          <Stack.Screen name='EmployerJobs' component={EmployerJobs} />
          <Stack.Screen name='CompanyProfile' component={CompanyProfile} />
          <Stack.Screen name='SettingsScreen' component={SettingsScreen} />
          
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
