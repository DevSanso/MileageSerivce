import mysql from 'mysql2/promise';
import Koa from 'koa';

import {ErrorObject, ErrorType} from './type/error-object';

const castErrorObject = (e : unknown) : ErrorObject => {
    if(e instanceof ErrorObject)
        return e as ErrorObject;

    return new ErrorObject(ErrorType.Unknown,"unknown",500,JSON.stringify(e));
};

const print = async (e : ErrorObject) => {
    const t = (() => {
        if (e.type == ErrorType.Request)return "User Reuquest";
        else if(e.type == ErrorType.System)return "System";
        else if(e.type == ErrorType.DB)return "DataBase";

        return "unknown";
    })();

    console.log(`Error => date : ${(new Date().toString())} , `+
    `location : ${e.crashPlace} , type : ${t} , status : ${e.code}, message : ${e.message}`);
};

const middleware  = async (ctx : Koa.Context,next : Koa.Next) => {
    try {
        await next();
    }catch(e) {
        const err = castErrorObject(e);
        print(err);
        ctx.status = err.code;
        let message = "";
        if(err.type == ErrorType.Request) {
            message = err.message;
        }
        ctx.body = message;
    }
};

export default middleware;