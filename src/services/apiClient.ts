import axios from 'axios';

const BASE_URL = process.env.API_BASE_URL;

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export default client;
