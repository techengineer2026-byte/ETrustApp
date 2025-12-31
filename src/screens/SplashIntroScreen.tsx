import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
const { width, height } = Dimensions.get('window');
import FastImage from 'react-native-fast-image';

// Responsive Font Helper
// 0.07 means 7% of the screen width
const titleSize = width * 0.07;
const subtitleSize = width * 0.035;

type SplashScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Splash'
>;

export const SplashScreen: React.FC = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  const logoScale = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textTranslate = useRef(new Animated.Value(50)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 6,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
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

    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation, logoScale, logoOpacity, textTranslate, textOpacity]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <ImageBackground
        source={require('../assets/bg.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay} />

        <View style={styles.contentContainer}>

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
              style={styles.heroImage}
              resizeMode={FastImage.resizeMode.contain}
            />
            <FastImage
              source={require('../assets/Hadndshake-unscreen.gif')}
              style={styles.herogif}
              resizeMode={FastImage.resizeMode.contain}
            />
          </Animated.View>

          <Animated.View
            style={{
              opacity: textOpacity,
              transform: [{ translateY: textTranslate }],
              marginTop: height * 0.04, // Responsive spacing
              alignItems: 'center',
              width: '90%' // Restrict width so text wraps nicely if needed
            }}
          >
            {/* Main Tagline */}
            <Text
              style={styles.tagline}
              numberOfLines={1}
              adjustsFontSizeToFit={true} // MAGIC FIX: Shrinks text to fit
              allowFontScaling={false}    // Prevents system "Large Text" from breaking UI
            >
              Rozgaar ki Dukaan
            </Text>

            {/* Sub Tagline */}
            <Text
              style={styles.subTagline}
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              allowFontScaling={false}
            >
              Connecting Talent with Opportunity
            </Text>
          </Animated.View>

        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.1)', // Changed to slight dark overlay for better text white contrast
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  logoContainer: {
    padding: 15,
    borderRadius: 15,
    width: width * 0.9, // Container takes 90% of screen width
    alignItems: 'center',
  },
  logo: {
    width: 400,
    height: 105,
  },
  tagline: {
    fontSize: titleSize, // Calculated relative to screen width
    fontWeight: '800',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
    marginBottom: 5,
    textAlign: 'center',
  },
  subTagline: {
    fontSize: subtitleSize, // Calculated relative to screen width
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.95)',
    textAlign: 'center',
    marginTop: 5,

  }, heroImage: {
    width: 400,
    height: 105,
    opacity: 0.9,
  },
  herogif: {
    width: 200,
    height: 200,
    marginTop: -20,
    opacity: 0.9,
  },
  
});
