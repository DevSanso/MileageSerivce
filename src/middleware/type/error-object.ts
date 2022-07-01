

/**에러 타입 */
export enum ErrorType {
    /**사용자 요청 에러*/
    Request,
    /**시스템 내부 에러*/
    System,
    /**알수 없는 에러 */
    Unknown,
    /** 데이터베이스 관련 에러 */
    DB
}
/**
 * 에러 미들웨어에서 사용할 에러 객체
 */
export class ErrorObject {
    public type : ErrorType
    public message : string
    public crashPlace : string
    public code : number
    /**
     * 
     * @param type 
     * 에러 타입
     * @param crashPlace 
     * 에러가 일어난 시기 혹은 함수 이름
     * @param code 
     * http 응답에 사용할 status code
     * @param message 
     * 에러 메세지
     */
    public constructor(type : ErrorType,crashPlace : string,code : number,message : string) {
        this.type = type;
        this.code = code;
        this.crashPlace = crashPlace;
        this.message = message;
    }
}