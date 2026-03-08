import { z } from 'zod';

export const categorySchema = z.object({
  nome: z.string().min(3, "Nome muito curto"),
  descricao: z.string().optional(),
  tipo: z.enum(['Receita', 'Despesa'], "Tipo deve ser 'Receita' ou 'Despesa'"),
  ativo: z.boolean().default(true), // Adicione um valor padrão para ativo
});

export type CategoryFormData = z.infer<typeof categorySchema>;