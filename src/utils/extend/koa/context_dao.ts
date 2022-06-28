import mysql from 'mysql2/promise'
import ReviewDao from '../../../dao/review';
import UserDao from '../../../dao/user';


type DaoTxController<T> = {
    rollback : () => Promise<void>
    commit : () => Promise<void>
    dao : () => T
}

declare module "koa" {
    interface Context {
        daoProvider : {
            review : (isTx : boolean)=> Promise<ReviewDao | DaoTxController<ReviewDao>>
            user : (isTx : boolean) => Promise<UserDao | DaoTxController<UserDao>>
        }
    }
}