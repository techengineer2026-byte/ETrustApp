// src/navigation/AppNavigator.tsx

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
import BottomTabNavigator from "./BottomTabNavigator";
import Invitefriend from '../screens/Invitefriend';
import ChatDetailsScreen from '../screens/ChatDetailsScreen';
import Employeeuser from '../screens/Employeeuser';
import Employeruser from '../screens/Employeruser';
import CompanyScreen from '../screens/Employer/CompanyScreen';
import AddressScreen from '../screens/Employer/AddressScreen';
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
import ChangeMobileNumberScreen from '../screens/Employee/Setting/Account/ChangeMobileNumberScreen';
import EmailVerificationScreen from '../screens/Employee/Setting/Account/EmailVerificationScreen';
import KycDocumentsScreen from '../screens/Employee/Setting/Account/KycDocumentsScreen';
import LinkedAccountsScreen from '../screens/Employee/Setting/Account/LinkedAccountsScreen';
import AccountStatusScreen from '../screens/Employee/Setting/Account/AccountStatusScreen';
import ChangePasswordScreen from '../screens/Employee/Setting/Account/ChangePasswordScreen';
import LogoutFromAllDevicesScreen from '../screens/Employee/Setting/Account/LogoutFromAllDevicesScreen';
import ApplicationDetailScreen from '../screens/Employee/ApplicationDetailScreen';
import BoostProfileScreen from '../screens/Employee/BoostProfileScreen';

import TermsScreen from '../screens/Employee/Setting/Legal/TermsScreen';
import PrivacyPolicyScreen from '../screens/Employee/Setting/Legal/PrivacyPolicyScreen';
import ContactSupportScreen from '../screens/Employee/Setting/Support/ContactSupportScreen';
import FaqScreen from '../screens/Employee/Setting/Support/FaqScreen';

import UpgradePlanScreen from '../screens/Employee/Setting/UpgradePlan';
import BillingHistoryScreen from '../screens/Employee/Setting/BillingHistoryScreen';
import RefundPolicyScreen from '../screens/Employee/Setting/RefundPolicyScreen';
import AllApplicantsScreen from '../screens/Employer/AllApplicantsScreen';
import AllJobsScreen from '../screens/Employer/AllJobsScreen';
import EditProfileScreen from '../screens/Employee/EditProfileScreen';
import EChatDetailScreen from '../screens/Employee/EChatDetailScreen';
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
import ChatDetailScreen from '../screens/Employer/ChatDetailScreen';
import JobPostDashboard from '../screens/Employer/JobPostDashboard';
import PostJobScreen from '../screens/Employer/PostJobScreen';
import EditEmployerProfileScreen from '../screens/Employer/EditEmployerProfileScreen';
import ETEditProfileScreen from '../screens/ET-Center/ETEditProfileScreen';
import CandidateListScreen from '../screens/Employer/CandidateListScreen';
import ETChatDetailScreen from '../screens/ET-Center/ETChatDetailScreen';
import JobHistoryScreen from '../screens/Employer/JobHistoryScreen';
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
          <Stack.Screen name="EducationForm" component={EducationForm} />
          <Stack.Screen name="Gender" component={GenderScreen} />
          <Stack.Screen name="JobPostDashboard" component={JobPostDashboard} />
          <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
          <Stack.Screen name="JobType" component={JobType} />
          <Stack.Screen name='SettingsScreen' component={SettingsScreen} />
          <Stack.Screen name="WorkStatus" component={WorkStatusScreen} />
          <Stack.Screen name="WorkExperience" component={WorkExperienceScreen} />
          <Stack.Screen name="JobProfile" component={JobProfileScreen} />
          <Stack.Screen name="ChatDetailScreen" component={ChatDetailScreen} />
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
          <Stack.Screen name="BoostProfileScreen" component={BoostProfileScreen} />
          <Stack.Screen name="Employeruser" component={Employeruser} />
          <Stack.Screen name="ContactVerification" component={ContactVerificationScreen} />
          <Stack.Screen name="UploadLogo" component={UploadLogo} />
          <Stack.Screen name="EditEmployerProfileScreen" component={EditEmployerProfileScreen} />
          <Stack.Screen name="ContactPersonScreen" component={ContactPersonScreen} />
          <Stack.Screen name="ContactNumberScreen" component={ContactNumberScreen} />
          <Stack.Screen name="OfficeAddressScreen" component={OfficeAddressScreen} />
          <Stack.Screen name="AllApplicants" component={AllApplicantsScreen} />
          <Stack.Screen name="AllJobs" component={AllJobsScreen} />
          <Stack.Screen name="EChatDetailScreen" component={EChatDetailScreen} />
          <Stack.Screen name="ETEditProfileScreen" component={ETEditProfileScreen} />
          <Stack.Screen name="CandidateListScreen" component={CandidateListScreen} />
          <Stack.Screen name="EmployerBottomNav" component={EmployerBottomNav} />

          <Stack.Screen name="EtrustBottomNav" component={EtrustBottomNav} />

          <Stack.Screen name="ETcenteruser" component={ETcenteruser} />
          <Stack.Screen name='ETContactVerify' component={ETContactVerify} />
          <Stack.Screen name='ETpasswordreg' component={ETpasswordReg} />
          <Stack.Screen name="ETChatDetailScreen" component={ETChatDetailScreen} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="SyncLoadingET" component={SyncLoadingET} />
          <Stack.Screen name="PostJobScreen" component={PostJobScreen} />
          <Stack.Screen name="CenterName" component={CenterName} />
          <Stack.Screen name="OfficeAddressET" component={OfficeAddressET} />
          <Stack.Screen name='ETname' component={ETname} />
          {/* <Stack.Screen name="EmployerBottomNav" component={EmployerBottomNav} /> */}

          <Stack.Screen name="ApplicationDetail" component={ApplicationDetailScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="OTPScreen" component={OTPScreen} />

          <Stack.Screen name='TransactionDetail' component={TransactionDetail} />
          <Stack.Screen name='EmployerJobs' component={EmployerJobs} />
          <Stack.Screen name='CompanyProfile' component={CompanyProfile} />
          {/* <Stack.Screen name='SettingsScreen' component={SettingsScreen} /> */}
          <Stack.Screen name="JobHistoryScreen" component={JobHistoryScreen} />

          <Stack.Screen
            name="ChangeMobileNumber"
            component={ChangeMobileNumberScreen}
            options={{ title: 'Change Mobile Number' }}
          />
          <Stack.Screen
            name="EmailVerification"
            component={EmailVerificationScreen}
            options={{ title: 'Email Verification' }}
          />
          <Stack.Screen
            name="KycDocuments"
            component={KycDocumentsScreen}
            options={{ title: 'KYC / Documents' }}
          />
          <Stack.Screen
            name="LinkedAccounts"
            component={LinkedAccountsScreen}
            options={{ title: 'Linked Accounts' }}
          />
          <Stack.Screen
            name="AccountStatus"
            component={AccountStatusScreen}
            options={{ title: 'Account Status' }}
          />
          <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
          <Stack.Screen name="LogoutFromAllDevices" component={LogoutFromAllDevicesScreen} />

          {/* Subscription & Billing */}
          <Stack.Screen name="UpgradePlan" component={UpgradePlanScreen} />
          <Stack.Screen name="BillingHistory" component={BillingHistoryScreen} />
          <Stack.Screen name="RefundPolicy" component={RefundPolicyScreen} />

          {/* Legal & Support */}
          <Stack.Screen name="Terms" component={TermsScreen} />
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
          <Stack.Screen name="ContactSupport" component={ContactSupportScreen} />
          <Stack.Screen name="Faq" component={FaqScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
