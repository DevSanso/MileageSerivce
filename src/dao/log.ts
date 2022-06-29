import mysql from 'mysql2/promise';


const insertPushPointQuery = (reviewId : string,writeFlag : number,imgFlag : number,firstFlag : number) =>
`INSERT INTO point_plus_log VALUES(${reviewId},${writeFlag},${imgFlag},${firstFlag},NOW());`;


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
    
}

export default LogDao;