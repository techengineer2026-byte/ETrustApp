// src/navigation/types.ts

export type RootStackParamList = {
    SettingsScreen: undefined;
    AccountStatusScreen: undefined;
    // add other screens here
};
// src/navigation/types.ts

export type EmployerStackParamList = {
    JobPostDashboard: undefined;
    PostJob: undefined;
    EmployerProfile: undefined;
};
// src/navigation/types.ts

export type EmployeeStackParamList = {
  // --- Auth Section ---
  LoginScreen: undefined;
  EmployeeAuthName: undefined;
  EmployeeAuthContact: { name: string }; // Passing data forward
  EmployeeAuthPassword: { name: string; contact: string }; // Passing data forward
  
  // --- Profile Creation (Onboarding) ---
  FirstnameScreen: undefined;
  BDAY: undefined;
  Gender: undefined;
  EducationForm: undefined;
  JobType: undefined;
  WorkExperienceScreen: undefined;
  WorkStatusScreen: undefined;
  CurrentCTCScreen: undefined; // Only if working
  SalaryRange: undefined;      // Expected salary
  LocationSelection: undefined;
  PreferredCityScreen: undefined;
  UploadResumeScreen: undefined;
  ReferenceScreen: undefined;

  // --- Main App ---
  EmployeeBottomTabs: undefined; // The Dashboard/Home
};