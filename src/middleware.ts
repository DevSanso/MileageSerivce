import bodyParser from 'koa-bodyparser';
import db from './middleware/db-conn';
import connRelease from './middleware/db-conn-release';
import daoProvider from './middleware/dao-provider';
import error from './middleware/error';

/**
 * @readonly
 */
export default {
    /** bodyParser 서드 라이브러리 */
    bodyParser : bodyParser(),
    /** 데이터베이스 커넥션 생성후 컨텍스트에 할당하는 미들웨어*/
    db : db,
    /** 데이터베이스 커넥션 자동 할당 해제하는 미들웨어 */
    connRelease : connRelease,
    /** 생성된 데이터베이스 커넥션을 이용하여 각 dao 팩토리 객체를 컨텍스트에 할당*/
    daoProvider : daoProvider,
    /** throw 된 에러들을 처리하는 미들웨어*/
    error : error
}