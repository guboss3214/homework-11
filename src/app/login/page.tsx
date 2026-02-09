"use client"

import React from 'react';
import { Box } from '@mui/material';
import LoginForm from '@/components/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <Box>
      <LoginForm redirectTo="/" />
    </Box>
  );
};

export default LoginPage;
