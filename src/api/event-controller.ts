import Router from 'koa-router';

import BodyType from './body/event';
const controller = new Router();



controller.post("review-event","/events",(ctx,next)=> {
    const requestBody : BodyType = ctx.request.body;
    
}) ;


export default controller;


