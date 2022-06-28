export enum ErrorType {
    Request,
    System,
    Unknown
}

export class ErrorObject {
    public type : ErrorType
    public message : string
    public code : number

    public constructor(type : ErrorType,code : number,message : string) {
        this.type = type;
        this.code = code;
        this.message = message;
    }
}