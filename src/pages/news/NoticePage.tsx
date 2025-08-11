import { css } from '@emotion/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/common/PageHeader';
import PageTabButtons from '@/components/common/PageTabButtons';
import Pagination from '@/components/common/Pagination';
import { theme } from '@/styles/theme';
import { useNotices } from '@/hooks/useNotices';
import { formatDate } from '@/utils/formatDate';
import ToastTest from '../test-page/ToastTest';

const NoticePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { notices, isLoading, error, totalPages } = useNotices(currentPage);

  return (
    <div css={pageContainer}>
      <ToastTest />
      <PageHeader title={'우리의 연결이\n새로운 가능성을 만듭니다.'} />
      <div css={contentWrapper}>
        <PageTabButtons
          tabs={[
            { label: '보도자료', path: '/news/press' },
            { label: '공지사항', path: '/news/notice' },
          ]}
        />
        <div css={tableContainer}>
          {isLoading ? (
            <div css={messageStyle}>로딩 중...</div>
          ) : error ? (
            <div css={messageStyle}>{error}</div>
          ) : notices.length === 0 ? (
            <div css={messageStyle}>공지사항이 없습니다.</div>
          ) : (
            <table css={tableStyle}>
              <colgroup>
                <col width='120px' />
                <col />
                <col width='180px' />
              </colgroup>
              <tbody>
                {notices.map((notice, index) => (
                  <tr key={notice.id}>
                    <td css={centerAlign}>
                      {/* TODO: API에서 실제 번호를 받아오도록 수정 */}
                      {(currentPage - 1) * 8 + index + 1}
                    </td>
                    <td>
                      <Link to={`/news/notice/${notice.id}`} css={titleLink}>
                        {notice.title}
                      </Link>
                    </td>
                    <td css={centerAlign}>{formatDate(notice.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {totalPages > 1 && !isLoading && !error && (
          <div css={paginationWrapper}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticePage;

// Styles
const pageContainer = css`
  width: 100%;
`;

const contentWrapper = css`
  max-width: ${theme.layout.width.content};
  margin: 0 auto;
  padding: 0 ${theme.layout.spacing.gutter};
`;

const tableContainer = css`
  margin-top: 40px;
`;

const messageStyle = css`
  ${theme.typography.headlineMedium};
  color: ${theme.colors.grayscale[400]};
  text-align: center;
  padding: 120px 0;
`;

const tableStyle = css`
  width: 100%;
  // border-top: 1px solid ${theme.colors.grayscale[900]};
  border-bottom: 1px solid ${theme.colors.grayscale[100]};

  th {
    ${theme.typography.titleMedium};
    color: ${theme.colors.grayscale[900]};
    padding: 30px;
    text-align: left;
    border-bottom: 1px solid ${theme.colors.grayscale[200]};
  }

  td {
    ${theme.typography.textLarge};
    color: ${theme.colors.grayscale[700]};
    padding: 32px 20px;
    border-top: 1px solid ${theme.colors.grayscale[100]};
  }

  tr:first-of-type td {
    border-top: none;
  }
`;

const centerAlign = css`
  text-align: center !important;
`;

const titleLink = css`
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    color: ${theme.colors.primary[500]};
  }
`;

const paginationWrapper = css`
  display: flex;
  justify-content: center;
  margin-top: 60px;
`;
