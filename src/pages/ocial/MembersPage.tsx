import { css } from '@emotion/react';
import OCIALLayout from '@/layouts/OCIALLayout';
import { theme } from '@/styles/theme';
import { MEMBER_DATA } from '@/mocks/data/memberData';
import MemberCard from '@/components/common/MemberCard';

const MembersPage = () => {
  return (
    <OCIALLayout title={'오셜을 만들어가는 사람들\nTeam. OCIAL'}>
      <div css={descriptionStyle}>
        오셜은 다양한 경험과 열정을 가진 사람들이 모여 더 나은 IT 커뮤니티를 만들어갑니다.
        {'\n'}우리와 함께하는 멤버들을 소개합니다.
      </div>
      <div css={membersGridStyle}>
        {MEMBER_DATA.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </OCIALLayout>
  );
};

export default MembersPage;

const descriptionStyle = css`
  ${theme.typography.textLarge};
  color: ${theme.colors.black};
  white-space: pre-line;
  margin-top: 40px;
  margin-bottom: 80px;
`;

const membersGridStyle = css`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 80px;

  @media (max-width: ${theme.breakpoints.xl}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;
