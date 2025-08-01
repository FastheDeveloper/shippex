import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import AnimatedInput from '~/src/components/AnimatedInput';
import { EyeClosed, EyeOpen } from '~/src/assets/svg/appicon';
import AppButton from '~/src/components/BaseButton';
import Footer from '~/src/components/Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const hasEmailError = false; // Add real validation later
  const hasPasswordError = false;

  const error = 'error';

  return (
    <View className=" flex-1  px-2   py-4">
      <Text className="font-SF_SEMIBOLD    py-4 text-4xl">Login</Text>

      <View className="mb-10">
        <Text className="text-REGULAR_TEXT text-lg">
          Please enter your First, Last name and your
        </Text>
        <Text className="text-REGULAR_TEXT text-lg">phone number in order to register</Text>
      </View>

      <View className="gap-3">
        <AnimatedInput
          placeholder="Enter your URL"
          value={email}
          onChangeText={setEmail}
          error={hasEmailError}
          errorVisible={hasEmailError}
          errorMessage="URL is required"
          marginBottom={20}
        />

        <AnimatedInput
          placeholder="Username / Email"
          value={username}
          onChangeText={setUsername}
          error={hasEmailError}
          errorVisible={hasEmailError}
          errorMessage="Username or email is required"
          marginBottom={20}
        />

        <AnimatedInput
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={hidePassword}
          error={hasPasswordError}
          errorVisible={hasPasswordError}
          errorMessage="Password must be at least 6 characters"
          rightAdornment={
            <View className="ml-2">
              {hidePassword ? (
                <EyeOpen width={24} height={24} onPress={() => setHidePassword(false)} />
              ) : (
                <EyeClosed width={24} height={24} onPress={() => setHidePassword(true)} />
              )}
            </View>
          }
          marginBottom={20}
        />
      </View>
      <Footer className=" mb-14 px-2   ">
        <AppButton
          label={'Login'}
          //   disabled
        />
      </Footer>
    </View>
  );
};

export default Login;
