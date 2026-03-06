import axios from 'axios';
import { type Transaction } from '../types/transaction';
import type { TransactionFormData } from '../schemas/transactionSchema';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Ajuste para a URL da sua API .NET
});

// Adicione a palavra 'export' antes de 'const'
export const TransactionService = {
  
  // Método GET (para a lista e dashboard)
  getAll: async () => {
    const response = await api.get<Transaction[]>('/TransacaoFinanceira');
    console.log('Resposta da API:', response.data); // Log para verificar a resposta
    return response.data;
  },

  // Método POST (para o formulário)
  create: async (data: TransactionFormData) => {
    console.log("Payload sendo enviado para o servidor:", data); // Add this line
    const response = await api.post<Transaction>('/TransacaoFinanceira', data);
    return response.data;
  }
};