// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('profile');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchTrades = async () => {
  const response = await api.get('/trades');
  return response.data;
};

export const postTrade = async (tradeData) => {
  const response = await api.post('/trades', tradeData);
  return response.data;
};

export const signup = async (userData) => {
  const response = await api.post('/user/signup', userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await api.post('/user/login', userData);
  return response.data;
};
