import { useRef, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { Stack, router } from 'expo-router';
import { useFonts } from 'expo-font';

import { getValueFor } from '../utils/secureStorage';
import { STORAGE_KEYS } from '../constants/asyncKeys';
import { FONT_NAMES } from '../constants/fontNames';

export default function App() {
  const animation = useRef<LottieView>(null);
  //   const { session, isReady } = useAuth();
  const isReady = true;
  const [fontsLoaded] = useFonts({
    [FONT_NAMES.SF_REGULAR]: require('../assets/fonts/SF-REGULAR.otf'),
    [FONT_NAMES.SF_MEDIUM]: require('../assets/fonts/SF_MEDIUM.otf'),
    [FONT_NAMES.SF_SEMIBOLD]: require('~/src/assets/fonts/SF_SEMIBOLD.otf'),
    [FONT_NAMES.SF_BOLD]: require('~/src/assets/fonts/SF_BOLD.otf'),
  });

  const [hasNavigated, setHasNavigated] = useState(false);

  const checkOnboardingStatus = async () => {
    try {
      const hasLaunched = await getValueFor(STORAGE_KEYS.HAS_APP_BEEN_USED);
      return !!hasLaunched;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    // Wait until fonts and auth are ready
    if (!isReady || !fontsLoaded || hasNavigated) return;

    const proceed = async () => {
      animation.current?.play();

      const hasUsedApp = await checkOnboardingStatus();

      setTimeout(() => {
        if (!hasUsedApp) {
          //   router.replace('/(auth)/onboarding');
        } else if (false) {
          //   router.replace('/(tabs)');
        } else {
          //   router.replace('/(auth)/login');
        }
        setHasNavigated(true);
      }, 1000); // Let animation play out a bit before navigating
    };

    proceed();
  }, [isReady, fontsLoaded]);
  console.warn('====================================');
  console.log();
  console.log('====================================');
  return (
    <View style={styles.animationContainer}>
      <Stack.Screen options={{ headerShown: false }} />
      <LottieView
        ref={animation}
        style={{ width: '100%', height: '100%', backgroundColor: '#eee' }}
        resizeMode="cover"
        source={require('~/src/assets/json/splashscreen.json')}
        loop={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
