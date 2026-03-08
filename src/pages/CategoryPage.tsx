import { CategoryList } from '../components/CategoryList';

export default function CategoryPage() {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Categorias</h1>
            <hr className="mb-6 border-gray-200" />
            <CategoryList />
        </div>
    );
}