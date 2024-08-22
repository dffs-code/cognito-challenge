import Router from 'koa-router';
import { authMiddleware } from '../middleware/auth';
import { userController } from '../controllers';

const router = new Router();

router.post('/auth', userController.auth);
router.get('/me', authMiddleware, userController.me);
router.put('/edit-account', authMiddleware, userController.editAccount);
router.get('/users', authMiddleware, userController.allUsers);
router.post('/confirm', userController.confirm);

export default router;
