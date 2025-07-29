import { css } from '@emotion/react';
import { theme } from '@/styles/theme';
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from 'react-icons/md';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const handleFirst = () => onPageChange(1);
  const handleLast = () => onPageChange(totalPages);
  const handlePrevious = () => currentPage > 1 && onPageChange(currentPage - 1);
  const handleNext = () => currentPage < totalPages && onPageChange(currentPage + 1);

  if (totalPages <= 1) return null;

  // 한 번에 보여줄 페이지 번호 개수
  const limit = 5;
  const startPage = Math.floor((currentPage - 1) / limit) * limit + 1;
  const endPage = Math.min(startPage + limit - 1, totalPages);
  const pages = Array.from({ length: endPage - startPage + 1 }, (_, idx) => startPage + idx);

  return (
    <nav css={paginationStyle}>
      <button
        css={arrowButtonStyle}
        onClick={handleFirst}
        disabled={currentPage === 1}
        aria-label='처음 페이지로 이동'
      >
        <MdKeyboardDoubleArrowLeft size={22} />
      </button>
      <button
        css={arrowButtonStyle}
        onClick={handlePrevious}
        disabled={currentPage === 1}
        aria-label='이전 페이지로 이동'
      >
        <MdKeyboardArrowLeft size={22} />
      </button>
      {pages.map((pageNum) => (
        <button
          key={pageNum}
          css={[numberButtonStyle, currentPage === pageNum && activePageStyle]}
          onClick={() => onPageChange(pageNum)}
          aria-label={`${pageNum} 페이지로 이동`}
          aria-current={currentPage === pageNum ? 'page' : undefined}
        >
          {pageNum}
        </button>
      ))}
      <button
        css={arrowButtonStyle}
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label='다음 페이지로 이동'
      >
        <MdKeyboardArrowRight size={22} />
      </button>
      <button
        css={arrowButtonStyle}
        onClick={handleLast}
        disabled={currentPage === totalPages}
        aria-label='마지막 페이지로 이동'
      >
        <MdKeyboardDoubleArrowRight size={22} />
      </button>
    </nav>
  );
};

export default Pagination;

const paginationStyle = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  margin: 40px 0;
`;

const buttonBase = css`
  ${theme.typography.textSmall};
  background: none;
  border: none;
  border-radius: 4px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;

  &:disabled {
    color: ${theme.colors.grayscale[200]};
    cursor: not-allowed;
    pointer-events: none;
  }
`;

const arrowButtonStyle = css`
  ${buttonBase};
  color: ${theme.colors.grayscale[400]};

  &:hover:not(:disabled) {
    color: ${theme.colors.grayscale[500]};
  }
`;

const numberButtonStyle = css`
  ${buttonBase};
  color: ${theme.colors.grayscale[400]};

  &:hover:not(:disabled) {
    background-color: ${theme.colors.grayscale[100]};
    color: ${theme.colors.grayscale[400]};
  }
`;

const activePageStyle = css`
  background-color: ${theme.colors.grayscale[100]};
  color: ${theme.colors.grayscale[900]} !important;
`;
