import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, ArrowLeftRight, PieChart, Wallet } from 'lucide-react';

export function Layout() {
  const location = useLocation();

  const isActive = (path: string) => 
    location.pathname === path ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700";

  return (
    <div className="flex h-screen w-full bg-gray-100">
      {/* SIDEBAR FIXA À ESQUERDA */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col h-full shadow-2xl z-10">
        <div className="p-6 text-2xl font-bold border-b border-gray-800 flex items-center gap-2">
          <Wallet className="text-blue-400" />
          <span>Finanças JS</span>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          <Link to="/" className={`flex items-center gap-3 p-3 rounded-lg transition ${isActive('/')}`}>
            <LayoutDashboard size={30} />
            Dashboard
          </Link>
          <Link to="/transacoes" className={`flex items-center gap-3 p-3 rounded-lg transition ${isActive('/transacoes')}`}>
            <ArrowLeftRight size={30} />
            Transações
          </Link>
          <Link to="/analises" className={`flex items-center gap-3 p-3 rounded-lg transition ${isActive('/analises')}`}>
            <PieChart size={30} />
            Análises
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-800 text-xs text-gray-500 text-center">
          v1.0.0 - .NET Connected
        </div>
      </aside>

      {/* CONTEÚDO À DIREITA */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* IMPORTANTE: O Outlet é onde as páginas (Dashboard/Transacoes) aparecem */}
          <Outlet />
        </div>
      </main>
    </div>
  );
}