import axios from 'axios';

export const api = axios.create({
  headers: {
    'Content-type': 'application/json',
  },
  baseURL: 'http://localhost:8000/api/',
});
