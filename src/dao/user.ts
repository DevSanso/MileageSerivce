import mysql,{RowDataPacket,FieldPacket} from 'mysql2/promise';

import transUserPoint from '../dtfp/user_point';
import UserPoint from '../models/user_point';

const updateUserPointQuery = (userId : string) => `update_user_point_proc(${userId});`;
const selectUserPointQuery = (userId : string) => 
`SELECT point_score FROM user_point WHERE user_id=${userId} LIMIT 1;`;
const createUserPointQuery = (userId : string) => `INSERT INTO user_point VALUES(${userId},0);`;



class UserDao {
    private connPromise : Promise<mysql.PoolConnection>;
    public constructor(conn : Promise<mysql.PoolConnection>) {
        this.connPromise = conn;
    }
    public updateUserPoint = async (userId : string)  => {
        const conn = await this.connPromise;
        await conn.execute(updateUserPointQuery(userId));
    };

    public selectUserPoint = async (userId : string) : Promise<UserPoint | null> => {
        const conn = await this.connPromise;
        const [rows,_] : [RowDataPacket[],FieldPacket[]] = await conn.query(selectUserPointQuery(userId));

        if(rows[0] == undefined)return null;
        return transUserPoint(rows[0]);
    };

    public createUserPoint = async (userId : string) => {
        const conn = await this.connPromise;
        await conn.execute(createUserPointQuery(userId));
    };
    
}

export default UserDao;