import mysql from 'mysql2/promise';





const deleteAllData = async (conn : mysql.PoolConnection) => {
    await conn.execute("DELETE FROM review;");
    conn.execute("DELETE FROM review_create_log;");
    conn.execute("DELETE FROM review_deleted_log;");
    conn.execute("DELETE FROM user_point;");
    conn.execute("DELETE FROM point_plus_log;");
}


export default deleteAllData;