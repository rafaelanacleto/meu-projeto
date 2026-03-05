import { z } from 'zod';

export const transactionSchema = z.object({
  description: z.string().min(3, "A descrição deve ter pelo menos 3 caracteres"),
  amount: z.number().positive("O valor deve ser maior que zero"),
  date: z.string().nonempty("A data é obrigatória"),
  type: z.enum(['0', '1']), // 0: Receita, 1: Despesa
  categoryId: z.string().uuid("Selecione uma categoria válida"),
  bankAccountId: z.string().uuid("Selecione uma conta válida"),
});

export type TransactionFormData = z.infer<typeof transactionSchema>;