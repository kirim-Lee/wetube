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