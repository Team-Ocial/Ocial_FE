import { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';

interface LoginCredentials {
  id: string;
  password: string;
}

interface SignupData {
  // 회원가입 데이터 타입 (필요시 확장)
  id: string;
  password: string;
  email: string;
  name: string;
}

interface LoginErrors {
  id?: string;
  password?: string;
}

interface UseAuthReturn {
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  isLoading: boolean;
  errors: LoginErrors;
}

/**
 * 인증 관련 API 호출과 상태를 관리하는 커스텀 훅
 * 프로젝트의 다른 hooks와 동일한 패턴으로 data, isLoading, error 상태를 반환합니다.
 */
export const useAuth = (): UseAuthReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});
  const { login: setAuthState } = useAuthStore();

  const login = async (credentials: LoginCredentials): Promise<void> => {
    setIsLoading(true);
    setErrors({});

    try {
      // TODO: 실제 API 호출로 교체
      // const response = await authAPI.login(credentials);

      // 임시 검증 로직 (실제 API 연동 전까지 사용)
      await new Promise((resolve) => setTimeout(resolve, 1000)); // API 호출 시뮬레이션

      const newErrors: LoginErrors = {};

      // 개별 필드 검증
      if (!credentials.id.trim()) {
        newErrors.id = '아이디를 입력해주세요.';
      }

      if (!credentials.password.trim()) {
        newErrors.password = '비밀번호를 입력해주세요.';
      }

      // 오류가 있으면 던지기
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        throw new Error('입력 정보를 확인해주세요.');
      }

      // 계정 검증 (테스트용)
      if (credentials.id === 'test' && credentials.password === 'wrong') {
        setErrors({ password: '비밀번호가 올바르지 않습니다.' });
        throw new Error('로그인 실패');
      }

      if (credentials.id === 'nonexistent') {
        setErrors({ id: '존재하지 않는 아이디입니다.' });
        throw new Error('로그인 실패');
      }

      // 임시 로그인 성공 처리
      console.log('로그인 성공:', credentials.id);

      // 전역 상태 업데이트
      setAuthState(credentials.id);
    } catch (err) {
      // 이미 setErrors로 처리했으므로 추가 처리 없음
      throw err; // 컴포넌트에서 추가 처리할 수 있도록 에러를 다시 던짐
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: SignupData): Promise<void> => {
    setIsLoading(true);
    setErrors({});

    try {
      // TODO: 실제 API 호출로 교체
      // const response = await authAPI.signup(data);

      // 임시 회원가입 로직
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('회원가입 시도:', data);
    } catch (err) {
      // 회원가입 오류 처리 (필요시 확장)
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    signup,
    isLoading,
    errors,
  };
};
