import { postList } from "../../models/post.js";
import { template } from "../Template/template.js";
import { divTag } from "../forms/tag.js";

//* 상세보기 페이지 
//* 상세보기 페이지도 위의 리스트 페이지와 같이 콜백으로 동적 html 구현.
//* new Date 메서드 활용. 

// newDate만 사용했을경우 -> Mon Feb 24 2025 14:04:47 GMT+0900 (대한민국 표준시)
// 처음에는 new Date().toISOString() 을 사용했는데 뒤에 '초'와 필요없는 영어가 나와서 LocaleString사용.
function infoPage(index) {
  const posts = postList();
  const date = new Date().toLocaleString();
  const infoContent = `
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
      `
  
  if (posts[index]) {
        return template(posts[index].head, divTag(infoContent,"content-box")) 
      }  
}


export { infoPage };