import mysql, { FieldPacket, RowDataPacket } from 'mysql2/promise';


const updateUserPointQuery = (userId : string) => `update_user_point_proc(${userId});`;

class UserDao {
    private connPromise : Promise<mysql.PoolConnection>;
    public constructor(conn : Promise<mysql.PoolConnection>) {
        this.connPromise = conn;
    }
    public updateUserPoint = async (userId : string)  => {
        const conn = await this.connPromise;
        await conn.execute(updateUserPointQuery(userId));
    }
}

export default UserDao;