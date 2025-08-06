# OCIAL 서비스 API 명세서 (v1.0)

이 명세서는 OCIAL 프론트엔드 프로젝트의 목업 데이터를 기반으로 작성되었으며, 실제 백엔드 개발을 위한 가이드라인을 제공합니다.

---

### 공통 사항

- **Base URL:** `/api/v1`
- **인증:** 인증이 필요한 요청은 `Authorization` 헤더에 `Bearer {JWT_TOKEN}`을 포함해야 합니다.
- **성공 응답 (2xx):**
  ```json
  {
    "success": true,
    "data": { ... } // 요청에 따른 데이터 객체
  }
  ```
- **에러 응답 (4xx, 5xx):**
  ```json
  {
    "success": false,
    "error": {
      "code": "ERROR_CODE",
      "message": "에러에 대한 설명"
    }
  }
  ```

---

### 1. 활동 (Activities)

`activityData.ts` 기반

#### **데이터 모델: `Activity`**

```typescript
// src/types/activity.types.ts 참고
interface Activity {
  id: string;                 // 고유 ID (UUID or ObjectId)
  status: string;             // "모집 중", "모집 마감", "수강 마감"
  category: string;           // "원데이 클래스", "스터디"
  title: string;              // 제목
  location: string;           // 장소 (예: "Y-Space 광화문")
  address: string;            // 상세 주소
  period: {
    start: string;            // 시작일 (ISO 8601, YYYY-MM-DDTHH:mm:ss.sssZ)
    end: string;              // 종료일 (ISO 8601)
    time: {
      start: string;          // 시작 시간 (HH:mm)
      end: string;            // 종료 시간 (HH:mm)
    }
  };
  thumbnail: string;          // 썸네일 이미지 URL
  likes: number;              // 좋아요 수
  isLiked: boolean;           // (인증된 사용자의 경우) 현재 사용자의 좋아요 여부
  description: string;        // 상세 설명 (줄글)
  curriculum: string;         // 커리큘럼 (줄글)
  guidelines: string;         // 안내사항 (줄글)
  createdAt: string;          // 생성일 (ISO 8601)
  updatedAt: string;          // 수정일 (ISO 8601)
}
```

#### **API Endpoints**

##### `GET /activities` - 활동 목록 조회

- **설명:** 필터링 및 정렬 조건에 맞는 활동 목록을 페이지네이션하여 조회합니다.
- **인증:** 선택 사항 (인증 시 `isLiked` 필드 포함)
- **쿼리 파라미터:**
    - `page` (number, optional, default: 1): 조회할 페이지 번호
    - `limit` (number, optional, default: 12): 한 페이지에 보여줄 항목 수
    - `category` (string, optional): 카테고리 필터링 ("원데이 클래스", "스터디")
    - `sort` (string, optional, default: 'latest'): 정렬 기준 ('latest': 최신순, 'popular': 인기순)
- **성공 응답 (200 OK):**
    ```json
    {
      "success": true,
      "data": {
        "activities": [
          // ActivityInfo 객체 배열 (Activity 모델에서 description, curriculum, guidelines 제외)
        ],
        "pagination": {
          "currentPage": 1,
          "totalPages": 10,
          "totalItems": 120
        }
      }
    }
    ```

##### `GET /activities/{id}` - 활동 상세 조회

- **설명:** 특정 ID를 가진 활동의 모든 상세 정보를 조회합니다.
- **인증:** 선택 사항 (인증 시 `isLiked` 필드 포함)
- **성공 응답 (200 OK):**
    ```json
    {
      "success": true,
      "data": {
        // Activity 전체 모델 객체
      }
    }
    ```

##### `POST /activities` - 활동 생성

- **설명:** 새로운 활동을 생성합니다. (관리자 권한 필요)
- **인증:** 필수 (Admin)
- **Request Body:** `Activity` 모델에서 `id`, `likes`, `isLiked`, `createdAt`, `updatedAt`을 제외한 모든 필드
- **성공 응답 (201 Created):**
    ```json
    {
      "success": true,
      "data": {
        "id": "new-activity-id" // 새로 생성된 활동의 ID
      }
    }
    ```

##### `PATCH /activities/{id}` - 활동 수정

- **설명:** 기존 활동의 정보를 수정합니다. (관리자 권한 필요)
- **인증:** 필수 (Admin)
- **Request Body:** 수정할 필드만 포함한 부분적인 `Activity` 객체
- **성공 응답 (200 OK):**
    ```json
    {
      "success": true,
      "data": {
        "id": "updated-activity-id"
      }
    }
    ```

##### `POST /activities/{id}/like` - 활동 좋아요/취소

- **설명:** 특정 활동에 대한 '좋아요'를 토글(toggle)합니다.
- **인증:** 필수
- **성공 응답 (200 OK):**
    ```json
    {
      "success": true,
      "data": {
        "likes": 43,       // 업데이트된 총 좋아요 수
        "isLiked": true    // 현재 사용자의 좋아요 상태
      }
    }
    ```

---

### 2. 연혁 (History)

`historyData.ts` 기반

#### **데이터 모델: `HistoryEvent`**

```typescript
interface HistoryEvent {
  year: number;
  events: {
    month: number;
    content: string;
  }[];
}
```

#### **API Endpoints**

##### `GET /history` - 연혁 목록 조회

- **설명:** OCIAL의 전체 연혁을 연도별로 그룹화하여 조회합니다.
- **인증:** 불필요
- **성공 응답 (200 OK):**
    ```json
    {
      "success": true,
      "data": [
        // HistoryEvent 객체 배열
      ]
    }
    ```

---

### 3. 구성원 (Members)

`memberData.ts` 기반

#### **데이터 모델: `Member`**

```typescript
interface Member {
  id: string;
  name: string;
  role: string;         // "Founder", "Co-Founder", "Lead" 등
  team: string;         // 소속 팀 (예: "Vision Team")
  description: string;  // 한 줄 소개
  imageUrl: string;     // 프로필 이미지 URL
}
```

#### **API Endpoints**

##### `GET /members` - 구성원 목록 조회

- **설명:** OCIAL의 전체 구성원 목록을 조회합니다.
- **인증:** 불필요
- **쿼리 파라미터:**
    - `role` (string, optional): 역할별 필터링
- **성공 응답 (200 OK):**
    ```json
    {
      "success": true,
      "data": [
        // Member 객체 배열
      ]
    }
    ```
