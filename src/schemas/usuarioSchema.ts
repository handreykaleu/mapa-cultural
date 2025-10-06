import { z } from 'zod';

export const criarUsuarioSchema = z.object({
  body: z.object({
    nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    email: z.string().email("Email inválido"),
    cpf: z.string().length(11, "CPF deve ter 11 dígitos"),
    senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    segmento_cultural: z.string().min(3),
  }),
});

export const atualizarUsuarioSchema = criarUsuarioSchema.partial();