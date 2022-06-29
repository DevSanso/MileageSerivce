import {expect} from 'chai';
import mysql from 'mysql2/promise';
import {uuid} from 'uuidv4';



import addReviewService from '../../src/services/add_review';
import getUserPointService from '../../src/services/get_user_point';
import selectAllPointPlusLogService from '../../src/services/db/select_all_point_plus_log';

import {onlyDaoContext} from '../util/mock/context';
import dbPoolGen from "../util/db";
import deleteAllData from '../util/deleteAll';
import {makeRandomEventBody} from '../util/mock/body';
import Review from '../../src/models/review';
import ReviewPointFlag from '../../src/models/review_point_flag';
import UserPoint from '../../src/models/user_point';
import RequestBody from '../../src/api/body/event';


let conn : Promise<mysql.PoolConnection>

describe("서비스 test",()=> {
    const pool = dbPoolGen();
    conn =  pool.getConnection();
    const onlyDaoCtx = onlyDaoContext(conn);
    const firstBody = makeRandomEventBody("hello world");

    describe("addReview 서비스 Test",async()=>{
        it("리뷰 생성",async()=>{
            await addReviewService(onlyDaoCtx,firstBody);
        });
        it("생성된 리뷰 튜플 값 확인",async() => {
            const res = await onlyDaoCtx.daoProvider.review().selectReview(firstBody.reviewId) as Review;
            expect(res).to.not.equal(null);
            expect(res.plcaeId).to.equal(firstBody.placeId);
            expect(res.userId).to.equal(firstBody.userId);
            expect(res.comment).to.equal(firstBody.content);
        });
        it("포인터 증감 로그 확인",async() => {
            const arr = await selectAllPointPlusLogService(onlyDaoCtx);
            expect(arr.length).to.equal(1);
        });

        it("생성된 리뷰 포인트 플래그 값 확인",async() => {
            const res = await onlyDaoCtx.daoProvider
                    .review()
                    .selectReviewPointFlag(firstBody.reviewId) as ReviewPointFlag;

            expect(res).to.not.equal(null);
            expect(res.isFirstReview).to.equal(true);
            expect(res.isTextWrite).to.equal(true);
            expect(res.isUpdateImage).to.equal(true);
        });

        it("빈 콘텐츠, 첫번째 유저랑 같은 ,첫번째가 아닌 리뷰 생성",async()=>{
            const other : RequestBody= Object.assign({},firstBody);
            other.content = null;
            other.reviewId = uuid();
            other.attachedPhotoIds = [uuid()];
            
            await addReviewService(onlyDaoCtx,other);
            expect(firstBody.userId).to.equal(other.userId);
        });
        it("빈 콘텐츠, 빈 이미지, 첫번째 유저랑 다른 ,첫번째가 아닌 리뷰 생성",async()=>{
            const other : RequestBody= Object.assign({},firstBody);
            other.content = null;
            other.reviewId = uuid();
            other.userId = uuid();
            other.attachedPhotoIds = [];
            
            await addReviewService(onlyDaoCtx,other);
        });



        it("리뷰 추가후 포인터 증감 로그 확인",async() => {
            const arr = await selectAllPointPlusLogService(onlyDaoCtx);
            expect(arr.length).to.equal(2);
            expect(arr[0].firstReviewFlag).to.equal(true);
            expect(arr[0].textWritePlusFlag).to.equal(true);
            expect(arr[0].updateImageFlag).to.equal(true);

            expect(arr[1].firstReviewFlag).to.equal(false);
            expect(arr[1].textWritePlusFlag).to.equal(false);
            expect(arr[1].updateImageFlag).to.equal(true);
        });

        it("유저 포인트 총합 값 확인",async() => {
            const res = await getUserPointService(onlyDaoCtx,firstBody.userId) as UserPoint;
            expect(res).to.not.equal(null);
            expect(res.point).to.equal(4);
        });

        it("데이터베이스 튜플 전체 삭제",async() => {
            await deleteAllData(await conn);
        });
    });




    
});

