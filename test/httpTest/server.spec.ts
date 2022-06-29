import http from 'http';

import axios from 'axios';
const dbConfig = require( '../../assets/test/dbConfig.json');

process.env.DATABASE_HOST = dbConfig.host;
process.env.DATABASE_PORT = dbConfig.port;
process.env.DATABASE_USER = dbConfig.user;
process.env.DATABASE_PASSWORD = dbConfig.password;
process.env.DATABASE_DBNAME = dbConfig.dbName;


import App from '../../src/app';



import {makeRandomEventBody} from '../util/mock/body';
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
    const request = makeRandomEventBody("hello world");
    it("Post /events 처리 Test",async () => {

        const res = await axios.post("http://localhost:3000/events",request);
        expect(res.status).to.equal(200);
        const dbTuple = onlyDaoCtx.daoProvider.review().selectReview(request.reviewId);
        expect(dbTuple).to.not.equal(null);
    })

    it("Get /point/user 처리 Test",async()=> {
        const url = `http://localhost:${port}/point/user?userId=${request.userId}`;
        const res = await axios.get(url);
        expect(res.status).to.equal(200);
        expect(res.data.point).to.equal(3); 
    });

    it("Get /point/review 처리 Test",async()=> {
        const url =`http://localhost:${port}/point/review?reviewId=${request.reviewId}`;
        const res = await axios.get(url);
        expect(res.status).to.equal(200);
        expect(res.data.point).to.equal(3); 
    });


    it("모든 테이블 튜플 삭제 Test",async() => {
        //await deleteAllData(await conn);
    })
});