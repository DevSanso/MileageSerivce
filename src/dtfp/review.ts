import { RowDataPacket } from "mysql2/promise";
import Review from "../models/review";


type DTO = {
    user_id : string
    place_id : string
    comment : string
};
/**
 * dao에서 조회된 review 행을 서비스에서 사용할 객체에 알맞은 변환하는 함수 
* @param row 
 * 조회된 행 데이터
 * @returns 
 * Review
 */
const transDaoToModel = (row : RowDataPacket) : Review => {
    const dto = row as DTO;
    return {
       userId : dto.user_id,
       plcaeId : dto.place_id,
       comment : dto.comment
    };
};


export default transDaoToModel;
