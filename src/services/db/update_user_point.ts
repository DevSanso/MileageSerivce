import Koa from 'koa';

import RequestBody from '../../api/body/event';


import UserDao from '../../dao/user';
import DaoTxController from '../../middleware/type/dao-tx-controller';

import '../../utils/extend/koa/context_dao';


const updateDbUserPointService = async (ctx : Koa.Context) => {
    const body = ctx.request.body as RequestBody;
    const daoTx = await ctx.daoProvider.user(true) as DaoTxController<UserDao>;
    try {
        await daoTx.dao().updateUserPoint(body.userId);
    }catch(e) {
        daoTx.rollback();
        throw e;
    }
}

export default updateDbUserPointService;