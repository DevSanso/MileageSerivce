import { RowDataPacket } from "mysql2/promise";
import Review from "../models/review";


type DTO = {
    user_id : string
    place_id : string
    comment : string
};

const transDaoToModel = (row : RowDataPacket) : Review => {
    const dto = row as DTO;
    return {
       userId : dto.user_id,
       plcaeId : dto.place_id,
       comment : dto.comment
    };
};


export default transDaoToModel;
