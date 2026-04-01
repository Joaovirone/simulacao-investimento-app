// src/services/api.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: typeof window !== 'undefined' ? 'http://localhost:3333' : 'http://backend:3333',
});

// "Intercepta" todas as requisições antes delas saírem do frontend
api.interceptors.request.use((config) => {
  // Verifica se estamos rodando no navegador (client-side)
  if (typeof window !== 'undefined') {
    // Busca o token que vamos salvar no LocalStorage no momento do login
    const token = localStorage.getItem('@InvestSim:token');
    
    if (token) {
      // Se tiver token, anexa ele no cabeçalho de Autorização
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});