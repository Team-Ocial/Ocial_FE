import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { useToastStore } from '@/hooks/useToast';
import type { Toast, ToastType } from '@/types/toast.types';
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaTimes,
} from 'react-icons/fa';
import { theme } from '@/styles/theme';

// Toast 설정
const TOAST_CONFIG = {
  DEFAULT_DURATION: 3000, // 3초
} as const;

const toastIcons: Record<ToastType, React.ReactNode> = {
  success: <FaCheckCircle />,
  error: <FaExclamationCircle />,
  warning: <FaExclamationTriangle />,
  info: <FaInfoCircle />,
};

const toastColors: Record<ToastType, string> = {
  success: theme.colors.primary[100], // 성공: 기본 파란색
  error: theme.colors.secondary[400], // 오류: 빨간색
  warning: theme.colors.tertiary[500], // 경고: 노란색
  info: theme.colors.blue[500], // 정보: 파란색
};

interface ToastItemProps {
  toast: Toast;
}

const ToastItem = ({ toast }: ToastItemProps) => {
  const { hideToast } = useToastStore();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    const timer = setTimeout(() => {
      hideToast(toast.id);
    }, toast.duration ?? TOAST_CONFIG.DEFAULT_DURATION);

    return () => clearTimeout(timer);
  }, [toast, hideToast, isHovered]);

  return (
    <div
      css={toastWrapper(toast.type)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div css={iconWrapper}>{toastIcons[toast.type]}</div>
      <p css={message}>{toast.message}</p>
      <button css={closeButton} onClick={() => hideToast(toast.id)}>
        <FaTimes />
      </button>
    </div>
  );
};

export const ToastContainer = () => {
  const { toasts } = useToastStore();

  return (
    <div css={toastContainer}>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
};

// Styles
const toastContainer = css`
  position: fixed;
  top: 102px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 11;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const toastWrapper = (type: ToastType) => css`
  width: 320px;
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 8px;
  color: white;
  background-color: ${toastColors[type]};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const iconWrapper = css`
  font-size: 24px;
  margin-right: 15px;
`;

const message = css`
  flex-grow: 1;
  margin: 0;
  font-size: 16px;
  line-height: 1.4;
`;

const closeButton = css`
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  padding: 0 5px;
  opacity: 0.8;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;
