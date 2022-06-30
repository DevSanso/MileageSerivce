import Koa from 'koa';
import controllers from './api';
import middleware from './middleware';

import {ExtendContext} from './utils/extend/koa/context';


const app = new Koa<ExtendContext>();

app.use(middleware.bodyParser);
app.use(middleware.db);
app.use(middleware.connRelease);
app.use(middleware.daoProvider);
app.use(middleware.error);

app.use(controllers.event.routes());
app.use(controllers.point.routes());

export default app;