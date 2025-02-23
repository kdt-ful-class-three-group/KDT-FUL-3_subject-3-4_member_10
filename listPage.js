import { postList } from "./post.js";

function listPage() {
  const posts = postList();
  let listitems = '';
  

  //* forEach문으로 json데이터의 제목갯수만큼 리스트 추가
  //* 상세보기버튼을 추가하기위해서 매개변수 1개 더 생성.
  posts.forEach((post, index) => {
    listitems += `<li>${post.head}<button onclick="location.href='/info?index=${index}'">상세보기</button>
</li>`;  
  });

  return `
  <!DOCTYPE html>
  <head>
    <meta charset="UTF-8">
    <title>글 목록</title>
  </head>
  <body>
  <div>  
    <a href="/">홈</a>
    <a href="/writePost.html">글 작성</a>
    <a href="/list">글 목록</a>
    <h1>글 목록</h1>
    ${listitems}
    </div>
  </body>
  </html>
  `
};

//*상세보기 페이지 
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
      <a href="/list">글 목록</a>
      <h1>제목: ${posts[index].head}</h1>
      <p>내용: ${posts[index].content}</p>
      <button onclick="location.href='/edit?index=${index}'">수정</button>
    </div>
    </body>
    </html>
  `;
  }
}
export { listPage, infoPage};