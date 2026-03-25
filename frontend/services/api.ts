import axios from 'axios';

export const api = axios.create({
  baseURL: typeof window !== 'undefined' ? 'http://localhost:3333': 'http://backend:3333' 
});