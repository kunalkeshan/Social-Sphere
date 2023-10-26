import React, { useState } from 'react';
import {
  Grid,
  CssBaseline,
  Box,
  Avatar,
  TextField,
  Paper,
  IconButton,
  InputAdornment,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
  //logic
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(/forgot.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '60% 60%',
          backgroundPosition: 'center',
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{ fontFamily: 'Inter', background: '#2A2A2A' }}
        className="!text-white"
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <h1 className="font-heading text-3xl md:text-5xl font-semibold">
            Forgot Password
          </h1>
          <form className="mt-1" onSubmit={handleForgotPassword}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              autoComplete="email"
              type="email"
              autoFocus
              sx={{
                borderColor: 'white',
                input: {
                  color: 'white',
                },
                label: {
                  color: 'white',
                },
                '&.MuiTextField-root': {
                  borderColor: 'white',
                },
              }}
              variant="filled"
              value={email}
              onChange={handleEmailChange}
            />
            <button
              type="submit"
              className={`cursor-pointer ${
                loading
                  ? 'cursor-default opacity-60'
                  : 'hover:bg-white hover:text-primary'
              } px-4 text-white my-4 w-full py-2 border-2 border-white font-heading font-semibold transition-all`}
              disabled={loading}
            >
              {loading ? 'Sending Email...' : 'Reset Password'}
            </button>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ForgotPasswordPage;