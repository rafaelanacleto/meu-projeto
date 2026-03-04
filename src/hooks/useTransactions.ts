// src/hooks/useTransactions.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TransactionService } from '../services/api';

export function useTransactions() {
  const queryClient = useQueryClient();

  // Busca as transações com Cache automático
  const query = useQuery({
    queryKey: ['transactions'],
    queryFn: TransactionService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutos de cache "fresco"
  });

  // Mutação para criar transação e invalidar o cache (Refresh automático)
  const createMutation = useMutation({
    mutationFn: TransactionService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
    },
  });

  return { ...query, createTransaction: createMutation.mutate };
}