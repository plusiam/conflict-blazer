# 갈등 온도계 (Conflict Blazer)

학생들이 겪은 갈등 상황을 기록하고 성찰할 수 있는 교육용 도구입니다.

![갈등 온도계 스크린샷](https://via.placeholder.com/800x400?text=Conflict+Blazer)

## 📚 프로젝트 소개

갈등 온도계는 학생들이 일상에서 겪는 갈등을 체계적으로 기록하고 자신의 감정을 돌아볼 수 있도록 돕는 사회정서학습(SEL) 도구입니다. 시각적인 온도계를 통해 갈등의 강도를 표현하고, 작성한 내용을 이미지로 저장하여 포트폴리오나 상담 자료로 활용할 수 있습니다.

## ✨ 주요 기능

- **4단계 성찰 프로세스**
  1. 기본 정보 입력 (이름, 날짜)
  2. 갈등 상황 기술
  3. 갈등 강도 선택 (1-10 척도)
  4. 성찰 내용 작성

- **시각적 온도계**: 갈등 강도를 직관적으로 표현
- **이미지 저장**: 작성한 내용을 PNG 이미지로 다운로드
- **반응형 디자인**: 모바일과 데스크톱 모두 지원
- **깔끔한 UI**: shadcn/ui를 활용한 현대적인 인터페이스

## 🚀 시작하기

### 필요 조건

- Node.js 18 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/YOUR_USERNAME/conflict-blazer.git
cd conflict-blazer

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

개발 서버가 실행되면 브라우저에서 `http://localhost:5173`으로 접속하세요.

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

## 🌐 배포

### GitHub Pages 배포

1. `vite.config.ts` 파일에서 base 경로 설정:

```typescript
export default defineConfig({
  base: '/conflict-blazer/',
  // ... 나머지 설정
})
```

2. GitHub Actions를 사용한 자동 배포 (`.github/workflows/deploy.yml` 참고)

3. 또는 수동 배포:

```bash
npm run build
# dist 폴더를 GitHub Pages에 배포
```

### Vercel/Netlify 배포

Vercel이나 Netlify에 저장소를 연결하면 자동으로 배포됩니다.

- **빌드 명령**: `npm run build`
- **출력 디렉토리**: `dist`

## 🛠️ 기술 스택

- **React 18** - UI 라이브러리
- **TypeScript** - 타입 안전성
- **Vite** - 빠른 개발 환경
- **Tailwind CSS** - 유틸리티 기반 CSS
- **shadcn/ui** - 재사용 가능한 컴포넌트
- **html2canvas** - 결과 이미지 생성
- **date-fns** - 날짜 포맷팅

## 📁 프로젝트 구조

```
conflict-blazer/
├── src/
│   ├── components/
│   │   ├── ConflictAnalyzer.tsx    # 메인 컴포넌트
│   │   ├── ConflictThermometer.tsx # 온도계 시각화
│   │   └── ui/                     # shadcn/ui 컴포넌트들
│   ├── pages/
│   │   └── Index.tsx               # 메인 페이지
│   ├── utils/
│   │   └── conflictAnalyzer.ts     # 유틸리티 함수
│   ├── App.tsx
│   └── main.tsx
├── public/                          # 정적 파일
└── package.json
```

## 💡 교육적 활용

- **사회정서학습(SEL)**: 감정 인식 및 자기 성찰 능력 향상
- **갈등 해결 교육**: 객관적인 갈등 분석 연습
- **학급 상담**: 학생의 감정 변화 추적 도구
- **학급 경영**: 학생 간 갈등 관리 자료

## 🤝 기여하기

프로젝트에 기여하고 싶으시다면:

1. 이 저장소를 Fork하세요
2. 새로운 브랜치를 만드세요 (`git checkout -b feature/AmazingFeature`)
3. 변경사항을 커밋하세요 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 푸시하세요 (`git push origin feature/AmazingFeature`)
5. Pull Request를 열어주세요

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 👤 작성자

**yeohanki**

- GitHub: [@yeohanki](https://github.com/yeohanki)

## 🙏 감사의 말

이 프로젝트는 교육 현장의 필요에서 시작되었습니다. 학생들의 사회정서학습을 돕기 위해 만들어졌으며, 많은 교육자들의 피드백을 받아 발전하고 있습니다.

---

⭐ 이 프로젝트가 유용하다면 별을 눌러주세요!
