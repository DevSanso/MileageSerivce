import { RowDataPacket } from "mysql2/promise";
import ReviewContent from "../models/review_content";


type DTO = {
    image_id : string
};

const transDaoToModel = (row : RowDataPacket) : ReviewContent => {
    const dto = row as DTO;
    return {
       imageId : dto.image_id
    };
};


export default transDaoToModel;
