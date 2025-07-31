import { useRef, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { Stack, router } from 'expo-router';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';

import { FONT_NAMES } from '../constants/fontNames';

export default function App() {
  const animation = useRef<LottieView>(null);
  const [hasNavigated, setHasNavigated] = useState(false);
  const [played, setPlayed] = useState(false);

  const isReady = true; // Replace with actual auth readiness check

  const [fontsLoaded] = useFonts({
    [FONT_NAMES.SF_REGULAR]: require('../assets/fonts/SF-REGULAR.otf'),
    [FONT_NAMES.SF_MEDIUM]: require('../assets/fonts/SF_MEDIUM.otf'),
    [FONT_NAMES.SF_SEMIBOLD]: require('~/src/assets/fonts/SF_SEMIBOLD.otf'),
    [FONT_NAMES.SF_BOLD]: require('~/src/assets/fonts/SF_BOLD.otf'),
  });

  useEffect(() => {
    if (!isReady || !fontsLoaded || hasNavigated) return;

    const start = async () => {
      animation.current?.play();
    };

    start();
  }, [isReady, fontsLoaded]);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <StatusBar hidden />
      {!played ? (
        <LottieView
          ref={animation}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
          source={require('~/src/assets/json/splash.json')}
          loop={false}
          onAnimationFinish={() => setPlayed(true)}
        />
      ) : (
        <View className="bg-PRIMARY_BLUE h-full w-full flex-1">
          <Stack
            screenOptions={{
              headerShown: false,
              animation: 'fade',
            }}
          />
          <Text className="mt-4 text-center text-white">yhhhhhhhhhhhhhh</Text>
        </View>
      )}
    </View>
  );
}
