# 설치
## Requirement
### 필요 프로세스
```
mysql(MySQL Command Line Client)
nodejs : v18.4.0
```
## 주의
데이터 베이스의 인코딩을 utf8mb4로 변경해주세요
## 설치 과정
1. 깃협 저장소의 releases에서 [v0.10.0](https://github.com/DevSanso/MileageSerivce/releases/tag/v0.10.0에서 app.zip 파일을 다운로드후 압축 해제 

# 실행
## 실행 순서
1. app.zip 압축 해제후 해당 폴더로 이동
2. 프로세스 환경 변수를 설정
3. dbInit.js 스크립트를 node로 실행하여 데이터베이스 초기화 
4. dbInit.js가 정상적으로 실행 된후, app.js를 node로 실행하여 서버 시작

```
cd 압축해제된 폴더
node ./dbInit.js
node ./app.js
```
## 프로세스 환경 변수
|환경변수 | 설명 | 기본값 |
| :----------- | --------: | ---------: |
|DATABASE_HOST|데이터베이스 호스트|localhost|
|DATABASE_PORT|데이터베이스 포트|3306|
|DATABASE_USER|데이터베이스 유저|root|
|DATABASE_PASSWORD|데이터베이스 패스워드||
|DATABASE_DBNAME|데이터베이스 접근 디비이름||
|SERVER_PORT|실행할 서버 포트|3000|





# 프로젝트 명령어
* ## npm run compile
   프로젝트 타입스크립트 소스코드를 자바스크립트 소스코드로 컴파일, 컴파일된 소스코드는 dist 폴더에 저장.

* ## npm run bundle
   dist 폴더에 저장된 컴파일된 소스코드를 하나의 파일로 번들링 후 bundle 폴더에 저장
* ## npm run test
   테스트 실행



# Rest 문서  
[/events](./docs/rest/events.md)  
[/point/user](./docs/rest/point_user.md)  
[/point/reivew](./docs/rest/point_review.md)  
[/point/log/plus](./docs/rest/point_log_plus.md)
  
# 참고
[프로젝트 패키지 개요](docs/project.md)








