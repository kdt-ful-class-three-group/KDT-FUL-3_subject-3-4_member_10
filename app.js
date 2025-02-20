//* 서버 생성하기 //
// http 리콰이어 불러오기 //
const http = require('http');

// createServer 활용, request respose 매개변수//
const server = http.createServer(function (req, res) {
  
//todo GET 생성//

});

//* 포트 8000설정, 콘솔로그 주소찍기//
server.listen(8000, function () {
  console.log('서버진행중.. http://localhost:8000/');
});