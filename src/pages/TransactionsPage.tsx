import { TransactionForm } from '../components/TransactionForm';
// Supondo que você crie um componente para listar
// import { TransactionList } from '../components/TransactionList'; 

export function TransactionsPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Minhas Transações</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Coluna do Formulário */}
        <aside className="md:col-span-1">
          <TransactionForm />
        </aside>

        {/* Coluna da Lista/Tabela */}
        <main className="md:col-span-2 bg-white rounded-lg shadow p-4">
          <p className="text-gray-500 italic">Aqui viria a sua lista de transações...</p>
          {/* <TransactionList /> */}
        </main>
      </div>
    </div>
  );
}