import { RowDataPacket } from "mysql2/promise";
import UserPoint from '../models/user_point';

type DTO = {
    point_score : number
};
/**
 * dao에서 조회된 user_point 행을 서비스에서 사용할 객체에 알맞은 변환하는 함수 
* @param row 
 * 조회된 행 데이터
 * @returns 
 * UserPoint
 */
const transDaoToModel = (row : RowDataPacket) : UserPoint => {
    const dto = row as DTO;
    return {
        point : dto.point_score
    }; 
};


export default transDaoToModel;
