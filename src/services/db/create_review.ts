import {ExtendContext} from '../../utils/extend/koa/context';

import RequestBody from '../../api/body/event';


type ServiceArgsType = Omit<RequestBody,"action" | "type" >;


const createReviewService = async (ctx : ExtendContext,args : ServiceArgsType) => {
    const dao = ctx.daoProvider.review();
    const daoFlag = ctx.daoProvider.reviewPointFlag();

    await dao.insertReview(args);
    await daoFlag.createReviewPointFlag(args.reviewId);
}

export default createReviewService;