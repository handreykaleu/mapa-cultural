import { Router } from 'express';
import * as usuarioController from '../controllers/usuarioController';
import { validateBody } from '../middlewares/validacaoMiddleware';
import { 
    criarUsuarioSchema, 
    atualizarUsuarioSchema 
} from '../schemas/usuarioSchema';

const router = Router();

/**
 * @swagger
 * /usuarios:
 *     post:
 *       summary: Cria um novo usuário
 *       tags: [Usuarios]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - nome
 *                 - email
 *                 - senha
 *               properties:
 *                 nome:
 *                  type: string
 *                 email:
 *                  type: string
 *                 senha:
 *                  type: string
 *       responses:
 *         201:
 *           description: Usuário criado com sucesso
 */
router.post('/usuarios', validateBody(criarUsuarioSchema), usuarioController.createUsuario);

/**
 * @swagger
 * /usuarios:
 *     get:
 *       summary: Retorna a lista de todos os usuários
 *       tags: [Usuarios]
 *       responses:
 *         200:
 *           description: Lista de usuários
 */
router.get('/usuarios', usuarioController.getAllUsuarios);

/**
 * @swagger
 * /usuarios/{id}:
 *     get:
 *       summary: Retorna um usuário por ID
 *       tags: [Usuarios]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: integer
 *       responses:
 *         200:
 *           description: Usuário encontrado
 *         404:
 *           description: Usuário não encontrado
 */
router.get('/usuarios/:id', usuarioController.getUsuarioById);

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Atualiza um usuário
 *     tags: [Usuarios]
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
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.put('/usuarios/:id', validateBody(atualizarUsuarioSchema), usuarioController.updateUsuario);


/**
 * @swagger
 * /usuarios/{id}:
 *     delete:
 *       summary: Remove um usuário
 *       tags: [Usuarios]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: integer
 *       responses:
 *         204:
 *           description: Usuário deletado com sucesso 
 *         404:
 *           description: Usuário não encontrado
 */
router.delete('/usuarios/:id', usuarioController.deleteUsuario);

export default router;