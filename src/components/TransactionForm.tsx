import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { transactionSchema, type TransactionFormData } from '../schemas/transactionSchema';
import { useTransactions } from '../hooks/useTransactions';

export function TransactionForm() {
  const { createTransaction } = useTransactions();
  
  const { register, handleSubmit, formState: { errors } } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema) // Liga o Zod ao Hook Form
  });

  const onSubmit = (data: TransactionFormData) => {
    createTransaction(data); // ✅ Correto: Chame a função diretamente
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('description')} placeholder="Descrição" />
      {errors.description && <span>{errors.description.message}</span>}
      
      {/* ... outros campos ... */}
      
      <button type="submit">Salvar</button>
    </form>
  );
}