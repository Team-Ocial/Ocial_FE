import { css } from '@emotion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@/components/common/Button';

interface TabItem {
  label: string;
  path: string;
}

interface PageTabButtonsProps {
  tabs: TabItem[];
}

const PageTabButtons = ({ tabs }: PageTabButtonsProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div css={buttonWrapper}>
      {tabs.map(({ label, path }) => {
        const isActive = location.pathname === path;

        return (
          <Button
            key={path}
            variant={isActive ? 'filled' : 'outlined'}
            size='medium'
            width={150}
            active={isActive}
            onClick={() => navigate(path)}
          >
            {label}
          </Button>
        );
      })}
    </div>
  );
};

export default PageTabButtons;

const buttonWrapper = css`
  display: flex;
  gap: 10px;
  margin-bottom: 60px;
`;
