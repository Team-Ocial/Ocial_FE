import { css } from '@emotion/react';
import { theme } from '@/styles/theme';
import SquareButton from '@/components/common/SquareButton';
import Modal from '@/components/common/Modal';
import { useModalStore } from '@/store/useModalStore';

const ModalTest = () => {
  const { openModal } = useModalStore();

  const handleConfirmModal = () => {
    openModal({
      type: 'confirm',
      title: '확인 모달',
      desc: '이 작업을 계속 진행하시겠습니까?\n확인을 클릭하면 작업이 실행됩니다.',
      actionButton: '확인',
      onAction: () => {
        alert('확인 버튼이 클릭되었습니다!');
      },
    });
  };

  const handleWarningModal = () => {
    openModal({
      type: 'warning',
      title: '경고 모달',
      desc: '이 작업은 되돌릴 수 없습니다.\n정말로 삭제하시겠습니까?',
      actionButton: '삭제',
      onAction: () => {
        alert('삭제 버튼이 클릭되었습니다!');
      },
    });
  };

  const handleActivityCancelModal = () => {
    openModal({
      type: 'warning',
      title: '활동 취소',
      desc: '정말로 이 활동을 취소하시겠습니까?\n취소된 활동은 복구할 수 없습니다.',
      actionButton: '취소하기',
      onAction: () => {
        alert('활동이 취소되었습니다!');
      },
    });
  };

  const handleSignupModal = () => {
    openModal({
      type: 'confirm',
      title: '회원가입 완료',
      desc: '회원가입이 성공적으로 완료되었습니다.\n로그인 페이지로 이동하시겠습니까?',
      actionButton: '로그인하기',
      onAction: () => {
        alert('로그인 페이지로 이동합니다!');
      },
    });
  };

  return (
    <div css={pageContainer}>
      <h1 css={title}>Modal 컴포넌트 테스트</h1>

      {/* 기본 모달 테스트 */}
      <section css={section}>
        <h2 css={sectionTitle}>기본 모달 테스트</h2>
        <div css={buttonGroup}>
          <SquareButton variant='filled' onClick={handleConfirmModal}>
            확인 모달 열기
          </SquareButton>
          <SquareButton variant='outlined' onClick={handleWarningModal}>
            경고 모달 열기
          </SquareButton>
        </div>
      </section>

      {/* 실제 사용 사례 */}
      <section css={section}>
        <h2 css={sectionTitle}>실제 사용 사례</h2>
        <div css={buttonGroup}>
          <SquareButton variant='outlined' onClick={handleActivityCancelModal}>
            활동 취소 모달
          </SquareButton>
          <SquareButton variant='filled' onClick={handleSignupModal}>
            회원가입 완료 모달
          </SquareButton>
        </div>
      </section>

      {/* 사용법 설명 */}
      <section css={section}>
        <h2 css={sectionTitle}>사용법</h2>
        <div css={codeBlock}>
          <pre css={codeStyle}>{`
// 모달 스토어 사용
import { useModalStore } from '@/store/useModalStore';

const { openModal } = useModalStore();

// 확인 모달
openModal({
  type: 'confirm',
  title: '제목',
  desc: '설명 텍스트\\n줄바꿈 가능',
  actionButton: '확인',
  onAction: () => {
    // 확인 버튼 클릭 시 실행할 코드
  },
});

// 경고 모달
openModal({
  type: 'warning',
  title: '경고',
  desc: '경고 메시지',
  actionButton: '삭제',
  onAction: () => {
    // 삭제 버튼 클릭 시 실행할 코드
  },
});
          `}</pre>
        </div>
      </section>

      {/* Modal 컴포넌트 렌더링 */}
      <Modal />
    </div>
  );
};

export default ModalTest;

// Styles
const pageContainer = css`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const title = css`
  ${theme.typography.headlineLarge};
  color: ${theme.colors.black};
  margin-bottom: 2rem;
  text-align: center;
`;

const section = css`
  margin-bottom: 3rem;
  padding: 2rem;
  background: ${theme.colors.white};
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const sectionTitle = css`
  ${theme.typography.titleLarge};
  color: ${theme.colors.grayscale[700]};
  margin-bottom: 1.5rem;
`;

const buttonGroup = css`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
`;

const codeBlock = css`
  background: ${theme.colors.grayscale[50]};
  border-radius: 8px;
  padding: 1rem;
  overflow-x: auto;
`;

const codeStyle = css`
  ${theme.typography.textSmall};
  color: ${theme.colors.grayscale[700]};
  margin: 0;
  white-space: pre-wrap;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
`;
