//* 서버 생성하기 //
// http 리콰이어 불러오기 //
const http = require('http');

// createServer 활용, request respose 매개변수//
const server = http.createServer(function (req, res) {
  
  //todo 경로 받아오는 작업 fs활용
  //* GET 생성(홈,글 목록, 글상세)//
  // method, url 변수//
  const method = req.method;
  const url = req.url;
  if (method === 'GET') {
    if (url === '/') {
      
    } else if (url === '/list') {
      
    } else if (url === '/info') {
      
    }
    //* POST 생성(글 작성 부분)//
    //todo .on(data,end) 활용//
  } else if (method === 'POST') {
    if (url === '/add') {
      
    }
  }


});

//* 포트 8000설정, 콘솔로그 주소찍기//
server.listen(8000, function () {
  console.log('서버진행중.. http://localhost:8000/');
});