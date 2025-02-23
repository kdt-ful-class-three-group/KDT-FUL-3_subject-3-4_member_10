//* 서버 생성하기 //
// http, url, fs 불러왔음.
// addPost,listPage 함수도 불러옴
import http from 'http';
import url from 'url';
import fs from 'fs';
import { addPost, postList } from './post.js';
import { listPage, infoPage } from './listPage.js';

//* createServer 활용, request respose 매개변수//
//* error404 설정( error.html을 만들어서 html로 가게 요청)
const server = http.createServer(function (req, res, err) {
  if (err) {
    const errorFile = fs.readFileSync('error.html');
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end(errorFile);
  }

  //* GET 생성(홈,글 목록, 글상세) //
  const pathname = url.parse(req.url, true).pathname;
  const query = url.parse(req.url, true).query;
  if (req.method === 'GET') {
    if (pathname === '/') {
      const home = fs.readFileSync('index.html');
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(home);
    } else if (pathname === '/writePost.html') {
      const write = fs.readFileSync('writePost.html');
      res.writeHead(200, { "Content-type": "text/html" });
      res.end(write);
      //* /list 동적으로만든 글 목록 페이지 경로 추가 //
    } else if (pathname === '/list') {
      const list = listPage();  
      res.writeHead(200, { "Content-type": "text/html" });
      res.end(list);

      //* /info 글 상세보기 경로 요청 추가
    } else if (pathname === '/info') {
      const index = query.index;
      
      res.writeHead(200, { "Content-type": "text/html" });
      res.end(infoPage(index));
    }
  }

  //* POST 생성(글 작성 부분)//
  else if (pathname === '/add' && req.method === 'POST') {
    let body = "";
    req.on('data', (data) => {
      body = body + data;
    });
    req.on('end', () => {
      addPost(body);
      // 자꾸 input에 데이터를 입력해도 list에 바로 올라가지 않는 오류 수정 완료.
      // 글 작성후 글 목록으로 리다이렉트 
      res.writeHead(302, { "Location": "/list" });  
      res.end();
    });
  }
});

//* 포트 8000설정, 콘솔로그 주소찍기//
server.listen(8000, function () {
  console.log('서버진행중.. http://localhost:8000/');
});
