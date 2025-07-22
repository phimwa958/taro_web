
import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:5000/api/users/';

const getProfile = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

const updateProfile = (name, email) => {
  return axios.put(API_URL, { name, email }, { headers: authHeader() });
};

const deleteUser = () => {
  return axios.delete(API_URL, { headers: authHeader() });
};

export default {
  getProfile,
  updateProfile,
  deleteUser,
};
