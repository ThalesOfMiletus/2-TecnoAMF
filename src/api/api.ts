// import axios from "axios";
// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  // Comunicação com BACKEND - Response: JSON
  baseURL: process.env.NEXT_PUBLIC_API_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
