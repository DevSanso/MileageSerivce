# /point/review


**URL** : `/point/review`

**Method** : `GET`



**Query String** : `reviewId : string`

**Example Url**
```
    http://localhost:3000/point/review?reviewId="uuid"
```

## Success Response
**상태 코드** : `200 OK`  
응답 body 데이터
``` typescript
{
    point : number
}
```
## Fail Response
**상태 코드** : `400 Bad Request`  
**응답 body 데이터** : error message
``` typescript
//example
"not exist userId"
```


