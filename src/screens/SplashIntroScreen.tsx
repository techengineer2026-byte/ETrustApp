import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

const { width } = Dimensions.get('window');

type SplashScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Splash'
>;

export const SplashScreen: React.FC = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  // 1. Setup Animation Values
  const logoScale = useRef(new Animated.Value(0)).current;   // Starts small (0)
  const logoOpacity = useRef(new Animated.Value(0)).current; // Starts invisible
  const textTranslate = useRef(new Animated.Value(50)).current; // Starts lower down
  const textOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 2. The Animation Sequence
    Animated.sequence([
      // Step A: Logo Springs in (Bounce effect)
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 5, // Controls the "bounciness" (lower = more bounce)
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),

      // Step B: Text slides up smoothly after logo
      Animated.parallel([
        Animated.timing(textTranslate, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // 3. Navigate after 3 seconds
    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation, logoScale, logoOpacity, textTranslate, textOpacity]);

  return (
    <View style={styles.container}>
      {/* Translucent Status Bar makes the BG go full screen */}
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <ImageBackground
        source={require('../assets/bg.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Subtle overlay to help logo stand out against busy icons */}
        <View style={styles.overlay} />

        <View style={styles.contentContainer}>
          
          {/* Animated Logo */}
          <Animated.View
            style={[
              styles.logoContainer,
              {
                opacity: logoOpacity,
                transform: [{ scale: logoScale }],
              },
            ]}
          >
            <Image
              source={require('../assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </Animated.View>

          {/* Animated Tagline */}
          <Animated.View
            style={{
              opacity: textOpacity,
              transform: [{ translateY: textTranslate }],
              marginTop: 30,
              alignItems: 'center'
            }}
          >
            <Text style={styles.tagline}>Rojgar ki Dukan</Text>
            <Text style={styles.subTagline}>Connecting Talent with Opportunity</Text>
          </Animated.View>

        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF512F', // Fallback color
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    // Adds a very slight white tint to soften the background icons
    // so the logo pops more.
    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  logoContainer: {
    // Adds a soft shadow to lift the logo off the background
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10, // For Android
    backgroundColor: 'white', // Optional: Add a white pill shape behind logo if text is hard to read
    padding: 10,
    borderRadius: 15,
  },
  logo: {
    width: width * 0.85, // 85% of screen width
    height: 100,         // Adjust height based on your logo aspect ratio
  },
  tagline: {
    fontSize: 26,
    fontWeight: '800',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
    marginBottom: 5,
    textAlign: 'center',
  },
  subTagline: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.95)',
    letterSpacing: 1,
    textAlign: 'center',
  },
});