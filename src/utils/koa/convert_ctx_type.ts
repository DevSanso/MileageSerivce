import {Context} from 'koa';



export const convertCtxType = <T>(ctx : T) : Context => (ctx as unknown) as Context;
