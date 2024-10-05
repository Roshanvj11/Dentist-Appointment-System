import { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  Snackbar,
  Box,
  SvgIcon,
  Divider,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import './register.css'

import * as api from '../api/userApi';
import { useNavigate } from 'react-router-dom';
const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const validateEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const isValidPhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^[6-9]\d{9}$/;
    return phoneNumberRegex.test(phoneNumber);
  };
  const defaultValues = () => {
    setUsername('');
    setDisplayName('');
    setPassword('');
    setConfirmPassword('');
    setPhoneNo('');
    setEmail('');
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!username.trim()) {
      errors.username = 'Username is required';
      isValid = false;
    }

    if (!displayName.trim()) {
      errors.displayName = 'Display Name is required';
      isValid = false;
    }

    if (!password.trim()) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    if (!phoneNo.trim()) {
      errors.phoneNo = 'Phone No. is required';
      isValid = false;
    }

    if (!isValidPhoneNumber(phoneNo)) {
      errors.phoneNo = 'Please enter a valid Phone No.';
      isValid = false;
    }
    if (!email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    }
    if (!validateEmail(email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }
    setErrors(errors);
    return isValid;
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };
  // snackbar to set error
  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };
  const handleRegister = async () => {
    if (validateForm()) {
      // Handle registration logic here
      const data = {
        username,
        displayName,
        role: 'USER',
        authType: 'userForm',
        password,
        phoneNo,
        email,
      };

      try {
        // Call the API to create a user
        await api.createUser(data);
        // Check the result or response from the API call if necessary

        // Optionally, you can show a success message to the user
        showSnackbar('User Registered Successfully', 'success');
        navigate('/');
        defaultValues();
      } catch (error) {
        // Handle API call errors here

        // Show error message to the user using a Snackbar
        showSnackbar(`${error.error}`, 'error');
      }
    }
  };
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
  const handleGoogleBtnOnClick = () => {
    window.open(`http://localhost:5000/api/user/google/signup`, '_self');
    // useNavigate('/home')
  };
  return (
    
<div className='mainRegister'>

    <div className='subRegister'>
    <Container maxWidth='xs' >
      <Typography
        align='center'
        variant='h4'
        color='primary'
        sx={{ mt: '10px' }}>
        REGISTER
      </Typography>
      <TextField
        label='Username'
        variant='outlined'
        fullWidth
        margin='normal'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={!!errors.username}
        helperText={errors.username}
      />
      <TextField
        label='Display Name'
        variant='outlined'
        fullWidth
        margin='normal'
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        error={!!errors.displayName}
        helperText={errors.displayName}
      />
      <TextField
        label='Password'
        type='password'
        variant='outlined'
        fullWidth
        margin='normal'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!errors.password}
        helperText={errors.password}
      />
      <TextField
        label='Confirm Password'
        type='password'
        variant='outlined'
        fullWidth
        margin='normal'
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword}
      />

      <TextField
        label='Phone Number'
        variant='outlined'
        fullWidth
        margin='normal'
        value={phoneNo}
        onChange={(e) => {
          setPhoneNo(e.target.value);
        }}
        error={!!errors.phoneNo}
        helperText={errors.phoneNo}
      />
      <TextField
        label='Email'
        type='email'
        variant='outlined'
        fullWidth
        margin='normal'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!errors.email}
        helperText={errors.email}
      />
      <Button
        variant='contained'
        color='primary'
        fullWidth
        onClick={handleRegister}
        sx={{ mt: '15px' }}>
        SignUp
      </Button>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          my: '10px',
        }}>
        {/* a divider to seperate google and user form*/}
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
          fullWidth
          sx={{ mt: '15px' }}
          startIcon={
            <SvgIcon
              sx={{
                borderRadius: '2px',
              }}>
              <GoogleIcon />
            </SvgIcon>
          }
          onClick={handleGoogleBtnOnClick}>
          Signup with Google
        </Button>
      </Box>
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
    </div>

    </div>
  );
};

export default RegisterForm;
