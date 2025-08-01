import { useRef, useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import LottieView from 'lottie-react-native';
import { Stack, router } from 'expo-router';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';

import { FONT_NAMES } from '../constants/fontNames';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppLogo, AppName, BackIcon } from '../assets/svg/appicon';
import Footer from '../components/Footer';
import AppButton from '../components/BaseButton';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import Login from './(auth)/login';
import { APP_COLOR } from '../constants/Colors';
import { useLoginForm } from '../hooks/useLoginHooks';

export default function App() {
  const animation = useRef<LottieView>(null);
  const [hasNavigated, setHasNavigated] = useState(false);
  const [played, setPlayed] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const isReady = true; // Replace with actual auth readiness check

  const [fontsLoaded] = useFonts({
    [FONT_NAMES.SF_REGULAR]: require('../assets/fonts/SF-REGULAR.otf'),
    [FONT_NAMES.SF_MEDIUM]: require('../assets/fonts/SF_MEDIUM.otf'),
    [FONT_NAMES.SF_SEMIBOLD]: require('~/src/assets/fonts/SF_SEMIBOLD.ttf'),
    [FONT_NAMES.SF_BOLD]: require('~/src/assets/fonts/SF_BOLD.otf'),
  });

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  useEffect(() => {
    if (!isReady || !fontsLoaded || hasNavigated) return;

    const start = async () => {
      animation.current?.play();
    };

    start();
  }, [isReady, fontsLoaded]);
  const loginForm = useLoginForm();

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
        <SafeAreaView className="bg-PRIMARY_BLUE h-full w-full flex-1">
          <Stack
            screenOptions={{
              headerShown: false,
              animation: 'fade',
            }}
          />
          <View className="h-full flex-1  items-center justify-center gap-6">
            <View className="   flex-row items-center justify-center gap-6">
              <AppLogo width={36} height={35} />
              <AppName width={156} height={23} />
            </View>
            <Footer className="mx-4 mb-10 ">
              <AppButton
                label={'Login'}
                variant="secondary"
                onPress={() => {
                  bottomSheetRef.current?.snapToIndex(1); // 0 is the first snapPoint, which is 200
                }}
              />
            </Footer>
          </View>
        </SafeAreaView>
      )}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        enablePanDownToClose
        onChange={handleSheetChanges}
        snapPoints={['95%']}
        containerStyle={{ flex: 1 }}
        handleIndicatorStyle={{ backgroundColor: APP_COLOR.PLACEHOLDER_TEXT }}>
        <BottomSheetView style={styles.contentContainer}>
          <Pressable
            className="flex-row gap-2"
            onPress={() => {
              loginForm.resetLoginForm();
              bottomSheetRef.current?.close();
            }}>
            <BackIcon width={17} height={22} />
            <Text className="font-SF_MEDIUM text-PRIMARY_BLUE">Cancel</Text>
          </Pressable>
          <Login {...loginForm} />
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,

    height: '100%',
  },
});
