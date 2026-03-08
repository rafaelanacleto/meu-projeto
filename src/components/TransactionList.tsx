import { useTransactions } from '../hooks/useTransactions';

export function TransactionList() {
  const { transactions, isLoading } = useTransactions();

  if (isLoading) return <p className="p-4 text-gray-500">Carregando...</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b text-gray-400 text-xs uppercase tracking-wider">
            <th className="py-3 px-4 font-medium">Data / Descrição</th>
            <th className="py-3 px-4 font-medium text-right">Valor</th>
            <th className="py-3 px-4 font-medium text-center">Tipo</th>
            <th className="py-3 px-4 font-medium">Categoria</th>
            <th className="py-3 px-4 font-medium">Conta</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {transactions.map((t) => (
            <tr key={t.id} className="hover:bg-gray-50 transition-colors">
              <td className="py-4 px-4">
                <p className="text-xs text-gray-400">{new Date(t.dataVencimento).toLocaleDateString()}</p>
                <p className="font-medium text-gray-800">{t.descricao}</p>
              </td>
              <td className={`py-4 px-4 text-right font-bold ${t.tipo === 1 ? 'text-green-600' : 'text-red-600'}`}>
                {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(t.valor)}
              </td>
              <td className="py-4 px-4 text-center">
                <span className={`text-[10px] uppercase px-2 py-1 rounded-full font-bold ${t.tipo === 1 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {t.tipo === 1 ? 'Receita' : 'Despesa'}
                </span>
              </td>
              <td className="py-4 px-4 text-sm text-gray-600">Emprestimo</td> {/* Mock até integrar Categoria do .NET */}
              <td className="py-4 px-4 text-sm text-gray-600">Itau</td>   {/* Mock até integrar Conta do .NET */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}