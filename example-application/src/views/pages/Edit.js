import { postList } from "../../models/post.js";
import { template } from "../Template/template.js"
import { divTag } from "../forms/tag.js"



//* 수정페이지 함수
// posts는 json 데이터를 담은 배열 // 
function editPage(index) {
  const posts = postList();
  const editContent = `
  <form action="/update" method="POST">
        <input type="hidden" name="index" value="${index}">
        <p>제목: </p><input type="text" name="head" value="${posts[index].head}">
        <br>
        <p>내용: </p><textarea name="content" >${posts[index].content}</textarea>
        <br>
        <button type="submit">수정 완료</button>
  `
  if (posts[index]) {
    return template('글 수정', divTag(editContent, "content-box"));
  }
}


export { editPage };