export interface NavLink {
  to: string;
  text: string;
}

export const NAV_LINKS: NavLink[] = [
  { to: '/OCIAL/history', text: 'OCIAL' },
  { to: '/activity', text: 'Activity' },
  { to: 'news/press', text: 'News' },
];

export const OCIAL_TABS = [
  { label: '연혁', path: '/OCIAL/history' },
  { label: '구성원', path: '/OCIAL/members' },
];
