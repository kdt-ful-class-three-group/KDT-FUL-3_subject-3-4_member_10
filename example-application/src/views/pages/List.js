import { divTag } from "../tag.js";
import { postList } from "../../models/post.js";
import { template } from "../Template/template.js";

//* 리스트 페이지 구현 (html파일로 만들면 읽는데 불편함이 있어 js파일 함수로 동적 html생성함.)
//* forEach문으로 json데이터의 제목갯수만큼 리스트 추가
//* 상세보기버튼을 추가하기위해서 매개변수 1개 더 생성.
function listPage() {
  const posts = postList();
  let listitems = '';
  posts.forEach((post, index) => {
    listitems += `<li>${post.head}<button onclick="location.href='/info?index=${index}'">자세히</button></li>`;  
  });
  // template 함수로 html 기본 틀 생성.
  return template('글 목록', divTag(listitems, "content-box"));
};

export { listPage };