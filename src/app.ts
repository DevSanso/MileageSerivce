import Koa from 'koa';
import controllers from './api';
import middleware from './middleware';

const app = new Koa();

app.use(middleware.bodyParser);
app.use(middleware.db);


app.use(controllers.event.routes());
app.use(controllers.select.routes());

export default app;