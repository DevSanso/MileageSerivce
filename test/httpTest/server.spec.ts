import http from 'http';
import {uuid} from 'uuidv4';
import axios from 'axios';
const dbConfig = require( '../../assets/test/dbConfig.json');

process.env.DATABASE_HOST = dbConfig.host;
process.env.DATABASE_PORT = dbConfig.port;
process.env.DATABASE_USER = dbConfig.user;
process.env.DATABASE_PASSWORD = dbConfig.password;
process.env.DATABASE_DBNAME = dbConfig.dbName;


import App from '../../src/app';



import {makeBasicRandomEventBody, makeRandomEventBody} from '../util/mock/body';
import {onlyDaoContext}  from '../util/mock/context';
import deleteAllData from '../util/deleteAll';
import dbPoolGen from "../util/db";

import { expect } from 'chai';


describe("http 서버 테스트",()=>{

    const pool = dbPoolGen();
    const conn =  pool.getConnection();
    const onlyDaoCtx = onlyDaoContext(conn);
    const port = 3000;
    const server = http.createServer(App.callback());
    before(()=> {
        server.listen(3000);
    });
    
    describe("Post 처리 Test",() => {
        const request = makeRandomEventBody("hello world");
        it("/events Add 처리 Test",async () => {
            const res = await axios.post("http://localhost:3000/events",request);
            expect(res.status).to.equal(201);
            const dbTuple = onlyDaoCtx.daoProvider.review().selectReview(request.reviewId);
            expect(dbTuple).to.not.equal(null);
        })
        it("/events 중복 에러 처리 Test",async () => {
            const res = await axios.post("http://localhost:3000/events",request,{validateStatus : () => true});
            expect(res.status).to.equal(400);
            expect(res.data).to.equal("already exist user review");
        })

        it("/events mod 액션 이미지 수정 Test",async () => {

            const basic = makeBasicRandomEventBody("MOD") as any;
            basic.reviewId = request.reviewId;
            basic.placeId = request.placeId;
            basic.userId = request.userId;

            basic["attachedPhotoIds"] = [uuid(),uuid(),uuid(),uuid()]; 
            const res = await axios.post("http://localhost:3000/events",basic);
            const tuple = await onlyDaoCtx.daoProvider.review().selectReviewContent(request.reviewId);
            expect(tuple?.length).to.equal(4);
        })
        it("/events mod 액션 comment 내용 수정 Test",async () => {

            const basic = makeBasicRandomEventBody("MOD") as any;
            basic.reviewId = request.reviewId;
            basic.placeId = request.placeId;
            basic.userId = request.userId;

            basic["content"] = "hello you"; 
            const res = await axios.post("http://localhost:3000/events",basic);
            const tuple = await onlyDaoCtx.daoProvider.review().selectReview(request.reviewId);
            expect(tuple?.comment).to.equal("hello you");
        })

        it("모든 테이블 튜플 삭제",async() => {
            await deleteAllData(await conn);
        })
    });

    describe("Get 처리 Test",()=> {
        const request = makeRandomEventBody("hello world");
        it("리뷰 생성",async() => {
            const res = await axios.post("http://localhost:3000/events",request);
        });
        it("/point/user 처리 Test",async()=> {
            const url = `http://localhost:${port}/point/user?userId=${request.userId}`;
            const res = await axios.get(url);
            expect(res.status).to.equal(200);
            expect(res.data.point).to.equal(3); 
        });
    
        it("/point/review 처리 Test",async()=> {
            const url =`http://localhost:${port}/point/review?reviewId=${request.reviewId}`;
            const res = await axios.get(url);
            expect(res.status).to.equal(200);
            expect(res.data.point).to.equal(3); 
        });
    
        it("/point/log/plus 처리 Test",async()=> {
            const url =`http://localhost:${port}/point/log/plus`;
            const res = await axios.get(url);
            expect(res.status).to.equal(200);
            expect(res.data.length).to.equal(1); 
            const element = res.data[0];
            expect(element.reviewId).to.equal(request.reviewId);
        });

        describe("Delete 처리 Test",()=> {
            const request = makeRandomEventBody("hello world to");
            it("/events Add 처리 Test",async () => {
                const res = await axios.post("http://localhost:3000/events",request);
                expect(res.status).to.equal(201);
                const dbTuple = onlyDaoCtx.daoProvider.review().selectReview(request.reviewId);
                expect(dbTuple).to.not.equal(null);
            })
            it("/events delete 리뷰 삭제 Test",async () => {
                request.action = "DELETE";
                await axios.post("http://localhost:3000/events",request);
                const dbTuple = await onlyDaoCtx.daoProvider.review().selectReview(request.reviewId);
                expect(dbTuple).to.equal(null);
            });
        });
        it("모든 테이블 튜플 삭제",async() => {
            await deleteAllData(await conn);
        })
    });

   


    
});