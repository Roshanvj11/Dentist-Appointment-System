import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './login.css'

import {
  Box,
  Container,
  Divider,
  Link,
  Snackbar,
  SvgIcon,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import * as api from '../api/userApi';
import MuiAlert from '@mui/material/Alert';

const GoogleIcon = () => {
  return (
    <svg
      id='Layer_1'
      data-name='Layer 1'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 29.07 29.67'>
      <path
        d='M30.5,16.33a12.33,12.33,0,0,0-.31-3H16.28v5.5h8.16a7.27,7.27,0,0,1-3,4.81v.18l4.4,3.41h.31a14.51,14.51,0,0,0,4.41-10.9'
        transform='translate(-1.46 -1.17)'
        style={{ fill: '#557fc0' }}
      />
      <path
        d='M16.28,30.83a14.11,14.11,0,0,0,9.81-3.59l-4.67-3.63a8.84,8.84,0,0,1-5.16,1.47,8.92,8.92,0,0,1-8.43-6.15H7.66L3.09,22.48,3,22.65a14.82,14.82,0,0,0,13.25,8.18'
        transform='translate(-1.46 -1.17)'
        style={{ fill: '#36a851' }}
      />
      <path
        d='M7.85,18.93A9.2,9.2,0,0,1,7.35,16a9.72,9.72,0,0,1,.48-2.93v-.2L3.19,9.27,3,9.34A14.85,14.85,0,0,0,3,22.65l4.81-3.72'
        transform='translate(-1.46 -1.17)'
        style={{ fill: '#f8bc18' }}
      />
      <path
        d='M16.28,6.91A8.24,8.24,0,0,1,22,9.12L26.19,5a14.15,14.15,0,0,0-9.91-3.87A14.83,14.83,0,0,0,3,9.34l4.79,3.73a9,9,0,0,1,8.45-6.16'
        transform='translate(-1.46 -1.17)'
        style={{ fill: '#eb4735' }}
      />
    </svg>
  );
};
const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const navigate = useNavigate();
  // snackbar to set error
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };
  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };
  const defaultValues = () => {
    setUsername('');
    setPassword('');
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      username,
      password,
    };
    try {
      // Call the API to create a user
      // await api.loginUser(data);
      // console.log('data', data);
      // // Check the result or response from the API call if necessary
      // showSnackbar('User Login Successfully', 'success');
      // navigate('/home');
      // defaultValues();
      const result = await api.loginUser(data);
      const userId= result.userId;
      // Redirect based on user role
      if (result.role === 'ADMIN') {
        window.location.href = '/dashboard'; // Redirect to admin dashboard
      } else {
        console.log(userId);
        // window.location.href = '/home'; // Redirect to user homepage
        navigate('/layout');
      }
      // Check the result or response from the API call if necessary
      showSnackbar('User Login Successfully', 'success');
      // navigate('/dashboard');
      defaultValues();
    } catch (error) {
      console.log('error', error);
      // Handle API call errors here
      showSnackbar(`${error}`, 'error');
    }
  };

  const handleSignUp = () => {
    navigate('/register');
  };

  const handleGoogleBtnOnClick = () => {
    window.open(`http://localhost:5000/api/user/google/signin`, '_self');
    // navigate('/home');
  };
  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  
  return (
    <Box className="loginMain" >
      <Container maxWidth='xs'>

        <div className='loginBox'>
          <Typography variant='h4' gutterBottom>
            LOGIN
          </Typography>

          <form onSubmit={handleLogin}>
            
            <TextField
              label='Username'
              variant='outlined'
              fullWidth
              margin='normal'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
              label='Password'
              variant='outlined'
              fullWidth
              margin='normal'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant='contained'
              color='primary'
              type='submit'
              fullWidth
              style={{ marginTop: '20px' }}
              onClick={handleLogin}>
              Sign in
            </Button>
            <Link
              variant='text'
              color='primary'
              fullWidth
              sx={{ marginTop: '30px', fontWeight: 600, fontSize: 'medium' }}
              onClick={handleForgotPassword}>
              Forgot Password?
            </Link>
            {/* a divider to seperate google and user form*/}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                my: '10px',
              }}>
              <Box sx={{ width: '45%', pr: '5px' }}>
                <Divider />
              </Box>
              <Typography variant='body1' color='primary'>
                or
              </Typography>
              <Box sx={{ width: '45%', pl: '5px' }}>
                <Divider />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                // variant='contained'
                variant='outlined'
                color='primary'
                type='submit'
                fullWidth
                sx={{
                  marginTop: '10px',
                }}
                startIcon={
                  <SvgIcon
                    sx={{
                      borderRadius: '2px',
                    }}>
                    <GoogleIcon />
                  </SvgIcon>
                }
                onClick={handleGoogleBtnOnClick}>
                Sign In with Google
              </Button>
            </Box>
            <Button
              variant='text'
              color='primary'
              type='submit'
              fullWidth
              style={{ marginTop: '10px' }}
              onClick={handleSignUp}>
              Sign up
            </Button>
          </form>
        </div>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={9000}
          onClose={handleSnackbarClose}>
          <MuiAlert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            sx={{ width: '100%' }}>
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default LoginForm;
