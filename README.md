# WeTube

Cloning Youtube with Vanilla and NodeJS

# nodemon --exec babel-node index.js --delay 2

# morgan 
- logger
- yarn add morgan
- app.use(morgan("dev")); 

# helmet
- head change
- nodejs secure

# cookie parser
- yarn add cookie-parser

# body parser
- yarn add body-parser

# Pug
- app.set('view engine', 'pug') // 엔진 설정
- 기본 폴더는 views
- (req, res) => res.render('home') // 사용 views/home.pug 를 사용한다는 의미
## layouts 사용
### layouts/main.png 
- block {content}
### home.png
```
 block content
    p 내용
```
## partials 사용
- include 경로

## javascript 사용
- #{자바스크립트입력}

## pug 에 미들웨어를 사용해 변수 전달
- locals 이용
- app.use(localMiddleware)
```
const localMiddleware = (req, res, next) => {
    res.locals.var1 = 'name';
    next();
}
```
- 사용 pug 에서 #{var1} 로 사용
- 특정 뷰에서 사용하려면
- res.render('view', {var1: 'name'}) 두번째 인자에서 전달가능

## local tunnel
- npm install -g localtunnel
- lt --port (PORT) 
- localhost 를 https 로 바꿔줌

## Pages:

- [x] Home
- [x] Join
- [x] Login
- [x] Search
- [x] User Detail
- [x] Edit Profile
- [x] Change Password
- [x] Upload
- [x] Video Detail
- [x] Edit Video

## aws
- yarn add aws-sdk
- yarn add multer-s3