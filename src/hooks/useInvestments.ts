import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Exemplo usando a Brapi (requer Token gratuito)
export function useStockPrice(ticker: string) {
  return useQuery({
    queryKey: ['stock', ticker],
    queryFn: async () => {
      const response = await axios.get(`https://brapi.dev/api/quote/${ticker}?token=9P8Nons25fxTgrGAcpkxEu`);
      return response.data.results[0];
    },
    enabled: !!ticker, // Só busca se o ticker existir
    staleTime: 1000 * 60 * 15, // Atualiza a cada 15 minutos
  });
}