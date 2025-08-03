import { Text, View } from 'react-native';
import AnimatedInput from '~/src/components/AnimatedInput';
import { EyeClosed, EyeOpen } from '~/src/assets/svg/appicon';
import AppButton from '~/src/components/BaseButton';
import Footer from '~/src/components/Footer';
import { useLoginForm } from '~/src/hooks/useLoginHooks';

type LoginProps = ReturnType<typeof useLoginForm>;

const Login = ({
  email,
  setEmail,
  emailError,
  handleEmailBlur,
  password,
  setPassword,
  passwordError,
  handlePasswordBlur,
  handleLogin,
  isLoading,
  setShowPassword,
  showPassword,
  url,
  setUrl,
  urlError,
  handleUrlBlur,
  isDisabled,
}: LoginProps) => {
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
          placeholder="URL"
          value={url}
          onChangeText={setUrl}
          onBlur={handleUrlBlur}
          error={!!urlError}
          errorVisible={!!urlError}
          errorMessage={urlError}
          marginBottom={20}
          isUrl
        />

        <AnimatedInput
          placeholder="Username / Email"
          value={email}
          onChangeText={setEmail}
          onBlur={handleEmailBlur}
          error={!!emailError}
          errorVisible={!!emailError}
          errorMessage={emailError}
          marginBottom={20}
        />

        <AnimatedInput
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          onBlur={handlePasswordBlur}
          secureTextEntry={!showPassword}
          error={!!passwordError}
          errorVisible={!!passwordError}
          errorMessage={passwordError}
          rightAdornment={
            <View className="ml-2">
              {showPassword ? (
                <EyeOpen width={24} height={24} onPress={() => setShowPassword(false)} />
              ) : (
                <EyeClosed width={24} height={24} onPress={() => setShowPassword(true)} />
              )}
            </View>
          }
          marginBottom={20}
        />
      </View>
      <Footer className=" mb-14 px-2   ">
        <AppButton label="Login" loading={isLoading} onPress={handleLogin} disabled={isDisabled} />
      </Footer>
    </View>
  );
};

export default Login;
