

/**
 * 실행한 서버의 포트,
 * 환경변수 SERVER_PORT 의 값을 읽어온다.
 */
export const port = (()=> {
    const echo = process.env.SERVER_PORT != undefined ? process.env.SERVER_PORT : "3000";
    const p = parseInt(echo);
    if(isNaN(p))return 3000;
    return p;
})(); 