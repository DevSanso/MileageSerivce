import Koa from 'koa';

import RequestBody from '../../api/body/event';


import UserDao from '../../dao/user';
import DaoTxController from '../../middleware/type/dao-tx-controller';




const updateDbUserPointService = async (ctx : Koa.Context) => {
    const body = ctx.request.body as RequestBody;
    const daoTx = await ctx.daoProvider.user(true) as DaoTxController<UserDao>;
    try {
        await daoTx.dao().updateUserPoint(body.userId);
    }catch(e) {
        daoTx.rollback();
        throw e;
    }
    daoTx.commit();
}

export default updateDbUserPointService;