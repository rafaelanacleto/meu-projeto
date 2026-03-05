export function DividendForm() {
  // ... lógica similar ao TransactionForm ...
  return (
    <form className="space-y-4 bg-[#1e1e1e] p-6 rounded-xl border border-gray-800">
      <h3 className="text-blue-500 font-bold mb-4">Registrar Provento</h3>
      
      <div>
        <label className="text-[10px] text-gray-500 uppercase">Ativo (Ticker)</label>
        <select className="w-full bg-[#121212] border border-gray-800 p-2 rounded text-sm">
          <option value="MXRF11">MXRF11</option>
          <option value="KNRI11">KNRI11</option>
          <option value="XPML11">XPML11</option>
          <option value="GGRC11">GGRC11</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-[10px] text-gray-500 uppercase">Valor por Cota</label>
          <input type="number" step="0.01" className="w-full bg-[#121212] border border-gray-800 p-2 rounded text-sm" />
        </div>
        <div>
          <label className="text-[10px] text-gray-500 uppercase">Quantidade</label>
          <input type="number" className="w-full bg-[#121212] border border-gray-800 p-2 rounded text-sm" />
        </div>
      </div>

      <button className="w-full bg-green-600 p-2 rounded font-bold hover:bg-green-700 transition">
        Salvar Rendimento
      </button>
    </form>
  );
}