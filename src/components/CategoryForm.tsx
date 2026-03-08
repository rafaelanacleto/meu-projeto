import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { categorySchema, type CategoryFormData } from '../schemas/categorySchema';
import { useCategory } from '../hooks/useCategory';

export function CategoryForm() {
  const { createCategory, isSaving } = useCategory();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      nome: '',
      descricao: '',
      tipo: 'Receita',
      ativo: true,
    }
  });

  const onSubmit = (data: CategoryFormData) => {
    console.log("Dados do formulário Entrada Category:", data);
    createCategory(data, {
      onSuccess: () => reset(),
      onError: (error: any) => {
        console.error("Erro ao criar categoria:", error.response?.data?.errors || error.response?.data);
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Nova Categoria</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        
        {/* Campo Nome */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="nome" className="text-sm font-medium text-gray-700">Nome</label>
          <input 
            id="nome" 
            {...register('nome')} 
            className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all 
              ${errors.nome ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'}`}
            placeholder="Ex: Alimentação"
          />
          {errors.nome && <span className="text-xs text-red-500 mt-1">{errors.nome.message}</span>}
        </div>

        {/* Campo Tipo (Select) */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="tipo" className="text-sm font-medium text-gray-700">Tipo</label>
          <select 
            id="tipo" 
            {...register('tipo')}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
          >
            <option value='Receita'>Receita</option>
            <option value='Despesa'>Despesa</option>
            <option value='Transferencia'>Transferencia</option>
          </select>
          {errors.tipo && <span className="text-xs text-red-500 mt-1">{errors.tipo.message}</span>}
        </div>

        {/* Campo Descrição */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="descricao" className="text-sm font-medium text-gray-700">Descrição</label>
          <input 
            id="descricao" 
            {...register('descricao')} 
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
            placeholder="Opcional..."
          />
          {errors.descricao && <span className="text-xs text-red-500 mt-1">{errors.descricao.message}</span>}
        </div>

        {/* Campo Ativo (Checkbox) */}
        <div className="flex items-center gap-3 py-2">
          <input 
            type="checkbox" 
            id="ativo" 
            {...register('ativo')} 
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
          />
          <label htmlFor="ativo" className="text-sm font-medium text-gray-700 cursor-pointer">
            Categoria ativa
          </label>
          {errors.ativo && <span className="text-xs text-red-500">{errors.ativo.message}</span>}
        </div>

        {/* Botão Salvar */}
        <button 
          type="submit" 
          disabled={isSaving}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 shadow-sm flex justify-center items-center gap-2"
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Salvando...
            </>
          ) : 'Salvar Categoria'}
        </button>
      </form>
    </div>
  );
}