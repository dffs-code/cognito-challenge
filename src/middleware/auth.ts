import Koa from 'koa';
import * as jwt from 'jsonwebtoken';

export const authMiddleware = async (ctx: Koa.Context, next: Koa.Next) => {
  const token = ctx.headers.authorization?.split(' ')[1];

  if (!token) {
    ctx.status = 401;
    ctx.body = 'Token não fornecido';
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.COGNITO_USER_POOL_ID!);
    ctx.state.user = decoded;
    await next();
  } catch (err) {
    ctx.status = 401;
    ctx.body = 'Token inválido';
  }
};
