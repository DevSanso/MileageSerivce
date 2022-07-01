


 
export default interface PointPlusLog {
    /**리뷰 uuid 값 */
    reviewId : string
    /**리뷰 글 생성 플래그 */
    textWritePlusFlag : boolean
    /**리뷰 이미지 uuid 생성 플래그 */
    updateImageFlag : boolean
    /**첫번째 리뷰 확인 유무 플래그 */
    firstReviewFlag : boolean
    /**생성된 시기 */
    logDate : string
}