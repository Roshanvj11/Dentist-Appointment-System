import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom'; // Import useParams
import MuiAlert from '@mui/material/Alert';
import * as api from '../api/userApi';
import {
  Typography,
  Container,
  TextField,
  Button,
  Snackbar,
} from '@mui/material';

const ResetPassword = () => {
  const [userEmail, setUserEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [errors, setErrors] = useState({});
  const defaultValues = () => {
    setNewPassword('');
    setConfirmPassword('');
  };
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email');
    const token = searchParams.get('token');

    // Do something with the email and token values
    setUserEmail(email);
    setResetToken(token);

    // You can perform any logic or API calls using the email and token values here
  }, [location]);
  // snackbar to set error or success message
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

  console.log('userEmail', userEmail, 'resetToken', resetToken);
  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!newPassword.trim()) {
      errors.newPassword = 'Password is required';
      isValid = false;
    } else if (newPassword !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }
    setErrors(errors);
    return isValid;
  };
  // Password reset process can be handled here
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const data = {
        password: newPassword,
        email: userEmail,
        token: resetToken,
      };

      try {
        // Call the API to create a user
        await api.updatePassword(data);
        console.log('data', data);
        // Check the result or response from the API call if necessary
        showSnackbar('Password Updated Successfully', 'success');
        defaultValues();
      } catch (error) {
        console.log('error', error);
        // Handle API call errors here
        showSnackbar(`${error}`, 'error');
      }
    }
  };
  return (
    <Container
      maxWidth='sm'
      sx={{
        width: '400px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: 1,
        p: 2,
      }}>
      {/* <Grid container spacing={2} justifyContent='center' alignItems='center'>
        <Grid item xs={12}> */}
      <Typography
        variant='h4'
        sx={{ color: 'blue', mb: '20px' }}
        align='center'>
        Reset Password
      </Typography>
      {/* </Grid>

        <Grid item xs={12}> */}
      <TextField
        sx={{ width: '300px', mb: '20px' }}
        label='New Password'
        type='password'
        variant='outlined'
        fullwidth
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        error={!!errors.newPassword}
        helperText={errors.newPassword}
      />
      {/* </Grid>
        <Grid item xs={12}> */}
      <TextField
        sx={{ width: '300px', mb: '20px' }}
        label='Confirm Password'
        type='password'
        variant='outlined'
        fullwidth
        value={confirmPassword}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {/* </Grid>
        <Grid> */}
      <Button
        sx={{ width: '150px', mt: '10px', mb: '10px' }}
        variant='contained'
        color='primary'
        type='submit'
        fullwidth
        onClick={handleSubmit}>
        Save
      </Button>
      {/* </Grid>
      </Grid> */}
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
  );
};

export default ResetPassword;
