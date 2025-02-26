import { divTag } from "../forms/tag.js";

//* html 만드는 함수 //
function template(title, content) {
  const style = `
  <link rel="stylesheet" href="/public/css/style.css">
  `
  const link = `
      <a href="/">홈</a>
      <a href="/write">글 작성</a>
      <a href="/list">글 목록</a>
  `
  const navForm = divTag(link, "nav")
  
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>${title}</title>
    ${style}
  </head>
  <body>
    ${navForm}
    <div>
    <h1>${title}</h1>
    ${content}
    </div>
  </body>
  </html>
  `
};

export { template };
