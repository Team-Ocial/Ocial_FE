# Ocial_FE 프로젝트 가이드라인

이 문서는 Ocial_FE 프로젝트의 일관성과 품질 유지를 위한 핵심 아키텍처 원칙, 코딩 컨벤션, 그리고 개발 규칙을 정의합니다. 모든 팀원은 프로젝트에 기여하기 전 이 문서를 숙지해야 합니다.

---

## 1. 핵심 아키텍처 원칙

### 1.1. Hooks-First 데이터 관리

- **원칙:** 모든 데이터 로직(API 호출, 상태 관리, 정렬, 필터링 등)은 **커스텀 훅(Custom Hook)**으로 분리합니다. UI 컴포넌트는 이 훅을 사용하여 데이터를 공급받고, 화면을 그리는 역할에만 집중해야 합니다.
- **구현:**
  - `src/hooks` 폴더에 `use[FeatureName]` (예: `useActivity`, `useNotices`) 패턴으로 훅을 생성합니다.
  - 각 훅은 `data`, `isLoading`, `error` 상태를 기본적으로 반환하여, UI 컴포넌트가 모든 경우(성공, 로딩, 실패)에 대해 일관된 사용자 경험을 제공하도록 합니다.
- **목표:** 로직의 재사용성, 테스트 용이성, 유지보수성을 극대화합니다.

### 1.2. 명확한 역할 분담 기반의 폴더 구조

프로젝트의 폴더는 각 파일의 역할에 따라 명확하게 구분됩니다.

- `src/components`: 재사용 가능한 UI 조각.
  - `common`: 버튼, 모달 등 프로젝트 전반에서 사용되는 범용 컴포넌트.
  - `[page]`: 특정 페이지 또는 도메인에서만 사용되는 컴포넌트 그룹.
- `src/hooks`: 위에서 설명한 데이터 로직을 담당하는 커스텀 훅.
- `src/pages`: 각 라우팅 경로에 해당하는 메인 페이지 컴포넌트.
- `src/types`: 프로젝트 전체에서 사용되는 TypeScript 타입 정의.
- `src/utils`: 특정 기능에 종속되지 않는 순수 함수 유틸리티 (예: `formatDate`).
- `src/styles`: 전역 스타일(`globalStyle.tsx`), 디자인 시스템 토큰(`theme.ts`).
- `src/mocks`: MSW(Mock Service Worker) 핸들러 및 목업 데이터.
- `src/api`: 실제 API 호출 함수. (현재는 hooks에서 처리, 향후 분리 가능)

### 1.3. 일관된 타입 및 데이터 형식

- **타입 정의:** 모든 데이터 모델의 타입은 `src/types` 폴더에서 `[feature].types.ts` 형식으로 관리합니다. (예: `activity.types.ts`)
- **날짜 형식:** 백엔드와 통신하거나 목업 데이터에서 사용하는 모든 날짜/시간 정보는 **ISO 8601 형식의 문자열** (`YYYY-MM-DDTHH:mm:ss.sssZ`)로 통일합니다.
- **UI 표시:** 날짜를 화면에 표시할 때는 `src/utils/formatDate.ts` 유틸리티를 사용하여 `YYYY.MM.DD` 형식으로 변환합니다.

---

## 2. 상세 코딩 컨벤션

### 2.1. 네이밍 규칙

- **파일:** 파스칼 케이스(PascalCase)를 사용합니다. (예: `ActivityListPage.tsx`, `useActivity.ts`)
- **컴포넌트:** 파스칼 케이스를 사용합니다. (예: `const PageHeader = () => ...`)
- **훅:** `use`로 시작하는 카멜 케이스(camelCase)를 사용합니다. (예: `useAuth`, `useToast`)
- **타입/인터페이스:** 파스칼 케이스를 사용합니다. (예: `interface ActivityDetail`, `type ActivityStatus`)
- **변수/함수:** 카멜 케이스를 사용합니다. (예: `filteredActivities`, `fetchData`)

### 2.2. TypeScript 사용법

- **Strict Mode:** `tsconfig.json`의 `strict: true` 옵션을 준수하여 엄격한 타입 검사를 시행합니다.
- **`any` 타입 지양:** `@typescript-eslint/no-explicit-any` 규칙에 따라 `any` 타입 사용을 최대한 피하고, 불가피할 경우 `unknown`을 우선적으로 고려합니다.
- **타입 선언:** 객체의 형태를 정의할 때는 `interface` 사용을 선호합니다. 타입 별칭(`type`)은 리터럴 유니온 타입이나 유틸리티 타입과 조합할 때 사용합니다.
- **JSDoc:** 타입, 인터페이스 및 복잡한 함수에는 JSDoc 주석을 작성하여 사용법과 예시를 명확히 합니다.

### 2.3. 컴포넌트 패턴

- **함수형 컴포넌트:** 모든 컴포넌트는 화살표 함수를 이용한 함수형 컴포넌트로 작성합니다.
- **Props 타입:** 컴포넌트의 `props`는 `interface`로 정의합니다.
- **스타일링:** Emotion의 `css` Prop을 사용하여 스타일을 적용합니다.
- **내보내기:** `export default`를 사용하여 컴포넌트를 내보냅니다.

```tsx
import { css } from '@emotion/react';

interface MyComponentProps {
  title: string;
}

const MyComponent = ({ title }: MyComponentProps) => {
  return <div css={myStyle}>{title}</div>;
};

export default MyComponent;

const myStyle = css`
  font-size: 16px;
`;
```

### 2.4. Git 커밋 메시지 규칙

**Conventional Commits** 명세를 따릅니다.

- **형식:** `type(scope): subject`
- **`type` 종류:**
  - `feat`: 새로운 기능 추가
  - `fix`: 버그 수정
  - `docs`: 문서 수정
  - `style`: 코드 포맷팅, 세미콜론 누락 등 (코드 변경이 없는 경우)
  - `refactor`: 코드 리팩토링
  - `test`: 테스트 코드 추가/수정
  - `chore`: 빌드 관련 파일 수정, 패키지 매니저 설정 변경 등

---

## 3. 코드 포맷팅 및 린팅

### 3.1. Prettier (자동 포맷팅)

저장 시 Prettier가 자동으로 코드 스타일을 교정합니다. 주요 규칙은 `.prettierrc.js`에 정의되어 있습니다.

- **들여쓰기:** 2칸
- **따옴표:** 작은따옴표(`'`)
- **세미콜론:** 사용(`;`)
- **줄 길이:** 최대 100자

### 3.2. ESLint (코드 품질)

`eslint.config.js`에 정의된 규칙에 따라 코드 품질을 관리합니다.

- **`import` 순서:** 정해진 규칙에 따라 자동으로 정렬됩니다.
- **`console.log` 사용 금지:** 디버깅용 `console.log`는 커밋에 포함되지 않도록 주의합니다 (`warn`, `error`는 허용).