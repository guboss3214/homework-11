'use client'

import { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { Box, Button, TextField, Typography, IconButton, InputAdornment, CircularProgress } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Link from 'next/link'; 
import { useRouter } from 'next/navigation'; 
import { useDispatch } from 'react-redux';
import { registerUser } from '../store/slices/userSlice';
import type { AppDispatch } from '../store/store';
import type { IUserData } from '../interfaces/userData';
import type { FormProps } from '../interfaces/FormProps';

const RegisterSchema = Yup.object().shape({
  username: Yup.string().required('Username is required').min(3, 'Too short'),
  password: Yup.string().required('Password is required'),
});

const RegisterForm: React.FC<FormProps> = ({ redirectTo = '/home' }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter(); 
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (values: IUserData) => {
    setLoading(true);
    setError('');
    try {
      await dispatch(registerUser(values)).unwrap();
      router.push(redirectTo);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      setError(errorMessage);
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  const togglePassword = () => setShowPassword(prev => !prev);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f2f5',
        padding: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'white',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          width: '100%',
          maxWidth: 400,
        }}
      >
        <Typography variant="h5" sx={{ mb: 3 }}>
          Register new account
        </Typography>

        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={RegisterSchema}
          onSubmit={handleRegister}
        >
          {({ errors, touched, values, handleChange }) => (
            <Form style={{ width: '100%' }}>
              <TextField
                label="Username"
                name="username"
                value={values.username}
                onChange={handleChange}
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
                fullWidth
                margin="normal"
                size="small"
              />

              <TextField
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                fullWidth
                margin="normal"
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2, py: 1.5 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
              </Button>

              {error && (
                <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
                  {error}
                </Typography>
              )}

              <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
                Have an account?{' '}
                <Link href="/login" style={{ textDecoration: 'none', color: '#1976d2' }}>
                  Login here
                </Link>
              </Typography>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default RegisterForm;