import { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import * as api from '../api/userApi';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  // const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     try {
  //         const response = await api.post('/api/forgot-password', { email });
  //         setMessage(response.data);
  //     } catch (error) {
  //         console.error('Error sending forgot password request:', error);
  //         setMessage('Error sending forgot password request');
  //     }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('email val', email);
    try {
      // Call the API to create a user
      const data = { Email: email };
      console.log('email::', data);
      await api.forgetPassword(data);
      // Check the result or response from the API call if necessary
    } catch (error) {
      console.log('error', error);
      // Handle API call errors here
      //   showSnackbar(`${error}`, 'error');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '20px',
        maxWidth: '400px',
        margin: 'auto',
        marginTop: '50px',
        backgroundColor: '#f9f9f9',
        boxShadow:
          '0px 2px 5px hsla(243.85026737967917, 77.59336099585063%, 47.25490196078431%, 0.1)',
      }}>
      <Typography
        variant='h5'
        sx={{ color: 'blue', alignItems: 'left' }}
        gutterBottom>
        Reset your password
      </Typography>
      <Typography sx={{ fontSize: '15px' }} gutterBottom>
        Please enter your e-mail address
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label='Email'
          type='email'
          value={email}
          onChange={handleChange}
          variant='outlined'
          fullWidth
          margin='normal'
          required
          // sx={{ height: '30px' }}
        />
        <Button type='submit' variant='contained' color='primary'>
          Send Link
        </Button>
      </form>
    </Box>
  );
};

export default ForgotPassword;
