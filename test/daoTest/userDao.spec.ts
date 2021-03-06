import {expect} from 'chai';

import dbPoolGen from "../util/db";
import ReviewDao from "../../src/dao/review";

import ReviewFlagDao from '../../src/dao/review_point_flag';
import UserDao from '../../src/dao/user';

import {uuid} from 'uuidv4';
import Review from '../../src/models/review';

import deleteAllData from '../util/deleteAll';

const addReview = async(dao : ReviewDao,daoFlag : ReviewFlagDao,userId : string) => {
    const reviewId = uuid();
    const placeId = uuid();

    const comment = "hello word";

    await dao.insertReview({
        reviewId : reviewId,
        placeId : placeId,
        userId : userId,
        content : comment
    });
    
    const review = await dao.selectReview(reviewId) as Review;
    expect(review.comment).to.equal(comment);
    expect(review.userId).to.equal(userId);
    expect(review.plcaeId).to.equal(placeId);
    await daoFlag.createReviewPointFlag(reviewId);
    await daoFlag.updateReviewPointFlagProc(reviewId,placeId);
}


describe("userDao Object Test",()=> {
    const pool = dbPoolGen();
    const conn =  pool.getConnection();

    const dao = new ReviewDao(conn);
    const daoFlag = new ReviewFlagDao(conn);
    const userUUID = uuid();

    it("리뷰 추가 전처리 test",async() => {
        await addReview(dao,daoFlag,userUUID);
   });
   const userDao = new UserDao(conn);

   it("유저 총합 튜플 생성 test",async()=>{
        await userDao.createUserPoint(userUUID);
        const userPoint = userDao.selectUserPoint(userUUID);
        expect(userPoint).to.not.equal(null);

   });

   it("update 유저 총합 업데이트 test",async() =>{
        await userDao.updateUserPoint(userUUID);
        const userPoint = await userDao.selectUserPoint(userUUID);
        expect(userPoint?.point).to.equal(2);
   });

   it("모든 테이블 튜플 삭제 ",async() => {
    await deleteAllData(await conn);
    });
});