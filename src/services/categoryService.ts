import axios from 'axios';
import { type Category } from '../types/category';
import type { CategoryFormData } from '../schemas/categorySchema';

const api = axios.create({
  baseURL: 'https://localhost:7091/api', // Ajuste para a URL da sua API .NET
});

// Adicione a palavra 'export' antes de 'const'
export const CategoryService = {
    // Método GET (para a lista e dashboard)
    getAll: async () => {
        const response = await api.get<Category[]>('/Categoria');
        console.log('Resposta da API:', response.data); // Log para verificar a resposta
        return response.data;
    },

    // Método POST (para o formulário)
    create: async (data: CategoryFormData) => {
        console.log("Payload sendo enviado para o servidor:", data); // Add this line
        const response = await api.post<Category>('/Categoria', data);
        return response.data;
    }
};