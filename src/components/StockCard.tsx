import { useStockPrice } from '../hooks/useInvestments';

export function StockCard({ ticker }: { ticker: string }) {
  const { data, isLoading, error } = useStockPrice(ticker);

  if (isLoading) return <div className="animate-pulse bg-gray-800 h-24 rounded-xl border border-gray-700"></div>;
  
  if (error) return <div className="bg-red-900/20 p-4 rounded-xl border border-red-900/50 text-red-500 text-xs">Erro ao carregar {ticker}</div>;

  return (
    <div className="bg-[#1e1e1e] p-4 rounded-xl border border-gray-800 flex justify-between items-center hover:border-blue-500/50 transition-colors cursor-default">
      <div>
        <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest">{ticker}</p>
        <p className="text-2xl font-mono font-bold text-white">
          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data?.regularMarketPrice || 0)}
        </p>
      </div>
      <div className={`px-2 py-1 rounded text-xs font-bold ${data?.regularMarketChangePercent > 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
        {data?.regularMarketChangePercent > 0 ? '↑' : '↓'} {Math.abs(data?.regularMarketChangePercent || 0).toFixed(2)}%
      </div>
    </div>
  );
}