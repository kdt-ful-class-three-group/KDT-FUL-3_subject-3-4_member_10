//* 서버 생성하기 //
// http 리콰이어 불러오기 , url 불러오기 ,fs
const { error } = require('console');
const http = require('http');
const url = require('url');
const fs = require('fs');
const qs = require('querystring');
const { json } = require('stream/consumers');
// const path = require('path');
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
    } else if (pathname === '/writePost.html') {
      const write = fs.readFileSync('writePost.html')
      res.writeHead(200, {"Content-type": "text/html"})
      res.end(write);
    } if (pathname === '/list.html') {
      const list = fs.readFileSync('list.html')
      res.writeHead(200, {"Content-type": "text/html"})
      res.end(list);
    }
  }

  
  //* POST 생성(글 작성 부분)//
  //form data JSON 변환 과정 //
  else if (pathname === '/add' && req.method === 'POST') {
    let body = "";
    req.on('data', (data) => {
      body = body + data
    })
    req.on('end', () => {

      addPost(body);
      const addPage = fs.readFileSync('writePost.html');
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(addPage);
      //   const jsonFile = body.toString();
      //   const parseFile = qs.parse(jsonFile);
      //   const test = JSON.stringify(parseFile, null, 2);
      //   fs.appendFileSync('data.json', test);

      // res.writeHead(200, { "Content-type": "text/hmtl" });
      // res.end(postList());

    })
  }
});

//* 포트 8000설정, 콘솔로그 주소찍기//
server.listen(8000, function () {
  console.log('서버진행중.. http://localhost:8000/');
});

function addPost(body) {
    const parseFile = qs.parse(body);
    const stringJson = JSON.stringify(parseFile);
  const psJson = JSON.parse(stringJson);
  const arrJson = postList();
  arrJson.push(psJson);
  fs.writeFile('data.json', JSON.stringify(arrJson, null, 2), () => {
    console.log('데이터 저장');
  });
};






      
function postList() {
  const jsonList = [];
  const jsonFile = fs.readFileSync('data.JSON').toString();
  if (jsonFile !== '') {
    const dataObj = JSON.parse(jsonFile);
    console.log(dataObj);
    dataObj.forEach((element) => {
      jsonList.push(element);
    });
  }
  return jsonList;
}