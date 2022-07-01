import { RowDataPacket } from "mysql2/promise";
import ReviewPointFlag from "../models/review_point_flag";


type DTO = {
    is_text_write : number
    is_update_image : number
    is_first_review : number
};
/**
 * dao에서 조회된 review_point_flag 행을 서비스에서 사용할 객체에 알맞은 변환하는 함수 
* @param row 
 * 조회된 행 데이터
 * @returns 
 * ReviewPointFlag
 */
const transDaoToModel = (row : RowDataPacket) : ReviewPointFlag => {
    const dto = row as DTO;
    return {
        isTextWrite : dto.is_text_write == 1,
        isUpdateImage : dto.is_update_image == 1,
        isFirstReview : dto.is_first_review == 1
    };
};


export default transDaoToModel;
