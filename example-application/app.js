//* 서버 생성하기 //
import fs from 'fs';
import qs from 'querystring';
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
//* 
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



//* 포트 8000설정, 콘솔로그 주소찍기//
app.listen(PORT, function () {
  console.log('서버진행중.. http://localhost:8000/');
});

// const server = http.createServer(function (req, res, err) {
//   if (err) {
//     res.writeHead(404, { "Content-Type": "text/html" });
//     res.end(errorPage('Error'));
//   }
//   //* GET 생성(홈,글 목록, 글상세) //
//   const pathname = url.parse(req.url, true).pathname;
//   const query = url.parse(req.url, true).query;
//   if (req.method === 'GET') {
//     // 기본메인페이지가 될 index.html //
//     if (pathname === '/') {
//       const home = fs.readFileSync('index.html');
//       res.writeHead(200, { "Content-Type": "text/html" });
//       res.end(home);
//       // 하위폴더로 나눠서 경로가 복잡해짐 //
//     } else if (pathname === '/write') {
//       const write = addPage();
//       res.writeHead(200, { "Content-type": "text/html" });
//       res.end(write);
//       //* /list 동적으로만든 글 목록 페이지 경로 추가 //
//     } else if (pathname === '/list') {
//       // 동적으로 만든 html 함수 -> listPage()
//       const list = listPage();
//       res.writeHead(200, { "Content-type": "text/html" });
//       res.end(list);
//       //* /info 글 상세보기 경로 요청 추가
//       // 여기도 동적으로 만든 html 함수 -> infoPage()와 editPage()
//     } else if (pathname === '/info') {
//       const index = query.index;
//       res.writeHead(200, { "Content-type": "text/html" });
//       res.end(infoPage(index));
//       //* /edit 글 수정 경로 요청 추가 info와 같은 방식
//     } else if (pathname === '/edit') {
//       const index = query.index;
//       res.writeHead(200, { "Content-Type": "text/html" });
//       res.end(editPage(index));
//     } else if (pathname === '/public/css/style.css') {
//       const style = fs.readFileSync('./public/css/style.css')
//       res.writeHead(200, { "Content-Type": "text/css" });
//       res.end(style);
//     }
//   }

//   //* POST 생성(글 작성 부분)//
//   //* 경로 /add로 요청.
//   // post로 받아온 데이터를 리스트화하는 과정 //
//   //todo POST 상위 부모로 뽑기 
//   else if (req.method === "POST") {
//     if (pathname === '/add') {
//       let body = "";
//       req.on('data', (data) => {
//         body = body + data;
//       });
//       req.on('end', () => {
//         addPost(body);
//         // 자꾸 input에 데이터를 입력해도 list에 바로 올라가지 않는 오류 수정 완료.
//         // 글 작성후 글 목록으로 리다이렉트 
//         res.writeHead(200, { "Content-type": "text.html" });
//         res.end(alertPage('작성되었습니다.'), console.log('데이터 저장'));
//       });
//       //* /update 경로 요청후 POST 데이터 받고 리스트 수정.
//     } else if (pathname === '/update' && req.method === 'POST') {
//       let body = "";
//       req.on('data', (data) => {
//         body = body + data;
//       })
//       req.on('end', () => {
//         const qsPs = qs.parse(body);
//         const index = parseInt(qsPs.index, 10);
//         const head = qsPs.head;
//         const content = qsPs.content;
//         // json데이터에 덮어쓰는 함수 .
//         updatePost(index, head, content);
//         res.writeHead(200, { "Content-type": "text/html" });
//         res.end(alertPage('수정되었습니다.'), console.log('데이터 수정'));
//       })
//       //* 글 삭제 POST방식으로 /delete요청받아옴.//
//     } else if (pathname === '/delete' && req.method === "POST") {
//       let body = "";
//       req.on('data', (data) => {
//         body = body + data;
//       })
//       req.on('end', () => {
//         const qsPs = qs.parse(body);
//         // 문자열을 숫자열로 전환 parseInt() 뒤에 10은 10진수를 의미. 원하는 값이 실수면 parseFloat()
//         const index = parseInt(qsPs.index, 10);

//         // 글을 삭제하는 함수 //
//         deletePost(index);
//         res.writeHead(200, { "Content-type": "text/html" });
//         res.end(alertPage('삭제되었습니다.'), console.log('데이터 삭제'));
//       })
//     }
//   }
// });