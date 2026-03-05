export interface Transaction {
  id?: string;
  description: string;
  amount: number;
  date: string;
  type: '0' | '1'; // 0: Receita, 1: Despesa
  categoryId: string;
  bankAccountId: string;
}