import {expect} from 'chai';

import dbPoolGen from "./util/db";
import ReviewDao from "../src/dao/review";
import {uuid} from 'uuidv4';

describe("ReviewDao Object Test",async ()=>{
    const pool = dbPoolGen();
    const conn =  pool.getConnection();

    const dao = new ReviewDao(conn);
    
    const reviewId = uuid();
    const placeId = uuid();
    const userId = uuid();
    const imageIds = [uuid(),uuid()];
    const comment = "hello word";

    it("dao insert test",async () => {
        await dao.insertReview({
            reviewId : reviewId,
            placeId : placeId,
            userId : userId,
            content : comment
        });
        await imageIds.forEach(value => dao.insertReviewContent(reviewId,value));
        await dao.createReviewPointFlag(reviewId);
    });
   it("dao select review test",async() => {
        const review = await dao.selectReview(reviewId);
        expect(review.comment).to.equal(comment);
        expect(review.userId).to.equal(userId);
        expect(review.plcaeId).to.equal(placeId);
   });

   it("dao select review content test",async() => {
        const reviewContent = await dao.selectReviewContent(reviewId);
    });
    it("dao select review point flag test",async() => {
        const reviewFlag = await dao.selectReviewPointFlag(reviewId);
        expect(reviewFlag.isTextWrite).to.equal(false);
        expect(reviewFlag.isFirstReview).to.equal(false);
        expect(reviewFlag.isUpdateImage).to.equal(false);
    });
});