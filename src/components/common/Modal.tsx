import { css } from '@emotion/react';
import { createPortal } from 'react-dom';

import SquareButton from '@/components/common/SquareButton';
import { useModalStore } from '@/store/useModalStore';
import { theme } from '@/styles/theme';

const Modal = () => {
  const { isOpen, modalData, closeModal } = useModalStore();

  if (!isOpen || !modalData) return null;

  const { type, title, desc, actionButton, onAction } = modalData;

  const onClickButton = () => {
    onAction();
    closeModal();
  };

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) {
    console.error('modal-root를 찾지 못함!');
    return null;
  }

  return createPortal(
    <div css={modalBackgroundStyle}>
      <div css={modalStyle}>
        <div css={titleStyle}>{title}</div>
        <div css={descStyle}>{desc}</div>
        <div css={modalButtonStyle}>
          <SquareButton
            onClick={closeModal}
            variant='outlined'
            size='medium'
            css={modalButtonBaseStyle}
          >
            취소
          </SquareButton>
          <SquareButton
            onClick={onClickButton}
            variant='filled'
            size='medium'
            css={[modalButtonBaseStyle, getButtonStyle(type)]}
          >
            {actionButton}
          </SquareButton>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;

const modalBackgroundStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const modalStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 380px;
  min-height: 200px;
  padding: 36px 40px;
  background-color: ${theme.colors.white};
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
`;

const titleStyle = css`
  ${theme.typography.titleLarge};
  color: ${theme.colors.black};
  text-align: center;
  margin-bottom: 12px;
`;

const descStyle = css`
  white-space: pre-line;
  text-align: center;
  ${theme.typography.textMedium};
  color: ${theme.colors.grayscale[600]};
  line-height: 1.6;
  margin-bottom: 32px;
`;

const modalButtonStyle = css`
  display: flex;
  gap: 12px;
  width: 100%;
  justify-content: center;
`;

const modalButtonBaseStyle = css`
  min-width: 120px;
  padding: 0 32px !important;
`;

const getButtonStyle = (type: 'confirm' | 'warning') => {
  if (type === 'confirm') {
    return css`
      background-color: ${theme.colors.primary[100]} !important;
      border-color: ${theme.colors.primary[100]} !important;
      color: ${theme.colors.white} !important;

      &:hover {
        background-color: ${theme.colors.primary[200]} !important;
        border-color: ${theme.colors.primary[200]} !important;
      }
    `;
  } else if (type === 'warning') {
    return css`
      background-color: ${theme.colors.secondary[500]} !important;
      border-color: ${theme.colors.secondary[500]} !important;
      color: ${theme.colors.white} !important;

      &:hover {
        background-color: ${theme.colors.secondary[400]} !important;
        border-color: ${theme.colors.secondary[400]} !important;
      }
    `;
  }
  return css``;
};
