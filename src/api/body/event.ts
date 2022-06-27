

export default interface RequestBody {
    type : string,
    action : "ADD" | "MOD" | "DELETE" | string,
    reviewId : string,
    content : string,
    attachedPhotoIds : Array<string>,
    userId : string,
    placeId : string
}