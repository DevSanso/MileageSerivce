import {ExtendContext} from '../utils/extend/koa/context';

import nonTxDeleteReviewService from './db/delete_review';

const deleteReviewService = async (ctx : ExtendContext,reviewId : string) => {
    const conn = await ctx.dbPoolConn;
    try {
        await conn.beginTransaction();
        await nonTxDeleteReviewService(ctx,reviewId);
        await conn.commit();
    }catch(e) {
        conn.rollback();
        throw e;
    }
};

export default deleteReviewService;