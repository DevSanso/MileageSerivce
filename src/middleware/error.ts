import mysql from 'mysql2/promise';
import Koa from 'koa';

import {ErrorObject, ErrorType} from './type/error-object';

const castErrorObject = (e : unknown) : ErrorObject => {
    if(e instanceof ErrorObject)
        return e as ErrorObject;

    return new ErrorObject(ErrorType.Unknown,500,JSON.stringify(e));
}

const middleware  = async (ctx : Koa.Context,next : Koa.Next) => {
    try {
        await next();
    }catch(e) {
        const err = castErrorObject(e);
        if(err.type == ErrorType.Request) {
            ctx.status = err.code;
            ctx.body = err.message;
        }
    }

    await next();
};

export default middleware;