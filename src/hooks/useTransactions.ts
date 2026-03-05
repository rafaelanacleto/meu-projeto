// src/hooks/useTransactions.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TransactionService } from '../services/transactionService';
import { type TransactionFormData } from '../schemas/transactionSchema';

export function useTransactions() {
  const queryClient = useQueryClient();

  // 1. O 'data' nasce aqui, no useQuery (o seu GET)
  const { data, isLoading, error } = useQuery({
    queryKey: ['transactions'],
    queryFn: TransactionService.getAll,
    staleTime: 1000 * 60 * 5, 
  });

  const mutation = useMutation({
    mutationFn: (newData: TransactionFormData) => TransactionService.create(newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
  });

  return { 
    // Agora o 'data' existe e você o mapeia para 'transactions'
    transactions: data ?? [], 
    isLoading, 
    error,
    createTransaction: mutation.mutate, // Retornando apenas a FUNÇÃO
    isSaving: mutation.isPending
  };
}