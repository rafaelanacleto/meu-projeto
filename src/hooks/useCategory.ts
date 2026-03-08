import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CategoryService } from '../services/categoryService';
import { type CategoryFormData } from '../schemas/categorySchema';

export function useCategory() {
  const queryClient = useQueryClient();
    const { data, isLoading, error } = useQuery({
        queryKey: ['categories'],
        queryFn: CategoryService.getAll,
        staleTime: 1000 * 60 * 5, 
    });

    const mutation = useMutation({
        mutationFn: (newData: CategoryFormData) => CategoryService.create(newData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
    });

    return { 
        categories: data ?? [], 
        isLoading,
        error,
        createCategory: mutation.mutate, // Retornando apenas a FUNÇÃO
        isSaving: mutation.isPending
    };
}