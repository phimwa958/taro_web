import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:5000/api/tarot/';

const getReadings = () => {
  return axios.get(API_URL);
};

const requestReading = (readingId) => {
  return axios.post(API_URL + 'request', { readingId }, { headers: authHeader() });
};

const getReadingHistory = () => {
  return axios.get(API_URL + 'history', { headers: authHeader() });
};

const deleteReadingRequest = (id) => {
  return axios.delete(API_URL + 'history/' + id, { headers: authHeader() });
};

export default {
  getReadings,
  requestReading,
  getReadingHistory,
  deleteReadingRequest,
};