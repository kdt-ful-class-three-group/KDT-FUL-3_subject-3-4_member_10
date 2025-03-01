//* querystring, fs import해서 불러옴 
import qs from 'querystring';
import fs from 'fs';

//* json.data 읽어올 수 있게 만들어봄.
// 동기식으로 불러온 json파일을 JSON.parse하여 빈 배열안에 담은 후 읽기 //
// + forEach문 사용. // err 요청 try catch 문으로 해봄. //
function postList() {
  const jsonList = [];
  try {
    const jsonFile = fs.readFileSync('data.json', 'utf-8');
    if (jsonFile) {
      const psJson = JSON.parse(jsonFile);
      psJson.forEach((item) => {
        jsonList.push(item);
      });
    }
  } catch (err) {
    console.error('JSON 파일 읽기 오류:', err);
  }
  return jsonList;
};

//* 글 작성페이지에서 data입력시 json파일에 저장하는 함수
function addPost(body) {
  //! app.js에서 이미 req.body가 객체로 사용되므로 파싱이 필요없다.
  // // 다소복잡한 쿼리스트링 과정 //
  //   const parseFile = qs.parse(body);
  //   const stringJson = JSON.stringify(parseFile);
  // const psJson = JSON.parse(stringJson);
  const arrJson = postList();
  arrJson.push(body);
  fs.writeFile('data.json', JSON.stringify(arrJson, null, 2), () => {
    console.log('데이터 저장');
  });
};


//* 글 수정하는 함수
// 글의 인덱스(순번), 제목, 내용을 매개로 잡고 특정 순번에서 editPage()함수를 통해서 다시 json파일에 저장하는 방식 //
function updatePost(index,head,content) {
  const posts = postList();
  if (posts[index]) {
    posts[index].head = head;
    posts[index].content = content;
    fs.writeFileSync('data.json', JSON.stringify(posts, null, 2), () => {
      console.log('데이터 수정');
    }
    )
  }
  };


  //* 글 삭제하는 함수
function deletePost(index) {
  // json을 불러오고 parse 후 특정 index를 splice로 자른 후에 나머지를 다시 json 파일에 저장하는 방식 //
  const jsonData = fs.readFileSync('data.json', 'utf8');
  const parseJson= JSON.parse(jsonData);
  parseJson.splice(index, 1);
  fs.writeFileSync('data.json', JSON.stringify(parseJson, null, 2), () => {
    console.log('데이터 삭제');
  });
}



export { addPost, postList, updatePost, deletePost};