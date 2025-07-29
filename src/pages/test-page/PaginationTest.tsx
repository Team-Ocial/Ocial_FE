import { css } from '@emotion/react';
import { useState } from 'react';
import { theme } from '@/styles/theme';
import Pagination from '@/components/common/Pagination';

const PaginationTest = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  return (
    <div css={containerStyle}>
      <h1 css={titleStyle}>페이지네이션 테스트</h1>
      <div css={contentStyle}>
        <p>현재 페이지: {currentPage}</p>
        <p>전체 페이지: {totalPages}</p>
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};

export default PaginationTest;

const containerStyle = css`
  padding: 40px;
  max-width: ${theme.layout.width.content};
  margin: 0 auto;
`;

const titleStyle = css`
  ${theme.typography.headlineLarge};
  color: ${theme.colors.black};
  margin-bottom: 40px;
`;

const contentStyle = css`
  ${theme.typography.textLarge};
  color: ${theme.colors.grayscale[700]};
  margin-bottom: 40px;
`;
