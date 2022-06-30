import {ExtendContext} from '../../utils/extend/koa/context';

const deleteReviewService = async (ctx : ExtendContext,reviewId : string) => {
    const dao = ctx.daoProvider.review();
    await dao.deleteReview(reviewId);
}

export default deleteReviewService;
