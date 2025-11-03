declare module 'react-native-google-recaptcha-v2' {
  import React from 'react';
  import { ViewStyle } from 'react-native';

  interface RecaptchaProps {
    ref?: React.Ref<any>;
    siteKey: string;
    baseUrl: string;
    onVerify: (token: string) => void;
    size?: 'invisible' | 'normal' | 'compact';
    theme?: 'light' | 'dark';
    style?: ViewStyle;
  }

  export default class Recaptcha extends React.Component<RecaptchaProps> {
    open(): void;
    close(): void;
  }
}