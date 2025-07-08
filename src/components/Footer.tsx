import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer css={footerContainer}>
      <div css={footerContent}>
        {/* 로고 섹션 */}
        <div>
          <img
            src='https://cdn.builder.io/api/v1/image/assets/TEMP/715bc504f51434731ff03a828cb112d176455775?width=241'
            alt='OCIAL Logo'
            css={footerLogo}
          />
          <p css={copyright}>© 2024 OCIAL. All rights reserved.</p>
        </div>

        {/* 네비게이션 섹션 */}
        <div css={navigationSection}>
          {/* OCIAL */}
          <div>
            <h3 css={sectionTitle}>OCIAL</h3>
            <div css={linkContainer}>
              <Link to='/OCIAL/history' css={footerLink}>
                연혁
              </Link>
              <Link to='/OCIAL/members' css={footerLink}>
                구성원
              </Link>
            </div>
          </div>

          {/* Activity */}
          <div>
            <h3 css={sectionTitle}>Activity</h3>
            <div css={linkContainer}>
              <Link to='/activity' css={footerLink}>
                Activity 목록
              </Link>
            </div>
          </div>

          {/* News */}
          <div>
            <h3 css={sectionTitle}>News</h3>
            <div css={linkContainer}>
              <Link to='/news/notice' css={footerLink}>
                공지사항
              </Link>
              <Link to='/news/press' css={footerLink}>
                보도자료
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// Styles
const footerContainer = css`
  background: #000;
  padding: 80px 135px;
  color: #fff;
`;

const footerContent = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const footerLogo = css`
  width: 120px;
  height: 38px;
  margin-bottom: 24px;
`;

const copyright = css`
  font-size: 14px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.6);
`;

const navigationSection = css`
  display: flex;
  gap: 80px;
`;

const sectionTitle = css`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 24px;
`;

const linkContainer = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const footerLink = css`
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  &:hover {
    color: #fff;
  }
`;
