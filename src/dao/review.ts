import mysql, { FieldPacket, RowDataPacket } from 'mysql2/promise';


import ReviewContent from '../models/review_content';
import Review from '../models/review';

import Body from '../api/body/event';


import transReviewContent from '../dtfp/review_content';
import transReview from '../dtfp/review';


type InsertParam = Omit<Body,"action" | "type" | "attachedPhotoIds">;



 const selectReviewContentQuery= (reviewId : string) =>  
`SELECT image_id FROM review_content WHERE review_id="${reviewId}";`;

const selectReviewQuery = (reviewId : string) => 
`SELECT user_id,place_id,comment FROM review WHERE review_id="${reviewId}";`;


const insertReviewQuery = (review_id : string,user_id : string,place_id : string,comment : string | null) =>
"INSERT INTO review(review_id,user_id,place_id,comment) "+
`VALUES("${review_id}","${user_id}","${place_id}",${comment});`;


const insertReviewCotentQuery = (review_id : string,image_id : string) =>
`INSERT INTO review_content(review_id,image_id) VALUES("${review_id}","${image_id}");`;

const deleteReivewQuery = (review_id : string) =>
`DELETE FROM review WHERE review_id = "${review_id}";`;

class ReviewDao {
    private connPromise : Promise<mysql.PoolConnection>;
    public constructor(conn : Promise<mysql.PoolConnection>) {
        this.connPromise = conn;
    }


    
    public selectReviewContent = async (reviewId : string) : Promise<Array<ReviewContent> | null> => {
        const query = selectReviewContentQuery(reviewId);
        const conn = await this.connPromise;
        const [rows,field] : [RowDataPacket[],FieldPacket[]] = await conn.query(query);

        if (rows.length = 0)return null;
        return rows.map(value => transReviewContent(value));
    };

    public selectReview = async (reviewId : string) : Promise<Review | null> => {
        const query = selectReviewQuery(reviewId);
        const conn = await this.connPromise;
        const [rows,field] : [RowDataPacket[],FieldPacket[]] = await conn.query(query);

        if (rows[0] != undefined) 
            return transReview(rows[0]);
        
        return null;
    };


    public insertReview = async (body : InsertParam) => {
        const conn = await this.connPromise;
        const content = body.content != null ? `"${body.content}"` : null;
        await conn.execute(insertReviewQuery(body.reviewId,body.userId,body.placeId,content));
    };

    public insertReviewContent = async (reviewId : string,imgId : string) => {
        const conn = await this.connPromise;
        await conn.execute(insertReviewCotentQuery(reviewId,imgId));
    }

    public deleteReview = async (reviewId : string) => {
        const conn = await this.connPromise;
        await conn.execute(deleteReivewQuery(reviewId));
    }
}

export default ReviewDao;