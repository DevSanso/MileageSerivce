import {expect} from 'chai';

import dbPoolGen from "./util/db";
import ReviewDao from "../src/dao/review";
import UserDao from '../src/dao/user';

import {uuid} from 'uuidv4';
import Review from '../src/models/review';

import deleteAllData from './util/deleteAll';

const addReview = async(dao : ReviewDao,userId : string) => {
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
    await dao.createReviewPointFlag(reviewId);
    await dao.updateReviewPointFlag(reviewId,placeId);
}


describe("userDao Test",()=> {
    const pool = dbPoolGen();
    const conn =  pool.getConnection();

    const dao = new ReviewDao(conn);
    const userUUID = uuid();

    it("리뷰 추가 전처리 test",async() => {
        await addReview(dao,userUUID);
   });
   const userDao = new UserDao(conn);

   it("create user point tuple test",async()=>{
        await userDao.createUserPoint(userUUID);
        const userPoint = userDao.selectUserPoint(userUUID);
        expect(userPoint).to.not.equal(null);

   });

   it("update user point test",async() =>{
        await userDao.updateUserPoint(userUUID);
        const userPoint = await userDao.selectUserPoint(userUUID);
        expect(userPoint?.score).to.equal(2);
   });

   it("모든 테이블 튜플 삭제 ",async() => {
    await deleteAllData(await conn);
    });
});