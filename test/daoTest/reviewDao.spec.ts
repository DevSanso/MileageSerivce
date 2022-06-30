import {expect} from 'chai';

import dbPoolGen from "../util/db";
import ReviewDao from "../../src/dao/review";
import {uuid} from 'uuidv4';
import Review from '../../src/models/review';
import ReviewFlagDao from '../../src/dao/review_point_flag';
import ReviewContent from '../../src/models/review_content';
import ReviewPointFlag from '../../src/models/review_point_flag';
import deleteAllData from '../util/deleteAll';


describe("ReviewDao Object Test",()=>{
    const pool = dbPoolGen();
    const conn =  pool.getConnection();

    const dao = new ReviewDao(conn);
    const daoFlag = new ReviewFlagDao(conn);
    
    const reviewId = uuid();
    const placeId = uuid();
    const userId = uuid();
    const imageIds = [uuid(),uuid()];
    const comment = "hello word";

    it("dao 리뷰 생성 test",async () => {
        await dao.insertReview({
            reviewId : reviewId,
            placeId : placeId,
            userId : userId,
            content : comment
        });
        await imageIds.forEach(value => dao.insertReviewContent(reviewId,value));
        await daoFlag.createReviewPointFlag(reviewId);
    });
   it("dao 리뷰 조회  test",async() => {
        const review = await dao.selectReview(reviewId) as Review;
        expect(review.comment).to.equal(comment);
        expect(review.userId).to.equal(userId);
        expect(review.plcaeId).to.equal(placeId);
        const review1 = await dao.selectReview("");
        expect(review1).to.equal(null);
   });

   it("dao 리뷰 이미지 배열 조회 test",async() => {
        const reviewContent = await dao.selectReviewContent(reviewId) as Array<ReviewContent>;
        for(let i = 0;i<reviewContent.length;i++) {
            const str = imageIds.find(value => value == reviewContent[i].imageId);
            expect(str).to.not.equal(undefined);
        }
    });
    it("dao 리뷰 포인트 플래그 조회 test",async() => {
        const reviewFlag = await daoFlag.selectReviewPointFlag(reviewId) as ReviewPointFlag;
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
            await daoFlag.createReviewPointFlag(review_id);
        }

        await daoFlag.updateReviewPointFlagProc(reviewId,placeId);
        let reviewFlag = await daoFlag.selectReviewPointFlag(reviewId) as ReviewPointFlag;

        expect(reviewFlag.isFirstReview).to.equal(true);
        const secondReviewId = uuid();
        const secondUserId = uuid();
        const thirdReviewId = uuid();
        const thirdUserId = uuid();

        await createOtherFlag(secondReviewId,secondUserId);
        await daoFlag.updateReviewPointFlagProc(secondReviewId,placeId);
        reviewFlag = await daoFlag.selectReviewPointFlag(secondReviewId) as ReviewPointFlag;
        expect(reviewFlag.isFirstReview).to.equal(false);


        const otherReviewId = uuid();
        const otherPlaceId = uuid();
        await dao.insertReview({
            reviewId : otherReviewId,
            placeId : otherPlaceId,
            userId : uuid(),
            content : "hi"
        });
        await daoFlag.createReviewPointFlag(otherReviewId);
        await daoFlag.updateReviewPointFlagProc(otherReviewId,otherPlaceId);
        reviewFlag = await daoFlag.selectReviewPointFlag(otherReviewId) as ReviewPointFlag;
        expect(reviewFlag.isFirstReview).to.equal(true);

        await dao.deleteReview(reviewId);

        await createOtherFlag(thirdReviewId,thirdUserId);
        await daoFlag.updateReviewPointFlagProc(thirdReviewId,placeId);
        reviewFlag = await daoFlag.selectReviewPointFlag(thirdReviewId) as ReviewPointFlag;
        expect(reviewFlag.isFirstReview).to.equal(true);
    });


    it("모든 테이블 튜플 삭제 ",async() => {
        await deleteAllData(await conn);
    });
});