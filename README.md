# 우리나라 위인 골든벨

어진반 만 5세 유아가 전자칠판에서 사용하는 React + TypeScript + Vite + Tailwind CSS 웹앱입니다. 서버나 로그인 없이 브라우저의 로컬 저장소로 동작합니다.

## 실행

```bash
npm install
npm run dev
```

배포용 빌드는 `npm run build`, 로컬 확인은 `npm run preview`를 사용합니다. 결과물은 `dist/`에 생성되어 Netlify, Vercel 또는 정적 호스팅에 올릴 수 있습니다.

## 구조

- `src/data/questions.ts`: 기본 48문제(노래 20, 위인 24, 한글 4)
- `src/App.tsx`: 진행 모드, 음성, 점수, 편집기, 저장/이어하기
- `src/index.css`: 전자칠판 16:9 및 모바일 반응형 디자인
- `.openai/hosting.json`: Sites 배포 설정

## 문제 수정

앱의 **문제 편집**에서 추가·수정·삭제, 이미지 변경, JSON 가져오기/내보내기, 기본 복원을 할 수 있습니다. 직접 기본값을 고치려면 `src/data/questions.ts`의 `defaultQuestions`를 수정합니다. 필수 필드는 `id`, `category`, `type`, `difficulty`, `question`, `options`, `answer`, `explanation`, `hint`, `image`이며 순서 문제에는 `sequence`가 필요합니다.

## 수업 사용 팁

- 전체 화면 버튼으로 전자칠판 16:9 화면을 채울 수 있습니다.
- Web Speech API의 한국어 음성을 우선 사용하며 미지원 환경에서도 게임은 계속됩니다.
- 효과음은 브라우저 안에서 합성하므로 별도 음원이나 원곡 음원이 필요하지 않습니다.
- 노래 문제에는 긴 가사나 원곡 음원이 없고 짧은 기억 단서와 인물 순서만 들어 있습니다.
- 진행 중 상태와 교사 설정은 브라우저에 자동 저장됩니다.
