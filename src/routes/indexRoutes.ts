import { Router } from 'express';
import pontoCulturalRoutes from './pontoCulturalRoutes';
import usuarioRoutes from './usuarioRoutes';
import eventoRoutes from './eventoRoutes';

const router = Router();

router.use('/pontosCulturais', pontoCulturalRoutes);
router.use('/usuarios', usuarioRoutes);
router.use('/eventos', eventoRoutes);

export default router;