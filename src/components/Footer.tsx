import { css } from '@emotion/react';
import { theme } from '@/styles/theme';
import { Link } from 'react-router-dom';
import logoGray from '@/assets/images/logo_gray.png';

const Footer = () => {
  return (
    <footer css={footerStyle}>
      <div css={footerContentStyle}>
        <div css={topRowStyle}>
          <img src={logoGray} alt='OCIAL' css={logoStyle} />
          <div css={linksStyle}>
            <Link to='/privacy' css={linkStyle}>
              개인정보 처리방침
            </Link>
            <Link to='/terms' css={linkStyle}>
              이용안내
            </Link>
          </div>
        </div>

        <div css={infoRowStyle}>
          <span>상호명 (주)오셜</span>
          <span css={dividerStyle}>|</span>
          <span>대표이사 오수열</span>
          <span css={dividerStyle}>|</span>
          <span>사업자 등록 번호 111-11-11111</span>
        </div>

        <div css={infoRowStyle}>
          <span>서울 종로구 경희궁 2길 8-4</span>
          <span css={dividerStyle}>|</span>
          <span>제휴 및 문의 ocial@co.kr</span>
          <span>000-000-0000</span>
        </div>

        <div css={dividerLineStyle} />

        <div css={copyrightStyle}>© 2024 OCIAL. All rights reserved</div>
      </div>
    </footer>
  );
};

export default Footer;

const footerStyle = css`
  width: 100%;
  background-color: ${theme.colors.white};
  padding: 40px 0;
`;

const footerContentStyle = css`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const topRowStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const logoStyle = css`
  height: 44px;
`;

const linksStyle = css`
  display: flex;
  gap: 24px;
`;

const linkStyle = css`
  ${theme.typography.textMedium};
  color: ${theme.colors.grayscale[700]};
  text-decoration: none;

  &:hover {
    color: ${theme.colors.grayscale[900]};
  }
`;

const infoRowStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
  ${theme.typography.textSmall};
  color: ${theme.colors.grayscale[600]};
  margin-bottom: 8px;
`;

const dividerStyle = css`
  color: ${theme.colors.grayscale[400]};
`;

const dividerLineStyle = css`
  width: 100%;
  height: 1px;
  background-color: ${theme.colors.grayscale[200]};
  margin: 24px 0;
`;

const copyrightStyle = css`
  ${theme.typography.textSmall};
  color: ${theme.colors.grayscale[500]};
`;
