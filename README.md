# Member_10 Subject

## 프로젝트 구조 설명

```
KDT-FUL-3_subject-3-4_member_10
├─ README.md
├─ app.js # 서버 실행하는 파일
├─ example-application
│  ├─ public
│  │  ├─ css
│  │  │  └─ style.css # 스타일시트
│  │  ├─ error.html # error page
│  │  └─ writePost.html # 글 작성 page
│  └─ src
│     ├─ post.js # 작성,수정,삭제 기능 함수
│     └─ views
│        ├─ alertPage.js #alert 메세지 함수
│        └─ listPage.js #동적page 함수
├─ index.html # main page
├─ package.json
└─ data.json # json 데이터 저장장소
```

## 실행 방법

1. node app.js 입력 후 http://localhost:8000/ 서버이동
2. 기본 메인 페이지 상단 nav탭에서 글 작성과 글 목록 중 원하는 페이지 이동.

## 구현 기능 목록

1. 글 작성 페이지에서 제목과 내용을 입력 후 버튼(submit)을 누르면 json 데이터에 저장되도록 구현하였습니다.
2. 글 목록 페이지에 json데이터를 리스트화하여 출력하였습니다.
3. 리스트마다 자세히 보기 버튼을 생성하여 세부 내용을 볼 수 있도록 구현했습니다.
4. 세부페이지 안에서 글 수정과 삭제할 수 있도록 구현하였습니다.

## 학습 내용 정리

초반 작업에서 섣불리 판단하여 구조 설계가 무너졌습니다. html 파일을 페이지마다 생성하여서 서버를 만들기도 수정하기도 어려웠지만 동적인 html생성을 통해서 쉽고 자신이 원하는 페이지를 만들어 순조롭게 서버를 생성하였습니다.
CRUD를 구현하면서 어디까지가 CRUD인지 검색하는 시간이 길었고 평가를 보기전 연습하던 것은 연습이 아니라고 생각이 들었습니다.
