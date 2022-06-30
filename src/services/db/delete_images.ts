import {ExtendContext} from '../../utils/extend/koa/context';

const deleteImagesService = async (ctx : ExtendContext,reviewId : string) => {
    const conn = await ctx.dbPoolConn;
    const dao = ctx.daoProvider.review();

    try {
        await conn.beginTransaction();
        await dao.deleteImages(reviewId);
        await conn.commit();
    }catch(e) {
        conn.rollback();
        throw e;
    }
}

export default deleteImagesService;
