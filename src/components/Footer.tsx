import React from 'react';
import { View, ViewProps } from 'react-native';

type FooterProps = ViewProps & {
  children: React.ReactNode;
};

const Footer: React.FC<FooterProps> = ({ children, className = '', ...props }) => {
  return (
    <View className={`absolute bottom-0 left-0 right-0   py-3 ${className}`} {...props}>
      {children}
    </View>
  );
};

export default Footer;
