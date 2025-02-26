//* 그냥 글 작성,수정,삭제만 하면 아쉬워서 동적페이지 생성 후 alert메시지 출력 //
function alertPage(message) {
  return `
      <html>
        <meta charset="UTF-8">
        <body>
        <script>
        alert('${message}');
        window.location.href = '/list';
      </script>
      </body>
      </html>
      `
}

export { alertPage };