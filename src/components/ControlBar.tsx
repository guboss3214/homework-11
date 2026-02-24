'use client'

import { Box, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface ControlBarProps {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
}

const ControlBar = ({ value, onChange, onSend }: ControlBarProps) => {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated)
  return (
    <Box sx={{ display: 'flex', mt: 2, gap: 1, alignItems: 'center' }}>
      <TextField
        fullWidth
        size="small"
        placeholder={isAuthenticated ? "Write a comment..." : "Please log in to comment"}
        value={value}
        disabled={!isAuthenticated}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && onSend()}
      />
      <IconButton 
        color="primary" 
        onClick={onSend} 
        disabled={!value.trim()}
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default ControlBar;