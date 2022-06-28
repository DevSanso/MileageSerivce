export enum ErrorType {
    Request,
    System,
    Unknown
}

export class ErrorObject {
    public type : ErrorType
    public message : string
    public crashPlace : string
    public code : number

    public constructor(type : ErrorType,crashPlace : string,code : number,message : string) {
        this.type = type;
        this.code = code;
        this.crashPlace = crashPlace;
        this.message = message;
    }
}