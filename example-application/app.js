//* 서버 생성하기 //
import fs from 'fs';
import { addPost, updatePost, deletePost } from './src/models/post.js';
import { addPage } from './src/views/pages/add.js';
import { alertPage } from './src/views/pages/alert.js';
import { editPage } from './src/views/pages/edit.js';
import { infoPage } from './src/views/pages/info.js';
import { listPage } from './src/views/pages/list.js';
import { errorPage } from './src/views/pages/error.js';

//todo express사용해보기 /
import express from 'express';
const app = express();
const PORT = 8000;
//* express.urlencoded : HTTP POST 요청의 본문(body)에 인코딩한 데이터를 해석, req.body 객체에 채워넣는 역할
//* extended: true : qs모듈을 사용하여 쿼리스트링을 해석한다.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// 정적인 css파일을 불러오기위해서 express.static 사용.
app.use('/public', express.static('public'));

//* 기본 홈 설정. + err페이지 설정과 함께 한다.(404).
//* GET 부분 
app.get('/', (req, res) => {
  fs.readFile('index.html', (err, data) => {
    if (err) {
      res.status(404).send(errorPage());
    } else {
      res.status(200).send(data.toString());
    }
  })
});
//* 글 작성 페이지 요청 /write
app.get('/write', (req, res) => {
  res.status(200).send(addPage());
});
//* 글 목록 페이지 요청 /list
app.get('/list', (req, res) => {
  res.status(200).send(listPage())
});
//* 글 상세보기 페이지 요청 /info
app.get('/info', (req, res) => {
  const index = req.query.index
  res.status(200).send(infoPage(index))
});
app.get('/edit', (req, res) => {
  const index = req.query.index
  res.status(200).send(editPage(index))
})


//* POST 방식
//*  /add, /update, /delete 처리
app.post('/add', (req, res) => {
  addPost(req.body);
  console.log('데이터가 저장되었습니다.', req.body);
  res.status(200).send(alertPage('작성되었습니다.'))
});
app.post('/update', (req, res) => {
  const { index, head, content } = req.body;
  updatePost(parseInt(index, 10), head, content);
  console.log('데이터가 수정되었습니다.', req.body);
  res.status(200).send(alertPage('수정되었습니다.'))
});
app.post('/delete', (req, res) => {
  const index = req.body;
  deletePost(parseInt(index, 10));
  console.log('데이터가 삭제되었습니다.')
  res.status(200).send(alertPage('삭제되었습니다.'))
})



//* 포트 8000설정, 콘솔로그 주소찍기//
app.listen(PORT, function () {
  console.log('서버진행중.. http://localhost:8000/');
});

