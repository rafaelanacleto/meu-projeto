import CategoryList from '../components/CategoryList';

export default function CategoryPage() {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Categorias</h1>
            <CategoryList categorias={[ { id: 1, nome: "Categoria 1", descricao: "Descrição da Categoria 1", tipo: 1 } , { id: 2, nome: "Categoria 2", descricao: "Descrição da Categoria 2", tipo: 2 } ]} />
        </div>
    );
}