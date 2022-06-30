import {ExtendContext} from '../../utils/extend/koa/context';

const deleteReviewService = async (ctx : ExtendContext,reviewId : string) => {
    const conn = await ctx.dbPoolConn;
    const dao = ctx.daoProvider.review();

    try {
        await conn.beginTransaction();
        await dao.deleteReview(reviewId);
        await conn.commit();
    }catch(e) {
        conn.rollback();
        throw e;
    }
}

export default deleteReviewService;
