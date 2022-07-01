import mysql,{RowDataPacket,FieldPacket} from 'mysql2/promise';

import transUserPoint from '../dtfp/user_point';
import UserPoint from '../models/user_point';

const updateUserPointQuery = (userId : string) => `CALL update_user_point_proc("${userId}");`;
const selectUserPointQuery = (userId : string) => 
`SELECT point_score FROM user_point WHERE user_id="${userId}" LIMIT 1;`;
const createUserPointQuery = (userId : string) => `INSERT INTO user_point VALUES("${userId}",0);`;


/**
 * user_point 테이블 입출력 dao 클래스
 * @param conn
 * mysql PoolConnection 프로미스
 */
class UserDao {
    private connPromise : Promise<mysql.PoolConnection>;
    public constructor(conn : Promise<mysql.PoolConnection>) {
        this.connPromise = conn;
    }
    /**
     * user_point 튜플 point_score 값 업데이트, update_user_point_proc 프로시저를 사용해 업데이트한다.
     * @param userId 
     *  유저 uuid값
     */
    public updateUserPoint = async (userId : string)  => {
        const conn = await this.connPromise;
        await conn.execute(updateUserPointQuery(userId));
    };
    /**
     * user_point 튜플 조회 함수.
     * @param userId 
     *  유저 uuid값
     * @returns 
     * 조회된 유저 포인트, 단 조회가 없을시 null 값을 리턴
     */
    public selectUserPoint = async (userId : string) : Promise<UserPoint | null> => {
        const conn = await this.connPromise;
        const [rows,_] : [RowDataPacket[],FieldPacket[]] = await conn.query(selectUserPointQuery(userId));

        if(rows[0] == undefined)return null;
        return transUserPoint(rows[0]);
    };
 /**
     * user_point 튜플 생성 및 초기화 함수.
     * @param userId 
     *  유저 uuid값
     */
    public createUserPoint = async (userId : string) => {
        const conn = await this.connPromise;
        await conn.execute(createUserPointQuery(userId));
    };
    
}

export default UserDao;