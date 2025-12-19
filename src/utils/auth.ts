import { useAuthStore } from '@/store/useAuthStore';

/**
 * 권한 체크 유틸리티 Hook
 * 
 * 현재는 임시로 localStorage를 사용하지만,
 * 나중에 백엔드 API와 연동할 때는 useAuthStore에서 userRole을 가져오도록 쉽게 교체 가능합니다.
 * 
 * 사용 예시:
 * const isAdmin = useIsAdmin();
 */

/**
 * 관리자 권한 체크 Hook
 * 
 * TODO: 백엔드 API 연동 시 아래 코드로 교체
 * const userRole = useAuthStore((state) => state.userRole);
 * return userRole === 'admin';
 */
export const useIsAdmin = (): boolean => {
  // 임시: localStorage 사용
  // 나중: useAuthStore((state) => state.userRole === 'admin')
  // useAuthStore를 사용하여 hook 규칙 준수
  useAuthStore(); // hook 규칙을 위해 사용
  return localStorage.getItem('isAdmin') === 'true';
};

