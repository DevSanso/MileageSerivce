import mysql from 'mysql2/promise';


const insertPushPointQuery = (reviewId : string,writeFlag : boolean,imgFlag : boolean,firstFlag : boolean) =>
`INSERT INTO point_plus_log VALUES(${reviewId},${writeFlag},${imgFlag},${firstFlag},NOW());`;

class LogDao {
    private connPromise : Promise<mysql.PoolConnection>;
    public constructor(conn : Promise<mysql.PoolConnection>) {
        this.connPromise = conn;
    }
    
    public insertPushPointIog = async(reviewId : string,writeFlag : boolean,imgFlag : boolean,firstFlag : boolean) => {
        const conn = await this.connPromise;
        await conn.execute(insertPushPointQuery(reviewId,writeFlag,imgFlag,firstFlag));
    }
    
}

export default LogDao;