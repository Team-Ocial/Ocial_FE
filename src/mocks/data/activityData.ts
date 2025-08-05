import { ActivityInfo, ActivityDetail } from '@/types/activity.types';
import thumbnail1 from '@/assets/images/thumbnail1.png';
import thumbnail2 from '@/assets/images/thumbnail2.png';
// import thumbnail3 from '@/assets/images/thumbnail3.png';

// --- 마스터 데이터: 모든 활동의 상세 정보를 포함 ---
const MASTER_ACTIVITY_DATA: ActivityDetail[] = [
  {
    id: '1',
    status: '모집 중',
    category: '스터디',
    title: 'Vision 스터디',

    location: 'Y-Space 광화문',
    address: '서울 종로구 경희궁2길 8-4',
    period: {
      start: '2025-03-01T00:00:00.000Z',
      end: '2025-04-30T00:00:00.000Z',
      time: { start: '10:30', end: '12:30' },
    },
    thumbnail: thumbnail1,
    likes: 42,
    isLiked: false,
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
    id: '2',
    status: '모집 마감',
    category: '원데이 클래스',
    title: 'ChatGPT 기초 활용',

    location: 'Y-Space 강남',
    address: '서울 강남구 테헤란로 152',
    period: {
      start: '2025-03-15T00:00:00.000Z',
      end: '2025-03-15T00:00:00.000Z',
      time: { start: '14:00', end: '17:00' },
    },
    thumbnail: thumbnail2,
    likes: 15,
    isLiked: true,
    description:
      'ChatGPT를 활용하여 일상과 업무의 생산성을 높이는 방법을 배웁니다. 프롬프트 작성법부터 다양한 활용 사례까지, AI 비서와 함께하는 스마트한 라이프를 경험해보세요.',
    curriculum: `1부: ChatGPT 시작하기,
    sshatGPT의 원리와 가능성
- 효과적인 프롬프트 작성법

2부: ChatGPT 활용 실습
- 콘텐츠 제작 자동화
- 업무용 이메일 및 보고서 작성
- 아이디어 발상 및 기획`,
    guidelines: `개인 노트북 지참ㅇㅇ 권장, 
    수업 시작 10분 전까지 입실`,
  },
  // ... 다른 활동 데이터 추가 ...
];

// --- 목록 조회용 데이터 (마스터 데이터에서 자동 생성) ---
export const ACTIVITY_LIST: ActivityInfo[] = MASTER_ACTIVITY_DATA.map(
  ({ description, curriculum, guidelines, ...activityInfo }) => activityInfo
);

// --- 상세 조회용 데이터 (마스터 데이터에서 자동 생성) ---
export const ACTIVITY_DETAILS: Record<string, ActivityDetail> = MASTER_ACTIVITY_DATA.reduce(
  (acc, activity) => {
    acc[activity.id] = activity;
    return acc;
  },
  {} as Record<string, ActivityDetail>
);
