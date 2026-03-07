import React from "react";

type Categoria = {
    id: number;
    nome: string;
    descricao: string;
    tipo: number;
};

type CategoryListProps = {
    categorias: Categoria[];
};

const tipoLabel = (tipo: number) => {
    switch (tipo) {
        case 1:
            return "Tipo 1";
        default:
            return `Tipo ${tipo}`;
    }
};

export default function CategoryList({ categorias }: CategoryListProps) {
    if (!categorias?.length) {
        return <p>Nenhuma categoria encontrada.</p>;
    }

    return (
        <div>
            <h2>Lista de Categorias</h2>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: "8px" }}>ID</th>
                        <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: "8px" }}>Nome</th>
                        <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: "8px" }}>Descrição</th>
                        <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: "8px" }}>Tipo</th>
                    </tr>
                </thead>
                <tbody>
                    {categorias.map((categoria) => (
                        <tr key={categoria.id}>
                            <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>{categoria.id}</td>
                            <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>{categoria.nome}</td>
                            <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>{categoria.descricao}</td>
                            <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>{tipoLabel(categoria.tipo)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}