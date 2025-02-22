import qs from 'querystring';
import fs from 'fs';

function addPost(body) {
    const parseFile = qs.parse(body);
    const stringJson = JSON.stringify(parseFile);
  const psJson = JSON.parse(stringJson);
  const arrJson = postList();
  arrJson.push(psJson);
  fs.writeFile('data.json', JSON.stringify(arrJson, null, 2), () => {
    console.log('데이터 저장');
  });
};



function postList() {
  const jsonList = [];
  try {
    const jsonFile = fs.readFileSync('data.json', 'utf-8');
    if (jsonFile) {
      const dataObj = JSON.parse(jsonFile);
      dataObj.forEach((item) => {
        jsonList.push(item);
      });
    }
  } catch (err) {
    console.error('JSON 파일 읽기 오류:', err);
  }
  return jsonList;
};




export { addPost, postList};