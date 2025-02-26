import { createTag,divTag } from "./tag.js";

function listPage() {
  const posts = postList();
  let listitems = '';
  posts.forEach((post, index) => {
    listitems += `<li>${post.head}<button onclick="location.href='/info?index=${index}'">자세히</button></li>`;  
  });
  return template('글 목록', divTag(listitems,"content-box"));
};

export { listPage };