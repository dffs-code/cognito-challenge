import Koa from 'koa';
import router from './routes/index';
import { bodyParser } from '@koa/bodyparser';

export const app = new Koa();
app.use(bodyParser());
app.use(router.routes())