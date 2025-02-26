import { template } from "../Template/template.js";
import { divTag } from "../forms/tag.js";

function addPage() {
  const addContent = `
  <form action="/add" method="post">
      <p>제목: </p><input type="text" name="head">
      <p>내용: </p><textarea name="content"></textarea>
      <button type="submit">작성</button>
    </form>
  `
  return template('글 작성', divTag(addContent, "content-box"));
}

export { addPage };