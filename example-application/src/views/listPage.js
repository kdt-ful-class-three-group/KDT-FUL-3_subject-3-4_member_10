//* postList()함수필요해서 import
import { postList } from "../post.js";

//* 리스트 페이지 구현 (html파일로 만들면 읽는데 불편함이 있어 js파일 함수로 동적 html생성함.)
function listPage() {
  const posts = postList();
  let listitems = '';
  
  //* forEach문으로 json데이터의 제목갯수만큼 리스트 추가
  //* 상세보기버튼을 추가하기위해서 매개변수 1개 더 생성.
  // 상세보기하고싶은 index페이지로 리다이렉션 경로이동 //
  posts.forEach((post, index) => {
    listitems += `<li>${post.head}<button onclick="location.href='/info?index=${index}'">자세히</button>
</li>`;  
  });

  //* html 구조. 글목록에 json데이터 li태그로 만들기 위해 콜백함수 사용.//
  return `
  <!DOCTYPE html>
  <head>
    <meta charset="UTF-8">
    <title>글 목록</title>
    </head>
    <link rel="stylesheet" href="/example-application/public/css/style.css">
  <body>
  <div id="root">
  <div class="nav">  
    <a href="/">홈</a>
    <a href="/example-application/public/writePost.html">글 작성</a>
    <a href="/list">글 목록</a>
    </div>
    <h1>글 목록</h1>
    <div class="content-box">
    ${listitems}
    </div>
  <div>
  </body>
  </html>
  `
};

//*상세보기 페이지 
//* 상세보기 페이지도 위의 리스트 페이지와 같이 콜백으로 동적 html 구현.
function infoPage(index) {
  const posts = postList();
  //* new Date 메서드 활용. 
  // newDate만 사용했을경우 -> Mon Feb 24 2025 14:04:47 GMT+0900 (대한민국 표준시)
  // 처음에는 new Date().toISOString() 을 사용했는데 뒤에 '초'와 필요없는 영어가 나와서 LocaleString사용.
  const date = new Date().toLocaleString();
  if (posts[index]) {
    return `
    <!DOCTYPE html>
    <head>
      <meta charset="UTF-8">
      <title>글 상세보기</title>
    </head>
    <link rel="stylesheet" href="/example-application/public/css/style.css">
    <body>
    <div class="nav">  
      <a href="/">홈</a>
      <a href="/example-application/public/writePost.html">글 작성</a>
      <a href="/list">글 목록</a>
    </div>
    <div class="content-box">
    <h2>${posts[index].head}</h2>
      <p>내용: ${posts[index].content}</p>
      <p>작성일: ${date}</p>
      <div id="info-btn">
      <button onclick="location.href='/edit?index=${index}'">수정</button>
      <form action="/delete" method="POST">
      <button type="submit">삭제</button>
      <input type="hidden" name="index" value="${index}">
      </div>
      </form>
    </div>
    </body>
    </html>
  `;
  }
}


//* 수정페이지 함수
// posts는 json 데이터를 담은 배열 // 
function editPage(index) {
  const posts = postList();
if(posts[index])
  return `
    <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>글 수정</title>
    <link rel="stylesheet" href="/example-application/public/css/style.css">
  </head>
  <body>
    <div class="nav">
      <a href="/">홈</a>
      <a href="/example-application/public/writePost.html">글 작성</a>
      <a href="/list">글 목록</a>
    </div>
    <h1>글 수정</h1>
    <div class="content-box">
      <form action="/update" method="POST">
        <input type="hidden" name="index" value="${index}">
        <p>제목: </p><input type="text" name="head" value="${posts[index].head}">
        <br>
        <p>내용: </p><textarea name="content" >${posts[index].content}</textarea>
        <br>
        <button type="submit">수정 완료</button>
      </form>
    </div>
  </body>
  </html>
  `
}
export { listPage, infoPage, editPage };