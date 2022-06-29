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