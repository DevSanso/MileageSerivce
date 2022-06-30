import mysql from 'mysql2/promise';





const deleteAllData = async (conn : mysql.PoolConnection) => {
    await conn.execute("DELETE FROM review;");
    await conn.execute("DELETE FROM review_create_log;");
    await conn.execute("DELETE FROM review_deleted_log;");
    await conn.execute("DELETE FROM user_point;");
    await conn.execute("DELETE FROM point_plus_log;");
    await conn.execute("DELETE FROM review_content;");
}


export default deleteAllData;