// src/utils/validation.js
export const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };
  
  export const validatePassword = (pw) => {
    return pw.length >= 8 && /[A-Za-z]/.test(pw) && /[0-9]/.test(pw);
  };
  