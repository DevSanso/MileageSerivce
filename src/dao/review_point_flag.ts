import mysql, { FieldPacket, RowDataPacket } from 'mysql2/promise';

import ReviewPointFlag from '../models/review_point_flag';


import Body from '../api/body/event';

import transReviewPointFlag from '../dtfp/review_point_flag';




const selectReviewPointFlagQuery = (reviewId : string) => 
"SELECT is_text_write, is_update_image,is_first_review " +
 `FROM review_point_flag WHERE review_id="${reviewId}" LIMIT 1 ;`;




const updateReviewPointTextFlagQuery = (review_id : string) =>`CALL update_review_point_text_flag_proc("${review_id}");`;
const updateReviewPointImageFlagQuery = (review_id : string) =>`CALL update_review_point_image_flag_proc("${review_id}");`;
const updateReviewPointFirstReviewFlagQuery = (review_id : string,place_id : string) =>
`CALL update_review_point_first_review_flag_proc("${review_id}","${place_id}");`;


/**
 * review_point_flag 테이블 입출력 dao 클래스
 * @param conn
 * mysql PoolConnection 프로미스
 */
class ReviewPointFlagDao {
    private connPromise : Promise<mysql.PoolConnection>;
    public constructor(conn : Promise<mysql.PoolConnection>) {
        this.connPromise = conn;
    }
    /**
     * 리뷰 포인트 플래그 조회 함수
     * @param reviewId 
     * 리뷰 uuid
     * @returns 
     * 조회된 리뷰 플래그 튜플, 만약 조회된 값이 없을시 null 값을 리턴한다.
     */
    public selectReviewPointFlag = async (reviewId : string) : Promise<ReviewPointFlag | null>=> {
        const query = selectReviewPointFlagQuery(reviewId);
        const conn = await this.connPromise;
        const [rows,field] : [RowDataPacket[],FieldPacket[]] = await conn.query(query);

        if(rows[0] == undefined)return null;
        return transReviewPointFlag(rows[0]);
    };

    /**
     * 리뷰 포인트 플래그 튜플 업데이트 프로시저 호출 함수
     * 함수 호출 시점에 첫번째 리뷰, 글 유무, 이미지 배열 유무등을 확인한후
     * 각 포인트 플래그에 값을 업데이트 한다.
     * @param reviewId 
     * 리뷰 uuid
     * @param placeId 
     * 장소 uuid
     */
    public updateReviewPointFlagProc = async (reviewId : string,placeId : string) => {
        const conn = await this.connPromise;
        const textAsyncCall = conn.execute(updateReviewPointTextFlagQuery(reviewId));
        const imgAsyncCall =conn.execute(updateReviewPointImageFlagQuery(reviewId));
        const firstReviewAsyncCall =conn.execute(updateReviewPointFirstReviewFlagQuery(reviewId,placeId));
            
        await Promise.all([textAsyncCall,imgAsyncCall,firstReviewAsyncCall]);
        
    };
    /**
     * 리뷰 포인트 플래그 튜플 생성 함수
     * 튜플 생성 및 초기화를 위해 사용하는 함수
     * @param reviewId 
     * 리뷰 uuid 값
     */
    public createReviewPointFlag = async (reviewId : string) => {
        const conn = await this.connPromise;
        await conn.execute(`INSERT INTO review_point_flag VALUES("${reviewId}",0,0,0);`);
    }

}

export default ReviewPointFlagDao;