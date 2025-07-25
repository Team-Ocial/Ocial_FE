import { css } from '@emotion/react';
import { theme } from '@/styles/theme';
import { useHistory } from '@/hooks/useHistory';
import { HistoryYear } from '@/types/history.types';
import OCIALLayout from '@/layouts/OCIALLayout';
import LoadingState from '@/components/common/LoadingState';
import ErrorState from '@/components/common/ErrorState';

const YearContent = ({ yearData }: { yearData: HistoryYear }) => (
  <div css={yearContentWrapper}>
    <h3 css={yearTitle}>{yearData.year}</h3>
    <ul css={historyList}>
      {yearData.items.map((item) => (
        <li key={item.id} css={historyItem}>
          {item.content}
        </li>
      ))}
    </ul>
  </div>
);

const HistorySection = ({ bigYear, years }: { bigYear: string; years: HistoryYear[] }) => (
  <div css={historyContent}>
    <div css={leftSection}>
      <h2 css={bigYearStyle}>{bigYear}</h2>
    </div>
    <div css={rightSection}>
      {years.map((yearData, index) => (
        <div key={yearData.year} css={yearSection}>
          <YearContent yearData={yearData} />
          {index < years.length && <div css={divider} />}
        </div>
      ))}
    </div>
  </div>
);

const HistoryPage = () => {
  const { data: historyData, isLoading, error } = useHistory();

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (!historyData) return null;

  return (
    <OCIALLayout title={'데이터와 함께 걸어온 길,\n새로운 미래를 향해 나아갑니다.'}>
      {historyData.sections.map((section) => (
        <HistorySection key={section.bigYear} bigYear={section.bigYear} years={section.years} />
      ))}
    </OCIALLayout>
  );
};

export default HistoryPage;

const historyContent = css`
  display: flex;
  justify-content: space-between;
  margin-top: 80px;
  gap: 120px;

  & + & {
    margin-top: 120px;
  }
`;

const leftSection = css`
  flex: 0 0 auto;
`;

const bigYearStyle = css`
  ${theme.typography.displaySmall};
  color: ${theme.colors.grayscale[900]};
  margin: 0;
`;

const rightSection = css`
  flex: 1;
  max-width: 600px;
`;

const yearSection = css`
  margin-bottom: 60px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const yearContentWrapper = css`
  display: flex;
  justify-content: space-between;
  gap: 40px;
`;

const yearTitle = css`
  ${theme.typography.headlineMedium};
  color: ${theme.colors.grayscale[900]};
  margin: 0;
  flex: 0 0 auto;
`;

const historyList = css`
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
`;

const historyItem = css`
  ${theme.typography.textLarge};
  color: ${theme.colors.grayscale[900]};
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const divider = css`
  height: 1px;
  background-color: ${theme.colors.grayscale[100]};
  margin-top: 60px;
`;
