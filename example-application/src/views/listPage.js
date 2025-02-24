import { postList } from "../post.js";
//* 리스트 페이지 구현 (html파일로 만들면 읽는데 불편함이 있어 js파일 함수로 동적 html생성함.)
function listPage() {
  const posts = postList();
  let listitems = '';
  

  //* forEach문으로 json데이터의 제목갯수만큼 리스트 추가
  //* 상세보기버튼을 추가하기위해서 매개변수 1개 더 생성.
  posts.forEach((post, index) => {
    listitems += `<li>${post.head}<button onclick="location.href='/info?index=${index}'">상세보기</button>
</li>`;  
  });

  //* html 구조. 글목록에 json데이터 li태그로 만들기 위해 콜백함수 사용.//
  return `
  <!DOCTYPE html>
  <head>
    <meta charset="UTF-8">
    <title>글 목록</title>
  </head>
  <body>
  <div>  
    <a href="/">홈</a>
    <a href="/example-application/public/writePost.html">글 작성</a>
    <a href="/list">글 목록</a>
    <h1>글 목록</h1>
    ${listitems}
    </div>
  </body>
  </html>
  `
};

//*상세보기 페이지 
//* 상세보기 페이지도 위의 리스트 페이지와 같이 콜백으로 동적 html 구현.
function infoPage(index) {
  const posts = postList();

  if (posts[index]) {
    return `
    <!DOCTYPE html>
    <head>
      <meta charset="UTF-8">
      <title>글 상세보기</title>
    </head>
    <body>
    <div>  
      <a href="/">홈</a>
      <a href="/example-application/public/writePost.html">글 작성</a>
      <a href="/list">글 목록</a>
      <h1>제목: ${posts[index].head}</h1>
      <p>내용: ${posts[index].content}</p>
      <button onclick="location.href='/edit?index=${index}'">수정</button>
      <form action="/delete" method="POST">
      <input type="hidden" name="index" value="${index}">
      <button type="submit">삭제</button>
      </form>
    </div>
    </body>
    </html>
  `;
  }
}

function editPage(index) {
  const posts = postList();
if(posts[index])
  return `
    <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>글 수정</title>
  </head>
  <body>
    <div>
      <a href="/">홈</a>
      <a href="/example-application/public/writePost.html">글 작성</a>
      <a href="/list">글 목록</a>
      <h1>글 수정</h1>
      <form action="/update" method="POST">
        <input type="hidden" name="index" value="${index}">
        <label>제목: <input type="text" name="head" value="${posts[index].head}" required></label>
        <br>
        <label>내용: <textarea name="content" required>${posts[index].content}</textarea></label>
        <br>
        <button type="submit">수정 완료</button>
      </form>
    </div>
  </body>
  </html>
  `
}
export { listPage, infoPage, editPage };