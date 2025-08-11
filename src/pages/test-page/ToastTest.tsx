import { css } from '@emotion/react';
import Button from '@/components/common/Button';
import { useToast } from '@/hooks/useToast';
import type { ToastType } from '@/types/toast.types';
import { theme } from '@/styles/theme';

const ToastTest = () => {
  const { toast, success, error, warning, info } = useToast();

  const testMessages = {
    success: [
      '성공적으로 저장되었습니다!',
      '파일 업로드가 완료되었습니다.',
      '계정이 성공적으로 생성되었습니다.',
    ],
    error: [
      '오류가 발생했습니다. 다시 시도해주세요.',
      '네트워크 연결을 확인해주세요.',
      '권한이 없습니다. 관리자에게 문의하세요.',
    ],
    warning: [
      '변경사항이 저장되지 않았습니다.',
      '세션이 곧 만료됩니다.',
      '용량이 부족합니다. 정리가 필요합니다.',
    ],
    info: [
      '새로운 업데이트가 있습니다.',
      '시스템 점검이 예정되어 있습니다.',
      '도움말을 확인해보세요.',
    ],
  };

  const getButtonColor = (toastType: ToastType) => {
    switch (toastType) {
      case 'success':
        return theme.colors.primary[100]; // Toast와 동일한 색상
      case 'error':
        return theme.colors.secondary[500]; // Toast와 동일한 색상
      case 'warning':
        return theme.colors.tertiary[500]; // Toast와 동일한 색상
      case 'info':
        return theme.colors.blue[500]; // Toast와 동일한 색상
      default:
        return theme.colors.primary[100];
    }
  };

  return (
    <div css={container}>
      <h1 css={title}>🍞 Toast 테스트 페이지</h1>
      <p css={description}>각 버튼을 클릭하여 다양한 타입의 Toast 알림을 테스트해보세요.</p>

      <section css={section}>
        <h2 css={sectionTitle}>기본 Toast 테스트</h2>
        <div css={buttonGrid}>
          <Button
            css={css`
              background-color: ${getButtonColor('success')} !important;
              color: white;
            `}
            onClick={() => success(testMessages.success[0])}
          >
            ✅ Success Toast
          </Button>
          <Button
            css={css`
              background-color: ${getButtonColor('error')} !important;
              color: white;
            `}
            onClick={() => error(testMessages.error[0])}
          >
            ❌ Error Toast
          </Button>
          <Button
            css={css`
              background-color: ${getButtonColor('warning')} !important;
              color: white;
            `}
            onClick={() => warning(testMessages.warning[0])}
          >
            ⚠️ Warning Toast
          </Button>
          <Button
            css={css`
              background-color: ${getButtonColor('info')} !important;
              color: white;
            `}
            onClick={() => info(testMessages.info[0])}
          >
            ℹ️ Info Toast
          </Button>
        </div>
      </section>

      <section css={section}>
        <h2 css={sectionTitle}>지속시간 테스트</h2>
        <div css={buttonGrid}>
          <Button
            css={css`
              background-color: ${getButtonColor('success')} !important;
              color: white;
            `}
            onClick={() => success('1초 후 사라집니다', 1000)}
          >
            ⚡ 1초 Toast
          </Button>
          <Button
            css={css`
              background-color: ${getButtonColor('info')} !important;
              color: white;
            `}
            onClick={() => info('5초 후 사라집니다', 5000)}
          >
            ⏰ 5초 Toast
          </Button>
          <Button
            css={css`
              background-color: ${getButtonColor('warning')} !important;
              color: white;
            `}
            onClick={() => warning('10초 후 사라집니다', 10000)}
          >
            🕐 10초 Toast
          </Button>
        </div>
      </section>

      <section css={section}>
        <h2 css={sectionTitle}>다양한 메시지 테스트</h2>
        <div css={buttonGrid}>
          {(Object.keys(testMessages) as ToastType[]).map((toastType) => (
            <Button
              key={toastType}
              css={css`
                background-color: ${getButtonColor(toastType)} !important;
                color: white;
              `}
              onClick={() => {
                const messages = testMessages[toastType];
                const randomMessage = messages[Math.floor(Math.random() * messages.length)];
                toast(toastType, randomMessage);
              }}
            >
              🎲 랜덤 {toastType.toUpperCase()}
            </Button>
          ))}
        </div>
      </section>

      <section css={section}>
        <h2 css={sectionTitle}>다중 Toast 테스트</h2>
        <div css={buttonGrid}>
          <Button
            css={css`
              background-color: ${getButtonColor('info')} !important;
              color: white;
            `}
            onClick={() => {
              info('첫 번째 알림');
              setTimeout(() => success('두 번째 알림'), 500);
              setTimeout(() => warning('세 번째 알림'), 1000);
            }}
          >
            🔢 순차 Toast (3개)
          </Button>
          <Button
            css={css`
              background-color: ${getButtonColor('error')} !important;
              color: white;
            `}
            onClick={() => {
              for (let i = 1; i <= 5; i++) {
                info(`Toast ${i}번째`, 2000 + i * 1000);
              }
            }}
          >
            📚 다중 Toast (5개)
          </Button>
        </div>
      </section>

      <section css={section}>
        <h2 css={sectionTitle}>긴 메시지 테스트</h2>
        <div css={buttonGrid}>
          <Button
            css={css`
              background-color: ${getButtonColor('info')} !important;
              color: white;
            `}
            onClick={() =>
              info(
                '이것은 매우 긴 메시지입니다. Toast가 어떻게 긴 텍스트를 처리하는지 확인해보세요. 여러 줄로 표시될 수 있습니다.'
              )
            }
          >
            📝 긴 메시지 Toast
          </Button>
          <Button
            css={css`
              background-color: ${getButtonColor('error')} !important;
              color: white;
            `}
            onClick={() =>
              error(
                '오류: 파일 업로드에 실패했습니다. 파일 크기가 너무 크거나 지원하지 않는 형식일 수 있습니다. 다시 시도하거나 관리자에게 문의하세요.'
              )
            }
          >
            📄 상세 오류 메시지
          </Button>
        </div>
      </section>

      <div css={infoBox}>
        <h4>💡 테스트 가이드</h4>
        <ul>
          <li>Toast 위에 마우스를 올리면 사라지는 것이 멈춥니다</li>
          <li>X 버튼을 클릭하면 즉시 닫을 수 있습니다</li>
          <li>여러 개의 Toast가 동시에 표시될 수 있습니다</li>
          <li>기본 지속시간은 3초입니다</li>
        </ul>
      </div>
    </div>
  );
};

const container = css`
  padding: 40px 20px;
  max-width: 800px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const title = css`
  font-size: 2.5rem;
  color: #333;
  text-align: center;
  margin-bottom: 16px;
`;

const description = css`
  font-size: 1.1rem;
  color: #666;
  text-align: center;
  margin-bottom: 40px;
  line-height: 1.6;
`;

const section = css`
  margin-bottom: 40px;
  padding: 24px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e9ecef;
`;

const sectionTitle = css`
  font-size: 1.5rem;
  color: #495057;
  margin-bottom: 20px;
  padding-bottom: 8px;
  border-bottom: 2px solid #dee2e6;
`;

const buttonGrid = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 16px;
`;

const infoBox = css`
  background: #e3f2fd;
  border: 1px solid #bbdefb;
  border-radius: 8px;
  padding: 20px;
  margin-top: 40px;

  h4 {
    margin: 0 0 12px 0;
    color: #1976d2;
  }

  ul {
    margin: 0;
    padding-left: 20px;

    li {
      margin-bottom: 8px;
      color: #424242;
      line-height: 1.5;
    }
  }
`;

export default ToastTest;
