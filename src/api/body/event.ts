

export default interface RequestBody {
    type : string,
    action :  string,
    reviewId : string,
    content : string | undefined,
    attachedPhotoIds : Array<string> | undefined,
    userId : string,
    placeId : string
}