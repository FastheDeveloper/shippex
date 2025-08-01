// hooks/useLoginForm.ts
import { useState } from 'react';

import { router } from 'expo-router';
import Toast from 'react-native-toast-message';

import { saveSession } from '../utils/secureStorage';

const validateEmail = (text: string) => {
  // Basic email format check
  const isValid = /^\S+@\S+\.\S+$/.test(text);
  return isValid;
};

export const useLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState('');
  const [urlError, setUrlError] = useState('');
  const handleEmailBlur = () => {
    if (!email.trim()) {
      setEmailError('Email is required');
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordBlur = () => {
    const trimmed = password.trim();

    if (!trimmed) {
      setPasswordError('Password is required');
    } else if (trimmed.length < 6) {
      setPasswordError('Password must be at least 6 characters');
    } else {
      setPasswordError('');
    }
  };

  const handleLogin = async () => {
    handleEmailBlur();
    handlePasswordBlur();

    const isValid = validateEmail(email) && password.trim().length > 0;
    if (!isValid) return;

    setIsLoading(true);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Simulate successful login
    Toast.show({
      type: 'success',
      text1: 'Login Successful',
      text2: 'Welcome Back!',
    });

    // Simulate redirect
    router.replace('/(tabs)/one');

    setIsLoading(false);
  };

  const handleUrlBlur = () => {
    const trimmed = url.trim();

    if (!trimmed) {
      setUrlError('URL is required');
      return;
    }

    // Optional: ensure it starts with https://
    if (!trimmed.startsWith('https://')) {
      setUrlError('URL must start with https://');
      return;
    }

    // Basic URL validation (host.domain)
    const urlPattern = /^(https:\/\/)([\w-]+\.)+[\w-]{2,}(\/.*)?$/;

    if (!urlPattern.test(trimmed)) {
      setUrlError('Enter a valid URL');
    } else {
      setUrlError('');
    }
  };
  const resetLoginForm = () => {
    setEmail('');
    setEmailError('');
    setPassword('');
    setPasswordError('');
    setUrl('');
    setUrlError('');
    setIsLoading(false);
  };

  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.trim().length >= 6;
  const isUrlValid =
    url.trim().startsWith('https://') &&
    /^(https:\/\/)([\w-]+\.)+[\w-]{2,}(\/.*)?$/.test(url.trim());

  const isDisabled =
    !isUrlValid ||
    !isEmailValid ||
    !isPasswordValid ||
    !!urlError ||
    !!emailError ||
    !!passwordError;

  return {
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
    showPassword,
    setShowPassword,
    url,
    setUrl,
    urlError,
    handleUrlBlur,
    isDisabled,
    resetLoginForm,
  };
};
