

export default interface RequestBody {
    type : string,
    action :  string,
    reviewId : string,
    content : string,
    attachedPhotoIds : Array<string>,
    userId : string,
    placeId : string
}