'use client'

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getMyProfileInfo } from '@/store/slices/userSlice';
import { AppDispatch } from '@/store/store';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    
    if (token) {
      dispatch(getMyProfileInfo());
    }
  }, [dispatch]);

  return <>{children}</>;
}