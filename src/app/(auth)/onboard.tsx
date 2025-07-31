import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

const Onboard = () => {
  return (
    <View className="bg-PRIMARY_BLUE h-full">
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade', // 👈 This enables fade
        }}
      />
      <Text>Onboard</Text>
    </View>
  );
};

export default Onboard;
