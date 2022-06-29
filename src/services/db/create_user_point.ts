import Koa from 'koa';

import {UserRequestBody} from '../../api/body/select';


import UserDao from '../../dao/user';



const createUserPointService = async (ctx : Koa.Context,userId : string) => {
    const dao = await ctx.daoProvider.user();
    await dao.createUserPoint(userId);
}

export default createUserPointService;