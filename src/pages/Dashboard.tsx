import { useMemo } from 'react';
import { useTransactions } from '../hooks/useTransactions';

export function Dashboard() {
  const { transactions, isLoading } = useTransactions();

  // Cálculo de Saldo, Receitas e Despesas
  // O useMemo garante que isso só rode se o array 'transactions' mudar
  const stats = useMemo(() => {
    if (!transactions) return { total: 0, income: 0, expense: 0 };

    return transactions.reduce((acc, item) => {
      const amount = Number(item.amount);
      if (item.type === '0') { // Receita
        acc.income += amount;
        acc.total += amount;
      } else { // Despesa
        acc.expense += amount;
        acc.total -= amount;
      }
      return acc;
    }, { total: 0, income: 0, expense: 0 });
  }, [transactions]);

  if (isLoading) return <p>Carregando dados financeiros...</p>;

  return (
    <div className="p-8 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Resumo Financeiro</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card Saldo Total */}
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
          <p className="text-sm text-gray-500 uppercase font-semibold">Saldo Atual</p>
          <h2 className={`text-2xl font-bold ${stats.total >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(stats.total)}
          </h2>
        </div>

        {/* Card Receitas */}
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
          <p className="text-sm text-gray-500 uppercase font-semibold">Entradas</p>
          <h2 className="text-2xl font-bold text-green-600">
            {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(stats.income)}
          </h2>
        </div>

        {/* Card Despesas */}
        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500">
          <p className="text-sm text-gray-500 uppercase font-semibold">Saídas</p>
          <h2 className="text-2xl font-bold text-red-600">
            {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(stats.expense)}
          </h2>
        </div>
      </div>

      {/* Placeholder para o Gráfico de Categorias que faremos depois */}
      <div className="bg-white p-10 rounded-xl shadow-sm text-center text-gray-400 border-2 border-dashed">
        Gráfico de Gastos por Categoria (Recharts) em breve...
      </div>
    </div>
  );
}