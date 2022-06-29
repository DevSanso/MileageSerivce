import ReviewDao from '../../../dao/review';
import UserDao from '../../../dao/user';
import LogDao from '../../../dao/log';

declare module "koa" {
    interface Context {
        daoProvider : {
            review : ()=> ReviewDao
            user : () => UserDao
            log : () => LogDao
        }
    }
}



