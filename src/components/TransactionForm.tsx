import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { transactionSchema, type TransactionFormData } from '../schemas/transactionSchema';
import { useTransactions } from '../hooks/useTransactions';

export function TransactionForm() {
  const { createTransaction, isSaving } = useTransactions();

  // Remova o <TransactionFormData> genérico do useForm se ele estiver lá
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    // O zodResolver já sabe os tipos através do schema, não precisamos repetir
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      descricao: '',
      valor: 0,
      tipo: 1,
      status: 1, // Adicione o status aqui para o .NET
      categoriaId: 1, // Use número se o C# espera int
      contaBancariaId: 1, // Use número se o C# espera int
      dataVencimento: new Date().toISOString().split('T')[0]
    }
  });

  const onSubmit = (data: any) => {
    const payloadParaApi = {
      ...data,
      // Converte "2026-03-19" para "2026-03-19T00:00:00.000Z"
      dataVencimento: new Date(data.dataVencimento).toISOString(),
      // Garante que o status vá como número, como pede o seu backend
      status: Number(data.status || 1),
      // Garante que observacao exista, mesmo que vazia, se o C# exigir
      observacao: data.observacao || ""
    };

    console.log("Payload Final para o .NET:", payloadParaApi);

    createTransaction(payloadParaApi, {
      onSuccess: () => {
        reset();
      },
      onError: (error: any) => {
        // ESTA LINHA É CRUCIAL: Ela vai imprimir o motivo real do 400
        console.error("O .NET rejeitou por isso:", error.response?.data?.errors || error.response?.data);
      }
    });
  };

  // Adicione este log logo acima do return do seu componente
  console.log("Erros de validação do Zod:", errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Descrição */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Descrição</label>
        <input
          {...register('descricao')}
          placeholder="Ex: Mercado, Aluguel..."
          className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
        />
        {errors.descricao && <p className="text-red-500 text-[10px] mt-1">{errors.descricao.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Valor */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Valor (R$)</label>
          <input
            type="number" step="0.01"
            {...register('valor', { valueAsNumber: true })}
            className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Tipo */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Tipo</label>
          <select {...register('tipo', { valueAsNumber: true })} className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none">
            <option value={1}>Despesa</option>
            <option value={0}>Receita</option>
          </select>
        </div>
      </div>

      {/* Data */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Data</label>
        <input type="date" {...register('dataVencimento')} className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none" />
      </div>

      {/* Selects de Categorias e Contas (Mocks para seu projeto) */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Categoria</label>
          <select {...register('categoriaId')} className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none">
            <option value={1}>Moradia</option>
            <option value={2}>Alimentação</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Conta</label>
          <select {...register('contaBancariaId')} className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none">
            <option value={1}>Nubank</option>
            <option value={2}>Itaú</option>
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