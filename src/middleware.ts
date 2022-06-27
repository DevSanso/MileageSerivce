import bodyParser from 'koa-bodyparser';
import db from './middleware/db-conn';



export default {
    bodyParser : bodyParser,
    db : db
}