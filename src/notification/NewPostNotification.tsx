'use client'

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Snackbar, Alert, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function NewPostNotification() {
  const [open, setOpen] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const router = useRouter();

  useEffect(() => {
    const socket = io("https://playground.zenberry.one", {
      transports: ['websocket']
    });

    socket.on('newPost', (data) => {
      setPostTitle(data.title || 'New exhibit added!');
      setOpen(true);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleRefresh = () => {
    setOpen(false);
    router.refresh();
  };

  return (
    <Snackbar 
      open={open} 
      autoHideDuration={6000} 
      onClose={() => setOpen(false)}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert 
        severity="info" 
        variant="filled"
        action={
          <Button color="inherit" size="small" onClick={handleRefresh}>
            Reload
          </Button>
        }
      >
        New Post: {postTitle}
      </Alert>
    </Snackbar>
  );
}