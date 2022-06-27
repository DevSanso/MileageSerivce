import Router from 'koa-router';

import {UserRequestBody,PlaceRequestBody} from './body/select';

const controller = new Router();

controller.post("select-point","/point/user",(ctx,next)=> {
    const requestBody : UserRequestBody = ctx.request.body;
});

controller.post("select-point","/point/place",(ctx,next)=> {
    const requestBody : PlaceRequestBody = ctx.request.body;
}) ;


controller.post("select-point","/point/review",(ctx,next)=> {
    const requestBody : PlaceRequestBody = ctx.request.body;
}) ;

export default controller;

