# Army Letter service frontend

## Customization

  - `src/App.tsx`: 편지 가이드 텍스트 수정
  - `public/index.html`
    - `<link rel="icon">`: 파비콘
    - `<meta property="og:...>`, `<meta name="twitter:...`: [Open Graph 태그](https://ogp.me/)
    - `<link rel="apple-touch-icon">`: 애플 PWA 아이콘
    - `<title>`: 사이트 제목
  - `public/manifest.json`: [매니페스트](https://developer.mozilla.org/ko/docs/Web/Progressive_web_apps/Installable_PWAs)
  - `package.json`
    - `proxy`: [통신할 서버의 URL](https://create-react-app.dev/docs/proxying-api-requests-in-development/)
