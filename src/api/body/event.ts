

export default interface RequestBody {
    type : string,
    action :  string,
    reviewId : string,
    content : string | null | undefined,
    attachedPhotoIds : Array<string> | null | undefined,
    userId : string,
    placeId : string
}


interface DeleteRequestBody {
    type : string,
    action :  string,
    reviewId : string,
}