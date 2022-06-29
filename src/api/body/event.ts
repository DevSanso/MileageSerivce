

export default interface RequestBody {
    type : string,
    action :  string,
    reviewId : string,
    content : string | null,
    attachedPhotoIds : Array<string>,
    userId : string,
    placeId : string
}