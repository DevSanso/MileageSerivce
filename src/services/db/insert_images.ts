import {ExtendContext} from '../../utils/extend/koa/context';


const  insertPointPlusLogService = async (ctx : ExtendContext,reviewId : string,images : Array<string>) => {
    const dao = ctx.daoProvider.review();
    for(let i =0;i<images.length;i++)
        await dao.insertReviewContent(reviewId,images[i]);
}

export default insertPointPlusLogService;
