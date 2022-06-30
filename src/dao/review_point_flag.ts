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



class ReviewPointFlagDao {
    private connPromise : Promise<mysql.PoolConnection>;
    public constructor(conn : Promise<mysql.PoolConnection>) {
        this.connPromise = conn;
    }

    public selectReviewPointFlag = async (reviewId : string) : Promise<ReviewPointFlag | null>=> {
        const query = selectReviewPointFlagQuery(reviewId);
        const conn = await this.connPromise;
        const [rows,field] : [RowDataPacket[],FieldPacket[]] = await conn.query(query);

        if(rows[0] == undefined)return null;
        return transReviewPointFlag(rows[0]);
    };


    public updateReviewPointFlagProc = async (reviewId : string,placeId : string) => {
        const conn = await this.connPromise;
        const textAsyncCall = conn.execute(updateReviewPointTextFlagQuery(reviewId));
        const imgAsyncCall =conn.execute(updateReviewPointImageFlagQuery(reviewId));
        const firstReviewAsyncCall =conn.execute(updateReviewPointFirstReviewFlagQuery(reviewId,placeId));
            
        await Promise.all([textAsyncCall,imgAsyncCall,firstReviewAsyncCall]);
        
    };

    public createReviewPointFlag = async (reviewId : string) => {
        const conn = await this.connPromise;
        await conn.execute(`INSERT INTO review_point_flag VALUES("${reviewId}",0,0,0);`);
    }

}

export default ReviewPointFlagDao;