import { CategoryForm } from '../components/CategoryForm';
import { CategoryList } from '../components/CategoryList';

export default function CategoryPage() {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Categorias</h1>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <CategoryForm />
            </div>
            <hr className="mb-6 mt-6 border-gray-200" />
            <CategoryList />
        </div>
    );
}