import mysql,{RowDataPacket,FieldPacket} from 'mysql2/promise';


import PointPlusLogModel from '../models/point_plus_log';
import transPointPlusLog from '../dtfp/point_plus_log';


const insertPushPointQuery = (reviewId : string,writeFlag : number,imgFlag : number,firstFlag : number) =>
`INSERT INTO point_plus_log VALUES("${reviewId}",${writeFlag},${imgFlag},${firstFlag},NOW());`;



const convertNumber = (flag : boolean) => flag? 1 : 0;

class LogDao {
    private connPromise : Promise<mysql.PoolConnection>;
    public constructor(conn : Promise<mysql.PoolConnection>) {
        this.connPromise = conn;
    }
    
    public insertPushPointIog = async(reviewId : string,writeFlag : boolean,imgFlag : boolean,firstFlag : boolean) => {
        const conn = await this.connPromise;
        const c = convertNumber;
        await conn.execute(insertPushPointQuery(reviewId,c(writeFlag),c(imgFlag),c(firstFlag)));
    }

    public selectAllLog = async() : Promise<Array<PointPlusLogModel>> => {
        const q = "SELECT review_id, text_write, update_image, first_review, log_date FROM point_plus_log " +
            "ORDER BY log_date ASC;";
        const conn = await this.connPromise;
        const [rows,field] : [RowDataPacket[],FieldPacket[]] =
            await conn.query(q);
        
        return rows.map(value => transPointPlusLog(value));
    }
    
}

export default LogDao;