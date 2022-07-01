# /point/user


**URL** : `/point/user`

**Method** : `GET`



**Query String** : `userId : string`

**Example Url**
```
    http://localhost:3000/point/user?userId="uuid"
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



