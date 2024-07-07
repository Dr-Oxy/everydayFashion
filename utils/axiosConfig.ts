import axios from 'axios';

const baseUrl = process.env.EXPO_PUBLIC_API_URL;

export const axiosRequest = () => {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  return axios.create({
    baseURL: baseUrl,
    headers: headers,
  });
};
