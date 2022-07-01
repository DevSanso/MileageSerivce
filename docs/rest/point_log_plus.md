# /point/log/plus


**URL** : `/point/log/plus`

**Method** : `GET`


**Example Url**
```
    http://localhost:3000/point/log/plus
```

## Success Response
**상태 코드** : `200 OK`  
응답 body 데이터
``` typescript
[
    {
        reviewId : string
        textWritePlusFlag : boolean
        updateImageFlag : boolean
        firstReviewFlag : boolean
        logDate : string
    }
    //....
]
```



