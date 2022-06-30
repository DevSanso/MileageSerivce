import {uuid} from 'uuidv4';
import EventBodyType from '../../../src/api/body/event';

export const makeRandomEventBody = (comment : string) : EventBodyType=> {
    const reviewId = uuid();
    const placeId = uuid();
    const userId = uuid();
    const imageIds = [uuid(),uuid()];

    return {
        action : "ADD",
        type : "REVIEW",
        reviewId : reviewId,
        content : comment,
        attachedPhotoIds : imageIds,
        userId : userId,
        placeId : placeId
    };
};
type Action = "ADD" | "MOD"|  "DELETE";
export const makeBasicRandomEventBody = (action : Action) : Omit<EventBodyType,"attachedPhotoIds" | "content"> => {
    const reviewId = uuid();
    const placeId = uuid();
    const userId = uuid();
    
    return {
        action : action,
        type : "REVIEW",
        reviewId : reviewId,
        userId : userId,
        placeId : placeId
    }
}