import React from 'react';
import { Dimensions, StyleProp, ViewStyle, View, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { APP_COLOR } from '~/src/constants/Colors';

interface Props {
  children: React.ReactNode;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  bottomOffset?: number;
}

const KeyboardAvoidingScroll: React.FC<Props> = ({
  children,
  backgroundColor = 'white',
  style,
  contentStyle,
  bottomOffset = 62,
}) => {
  const insets = useSafeAreaInsets();
  const { height, width } = Dimensions.get('window');

  return (
    <KeyboardAwareScrollView
      bottomOffset={bottomOffset}
      showsVerticalScrollIndicator={false}
      bounces={false}
      style={[
        {
          backgroundColor,
          paddingBottom: insets.bottom,
          height,
          width,
        },
        style,
      ]}
      contentContainerStyle={[{ flexGrow: 1 }, contentStyle]}>
      {children}
    </KeyboardAwareScrollView>
  );
};

export default KeyboardAvoidingScroll;
