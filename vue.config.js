const {defineConfig} = require('@vue/cli-service')
module.exports = {
  devServer: {
    port: 8082,
  },
};


// 원래는 vue도 자동으로 8080 포트를 쓰는데 이러면 한 가지 포트번호를 두 서버가 같이 쓰는 거라 오류가 난다.
// 그리하여 4번째 줄을 통해 vue의 포트번호를 8082번으로 바꾸어주는데 이러면 또 CORS가 난다.
// 왜냐하면 요청을 보내는 포트번호(8082)와 요청을 받는(스프링 서버의) 포트번호(8080)가 다르기 떄문이다.


// 1. 의문점 정적 웹 호스팅이라는데 이게 서버가 맞니?  (react, vue가 대표적인)SPA이기 때문에 S3도 된다(믿지 마세요... 나도 모름)

// 내 로컬 브라우저에서 뷰가 있는 S3에게 요청을 보냄.(근데 이게 어떤 식으로 어떤 포트번호로 가는지 잘 모르겠다.) 
// 그럼 이제 다시 뷰가 스프링 서버(15.~)에게 요청을 보낼 것이다(이 서버 주소는 vue 내부의 service 폴더 내부의 파일들에 있음).
// 근데 뷰가 어떤 포트번호로 요청을 내보내고 스프링 서버가 어떤 포트로 요청을 받는지 모름.

