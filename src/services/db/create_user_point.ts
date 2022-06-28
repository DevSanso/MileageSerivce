import Koa from 'koa';

import {UserRequestBody} from '../../api/body/select';


import UserDao from '../../dao/user';
import DaoTxController from '../../middleware/type/dao-tx-controller';


const createUserPointService = async (ctx : Koa.Context) => {
    const body = ctx.request.body as Pick<UserRequestBody,"userId">;
    const daoTx = await ctx.daoProvider.user(true) as DaoTxController<UserDao>;
    try {
        await daoTx.dao().createUserPoint(body.userId);
    }catch(e) {
        daoTx.rollback();
        throw e;
    }
    daoTx.commit();
}

export default createUserPointService;