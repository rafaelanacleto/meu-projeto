// src/services/api.ts
import axios from 'axios';
import type { Transaction } from '../types/finance';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Exemplo de serviço de Transações
export const TransactionService = {
  getAll: async () => {
    const response = await api.get<Transaction[]>('/TransacaoFinanceira');
    return response.data;
  },
  create: async (data: Omit<Transaction, 'id'>) => {
    return api.post('/TransacaoFinanceira', data);
  }
};