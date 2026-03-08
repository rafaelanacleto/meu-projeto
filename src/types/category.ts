export interface Category {
    id: number;
    nome: string;
    descricao?: string;
    tipo: 'Receita' | 'Despesa'; // Assuming TipoTransacao is a string enum with these values
    ativo: boolean;
}