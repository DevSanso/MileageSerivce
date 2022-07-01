import eventController from './api/event-controller';
import pointController from './api/point-controller';


export default {
    /** /event 요청 처리 컨트롤러 */
    event : eventController,
    /** 유저 총합,리뷰 포인트, 포인트 증감 로그등 조회하는 컨트롤러 */
    point : pointController
}