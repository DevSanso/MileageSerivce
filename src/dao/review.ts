import mysql, { FieldPacket, RowDataPacket } from 'mysql2/promise';


import ReviewContent from '../models/review_content';
import Review from '../models/review';

import Body from '../api/body/event';


import transReviewContent from '../dtfp/review_content';
import transReview from '../dtfp/review';


type InsertParam = Omit<Body,"action" | "type" | "attachedPhotoIds">;


const deleteImageQuery = (reviewId : string) => 
`DELETE FROM review_content WHERE review_id = "${reviewId}";`; 
const selectReviewContentQuery= (reviewId : string) =>  
`SELECT image_id FROM review_content WHERE review_id="${reviewId}";`;

const selectReviewQuery = (reviewId : string) => 
`SELECT user_id,place_id,comment FROM review WHERE review_id="${reviewId}";`;


const insertReviewQuery = (review_id : string,user_id : string,place_id : string,comment : string | null) =>
"INSERT INTO review(review_id,user_id,place_id,comment) "+
`VALUES("${review_id}","${user_id}","${place_id}",${comment});`;

const updateReviewCommentQuery = (review_id : string,comment : string | null) =>
`UPDATE review SET comment = ${comment} WHERE review_id="${review_id}";`;

const insertReviewCotentQuery = (review_id : string,image_id : string) =>
`INSERT INTO review_content(review_id,image_id) VALUES("${review_id}","${image_id}");`;

const deleteReivewQuery = (review_id : string) =>
`DELETE FROM review WHERE review_id = "${review_id}";`;

/**
 * review 테이블 입출력 dao 클래스
 * @param conn
 * mysql PoolConnection 프로미스
 */
class ReviewDao {
    private connPromise : Promise<mysql.PoolConnection>;
    public constructor(conn : Promise<mysql.PoolConnection>) {
        this.connPromise = conn;
    }
    /**
     * 리뷰 튜플의  글 업데이트 함수
     * @param reviewId 
     * 리뷰 uuid 값
     * @param comment
     * 업데이트  할 문자열 , 만약 "" 또는 null 일시 해당 속성은 NULL으로 업데이트 된다. 
     */
    public updateReviewComment = async(reviewId : string, comment : string | null) => {
        const conn = await this.connPromise;
        const commentArg = comment != null ? `"${comment}"` : null;
        await conn.execute(updateReviewCommentQuery(reviewId,commentArg));
    };
    /**
     * 리뷰 컨텐츠(이미지 배열) 튜플 조회 함수
     * @param reviewId 
     * 리뷰 uuid 값
     * @returns 
     * 조회된 이미지 배열, 단 조회가 없을시 null 값을 리턴
     */
    public selectReviewContent = async (reviewId : string) : Promise<Array<ReviewContent> | null> => {
        const query = selectReviewContentQuery(reviewId);
        const conn = await this.connPromise;
        const [rows,field] : [RowDataPacket[],FieldPacket[]] = await conn.query(query);
        if (rows.length == 0)return null;
        return rows.map(value => transReviewContent(value));
    };
    /**
     * 리뷰 조회 함수
     * @param reviewId
     * 리뷰 uuid 값 
     * @returns 
     * 리뷰 데이터 리턴, 만약 조회된 데이터 없을 시 null 값 리턴
     */
    public selectReview = async (reviewId : string) : Promise<Review | null> => {
        const query = selectReviewQuery(reviewId);
        const conn = await this.connPromise;
        const [rows,field] : [RowDataPacket[],FieldPacket[]] = await conn.query(query);

        if (rows[0] != undefined) 
            return transReview(rows[0]);
        
        return null;
    };
    /**
     * 리뷰의 모든 이미지 uuid 삭제 함수
     * @param reviewId 
     * 리뷰 uuid 값
     */
    public deleteImages = async (reviewId : string)  => {
        const query = deleteImageQuery(reviewId);
        const conn = await this.connPromise;
        await conn.execute(query);
    }
    /**
     * 리뷰 삽입 함수, 호출시 자동으로 review_create_log에 튜플 생성됨
     * @param body 
     * /events 리퀘스트 바디에서  "action" ,"type" , "attachedPhotoIds" 속성의 제외한 객체
     */
    public insertReview = async (body : InsertParam) => {
        const conn = await this.connPromise;
        const content = body.content != null ? `"${body.content}"` : null;
        await conn.execute(insertReviewQuery(body.reviewId,body.userId,body.placeId,content));
    };
    /**
     * 리뷰 컨텐츠(이미지 배열) 테이블 삽입 함수
     * @param reviewId 
     * 리뷰 uuid 값
     * @param imgId 
     * 이미지 uuid 값
     */
    public insertReviewContent = async (reviewId : string,imgId : string) => {
        const conn = await this.connPromise;
        await conn.execute(insertReviewCotentQuery(reviewId,imgId));
    }
    /**
     * 리뷰 삭제 함수, 호출시 데이터베이스 트리거 작동으로,해당 튜플에 연관된 이미지 배열 테이블의 튜플, 
     * 이미지 포인트 플래그 테이블의 튜플이 자동 삭제되며, review_create_log에 있던 튜플은 review_deleted_log 테이블로
     * 이동
     * @param reviewId 
     */
    public deleteReview = async (reviewId : string) => {
        const conn = await this.connPromise;
        await conn.execute(deleteReivewQuery(reviewId));
    }

}

export default ReviewDao;