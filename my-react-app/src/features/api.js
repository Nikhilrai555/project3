import axios from 'axios';

const apiEndpoint = 'http://localhost:3001/trades';

export const fetchTrades = async () => {
  try {
    const response = await axios.get(apiEndpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postTrade = async (tradeData) => {
  try {
    const response = await axios.post(apiEndpoint, tradeData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
