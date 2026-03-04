export const TransactionType = {
  Revenue: 0,
  Expense: 1
} as const;

export type TransactionType = typeof TransactionType[keyof typeof TransactionType];

export interface Category {
  id: string; // Guid no .NET
  name: string;
  icon: string;
  color: string;
}

export interface BankAccount {
  id: string;
  name: string;
  balance: number;
  type: 'Checking' | 'Savings' | 'Investment';
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string; // ISO Date do SQL Server
  type: TransactionType;
  categoryId: string;
  bankAccountId: string;
  // Propriedades de navegação (opcionais no DTO)
  category?: Category;
  bankAccount?: BankAccount;
}