import { RowDataPacket } from "mysql2/promise";
import PointPlusLog from "../models/point_plus_log";


type DTO = {
    review_id : string
    text_write : number
    update_image : number
    first_review : number
    log_date : string
};

const transDaoToModel = (row : RowDataPacket) : PointPlusLog => {
    const dto = row as DTO;
    return {
       reviewId : dto.review_id,
       textWritePlusFlag : dto.text_write == 1? true : false,
       updateImageFlag : dto.update_image == 1? true : false,
       firstReviewFlag : dto.first_review == 1? true : false,

       logDate : dto.log_date
    };
};


export default transDaoToModel;