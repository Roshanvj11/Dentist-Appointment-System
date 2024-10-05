// import modules
import axios from 'axios';
const api = axios.create();

export const createUser = async (data) => {
  try {
    const result = await api.post(`/api/user/register`, data);
    return result.data;
  } catch (error) {
    throw (
      error.response?.data?.msg ||
      error.response?.data?.message ||
      error.response?.data ||
      error.message
    );
  }
};
export const loginUser = async (data) => {
  try {
    const result = await api.post(`/api/user/login`, data);
    return result.data;
  } catch (error) {
    throw (
      error.response?.data?.msg ||
      error.response?.data?.message ||
      error.response?.data ||
      error.message
    );
  }
};
export const googleLoginUser = async (data) => {
  try {
    const result = await api.get(`/api/user/auth/google`, data);
    return result.data;
  } catch (error) {
    throw (
      error.response?.data?.msg ||
      error.response?.data?.message ||
      error.response?.data ||
      error.message
    );
  }
};
// forgetPassword
export const forgetPassword = async (data) => {
  try {
    console.log('data', typeof data);
    const result = await api.post(`/api/user/forgot-password`, data);
    return result.data;
  } catch (error) {
    throw (
      error.response?.data?.msg ||
      error.response?.data?.message ||
      error.response?.data ||
      error.message
    );
  }
};

export const updatePassword = async (data) => {
  try {
    const result = await api.put(`/api/user/reset-password`, data);
    return result.data;
  } catch (error) {
    throw (
      error.response?.data?.msg ||
      error.response?.data?.message ||
      error.response?.data ||
      error.message
    );
  }
};

export const appointmentData = async (data) => {
  // try {
  //   axios.post('http://localhost:5000/api/user', appointmentData)
  //   console.log(appointmentData.data);
  //   if (appointmentData.data) {
  //     alert('Login Sui')
  //   }
  // } catch (err) {
  //   console.error('error occured',err)
  // }
  try {
    const result = await api.post('api/user/appointment',data)
    return result.data
  } catch (error) {
    throw (
      error.response?.data?.msg ||
      error.response?.data?.message ||
      error.response?.data ||
      error.message
    );
  }
}
// http://localhost:8000/api/user/getall/post