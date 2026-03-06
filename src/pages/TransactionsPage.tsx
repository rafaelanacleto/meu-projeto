import { TransactionForm } from '../components/TransactionForm';
import { TransactionList } from '../components/TransactionList'; 

export function TransactionsPage() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <header className="border-b pb-4">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Gestão Financeira
        </h1>
        <p className="text-gray-500">Controle suas entradas e saídas em tempo real.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Coluna do Formulário (Fica fixa ou no topo no mobile) */}
        <aside className="lg:col-span-1 sticky top-6">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
             <TransactionForm />
          </div>
        </aside>

        {/* Coluna da Lista/Tabela */}
        <main className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 min-h-[400px]">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Últimas Transações</h2>
            <TransactionList />
          </div>
        </main>
      </div>
    </div>
  );
}