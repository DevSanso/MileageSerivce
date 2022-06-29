import {ExtendContext} from '../utils/extend/koa/context';

import updateUserPointService from './db/update_user_point';
import selectUserPointService from './db/select_user_point';


const getUserPointService = async (ctx : ExtendContext,userId : string) => {
    return await selectUserPointService(ctx,userId);  
}

export default  getUserPointService;


