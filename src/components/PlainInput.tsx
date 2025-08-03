import React, { forwardRef } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
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
  isUrl?: boolean;
}

const SIZES = {
  inputHeight: 56,
};

const PlainInput = forwardRef<TextInput, Props>(
  (
    {
      title,
      placeholder,
      value,
      onFocus,
      onBlur,
      onChange,
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
    return (
      <View className="w-full" style={{ marginBottom }}>
        {title && <Text className="mb-1 text-sm font-semibold text-neutral-800">{title}</Text>}

        <View
          className={`relative min-h-[56px] flex-row items-center rounded-lg border px-4 ${containerStyle ?? ''}`}
          style={{
            backgroundColor: '#F4F2F8',
            borderColor: error ? '#D12030' : '#F4F2F8',
          }}>
          {leftAdornment}

          <TextInput
            ref={ref}
            value={value}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={onChange}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={APP_COLOR.PLACEHOLDER_TEXT}
            className="text-PRIMARY_BLUE font-SF_REGULAR flex-1 text-xl"
            style={{
              height: SIZES.inputHeight,
              lineHeight: 22,
              textAlignVertical: 'center',
              includeFontPadding: false,
              padding: 0,
            }}
            autoCapitalize="none"
            {...props}
          />

          {rightAdornment}
        </View>

        {errorVisible && errorMessage && (
          <Text className="mt-1 text-right text-xs text-red-500">{errorMessage}</Text>
        )}
      </View>
    );
  }
);

export default PlainInput;
