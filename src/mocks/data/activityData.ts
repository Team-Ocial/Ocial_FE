import { ActivityInfo, ActivityDetail } from '@/types/activity.types';
import thumbnail1 from '@/assets/images/thumbnail1.png';
import thumbnail2 from '@/assets/images/thumbnail2.png';
// import thumbnail3 from '@/assets/images/thumbnail3.png';

// --- 마스터 데이터: 모든 활동의 상세 정보를 포함 ---
import { ActivityStatus, ActivityMainCategory } from '@/types/activity.types';

const MASTER_ACTIVITY_DATA: ActivityDetail[] = [
  {
    id: 1,
    status: ActivityStatus.OPEN,
    category: ActivityMainCategory.STUDY,
    title: 'Vision 스터디',
    location: '서울 종로구 경희궁2길 8-4',
    startDate: '2025-03-01',
    endDate: '2025-04-30',
    startTime: '10:30',
    endTime: '12:30',
    applyDeadline: '2025-02-25',
    thumbnail: thumbnail1,
    likes: 42,
    isLiked: false,
    createdAt: '2025-03-01T00:00:00.000Z',
    updatedAt: '2025-04-30T00:00:00.000Z',
    description: `비전 스터디는 컴퓨터 비전과 이미지 처리 기술을 함께 학습하는 프로그램입니다.

OpenCV와 딥러닝 프레임워크를 활용하여 실전 프로젝트를 수행하며, 이론과 실습을 병행합니다.

팀 OCIAL에서 자연어처리(NLP) 언어 기반 기술로 이미지화하는 Vision을 공부할 멤버를 모집합니다.
자연어는 코드와 달리 유연하고 이미지화 될 새로운 노하우를 서로 공유할 수 있습니다.`,
    curriculum: `1주차: 기초 학습
- 개념 이해하기
- 실습 환경 설정
- 기본 예제 실습

2주차: 심화 학습
- 응용 사례 분석
- 프로젝트 기획
- 팀 구성 및 역할 분담

3주차: 실전 프로젝트
- 프로젝트 주제 선정
- 기술 스택 결정
- 개발 환경 구축

4주차: 프로젝트 개발
- 프로젝트 구현
- 코드 리뷰
- 피드백 및 개선`,
    guidelines: `- 노트북 필수 지참
- Python 기초 문법 숙지 필요
- 총 8주 과정, 주 1회 진행
- 결석 3회 이상 시 수료 불가
- 중간 프로젝트 발표 필수`,
  },
  {
    id: 2,
    status: ActivityStatus.CLOSED,
    category: ActivityMainCategory.ONE_DAY,
    title: 'ChatGPT 기초 활용',
    location: '서울 강남구 테헤란로 152',
    startDate: '2025-03-15',
    endDate: '2025-03-15',
    startTime: '14:00',
    endTime: '17:00',
    applyDeadline: '2025-03-10',
    thumbnail: thumbnail2,
    likes: 15,
    isLiked: true,
    createdAt: '2025-03-15T00:00:00.000Z',
    updatedAt: '2025-03-15T00:00:00.000Z',
    description:
      'ChatGPT를 활용하여 일상과 업무의 생산성을 높이는 방법을 배웁니다. 프롬프트 작성법부터 다양한 활용 사례까지, AI 비서와 함께하는 스마트한 라이프를 경험해보세요.',
    curriculum: `1부: ChatGPT 시작하기
- ChatGPT의 원리와 가능성
- 효과적인 프롬프트 작성법

2부: ChatGPT 활용 실습
- 콘텐츠 제작 자동화
- 업무용 이메일 및 보고서 작성
- 아이디어 발상 및 기획`,
    guidelines: `- 개인 노트북 지참 권장
- 수업 시작 10분 전까지 입실`,
  },
  {
    id: 3,
    status: ActivityStatus.OPEN,
    category: ActivityMainCategory.STUDY,
    title: 'React 심화 스터디',
    location: '경기 성남시 분당구 판교로 242',
    startDate: '2025-04-01',
    endDate: '2025-05-31',
    startTime: '19:00',
    endTime: '21:00',
    applyDeadline: '2025-03-28',
    thumbnail: thumbnail1,
    likes: 38,
    isLiked: false,
    createdAt: '2025-04-01T00:00:00.000Z',
    updatedAt: '2025-05-31T00:00:00.000Z',
    description:
      'React의 고급 기능과 최신 트렌드를 학습하는 스터디입니다. 상태 관리, 성능 최적화, 테스팅 등 실무에서 필요한 심화 내용을 다룹니다.',
    curriculum: `1주차: React 최신 기능
- React 18 새로운 기능
- Concurrent Mode
- Suspense와 ErrorBoundary

2주차: 상태 관리
- Redux Toolkit
- Recoil
- Zustand

3주차: 성능 최적화
- React DevTools 활용
- 메모이제이션
- Code Splitting`,
    guidelines: `- React 기초 지식 필수
- 실무 경험 1년 이상 권장
- 매주 과제 제출 필수`,
  },
  {
    id: 4,
    status: ActivityStatus.OPEN,
    category: ActivityMainCategory.ONE_DAY,
    title: 'UI/UX 디자인 워크샵',
    location: '서울 마포구 와우산로 94',
    startDate: '2025-04-15',
    endDate: '2025-04-15',
    startTime: '13:00',
    endTime: '18:00',
    applyDeadline: '2025-04-10',
    thumbnail: thumbnail2,
    likes: 25,
    isLiked: false,
    createdAt: '2025-04-15T00:00:00.000Z',
    updatedAt: '2025-04-15T00:00:00.000Z',
    description:
      '실무에서 바로 적용할 수 있는 UI/UX 디자인 원칙과 프로세스를 배웁니다. Figma를 활용한 실습이 포함됩니다.',
    curriculum: `1부: UI/UX 기초
- 디자인 시스템
- 사용자 경험 설계
- 웹/앱 디자인 트렌드

2부: Figma 실습
- 컴포넌트 설계
- 프로토타이핑
- 협업 기능 활용`,
    guidelines: `- 노트북 필수 지참
- Figma 계정 필요
- 디자인 경험 무관`,
  },
  {
    id: 5,
    status: ActivityStatus.OPEN,
    category: ActivityMainCategory.STUDY,
    title: 'TypeScript 마스터 과정',
    location: '서울 강남구 선릉로 428',
    startDate: '2025-05-01',
    endDate: '2025-06-30',
    startTime: '20:00',
    endTime: '22:00',
    applyDeadline: '2025-04-25',
    thumbnail: thumbnail1,
    likes: 31,
    isLiked: false,
    createdAt: '2025-05-01T00:00:00.000Z',
    updatedAt: '2025-06-30T00:00:00.000Z',
    description:
      'TypeScript의 고급 기능을 마스터하는 스터디입니다. 타입 시스템의 깊은 이해부터 실전 프로젝트까지 다룹니다.',
    curriculum: `1주차: 타입 시스템 심화
- Generic 활용
- Utility Types
- Type Inference

2주차: 고급 패턴
- Type Guards
- Mapped Types
- Conditional Types

3주차: 실전 응용
- 라이브러리 타입 분석
- 타입 안전한 API 설계
- 테스트와 문서화`,
    guidelines: `- JavaScript 숙련자 대상
- 주 1회 오프라인 모임
- 매주 과제 제출`,
  },
  {
    id: 6,
    status: ActivityStatus.OPEN,
    category: ActivityMainCategory.ONE_DAY,
    title: 'Next.js 13 시작하기',
    location: '서울 강남구 역삼로 172',
    startDate: '2025-05-15',
    endDate: '2025-05-15',
    startTime: '10:00',
    endTime: '17:00',
    applyDeadline: '2025-05-10',
    thumbnail: thumbnail2,
    likes: 45,
    isLiked: true,
    createdAt: '2025-05-15T00:00:00.000Z',
    updatedAt: '2025-05-15T00:00:00.000Z',
    description:
      'Next.js 13의 새로운 기능과 App Router를 활용한 웹 개발을 배웁니다. SSR, ISR, CSR의 개념부터 실전 프로젝트까지 진행합니다.',
    curriculum: `1부: Next.js 13 기초
- App Router 이해
- 서버 컴포넌트
- 데이터 페칭

2부: 실전 프로젝트
- 인증 구현
- API 라우트 설계
- 배포 전략`,
    guidelines: `- React 기초 지식 필요
- 노트북 필수 지참
- 점심 제공`,
  },
  {
    id: 7,
    status: ActivityStatus.OPEN,
    category: ActivityMainCategory.STUDY,
    title: 'DevOps 입문 스터디',
    location: '서울 서초구 서초대로 396',
    startDate: '2025-06-01',
    endDate: '2025-07-31',
    startTime: '19:00',
    endTime: '21:30',
    applyDeadline: '2025-05-25',
    thumbnail: thumbnail1,
    likes: 28,
    isLiked: false,
    createdAt: '2025-06-01T00:00:00.000Z',
    updatedAt: '2025-07-31T00:00:00.000Z',
    description:
      'DevOps의 기본 개념과 도구 사용법을 배우는 스터디입니다. Docker, Kubernetes, CI/CD 파이프라인 구축 등을 다룹니다.',
    curriculum: `1주차: DevOps 개요
- DevOps 철학과 문화
- 도구 소개
- 환경 설정

2주차: Docker & Kubernetes
- 컨테이너 기초
- 쿠버네티스 아키텍처
- 배포 전략

3주차: CI/CD
- GitHub Actions
- Jenkins
- ArgoCD`,
    guidelines: `- Linux 기초 명령어 숙지
- 클라우드 계정 필요
- 실습 위주 진행`,
  },
];

// --- 목록 조회용 데이터 (마스터 데이터에서 자동 생성) ---
export const ACTIVITY_LIST: ActivityInfo[] = MASTER_ACTIVITY_DATA.map(
  ({ description, curriculum, guidelines, ...activityInfo }) => activityInfo
);

// --- 상세 조회용 데이터 (마스터 데이터에서 자동 생성) ---
export const ACTIVITY_DETAILS: Record<number, ActivityDetail> = MASTER_ACTIVITY_DATA.reduce(
  (acc, activity) => {
    acc[activity.id] = activity;
    return acc;
  },
  {} as Record<number, ActivityDetail>
);
