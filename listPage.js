import { postList } from "./post.js";

function listPage() {
  const posts = postList();
  let listitems = '';
  
  posts.forEach((post) => {
    listitems += `<li>${post.head}</li>`;  
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

export { listPage };