import { RowDataPacket } from "mysql2/promise";
import ReviewPointFlag from "../models/review_point_flag";


type DTO = {
    is_text_write : number
    is_update_image : number
    is_first_review : number
};

const transDaoToModel = (row : RowDataPacket) : ReviewPointFlag => {
    const dto = row as DTO;
    return {
        isTextWrite : dto.is_text_write == 1,
        isUpdateImage : dto.is_update_image == 1,
        isFirstReview : dto.is_first_review == 1
    };
};


export default transDaoToModel;
