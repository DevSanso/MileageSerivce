/**
 * 
 *  /events 리퀘스트 body 객체 타입
 * 
 * @param type - "REVIEW" 고정값
 * @param action - "ADD" | "MOD" | "DELETE" 고정값
 * @param reviewId - review uuid 값
 * @param content  - 이용자 리뷰의 감상평
 * @param attachedPhotoIds - 이미지 uuid 배열
 * @param  userId - 유저 uuid
 * @param  placeId - 장소 uuid
 */
export default interface RequestBody {
    type : string,
    action :  string,
    reviewId : string,
    content : string | null,
    attachedPhotoIds : Array<string> | null | undefined,
    userId : string,
    placeId : string
}

/**
* @deprecated
*/
interface DeleteRequestBody {
    type : string,
    action :  string,
    reviewId : string,
}