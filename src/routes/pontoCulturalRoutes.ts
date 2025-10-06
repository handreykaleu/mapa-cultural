import { Router } from 'express';
import * as pontoController from '../controllers/pontoCulturalController';
import { validateBody } from '../middlewares/validacaoMiddleware';
import { criarPontoCulturalSchema, atualizarPontoCulturalSchema } from '../schemas/pontoCulturalSchema';

const router = Router();

/**
 * @swagger
 * /pontos:
 *   post:
 *     summary: Cria um novo ponto cultural
 *     tags: [PontosCulturais]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - descricao
 *               - latitude
 *               - longitude
 *               - usuarioId
 *             properties:
 *               nome:
 *                type: string
 *               descricao:
 *                type: string
 *               latitude:
 *                type: number
 *               longitude:
 *                type: number
 *               usuarioId:
 *                type: integer
 *     responses:
 *       201:
 *         description: Ponto cultural criado com sucesso
 */
router.post('/pontosCulturais', validateBody(criarPontoCulturalSchema), pontoController.createPonto);

/**
 * @swagger
 * /pontos:
 *   get:
 *     summary: Retorna a lista de todos os pontos culturais
 *     tags: [PontosCulturais]
 *     responses:
 *       200:
 *         description: Lista de pontos culturais
 */
router.get('/pontosCulturais', pontoController.getAllPontos);

/**
 * @swagger
 * /pontos/{id}:
 *   get:
 *     summary: Retorna um ponto cultural por ID
 *     tags: [PontosCulturais]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do ponto cultural
 *     responses:
 *       200:
 *         description: Ponto cultural encontrado
 *       404:
 *         description: Ponto cultural não encontrado
 */
router.get('/pontosCulturais/:id', pontoController.getPontoById);

/**
 * @swagger
 * /pontos/{id}:
 *   put:
 *     summary: Atualiza um ponto cultural
 *     tags: [PontosCulturais]
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
 *             type: object
 *             properties:
 *               nome:
 *                type: string
 *               descricao:
 *                type: string
 *               latitude:
 *                type: number
 *               longitude:
 *                type: number
 *               usuarioId:
 *                type: integer
 *     responses:
 *       200:
 *         description: Ponto cultural atualizado com sucesso
 *       404:
 *         description: Ponto cultural não encontrado
 */
router.put('/pontosCulturais/:id', validateBody(atualizarPontoCulturalSchema), pontoController.updatePonto);

/**
 * @swagger
 * /pontos/{id}:
 *   delete:
 *     summary: Remove um ponto cultural
 *     tags: [PontosCulturais]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Ponto cultural deletado com sucesso
 *       404:
 *         description: Ponto cultural não encontrado
 */
router.delete('/pontosCulturais/:id', pontoController.deletePonto);

export default router;
