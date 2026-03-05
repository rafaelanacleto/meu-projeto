// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // 1. Importar
import { TransactionsPage } from './pages/TransactionsPage';
import { Dashboard } from './pages/Dashboard';

// 2. Criar a instância do Client (fora do componente)
const queryClient = new QueryClient();

export default function App() {
  return (
    // 3. Envolver toda a aplicação com o Provider
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <nav className="bg-gray-800 text-white p-4 flex gap-4">
           {/* Seus links aqui */}
        </nav>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transacoes" element={<TransactionsPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}