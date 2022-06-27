import bodyParser from 'koa-bodyparser';
import db from './middleware/db-conn';
import connRelease from './middleware/db-conn-release';
import daoProvider from './middleware/dao-provider';


export default {
    bodyParser : bodyParser,
    db : db,
    connRelease : connRelease,
    daoProvider : daoProvider
}