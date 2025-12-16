import { css } from '@emotion/react';

interface AgreementModalProps {
  type: 'terms' | 'privacy' | 'marketing';
  onClose: () => void;
}

const AgreementModal = ({ type, onClose }: AgreementModalProps) => {
  const getTitle = () => {
    switch (type) {
      case 'terms':
        return '오셜 이용약관';
      case 'privacy':
        return '개인정보 수집 및 이용 동의';
      case 'marketing':
        return '이메일 및 채팅 정보 수신 동의';
    }
  };

  const getContent = () => {
    switch (type) {
      case 'terms':
        return '이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...이용약관 내용...';
      case 'privacy':
        return '개인정보 처리방침 내용...';
      case 'marketing':
        return '마케팅 정보 수신 동의 내용...';
    }
  };

  return (
    <div css={overlayStyle}>
      <div css={modalStyle}>
        <div css={headerStyle}>
          <h3 css={titleStyle}>{getTitle()}</h3>
          <button onClick={onClose} css={closeButtonStyle}>
            ✕
          </button>
        </div>
        <div css={contentStyle}>{getContent()}</div>
      </div>
    </div>
  );
};

const overlayStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 12;
`;

const modalStyle = css`
  background-color: #fff;
  border-radius: 16px;
  width: 90%;
  max-width: 1200px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
`;

const headerStyle = css`
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const titleStyle = css`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
`;

const closeButtonStyle = css`
  background: none;
  border: none;
  font-size: 24px;
  color: #666;
  cursor: pointer;
  padding: 0;
`;

const contentStyle = css`
  padding: 20px;
  overflow-y: auto;
  font-size: 14px;
  line-height: 1.6;
`;

export default AgreementModal;
