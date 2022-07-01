# /events


**URL** : `/events`

**Method** : `POST`

**Data constraints**

요청 body 데이터

```typescript
{
    type: "REVIEW",
    action: "ADD" | "MOD" | "DELETE",
    reviewId : string //uuid,
    content : string | null,
    attachedPhotoIds : Array<string> /*[]uuid*/ | null,
    userId : string //uuid,
    placeId : string
}
```

데이터 예시

```json
{
    "type": "REVIEW",
    "action": "ADD", /* "MOD", "DELETE" */
    "reviewId": "240a0658-dc5f-4878-9381-ebb7b2667772",
    "content": "좋아요!",
    "attachedPhotoIds": ["e4d1a64e-a531-46de-88d0-ff0ed70c0bb8", "afb0cef2-
    851d-4a50-bb07-9cc15cbdc332"],
    "userId": "3ede0ef2-92b7-4817-a5f3-0c575361f745",
    "placeId": "2e4baf1c-5acb-4efb-a1af-eddada31b00f"
}
```
```json
{
    "type": "REVIEW",
    "action": "MOD", /* "MOD", "DELETE" */
    "reviewId": "240a0658-dc5f-4878-9381-ebb7b2667772",
    "content": null,
    "attachedPhotoIds": null,
    "userId": "3ede0ef2-92b7-4817-a5f3-0c575361f745",
    "placeId": "2e4baf1c-5acb-4efb-a1af-eddada31b00f"
}
```

## Success Response

*  type 값이 ADD 일때  
    **필수 속성값** : "type","action","reviewId","userId","placeId" ,"content"  
    **옵션** :  "attachedPhotoIds"

    **상태 코드** : `201 CREATED`

    **Content example**

```
    "Ok"
```
*  type 값이 MOD 일때  
    **필수 속성값** : "type","action","reviewId","userId","placeId"  
    **옵션** : "content" , "attachedPhotoIds"

    **상태 코드** : `200 OK`

    **Content example**

```
    "Ok"
```

*  type 값이 DELETE 일때  
    **필수 속성값** : "review"

    **상태 코드** : `204 No Content`

    **Content example**

```
    "Ok"
```

