//* 서버 생성하기 //
// http 리콰이어 불러오기 , url 불러오기
const { error } = require('console');
const http = require('http');
const url = require('url');
// createServer 활용, request respose 매개변수//
const server = http.createServer(function (req, res) {
  
  //* GET 생성(홈,글 목록, 글상세) 404에러 설정.//
  // method,url 변수처리삭제 , pathname 활용//
  const pathname = url.parse(req.url, true).pathname;
  try {
    if (req.method === 'GET') {
      if (pathname === '/') {
        res.writeHead(200);
        res.end('메인 페이지');
      } else if (pathname === '/list') {
        res.writeHead(200)
        res.end('글 목록')
      } if (pathname === '/info') {
        res.writeHead(200)
        res.end('상세보기')
      }
    }
  } catch(error) {
    console.log(error);
    res.statusCode(404, {"Content-Type": "application:json"})
    res.end();
  }
  //* POST 생성(글 작성 부분)//
  if (pathname === '/add' && req.method === 'POST') {
    
  }
  
 
});

//* 포트 8000설정, 콘솔로그 주소찍기//
server.listen(8000, function () {
  console.log('서버진행중.. http://localhost:8000/');
});