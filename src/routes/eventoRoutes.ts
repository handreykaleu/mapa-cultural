import { Router } from 'express';
import * as eventoController from '../controllers/eventoController';
import { validateBody } from '../middlewares/validacaoMiddleware';
import { criarEventoSchema, atualizarEventoSchema } from '../schemas/eventoSchema';

const router = Router();

/**
 * @swagger
 * /eventos:
 *    post:
 *     summary: Cria um novo evento
 *     tags: [Eventos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - descricao
 *               - data
 *               - localId
 *             properties:
 *               nome:
 *                type: string
 *               descricao:
 *                type: string
 *               data: {
 *                type: string, format: date-time}
 *               localId:
 *                type: integer
 *     responses:
 *       201:
 *         description: Evento criado com sucesso
 */
router.post('/', validateBody(criarEventoSchema), eventoController.createEvento);

/**
 * @swagger
 * /eventos:
 *   get:
 *     summary: Retorna a lista de todos os eventos
 *     tags: [Eventos]
 *     responses:
 *       200:
 *         description: Lista de eventos
 */
router.get('/', eventoController.getAllEvento);

/**
 * @swagger
 * /eventos/{id}:
 *   get:
 *     summary: Retorna um evento específico pelo ID
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do evento
 *     responses:
 *       200:
 *         description: Evento encontrado
 *       404:
 *         description: Evento não encontrado
 */
router.get('/:id', eventoController.getEventoById);

/**
 * @swagger
 * /eventos/{id}:
 *   put:
 *     summary: Atualiza os dados de um evento
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               nome:
 *                type: string
 *               descricao:
 *                type: string
 *               data: {
 *                type: string, format: date-time}
 *               localId:
 *                type: integer
 *     responses:
 *       200:
 *         description: Evento atualizado com sucesso
 *       404:
 *         description: Evento não encontrado
 */
router.put('/:id', validateBody(atualizarEventoSchema), eventoController.updateEvento);

/**
 * @swagger
 * /eventos/{id}:
 *   delete:
 *     summary: Remove um evento existente
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Evento deletado com sucesso
 *       404:
 *         description: Evento não encontrado
 */
router.delete('/:id', eventoController.deleteEvento);

export default router;
