import mysql from 'mysql2/promise'
import ReviewDao from '../../../dao/review';
import UserDao from '../../../dao/user';

declare module "koa" {
    interface Context {
        daoProvider : {
            review : ()=> ReviewDao
            user : () => UserDao
        }
    }
}