import { RowDataPacket } from "mysql2/promise";
import UserPoint from '../models/user_point';

type DTO = {
    point_score : number
};

const transDaoToModel = (row : RowDataPacket) : UserPoint => {
    const dto = row as DTO;
    return {
        point : dto.point_score
    }; 
};


export default transDaoToModel;
