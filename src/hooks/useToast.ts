import { create } from 'zustand';
import type { Toast, ToastOptions, ToastType } from '@/types/toast.types';

// Toast 상태 관리 인터페이스
interface ToastState {
  toasts: Toast[];
  showToast: (options: ToastOptions) => void;
  hideToast: (id: string) => void;
  clearAllToasts: () => void;
}

// ID 생성 함수
const generateToastId = (() => {
  let counter = 0;
  return () => `toast-${Date.now()}-${++counter}`;
})();

// Zustand 스토어
export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  showToast: (options) => {
    const newToast: Toast = {
      ...options,
      id: generateToastId(),
      timestamp: Date.now(),
    };
    // 기존 Toast를 모두 제거하고 새 Toast만 표시
    set(() => ({ toasts: [newToast] }));
  },
  hideToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) }));
  },
  clearAllToasts: () => {
    set(() => ({ toasts: [] }));
  },
}));

/**
 * Toast를 쉽게 사용하기 위한 커스텀 훅
 * 각 컴포넌트에서 반복적인 코드 없이 간단하게 Toast를 표시할 수 있습니다.
 */
export const useToast = () => {
  const { showToast, hideToast, clearAllToasts } = useToastStore();

  /**
   * Toast 표시 함수
   * @param type - Toast 타입 ('success' | 'error' | 'warning' | 'info')
   * @param message - 표시할 메시지
   * @param duration - 지속시간 (선택적, 기본값: 3초)
   */
  const toast = (type: ToastType, message: string, duration?: number) => {
    showToast({ type, message, duration });
  };

  // 편의 메서드들 - 타입별로 간단하게 호출 가능
  const success = (message: string, duration?: number) => {
    toast('success', message, duration);
  };

  const error = (message: string, duration?: number) => {
    toast('error', message, duration);
  };

  const warning = (message: string, duration?: number) => {
    toast('warning', message, duration);
  };

  const info = (message: string, duration?: number) => {
    toast('info', message, duration);
  };

  return {
    // 기본 메서드
    toast,
    showToast,
    hideToast,
    clearAllToasts,

    // 편의 메서드
    success,
    error,
    warning,
    info,
  };
};
