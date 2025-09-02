# Ocial_FE 프로젝트 기획서

## 1. 프로젝트 개요

| 항목 | 내용 |
| --- | --- |
| **프로젝트 명** | Ocial (오셜) 프론트엔드 |
| **프로젝트 목표** | 배움과 네트워킹을 통해 함께 성장하는 활발한 커뮤니티 플랫폼 제공. 사용자는 다양한 활동(원데이 클래스, 스터디 등)에 참여하고, 자신의 활동 내역을 관리하며 다른 멤버들과 교류할 수 있다. |
| **주요 타겟** | 새로운 배움이나 네트워킹 기회를 찾는 성인, 특정 분야의 전문가와 교류하고 싶은 사람, 스터디나 소모임 참여를 원하는 사용자 |

## 2. 주요 기능 명세

| 대분류 | 기능 | 상세 설명 | 관련 페이지/컴포넌트 |
| --- | --- | --- | --- |
| **메인** | 메인 페이지 | 서비스의 핵심 가치와 주요 활동을 소개하는 랜딩 페이지. (Hero 슬라이더, 서비스 소개, 스토리 등) | `MainPage.tsx` |
| **활동** | 활동 목록 | 개설된 모든 활동(클래스, 스터디)을 카테고리 및 정렬 기준(최신순, 인기순)에 따라 조회. | `ActivityListPage.tsx` |
| | 활동 상세 | 특정 활동의 상세 정보, 커리큘럼, 안내사항 등을 확인. | `ActivityDetailPage.tsx` |
| | 활동 개설/수정 | (관리자/권한자) 새로운 활동을 등록하거나 기존 활동을 수정. | `ActivityEditPage.tsx` |
| **뉴스** | 공지사항/보도자료 | 서비스의 새로운 소식이나 공지, 언론 보도 내용을 확인. | `NoticePage.tsx`, `PressPage.tsx` |
| **사용자 인증**| 회원가입/로그인 | 이메일 기반의 회원가입 및 로그인 기능. | `SigninPage.tsx`, `SignupPage.tsx` |
| | 계정 찾기 | 아이디 또는 비밀번호를 분실했을 때 찾는 기능. | `FindPage.tsx`, `PasswordResetPage.tsx` |
| **마이페이지**| **프로필 관리 (메인)** | 사용자의 프로필(이름, 닉네임, 생년월일, 성별, 소개 등)을 확인하고 **수정**. 다른 마이페이지 메뉴로 이동하는 허브 역할. | **`MyPage.tsx`** |
| | **나의 활동 내역** | 사용자가 참여한 활동을 **예정, 진행중, 수료** 상태별로 나누어 확인. | **`MyActivityPage.tsx`** |
| | (예정) 북마크 | 관심 있는 활동을 저장하고 모아보는 기능. | - |

## 3. 화면 구성 (Layout)

### 3.1. 공통 레이아웃 (`Layout.tsx`)
- **Header:** 모든 페이지 최상단에 고정되는 글로벌 네비게이션 바. 좌측의 서비스 로고, 중앙의 주요 메뉴(OCIAL 소개, 활동, 뉴스), 우측의 로그인/회원가입 또는 마이페이지 아이콘으로 구성.
- **Footer:** 모든 페이지 최하단에 위치. 서비스 이용약관, 개인정보처리방침, 소셜 미디어 링크 등 부가 정보 제공.

### 3.2. 주요 페이지 구성

##### 1. 메인 페이지 (`MainPage.tsx`)
- **Hero Section:** 서비스의 핵심 가치를 전달하는 대형 이미지/비디오 슬라이더 (`HeroSlider.tsx`).
- **About Section:** 서비스의 비전과 미션을 소개하는 텍스트 및 이미지 섹션 (`AboutSection.tsx`, `VisionSection.tsx`).
- **Story Section:** 사용자들의 활동 후기나 스토리를 카드 형태로 보여주는 섹션 (`StorySection.tsx`).
- **M&A Section:** 서비스의 주요 성과나 파트너십을 강조하는 섹션 (`MnaSection.tsx`).

##### 2. 활동 목록 페이지 (`ActivityListPage.tsx`)
- **Page Header:** "새로운 배움과 만남이 시작되는 곳"과 같은 문구로 페이지의 목적을 설명하는 상단 헤더.
- **Filter & Sort Bar:**
    - **카테고리 필터:** '전체보기', '원데이 클래스', '소그룹' 등 활동 종류를 선택하는 버튼 그룹.
    - **정렬 기준:** '최신순', '인기순'을 선택하는 버튼.
- **Activity Grid:** 필터 및 정렬 기준에 따라 `ActivityCard.tsx` 컴포넌트가 3열 그리드 형태로 나열됨. 각 카드는 썸네일 이미지, 활동 제목, 기간, 장소, 좋아요 수를 표시.
- **Pagination:** 활동 목록이 많을 경우 페이지를 이동할 수 있는 페이지네이션 컴포넌트.

##### 3. 활동 상세 페이지 (`ActivityDetailPage.tsx`)
- **Hero Header:** 활동의 대표 이미지를 전체 너비 배경으로 사용. 이미지 위에는 제목과 카테고리(`Badge`), '신청하기', '좋아요' 버튼이 위치.
- **Info Section:** 활동의 핵심 정보(일정, 시간, 장소, 주소)를 아이콘과 함께 명확하게 보여주는 정보 박스.
- **Content Sections:** '소개', '커리큘럼', '안내사항' 등 상세 내용을 각각의 섹션으로 구분하여 텍스트로 설명.

##### 4. 메인 마이페이지 (`MyPage.tsx`)
- **Profile Header:** 페이지 상단 중앙에 프로필 이미지, 그 아래로 실명과 활동명(닉네임)을 배치하여 사용자 정체성을 명확히 함.
- **Profile Fields:** '활동명', '이름', '생년월일' 등 수정 가능한 모든 개인정보를 '레이블: 값' 형태의 목록으로 나열. 각 항목 우측에는 '수정' 버튼이 있어, 클릭 시 해당 필드가 입력 가능한 폼으로 전환됨.
- **Menu Navigation Section:** 페이지 하단에 `MyPageMenuCard.tsx` 컴포넌트를 사용하여 '나의 활동내역' 등 다른 마이페이지 관련 페이지로 이동하는 링크를 시각적인 카드 형태로 제공.

##### 5. 나의 활동 내역 페이지 (`MyActivityPage.tsx`)
- **Page Title:** "나의 활동 내역"과 같이 페이지의 목적을 명확히 하는 제목.
- **Tab Navigation:** '예정된 활동', '진행중인 활동', '수료한 활동' 상태를 선택할 수 있는 탭 UI.
- **Activity List:** 선택된 탭에 해당하는 활동 목록이 `ActivityCard` 컴포넌트를 통해 표시됨.

## 4. 기술 스택 및 아키텍처

| 구분 | 기술/전략 | 설명 |
| --- | --- | --- |
| **핵심 프레임워크** | React (v18+), Vite | 모던 리액트 환경을 기반으로 빠른 개발 및 빌드 속도 확보. |
| **언어** | TypeScript | 코드의 안정성과 유지보수성, 개발 생산성 향상. |
| **스타일링** | Emotion (CSS-in-JS) | 컴포넌트 기반의 동적 스타일링. `theme.ts`를 통해 디자인 시스템(색상, 타이포그래피)을 일관되게 관리. |
| **상태 관리** | **Hooks-First 아키텍처** | 데이터 로직(API, 상태)을 커스텀 훅으로 분리하여 컴포넌트는 UI에만 집중. `useState`와 `useReducer`를 기본으로 사용하며, 향후 인증 등 전역 상태는 `Zustand` 도입 고려. |
| **라우팅** | React Router DOM | 페이지 이동 및 중첩 라우팅, `ProtectedRoute`를 통한 접근 제어 구현. |
| **코드 품질** | ESLint, Prettier | 일관된 코드 스타일을 강제하고 잠재적 오류를 방지. |

## 5. 향후 개발 계획

1.  **`MyActivityPage.tsx` UI 및 기능 구현:** 현재 비어있는 '나의 활동 내역' 페이지에 탭 UI와 활동 목록을 실제로 렌더링하는 작업을 진행.
2.  **API 연동:** 현재 목업(Mock) 데이터로 구현된 모든 커스텀 훅(`useMyProfile`, `useActivity` 등)을 실제 백엔드 API와 연동.
3.  **전역 상태 관리 도입:** `useAuthStore`를 `Zustand`로 구현하여 로그인 상태, 사용자 정보 등을 전역적으로 관리하고 `ProtectedRoute`와 연동 강화.
4.  **북마크 기능 구현:** 사용자가 활동을 북마크하고 마이페이지에서 모아볼 수 있는 기능 추가.

---

## 6. 주요 재사용 컴포넌트 명세

> AI가 새 화면을 구성할 때, 각 컴포넌트의 역할을 명확히 인지하고 정확한 Props와 함께 사용하기 위한 명세입니다.

| 컴포넌트 | 파일 위치 | 주요 Props | 설명 |
| --- | --- | --- | --- |
| `Button` | `components/common/` | `variant`, `size`, `fullWidth`, `onClick` | 프로젝트 전반에서 사용되는 기본 버튼 |
| `ActivityCard` | `components/common/` | `activity: ActivityInfo` | 활동 목록에 표시되는 개별 활동 카드 |
| `PageHeader` | `components/common/` | `title: string`, `description: string` | 각 페이지 상단에 위치하는 제목 및 설명 |
| `Badge` | `components/common/` | `variant: 'category' \| 'status'` | 활동의 카테고리나 상태를 표시하는 뱃지 |
| `MyPageMenuCard`| `components/mypage/` | `to`, `image`, `title`, `description` | 마이페이지 내 다른 섹션으로 이동하는 링크 카드 |

## 7. 데이터 흐름 및 API 명세

> AI가 데이터 로직(Hooks)을 구성하고 API를 연동할 때, 전체 데이터 흐름을 파악하고 정해진 규격에 따라 개발하기 위한 명세입니다.

### 7.1. 주요 데이터 흐름

- **활동 목록 페이지:**
  - **Flow:** `ActivityListPage` -> `useActivity(filter)` 훅 호출 -> `GET /api/activities?category=...` API 요청 -> `ActivityInfo[]` 수신 -> `ActivityCard` 렌더링
- **프로필 수정 페이지:**
  - **Flow:** `MyPage` -> `useMyProfile` 훅 호출 -> `GET /api/user/profile` API 요청 -> `UserProfile` 수신 -> UI 렌더링
  - **Update Flow:** `ProfileField`에서 '저장' 클릭 -> `useMyProfile`의 `saveField` 호출 -> `PATCH /api/user/profile` API 요청 (`{nickname: "..."}`) -> 성공/실패 처리

### 7.2. API 엔드포인트 (예상)

| Method | Endpoint | 설명 | Request Body | Response Body |
| --- | --- | --- | --- | --- |
| `GET` | `/api/activities` | 전체 활동 목록 조회 | `?category=...&sort=...` | `ActivityListResponse` |
| `GET` | `/api/activities/:id` | 단일 활동 상세 조회 | - | `ActivityDetailResponse` |
| `GET` | `/api/user/profile` | 현재 사용자 프로필 조회 | - | `UserProfile` |
| `PATCH` | `/api/user/profile` | 사용자 프로필 부분 수정 | `Partial<UserProfile>` | `{ success: boolean }` |
| `GET` | `/api/user/activities`| 현재 사용자 활동 내역 조회| `?status=...` | `ActivityInfo[]` |

## 8. 상세 개발 백로그

> AI와 개발자가 다음 작업 목표를 명확히 공유하고, 우선순위에 따라 프로젝트를 진행하기 위한 구체적인 작업 목록입니다.

| 우선순위 | 작업 내용 | 담당 (예상) | 상태 |
| --- | --- | --- | --- |
| **P0 (Highest)** | `MyActivityPage.tsx` UI 구현 | AI | **To-Do** |
| **P1 (High)** | `useMyActivities` 훅 생성 (목업 데이터 기반) | AI | **To-Do** |
| **P1 (High)** | `useMyProfile` 훅에 실제 프로필 조회/수정 API 연동 | Developer | **To-Do** |
| **P2 (Medium)** | `useActivity` 훅에 실제 활동 목록 API 연동 | Developer | **To-Do** |
| **P2 (Medium)** | 북마크 기능 UI/UX 설계 | Designer/Planner | **To-Do** |
| **P3 (Low)** | 북마크 기능 API 연동 및 UI 구현 | Developer/AI | **To-Do** |