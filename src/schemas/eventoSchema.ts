import { z } from "zod";

/**
 * @swagger
 * components:
 *   schemas:
 *     Evento:
 *       type: object
 *       required:
 *         - nome
 *         - data_inicio
 *         - local
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nome:
 *           type: string
 *           example: "Festival de Música Popular"
 *         descricao:
 *           type: string
 *           example: "Evento cultural com artistas locais"
 *         data_inicio:
 *           type: string
 *           format: date-time
 *           example: "2025-11-10T18:00:00Z"
 *         data_fim:
 *           type: string
 *           format: date-time
 *           example: "2025-11-12T23:00:00Z"
 *         local:
 *           type: string
 *           example: "Praça Central"
 *         usuarioId:
 *           type: integer
 *           example: 3
 */

// ✅ Schema de criação de evento
export const criarEventoSchema = z.object({
  nome: z.string().min(3, "O nome do evento deve ter pelo menos 3 caracteres"),
  descricao: z.string().optional(),
  data_inicio: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Data de início inválida",
  }),
  data_fim: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "Data de fim inválida",
    }),
  localId: z.number().int("O ID do local deve ser um número inteiro"),
  usuarioId: z.number().int().optional(),
});

// ✅ Schema de atualização de evento
export const atualizarEventoSchema = criarEventoSchema.partial();