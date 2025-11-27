import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
type SplashScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Splash'
>;

export const SplashScreen: React.FC = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const [showSplash, setShowSplash] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000, // shorter for demo; tweak as desired
      useNativeDriver: true,
    }).start(() => {
      setShowSplash(false);
      navigation.replace('Welcome'); // 👈 navigate to Welcome when done
    });
  }, [fadeAnim, navigation]);
 
  if (showSplash) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
          <ImageBackground
            source={require('../assets/bg.jpg')}
            resizeMode="cover"
            style={styles.splashBackground}
          >
            <Image
              source={require('../assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </ImageBackground>
        </Animated.View>
      </SafeAreaView>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#000' },
  container: { flex: 1 },
  splashBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: { width: 350, height: 200 },
});