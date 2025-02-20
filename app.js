//* 서버 생성하기 //
// http 리콰이어 불러오기 , url 불러오기 ,fs
const { error } = require('console');
const http = require('http');
const url = require('url');
const fs = require('fs');
const qs = require('querystring');
const path = require('path');
// createServer 활용, request respose 매개변수//
// error404 설정( error.html을 만들어서 html로 가게 요청)
const server = http.createServer(function (req, res, err) {
  if (err) {
    const errorFile = fs.readFileSync('error.html');
    res.writeHead(404, { "Content-Type": "text/html" })
    res.end(errorFile);
  }
  //* GET 생성(홈,글 목록, 글상세) //
  // method,url 변수처리삭제 , pathname 활용//
  const pathname = url.parse(req.url, true).pathname;
  if (req.method === 'GET') {
    if (pathname === '/') {
      const home = fs.readFileSync('index.html');
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(home);
    } else if (pathname === '/list') {
      res.writeHead(200)
      res.end('list')
    } if (pathname === '/info') {
      res.writeHead(200)
      res.end('info')
    }
  }

  
  //* POST 생성(글 작성 부분)//
  //form data JSON 변환 과정 //
  else if (pathname === '/add' && req.method === 'POST') {
    let body = "";
    req.on('data', (chunk) => {
      body = body + chunk;
      const filePath = path.join(__dirname, "data.json")
      fs.writeFile(filePath, JSON.stringify(chunk));
    })
    req.on('end', () => {
      const string = qs.parse(body);
      console.log(string);
      fs.appendFileSync('data.JSON', string);
    })
  }
});

//* 포트 8000설정, 콘솔로그 주소찍기//
server.listen(8000, function () {
  console.log('서버진행중.. http://localhost:8000/');
});