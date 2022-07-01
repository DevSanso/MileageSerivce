import {ExtendContext} from '../../utils/extend/koa/context';

const existUserReivewInPlaceService = async (ctx : ExtendContext,userId : string,placeId : string) => {
    const dao = await ctx.daoProvider.review();
    const res = await dao.existUserReviewFromPlace(userId,placeId);
    return res;
}

export default existUserReivewInPlaceService;