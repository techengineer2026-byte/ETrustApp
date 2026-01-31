// src/types/navigation.ts

export type RootStackParamList = {
  // --- Auth & Onboarding ---
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
  JobPostDashboard: undefined;
  EChatDetailScreen: undefined;
  // --- Forgot Password ---
  EditEmployerProfileScreen: undefined;
  ForgotPassword: { source: string }; // <-- make sure this exists
  OTPScreen: {
    email: string;
    source?: 'settings'; // Pass it along
  };
  AllApplicants: undefined; // Add this
  AllJobs: undefined;       // Add this

  ResetPassword: {
    email: string;
    otp?: string;
    source?: 'settings'; // Pass it along
  };
  Employertest: undefined;

  // --- Employee Profile Building ---
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
  CurrentCTC: undefined;
  JobProfile: undefined;
  PreferredCity: undefined;
  Reference: undefined;
  UploadResume: undefined;
  WorkExperience: undefined;
  WorkStatus: undefined;
  SyncLoading: undefined;
  ApplicationDetail: undefined;
  // --- Main Tabs ---
  MainTabs: undefined;
  BottomTabNavigator: undefined;
  EmployerBottomNav: undefined;
  EmployeeBottomNav: undefined;
  EtrustBottomNav: undefined;

  // --- Extras ---
  invitefriend: undefined;
  ChatDetails: {
    name: string;
    avatar: string;
  };

  // --- User Type Selection ---
  Employeeuser: undefined;
  Employeruser: undefined;
  ETcenter: undefined;
  ETcenteruser: undefined;

  // --- Employer specific ---
  EmployerLogin: undefined;
  CompanyScreen: undefined;
  EmailScreen: {
    companyName: string;
    contactPerson: string;
  };
  PhoneScreen: {
    companyName: string;
    contactPerson: string;
    email: string;
  };
  AddressScreen: {
    companyName: string;
    contactPerson: string;
    email: string;
    phone: string;
  };
  ContactVerification: undefined;
  UploadLogo: undefined;
  ContactPersonScreen: any;
  ContactNumberScreen: any;
  OfficeAddressScreen: any;

  // --- Employee Specific ---
  EmployeeLogin: undefined;
  EmployeeStep1: undefined;
  EmployeeStep2: {
    name: string;
    phone: string;
  };
  EmployeeStep3: {
    name: string;
    phone: string;
    email: string;
  };
  EmployeeStep4: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };

  // --- ET Center Specific ---
  ETCenterLogin: undefined;
  ETCenterStep1: undefined;
  ETCenterStep2: {
    name: string;
    phone: string;
  };
  ETCenterStep3: {
    name: string;
    phone: string;
    address: string;
    city: string;
    district: string;
    pincode: string;
  };
  ETContactVerify: undefined;
  ETpasswordreg: undefined;
  SyncLoadingET: undefined;
  CenterName: undefined;
  ETname: undefined;
  OfficeAddressET: undefined;
  TransactionDetail: undefined;
  CompanyProfile: undefined;
  EmployerJobs: undefined;
  EditProfileScreen: undefined;
  // --- SETTINGS & ACCOUNT (NEWLY ADDED) ---
  SettingsScreen: undefined;
  AccountSettingsMenu: undefined;
  BoostProfileScreen: undefined;
  // Account Information
  ChangeMobileNumber: undefined;
  EmailVerification: undefined;
  KycDocuments: undefined;
  LinkedAccounts: undefined;
  AccountStatus: undefined;
  ChatDetailsScreen: undefined
  // Security
  ChangePassword: undefined;
  LogoutFromAllDevices: undefined;

  // Subscription
  UpgradePlan: undefined;
  BillingHistory: undefined;
  RefundPolicy: undefined;

  // Legal & Support
  Terms: undefined;
  PrivacyPolicy: undefined;
  ContactSupport: undefined;
  Faq: undefined;
};