import React, { forwardRef, useEffect } from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { APP_COLOR } from '../constants/Colors';

interface Props extends Omit<TextInputProps, 'style'> {
  title?: string;
  error?: boolean;
  errorMessage?: string;
  errorVisible?: boolean;
  marginBottom?: number;
  containerStyle?: string;
  leftAdornment?: React.ReactElement;
  rightAdornment?: React.ReactElement;
  isUrl?: boolean; // ← Add this
}

const SIZES = {
  inputHeight: 56,
  placeholderHeight: 20,
};
const topValue = (SIZES.inputHeight - SIZES.placeholderHeight) / 2;

const AnimatedInput = forwardRef<TextInput, Props>(
  (
    {
      title,
      placeholder,
      value,
      onChange,
      onFocus,
      onBlur,
      onChangeText,
      error = false,
      errorMessage,
      errorVisible,
      marginBottom = 16,
      containerStyle,
      leftAdornment,
      rightAdornment,
      isUrl,
      ...props
    },
    ref
  ) => {
    const textLength = useSharedValue(value?.length || 0);
    const placeholderPosition = useSharedValue(0);
    const isFocused = useSharedValue(false);
    const [isUrlFocused, setIsUrlFocused] = React.useState(false);
    useEffect(() => {
      placeholderPosition.value = withTiming(value?.length ? 1 : 0, {
        duration: 250,
      });
      textLength.value = value?.length || 0;
    }, [value]);

    const animatedPlaceholder = useAnimatedStyle(() => ({
      color: placeholderPosition.value === 0 ? APP_COLOR.PLACEHOLDER_TEXT : APP_COLOR.DARK_TEXT,
      fontSize: interpolate(placeholderPosition.value, [0, 1], [16, 12], Extrapolate.CLAMP),
      top: interpolate(placeholderPosition.value, [0, 1], [topValue, 0], Extrapolate.CLAMP),
    }));

    const animatedContainerStyle = useAnimatedStyle(() => ({
      borderColor: isFocused.value ? '#2F50C1' : error ? '#D12030' : '#F4F2F8',
      backgroundColor: '#F4F2F8',
    }));

    return (
      <View className="w-full" style={{ marginBottom }}>
        {title && <Text className="mb-1 text-sm font-semibold text-neutral-800">{title}</Text>}

        <Animated.View
          className={`relative min-h-[56px] flex-row items-center rounded-lg border  px-4 ${containerStyle ?? ''}`}
          style={animatedContainerStyle}>
          {leftAdornment}

          <View className="relative h-[56px] flex-1 flex-row items-center">
            {isUrl && (isUrlFocused || (!!value && value.length > 0)) && (
              <View className="mb-[-8] flex-row items-center">
                <Text
                  className="text-DARK_TEXT font-SF_REGULAR text-xl"
                  style={{
                    includeFontPadding: false,
                    lineHeight: 22,
                  }}
                  selectable={false}
                  pointerEvents="none">
                  https://
                </Text>
                <Text className="text-PLACEHOLDER_TEXT text-xl"> | </Text>
              </View>
            )}
            <TextInput
              ref={ref}
              value={
                isUrl
                  ? isUrlFocused
                    ? value?.replace(/^https:\/\//, '')
                    : value?.replace(/^https:\/\//, '')
                  : value
              }
              onFocus={(e) => {
                isFocused.value = true;
                placeholderPosition.value = withTiming(1, { duration: 250 });
                setIsUrlFocused(true);
                onFocus?.(e);
              }}
              onBlur={(e) => {
                isFocused.value = false;
                setIsUrlFocused(false);
                const inputText = value?.replace(/^https:\/\//, '') || '';

                if (!inputText.length) {
                  onChangeText?.(''); // Clear the field if nothing typed
                  placeholderPosition.value = withTiming(0, { duration: 250 });
                }

                onBlur?.(e);
              }}
              onChange={(e) => {
                textLength.value = e.nativeEvent.text.length;
                onChange?.(e);
              }}
              onChangeText={(text) => {
                const newValue = isUrl ? `https://${text.replace(/^https:\/\//, '')}` : text;
                onChangeText?.(newValue);
              }}
              className="text-PRIMARY_BLUE font-SF_REGULAR z-10 mb-[-8] flex-1 text-xl"
              style={{
                height: SIZES.inputHeight,
                lineHeight: 22,
                textAlignVertical: 'center',
                includeFontPadding: false,
                padding: 0,
              }}
              placeholder=""
              autoCapitalize="none"
              {...props}
            />
            <Animated.Text className="absolute left-0 z-0" style={animatedPlaceholder}>
              {placeholder}
            </Animated.Text>
          </View>

          {rightAdornment}
        </Animated.View>

        {errorVisible && errorMessage && (
          <Text className="mt-1 text-right text-xs text-red-500">{errorMessage}</Text>
        )}
      </View>
    );
  }
);

export default AnimatedInput;
