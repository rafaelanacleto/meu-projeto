export interface Transaction {
  id?: string;
  descricao: string;
  valor: number;
  dataVencimento: string;
  dataPagamento?: string;
  tipo: 0 | 1; // 0: Receita, 1: Despesa
  categoriaId: number;
  contaBancariaId: number;
  status?: number; // Adicione o status opcional
  createdAt?: string;
  updatedAt?: string;
  observacao?: string;
}