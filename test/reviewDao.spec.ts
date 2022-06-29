import {expect} from 'chai';

import dbPoolGen from "./util/db";
import ReviewDao from "../src/dao/review";
import {uuid} from 'uuidv4';
import Review from '../src/models/review';
import ReviewContent from '../src/models/review_content';
import ReviewPointFlag from '../src/models/review_point_flag';
import deleteAllData from './util/deleteAll';


describe("ReviewDao Object Test",()=>{
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
        const review = await dao.selectReview(reviewId) as Review;
        expect(review.comment).to.equal(comment);
        expect(review.userId).to.equal(userId);
        expect(review.plcaeId).to.equal(placeId);
        const review1 = await dao.selectReview("");
        expect(review1).to.equal(null);
   });

   it("dao select review content test",async() => {
        const reviewContent = await dao.selectReviewContent(reviewId) as Array<ReviewContent>;
        for(let i = 0;i<reviewContent.length;i++) {
            const str = imageIds.find(value => value == reviewContent[i].imageId);
            expect(str).to.not.equal(undefined);
        }
    });
    it("dao select review point flag test",async() => {
        const reviewFlag = await dao.selectReviewPointFlag(reviewId) as ReviewPointFlag;
        expect(reviewFlag.isTextWrite).to.equal(false);
        expect(reviewFlag.isFirstReview).to.equal(false);
        expect(reviewFlag.isUpdateImage).to.equal(false);
    });

    
    it("dao 첫번째 리뷰 관련 처리 test",async() => {

        const createOtherFlag = async (review_id : string,user_id : string) => {
            await dao.insertReview({
                reviewId : review_id,
                placeId : placeId,
                userId : user_id,
                content : comment
            });
            await dao.createReviewPointFlag(review_id);
        }

        await dao.updateReviewPointFlag(reviewId,placeId);
        let reviewFlag = await dao.selectReviewPointFlag(reviewId) as ReviewPointFlag;
        
        expect(reviewFlag.isFirstReview).to.equal(true);
        const secondReviewId = uuid();
        const secondUserId = uuid();
        const thirdReviewId = uuid();
        const thirdUserId = uuid();

        await createOtherFlag(secondReviewId,secondUserId);
        await dao.updateReviewPointFlag(secondReviewId,placeId);
        reviewFlag = await dao.selectReviewPointFlag(secondReviewId) as ReviewPointFlag;
        expect(reviewFlag.isFirstReview).to.equal(false);


        const otherReviewId = uuid();
        const otherPlaceId = uuid();
        await dao.insertReview({
            reviewId : otherReviewId,
            placeId : otherPlaceId,
            userId : uuid(),
            content : "hi"
        });

        await dao.updateReviewPointFlag(otherReviewId,otherPlaceId);
        reviewFlag = await dao.selectReviewPointFlag(otherReviewId) as ReviewPointFlag;
        expect(reviewFlag.isFirstReview).to.equal(true);

        await dao.deleteReview(reviewId);

        await createOtherFlag(thirdReviewId,thirdUserId);
        await dao.updateReviewPointFlag(thirdReviewId,placeId);
        reviewFlag = await dao.selectReviewPointFlag(thirdReviewId) as ReviewPointFlag;
        expect(reviewFlag.isFirstReview).to.equal(true);
    });


    it("모든 테이블 튜플 삭제 ",async() => {
        await deleteAllData(await conn);
    });
});