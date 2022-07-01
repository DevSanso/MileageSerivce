import { RowDataPacket } from "mysql2/promise";
import ReviewContent from "../models/review_content";


type DTO = {
    image_id : string
};
/**
 * dao에서 조회된 review_content 행을 서비스에서 사용할 객체에 알맞은 변환하는 함수 
* @param row 
 * 조회된 행 데이터
 * @returns 
 * ReviewContent
 */
const transDaoToModel = (row : RowDataPacket) : ReviewContent => {
    const dto = row as DTO;
    return {
       imageId : dto.image_id
    };
};


export default transDaoToModel;
