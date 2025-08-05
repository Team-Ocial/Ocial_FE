import { css } from '@emotion/react';
import { useState } from 'react';
import PageHeader from '@/components/common/PageHeader';
import PageTabButtons from '@/components/common/PageTabButtons';
import Pagination from '@/components/common/Pagination';
import { theme } from '@/styles/theme';
import { usePress } from '@/hooks/usePress';
import { formatDate } from '@/utils/formatDate';

const PressPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { articles, isLoading, error, totalPages } = usePress(currentPage);

  return (
    <div css={pageContainer}>
      <PageHeader title={'우리의 연결이\n새로운 가능성을 만듭니다.'} />
      <div css={contentWrapper}>
        <PageTabButtons
          tabs={[
            { label: '보도자료', path: '/news/press' },
            { label: '공지사항', path: '/news/notice' },
          ]}
        />
        {isLoading ? (
          <div css={messageStyle}>로딩 중...</div>
        ) : error ? (
          <div css={messageStyle}>{error}</div>
        ) : articles.length === 0 ? (
          <div css={messageStyle}>보도자료가 없습니다.</div>
        ) : (
          <>
            <div css={gridStyle}>
              {articles.map((article) => (
                <article key={article.id} css={cardStyle}>
                  <a
                    href={article.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    css={cardLinkStyle}
                  >
                    <div css={imageWrapperStyle}>
                      <img src={article.imageUrl} alt={article.title} css={imageStyle} />
                    </div>
                    <div css={contentStyle}>
                      <h3 css={titleStyle}>{article.title}</h3>
                      <div css={infoStyle}>
                        <span css={publisherStyle}>{article.publisher}</span>
                        <span css={dateStyle}>{formatDate(article.publishedAt)}</span>
                      </div>
                    </div>
                  </a>
                </article>
              ))}
            </div>
            {totalPages > 1 && (
              <div css={paginationWrapper}>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PressPage;

// Styles
const pageContainer = css`
  width: 100%;
`;

const contentWrapper = css`
  max-width: ${theme.layout.width.content};
  margin: 0 auto;
  padding: 0 ${theme.layout.spacing.gutter};
`;

const messageStyle = css`
  ${theme.typography.headlineMedium};
  color: ${theme.colors.grayscale[400]};
  text-align: center;
  padding: 120px 0;
`;

const gridStyle = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 40px;
`;

const cardStyle = css`
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const cardLinkStyle = css`
  text-decoration: none;
  color: inherit;
`;

const imageWrapperStyle = css`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 8px;
`;

const imageStyle = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const contentStyle = css`
  padding: 20px 0;
`;

const titleStyle = css`
  ${theme.typography.titleLarge};
  color: ${theme.colors.black};
  margin: 0 0 12px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const infoStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${theme.typography.textSmall};
`;

const publisherStyle = css`
  color: ${theme.colors.grayscale[900]};
`;

const dateStyle = css`
  color: ${theme.colors.grayscale[500]};
`;

const paginationWrapper = css`
  display: flex;
  justify-content: center;
  margin-top: 60px;
`;
