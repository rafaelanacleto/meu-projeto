import { z } from 'zod';

export const transactionSchema = z.object({
  descricao: z.string().min(3, "Descrição muito curta"),
  valor: z.number().gt(0, "O valor deve ser maior que zero"),
  dataVencimento: z.string().min(1, "Data é obrigatória"),
  // Defina como número puro para bater com o TransactionFormData
  tipo: z.number(), 
  status: z.coerce.number().default(1), // Adicione o status padrão para o .NET
  categoriaId: z.coerce.number(), // Mude para number se o C# espera int
  contaBancariaId: z.coerce.number(), // Mude para number se o C# espera int
  observacao: z.string().optional(),
});

export type TransactionFormData = z.infer<typeof transactionSchema>;