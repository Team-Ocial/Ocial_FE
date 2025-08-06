// 색상정의
export const colors = {
  primary: {
    100: '#050198', // color/primary/6 (기준색)
    200: '#050188', // color/primary/5
    300: '#050178', // color/primary/4
    400: '#050168', // color/primary/3
    500: '#050158', // color/primary/2
    600: '#050148', // color/primary/1
  },

  secondary: {
    100: '#FFCDC2', // color/secondary/5
    200: '#FF9780', // color/secondary/4
    300: '#FF6D4D', // color/secondary/3
    400: '#FF451C', // color/secondary/2
    500: '#E52900', // color/secondary/1
  },

  tertiary: {
    100: '#FDEEBF', // color/tertiary/5
    200: '#FBE18E', // color/tertiary/4
    300: '#F9D45F', // color/tertiary/3
    400: '#F7C62C', // color/tertiary/2
    500: '#F6C013', // color/tertiary/1
  },

  blue: {
    100: '#D2E9F9', // color/blue/5
    200: '#A5D3F4', // color/blue/4
    300: '#77BCEE', // color/blue/3
    400: '#49A6E9', // color/blue/2
    500: '#1C90E3', // color/blue/1
  },

  grayscale: {
    0: '#FFFFFF', // color/grayscale/12
    50: '#F2F2F2', // color/grayscale/11
    100: '#E6E6E6', // color/grayscale/10
    150: '#CCCCCC', // color/grayscale/9
    200: '#B3B3B3', // color/grayscale/8
    300: '#999999', // color/grayscale/7
    400: '#808080', // color/grayscale/6
    500: '#666666', // color/grayscale/5
    600: '#4D4D4D', // color/grayscale/4
    700: '#333333', // color/grayscale/3
    800: '#1A1A1A', // color/grayscale/2
    900: '#000000', // color/grayscale/1
  },

  white: '#FFFFFF',
  black: '#000000',
};

// 폰트 정의
export const typography = {
  //display
  displayLarge: {
    fontSize: '133px',
    fontWeight: 700,
    lineHeight: '120%' /* 159.6px */,
    letterSpacing: '-3.99px',
    fontFamily: 'Pretendard',
  },
  displayMedium: {
    fontSize: '94px',
    fontWeight: 700,
    lineHeight: '120%' /* 112.8px */,
    fontFamily: 'Pretendard',
  },
  displaySmall: {
    fontSize: '64px',
    fontWeight: 700,
    lineHeight: '120%' /* 76.8px */,
    fontFamily: 'Pretendard',
  },

  //headline
  headlineLarge: {
    fontSize: '46px',
    fontWeight: 700,
    lineHeight: '140%' /* 64.4px */,
    letterSpacing: '-0.46px',
    fontFamily: 'Pretendard',
  },
  headlineLarge2: {
    fontSize: '36px',
    fontWeight: 700,
    lineHeight: '140%' /* 50.4px */,
    fontFamily: 'Pretendard',
  },
  headlineMedium: {
    fontSize: '32px',
    fontWeight: 700,
    lineHeight: '140%' /* 44.8px */,
    fontFamily: 'Pretendard',
  },
  headlineSmall: {
    fontSize: '23px',
    fontWeight: 700,
    lineHeight: '180%' /* 41.4px */,
    fontFamily: 'Pretendard',
  },

  // title
  titleLarge: {
    fontSize: '18px',
    fontWeight: 700,
    lineHeight: '160%' /* 28.8px */,
    fontFamily: 'Pretendard',
    //fontFeatureSettings: '"case" on',
  },
  titleMedium: {
    fontSize: '16px',
    fontWeight: 700,
    lineHeight: '160%' /* 25.6px */,
    fontFamily: 'Pretendard',
    //fontFeatureSettings: '"case" on',
  },
  titleSmall: {
    fontSize: '14px',
    fontWeight: 700,
    lineHeight: '160%' /* 22.4px */,
    fontFamily: 'Pretendard',
    //fontFeatureSettings: '"case" on',
  },

  // Text
  textLarge: {
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: '160%' /* 28.8px */,
    fontFamily: 'Pretendard',
    //fontFeatureSettings: '"case" on',
  },
  textMedium: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '160%' /* 25.6px */,
    fontFamily: 'Pretendard',
    //fontFeatureSettings: '"case" on',
  },
  textSmall: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '160%' /* 22.4px */,
    fontFamily: 'Pretendard',
    //fontFeatureSettings: '"case" on',
  },
  textSmall2: {
    fontSize: '13px',
    fontWeight: 500,
    lineHeight: '160%' /* 20.8px */,
    fontFamily: 'Pretendard',
    //fontFeatureSettings: '"case" on',
  },

  // Label
  labelLarge: {
    fontSize: '18px',
    fontWeight: 500,
    lineHeight: '160%' /* 28.8px */,
    fontFamily: 'Pretendard',
    //fontFeatureSettings: '"case" on',
  },
  labelMedium: {
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '160%' /* 25.6px */,
    fontFamily: 'Pretendard',
    //fontFeatureSettings: '"case" on',
  },
  labelSmall: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '160%' /* 22.4px */,
    fontFamily: 'Pretendard',
    //fontFeatureSettings: '"case" on',
  },
} as const; // 타입 추론 오류 방지

// 반응형 중단점 정의
export const breakpoints = {
  xl: '1440px', // PC (전체 max 기준)
  lg: '1170px', // 콘텐츠 너비 기준 (데스크탑 콘텐츠 고정폭)
  md: '768px', // 태블릿
  sm: '480px', // 모바일
};

// 레이아웃
export const layout = {
  width: {
    max: '1440px', // PC 전체 너비 제한
    content: '1170px', // 콘텐츠 실제 너비
  },
  spacing: {
    gutter: '20px', // 컬럼 간격
    sidePadding: '40px', // 좌우 여백
  },
} as const;

export const theme = {
  colors,
  typography,
  breakpoints,
  layout,
} as const;

export type ThemeType = typeof theme;
