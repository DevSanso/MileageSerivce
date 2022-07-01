import {ExtendContext} from '../utils/extend/koa/context';

import updateUserPointService from './db/update_user_point';
import selectUserPointService from './db/select_user_point';

/**
 * user_point 조회후 , 해당 값 리턴하는 서비스
 * @param ctx 
 * koa 커스텀 컨텍스트, dao , db 커넥션 접근을 위해 사용
 * @param userId 
 * 유저 uuid 값
 * @returns 
 *  models/UserPoint
 */
const getUserPointService = async (ctx : ExtendContext,userId : string) => {
    const conn = await ctx.dbPoolConn;
    try {
        await conn.beginTransaction();
        //호출 시점에 유저 포인트 업데이트
        await updateUserPointService(ctx,userId);
        await conn.commit();
    }catch(e) {
        conn.rollback();
        throw e;
    }
    //유저 포인트 조회
    return await selectUserPointService(ctx,userId);  
}

export default  getUserPointService;


