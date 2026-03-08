import React from "react";
import { useCategory } from "../hooks/useCategory";

export function CategoryList() {
  const { categories, isLoading } = useCategory();

  if (isLoading) {
    return <p className="p-4 text-gray-500">Carregando categorias...</p>;
  }

  if (!categories || categories.length === 0) {
    return <p className="p-4 text-gray-500">Nenhuma categoria encontrada.</p>;
  }

  return (
    <div className="w-full bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-4 py-5 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">Categorias</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-gray-50/50 text-gray-400 text-[10px] uppercase tracking-wider">
              <th className="py-3 px-4 font-medium">Nome / Descrição</th>
              <th className="py-3 px-4 font-medium text-center">Tipo</th>
              <th className="py-3 px-4 font-medium text-center">Status</th>
              <th className="py-3 px-4 font-medium text-right">ID</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4">
                  <p className="font-medium text-gray-800">{category.nome}</p>
                  <p className="text-xs text-gray-400">
                    {category.descricao || "Sem descrição"}
                  </p>
                </td>
                <td className="py-4 px-4 text-center">
                  <span
                    className={`text-[10px] uppercase px-2 py-1 rounded-full font-bold ${
                      category.tipo === "Receita"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {category.tipo}
                  </span>
                </td>
                <td className="py-4 px-4 text-center">
                  <div className="flex justify-center">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        category.ativo ? "bg-green-500" : "bg-gray-300"
                      }`}
                      title={category.ativo ? "Ativo" : "Inativo"}
                    />
                  </div>
                </td>
                <td className="py-4 px-4 text-right text-xs text-gray-400 font-mono">
                  #{category.id}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}