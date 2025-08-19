import { css } from '@emotion/react';
import { useState } from 'react';

import { useSignupStore } from '@/store/useSignupStore';
import Button from '@/components/common/Button';
import { theme } from '@/styles/theme';
import SignupLayout, {
  formStyle,
  inputGroupStyle,
  labelStyle,
  requiredStyle,
  inputStyle,
  errorMessageStyle,
} from '@/components/common/SignupLayout';

import AgreementModal from '@/components/common/AgreementModal';

const Step2 = () => {
  const { formData, updateFormData, setStep, errors, validateStep } = useSignupStore();
  const [showModal, setShowModal] = useState(false);
  const [currentAgreement, setCurrentAgreement] = useState<'terms' | 'privacy' | 'marketing'>(
    'terms'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep()) {
      // TODO: 회원가입 처리 로직 구현
      console.warn('회원가입 완료', formData);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const openModal = (type: 'terms' | 'privacy' | 'marketing') => {
    setCurrentAgreement(type);
    setShowModal(true);
  };

  const handleAllAgreements = (checked: boolean) => {
    updateFormData({
      agreements: {
        termsOfService: checked,
        privacyPolicy: checked,
        marketing: checked,
      },
    });
  };

  // 가입 버튼 활성화 여부 확인
  const isSubmitEnabled =
    formData.agreements.termsOfService &&
    formData.agreements.privacyPolicy &&
    formData.password &&
    formData.passwordConfirm &&
    formData.password === formData.passwordConfirm;

  return (
    <SignupLayout step={2} title='오셜과 함께 당신의 여정을 시작하세요.'>
      <form onSubmit={handleSubmit} css={formStyle} noValidate>
        <div css={inputGroupStyle}>
          <label css={labelStyle}>
            ID <span css={requiredStyle}>*</span>
          </label>
          <input
            type='text'
            value={formData.id}
            onChange={(e) => updateFormData({ id: e.target.value })}
            placeholder='사용하실 아이디를 입력하세요. (영문 + 숫자 5자 이상)'
            css={inputStyle}
          />
          {errors.id && <span css={errorMessageStyle}>{errors.id}</span>}
        </div>

        <div css={inputGroupStyle}>
          <label css={labelStyle}>
            비밀번호 <span css={requiredStyle}>*</span>
          </label>
          <input
            type='password'
            value={formData.password}
            onChange={(e) => updateFormData({ password: e.target.value })}
            placeholder='영문 + 숫자 + 특수기호 8자 이상'
            css={inputStyle}
          />
          {errors.password && <span css={errorMessageStyle}>{errors.password}</span>}
          <input
            type='password'
            value={formData.passwordConfirm}
            onChange={(e) => updateFormData({ passwordConfirm: e.target.value })}
            placeholder='비밀번호를 한번 더 입력해주세요.'
            css={inputStyle}
          />
          {errors.passwordConfirm && <span css={errorMessageStyle}>{errors.passwordConfirm}</span>}
        </div>

        <div css={verificationContainerStyle}>
          <h3 css={verificationTitleStyle}>본인인증</h3>
          <button type='button' css={verificationButtonStyle}>
            본인인증
          </button>
        </div>

        <div css={agreementsContainerStyle}>
          <div css={allAgreementStyle}>
            <label css={checkboxLabelStyle}>
              <input
                type='checkbox'
                checked={
                  formData.agreements.termsOfService &&
                  formData.agreements.privacyPolicy &&
                  formData.agreements.marketing
                }
                onChange={(e) => handleAllAgreements(e.target.checked)}
              />
              전체동의
            </label>
          </div>

          <div css={agreementBoxStyle}>
            <div css={agreementStyle}>
              <label css={checkboxLabelStyle}>
                <input
                  type='checkbox'
                  checked={formData.agreements.termsOfService}
                  onChange={(e) =>
                    updateFormData({
                      agreements: {
                        ...formData.agreements,
                        termsOfService: e.target.checked,
                      },
                    })
                  }
                />
                오셜 이용약관 동의 (필수)
              </label>
              <button type='button' onClick={() => openModal('terms')} css={viewButtonStyle}>
                전문보기
              </button>
            </div>
            {errors.agreements?.termsOfService && (
              <span css={errorMessageStyle}>{errors.agreements.termsOfService}</span>
            )}

            <div css={agreementStyle}>
              <label css={checkboxLabelStyle}>
                <input
                  type='checkbox'
                  checked={formData.agreements.privacyPolicy}
                  onChange={(e) =>
                    updateFormData({
                      agreements: {
                        ...formData.agreements,
                        privacyPolicy: e.target.checked,
                      },
                    })
                  }
                />
                개인정보 수집 및 이용 동의 (필수)
              </label>
              <button type='button' onClick={() => openModal('privacy')} css={viewButtonStyle}>
                전문보기
              </button>
            </div>
            {errors.agreements?.privacyPolicy && (
              <span css={errorMessageStyle}>{errors.agreements.privacyPolicy}</span>
            )}

            <div css={agreementStyle}>
              <label css={checkboxLabelStyle}>
                <input
                  type='checkbox'
                  checked={formData.agreements.marketing}
                  onChange={(e) =>
                    updateFormData({
                      agreements: {
                        ...formData.agreements,
                        marketing: e.target.checked,
                      },
                    })
                  }
                />
                이메일 및 채팅 정보 수신 동의 (선택)
              </label>
              <button type='button' onClick={() => openModal('marketing')} css={viewButtonStyle}>
                전문보기
              </button>
            </div>
          </div>
        </div>

        <div css={buttonGroupStyle}>
          <Button type='button' variant='outlined' size='large' width={220} onClick={handleBack}>
            이전
          </Button>
          <Button type='submit' size='large' width={220} disabled={!isSubmitEnabled}>
            가입
          </Button>
        </div>
      </form>

      {showModal && <AgreementModal type={currentAgreement} onClose={() => setShowModal(false)} />}
    </SignupLayout>
  );
};

// Step2 전용 스타일들
const verificationContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
`;

const verificationTitleStyle = css`
  ${theme.typography.titleLarge}
  color: ${theme.colors.grayscale[900]};
  margin: 0;
`;

const verificationButtonStyle = css`
  height: 48px;
  background-color: ${theme.colors.grayscale[100]};
  border: none;
  border-radius: 8px;
  ${theme.typography.labelMedium}
  color: ${theme.colors.grayscale[700]};
  cursor: pointer;
  &:hover {
    background-color: ${theme.colors.grayscale[200]};
  }
`;

const agreementsContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const allAgreementStyle = css`
  padding: 16px 0;
  border-bottom: 1px solid ${theme.colors.grayscale[200]};
`;

const agreementBoxStyle = css`
  background-color: ${theme.colors.grayscale[100]};
  border-radius: 8px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const agreementStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const checkboxLabelStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
  ${theme.typography.labelSmall}
  color: ${theme.colors.grayscale[700]};
  cursor: pointer;

  input[type='checkbox'] {
    width: 20px;
    height: 20px;
    border: 1px solid ${theme.colors.grayscale[300]};
    border-radius: 4px;
    cursor: pointer;
  }
`;

const viewButtonStyle = css`
  background: none;
  border: none;
  color: ${theme.colors.grayscale[400]};
  ${theme.typography.textSmall}
  text-decoration: underline;
  cursor: pointer;
  padding: 0;
`;

const buttonGroupStyle = css`
  display: flex;
  gap: 16px;
  margin-top: 24px;
`;

export default Step2;
