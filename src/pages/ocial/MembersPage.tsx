import { css } from '@emotion/react';
import OCIALLayout from '@/layouts/OCIALLayout';

const MembersPage = () => {
  return (
    <OCIALLayout title={'오셜을 만들어가는 사람들\nTeam. OCIAL'}>
      <div css={membersContent}>{/* 구성원 목록 컨텐츠 추가 예정 */}</div>
    </OCIALLayout>
  );
};

export default MembersPage;

const membersContent = css`
  margin-top: 80px;
`;
