// src/types/navigation.ts

export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Firstname: undefined;
  PhoneNumber: undefined;

  HumanVerification: {
    phone: string;
    country: string;
  };

  VerificationCode: undefined;
  Login: undefined;
  BDAY: undefined;
  Gender: undefined;
  JobType: undefined;
  DistancePreference: undefined;
  LocationSelection: undefined;
  EducationForm: undefined;
  PhotoUploadScreen: undefined;
  SalaryRange: undefined;
  ProfileScreen: undefined;
  skillsScreen: undefined;

  MainTabs: undefined;

  invitefriend: undefined;

  ChatDetails: {
    name: string;
    avatar: string;
  };
  Employeeuser: undefined;
  Employeruser: undefined;
  ETcenter: undefined;
  
  // --- EMPLOYER REGISTRATION FLOW ---

  // Step 1: Basic Info (No params needed to start)
  CompanyScreen: undefined;

  // Step 2: Receives data from Step 1
  EmailScreen: {
    companyName: string;
    contactPerson: string;
  };

  // Step 3: Receives data from Step 1 & 2
  PhoneScreen: {
    companyName: string;
    contactPerson: string;
    email: string;
  };

  // Step 4: Receives data from Step 1, 2 & 3
  AddressScreen: {
    companyName: string;
    contactPerson: string;
    email: string;
    phone: string;
  };
};
