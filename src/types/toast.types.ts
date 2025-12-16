// src/types/toast.types.ts

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  /** Toast가 생성된 시간 (디버깅용) */
  timestamp?: number;
}

export type ToastOptions = Omit<Toast, 'id' | 'timestamp'>;

/** Toast 설정 타입 */
export interface ToastConfig {
  DEFAULT_DURATION: number;
  POSITION: {
    TOP: number;
    Z_INDEX: number;
  };
  ANIMATION: {
    DURATION: string;
    EASING: string;
  };
}
