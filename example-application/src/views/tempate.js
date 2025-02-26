import { createTag,divTag } from "./tag.js";

//* html 만드는 함수 //
function template(title, content) {
  const style = `
  <link rel="stylesheet" href="/example-application/public/css/style.css">
  `
  const nav = `
    <div class="nav">
      <a href="/">홈</a>
      <a href="/example-application/public/writePost.html">글 작성</a>
      <a href="/list">글 목록</a>
    </div>
  `
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>${title}</title>
    ${style}
  </head>
  <body>
    ${nav}
    <div>
    <h1>${title}</h1>
    ${content}
    </div>
  </body>
  </html>
  `
};

export { template };
