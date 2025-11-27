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
};
