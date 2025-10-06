import { z } from "zod";

/**
 * @swagger
 * components:
 *   schemas:
 *     PontoCultural:
 *       type: object
 *       required:
 *         - nome
 *         - latitude
 *         - longitude
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nome:
 *           type: string
 *           example: "Museu da Cidade"
 *         descricao:
 *           type: string
 *           example: "Espaço de exposições e eventos culturais"
 *         latitude:
 *           type: number
 *           example: -3.71722
 *         longitude:
 *           type: number
 *           example: -38.5434
 *         criadoEm:
 *           type: string
 *           format: date-time
 *           example: "2025-10-03T12:00:00Z"
 *         usuarioId:
 *           type: integer
 *           example: 2
 */

// Schema para criação
export const criarPontoCulturalSchema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  descricao: z.string().optional(),
  latitude: z.number(),
  longitude: z.number(),
  usuarioId: z.number().int().optional(),
});

// Schema para atualização (todos campos opcionais)
export const atualizarPontoCulturalSchema = criarPontoCulturalSchema.partial();