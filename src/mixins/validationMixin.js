// validationMixin.js

import {computed } from 'vue';

export const useValidationMixin = (email, password, isSubmitted, repeatPassword) => {

  const validateEmail = (value) => {
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return pattern.test(value);
  };

  const validatePassword = (value) => {
    const hasCapitalLetter = /[A-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSymbol = /[!@#$%^&*+]/.test(value);
    const passLength = value.length >= 8;
    return hasCapitalLetter && hasNumber && passLength && hasSymbol;
  };

  const validateRepeatPassword = (value, password) => {
    return value === password
  }

  const emailErrorMessage = computed(() => {
    if (isSubmitted.value && !email.value) {
      return 'Field is required';
    } else if (email.value && !validateEmail(email.value)) {
      return 'Invalid e-mail';
    } else {
      return '';
    }
  });

  const passwordErrorMessage = computed(() => {
    if (isSubmitted.value && !password.value) {
      return 'Field is required';
    } else if (password.value && !validatePassword(password.value)) {
      return 'Password should contain 1 capital letter, 1 number, 1 special symbol and be longer or equal 8 symbols';
    } else {
      return '';
    }
  });

  const repeatPasswordErrorMessage = computed(() => {
    if (isSubmitted.value && !repeatPassword.value) {
      return 'Field is required';
    } else if (repeatPassword.value && !validateRepeatPassword(repeatPassword.value, password.value)) {
      return 'Should be same as password';
    } else {
      return '';
    }
  })

  return {
    validateEmail,
    validatePassword,
    validateRepeatPassword,
    emailErrorMessage,
    passwordErrorMessage,
    repeatPasswordErrorMessage
  };
};
