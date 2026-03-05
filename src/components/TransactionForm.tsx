import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { transactionSchema, type TransactionFormData } from '../schemas/transactionSchema';
import { useTransactions } from '../hooks/useTransactions';

export function TransactionForm() {
  const { createTransaction, isSaving } = useTransactions();
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: { type: '1', amount: 0 }
  });

  const onSubmit = (data: TransactionFormData) => {
    createTransaction(data, {
      onSuccess: () => {
        reset(); // Limpa o formulário após salvar no banco .NET
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Descrição */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Descrição</label>
        <input 
          {...register('description')} 
          placeholder="Ex: Mercado, Aluguel..."
          className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
        />
        {errors.description && <p className="text-red-500 text-[10px] mt-1">{errors.description.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Valor */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Valor (R$)</label>
          <input 
            type="number" step="0.01"
            {...register('amount', { valueAsNumber: true })} 
            className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Tipo */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Tipo</label>
          <select {...register('type')} className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none">
            <option value="1">Despesa</option>
            <option value="0">Receita</option>
          </select>
        </div>
      </div>

      {/* Data */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Data</label>
        <input type="date" {...register('date')} className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none" />
      </div>

      {/* Selects de Categorias e Contas (Mocks para seu projeto) */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Categoria</label>
          <select {...register('categoryId')} className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none">
            <option value="guid-categoria-1">Moradia</option>
            <option value="guid-categoria-2">Alimentação</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Conta</label>
          <select {...register('bankAccountId')} className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none">
            <option value="guid-conta-1">Nubank</option>
            <option value="guid-conta-2">Itaú</option>
          </select>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={isSaving}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-all disabled:opacity-50 shadow-lg shadow-blue-200"
      >
        {isSaving ? 'Salvando...' : 'Confirmar Transação'}
      </button>
    </form>
  );
}