import Router from 'koa-router';
import { authMiddleware } from '../middleware/auth';
import { userController } from '../controllers';

const router = new Router();

router.post('/auth', userController.auth)

router.get('/me', authMiddleware, async (ctx) => {
  ctx.body = ctx.state.user;
});

router.put('/edit-account', authMiddleware, userController.editAccount);

router.get('/users', authMiddleware, userController.allUsers);

export default router;
