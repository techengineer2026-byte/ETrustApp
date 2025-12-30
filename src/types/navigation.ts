// src/types/navigation.ts

export type RootStackParamList = {
  // --- Common / Onboarding ---
  Splash: undefined;
  Welcome: undefined;
  Firstname: undefined;
  PhoneNumber: undefined;
  HumanVerification: {
    phone: string;
    country: string;
  };
  VerificationCode: undefined;
  Login: undefined; // General Login (Job Seeker)

  // --- Job Seeker Profile Building ---
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

  // --- Main App ---
  MainTabs: undefined;
  BottomTabNavigator: undefined;
  EmployerBottomNav: undefined;
  EmployeeBottomNav: undefined;
  EtrustBottomNav: undefined;
  invitefriend: undefined;
  ChatDetails: {
    name: string;
    avatar: string;
  };

  // --- Entry Selection Screens ---
  Employeeuser: undefined; // Acts as Employee Login
  Employeruser: undefined; // Acts as Employer Login
  ETcenter: undefined;     // Acts as Hub/Locator

  // --- EMPLOYER REGISTRATION FLOW ---
  EmployerLogin: undefined; // Explicit Login Screen if needed
  
  // Step 1: Basic Info
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

  // --- EMPLOYEE REGISTRATION FLOW ---
  EmployeeLogin: undefined; 

  // Step 1: Name & Phone
  EmployeeStep1: undefined;

  // Step 2: Receives data from Step 1
  EmployeeStep2: {
    name: string;
    phone: string;
  };

  // Step 3: Receives data from Step 1 & 2
  EmployeeStep3: {
    name: string;
    phone: string;
    email: string;
  };

  // Step 4: Receives data from Step 1, 2 & 3
  EmployeeStep4: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };

  // --- ET CENTER FLOW ---
  ETCenterLogin: undefined;

  // Step 1: Owner & Phone
  ETCenterStep1: undefined;

  // Step 2: Receives data from Step 1
  ETCenterStep2: {
    name: string;
    phone: string;
  };

  // Step 3: Receives data from Step 1 & 2
  ETCenterStep3: {
    name: string;
    phone: string;
    address: string;
    city: string;
    district: string;
    pincode: string;
  };
  // --- FORGOT PASSWORD FLOW ---
  ForgotPassword: undefined;
  OTPScreen: {
    email: string;
  };
  ResetPassword: {
    email: string;
  };
  
};