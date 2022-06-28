import mysql, { FieldPacket, RowDataPacket } from 'mysql2/promise';

import ReviewPointFlag from '../models/review_point_flag';
import ReviewContent from '../models/review_content';
import Review from '../models/review';

import transReviewPointFlag from '../dtfp/review_point_flag';
import transReviewContent from '../dtfp/review_content';
import transReview from '../dtfp/review';

const selectReviewPointFlagQuery = (reviewId : string) => 
"SELECT is_text_write, is_update_image,is_first_review" +
 `FROM review_point_flag WHERE review_id=${reviewId} LIMIT 1;`;


 const selectReviewContentQuery= (reviewId : string) =>  
`SELECT image_id FROM review_content WHERE review_id=${reviewId};`;

const selectReviewQuery = (reviewId : string) => 
`SELECT user_id,place_id,comment FROM review WHERE review_id=${reviewId};`;

const updateReviewPointTextFlagQuery = (review_id : string) =>`update_review_point_text_flag_proc(${review_id});`;
const updateReviewPointImageFlagQuery = (review_id : string) =>`update_review_point_image_flag_proc(${review_id});`;
const updateReviewPointFirstReviewFlagQuery = (review_id : string,place_id : string) =>
`update_review_point_first_review_flag_proc(${review_id},${place_id});`;

class ReviewDao {
    private connPromise : Promise<mysql.PoolConnection>;
    public constructor(conn : Promise<mysql.PoolConnection>) {
        this.connPromise = conn;
    }

    public selectReviewPointFlag = async (review_id : string) : Promise<ReviewPointFlag>=> {
        const query = selectReviewPointFlagQuery(review_id);
        const conn = await this.connPromise;
        const [rows,field] : [RowDataPacket[],FieldPacket[]] = await conn.query(query);
        return transReviewPointFlag(rows[0]);
    };
    
    public selectReviewContent = async (review_id : string) : Promise<Array<ReviewContent>> => {
        const query = selectReviewContentQuery(review_id);
        const conn = await this.connPromise;
        const [rows,field] : [RowDataPacket[],FieldPacket[]] = await conn.query(query);
        
        return rows.map(value => transReviewContent(value));
    };

    public selectReview = async (review_id : string) : Promise<Review> => {
        const query = selectReviewQuery(review_id);
        const conn = await this.connPromise;
        const [rows,field] : [RowDataPacket[],FieldPacket[]] = await conn.query(query);
        
        return transReview(rows[0]);
    };
    public updateReviewPoint = async (review_id : string,place_id : string) => {
        const conn = await this.connPromise;
        const textAsyncCall = conn.execute(updateReviewPointTextFlagQuery(review_id));
        const imgAsyncCall =conn.execute(updateReviewPointImageFlagQuery(review_id));
        const firstReviewAsyncCall =conn.execute(updateReviewPointFirstReviewFlagQuery(review_id,place_id));
            
        await Promise.all([textAsyncCall,imgAsyncCall,firstReviewAsyncCall]);
        
    };
}

export default ReviewDao;