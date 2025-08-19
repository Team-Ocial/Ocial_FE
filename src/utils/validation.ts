/**
 * 회원가입 폼 검증에 사용되는 정규식 패턴들
 */
export const VALIDATION_PATTERNS = {
  /** 이메일 형식 검증 (예: user@example.com) */
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

  /** 아이디 형식 검증 (영문 + 숫자 5자 이상) */
  ID: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{5,}$/,

  /** 비밀번호 형식 검증 (영문 + 숫자 + 특수문자 8자 이상) */
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
} as const;

/**
 * 검증 오류 메시지들
 */
export const VALIDATION_MESSAGES = {
  REQUIRED: {
    NAME: '이름을 입력해주세요.',
    BIRTH_DATE: '생년월일을 입력해주세요.',
    EMAIL: '이메일을 입력해주세요.',
    GENDER: '성별을 선택해주세요.',
    ADDRESS: '주소지를 입력해주세요.',
    ID: '아이디를 입력해주세요.',
    PASSWORD: '비밀번호를 입력해주세요.',
    PASSWORD_CONFIRM: '비밀번호를 한번 더 입력해주세요.',
    TERMS: '필수 약관에 동의해주세요.',
  },
  FORMAT: {
    EMAIL: '올바른 이메일 형식이 아닙니다.',
    ID: '아이디는 영문, 숫자를 포함하여 5자 이상이어야 합니다.',
    PASSWORD: '비밀번호는 영문, 숫자, 특수문자를 포함하여 8자 이상이어야 합니다.',
    PASSWORD_MISMATCH: '비밀번호가 일치하지 않습니다.',
  },
} as const;

/**
 * 필드별 검증 함수들
 */
export const validateField = {
  email: (value: string): string | null => {
    if (!value.trim()) return VALIDATION_MESSAGES.REQUIRED.EMAIL;
    if (!VALIDATION_PATTERNS.EMAIL.test(value)) return VALIDATION_MESSAGES.FORMAT.EMAIL;
    return null;
  },

  id: (value: string): string | null => {
    if (!value.trim()) return VALIDATION_MESSAGES.REQUIRED.ID;
    if (!VALIDATION_PATTERNS.ID.test(value)) return VALIDATION_MESSAGES.FORMAT.ID;
    return null;
  },

  password: (value: string): string | null => {
    if (!value) return VALIDATION_MESSAGES.REQUIRED.PASSWORD;
    if (!VALIDATION_PATTERNS.PASSWORD.test(value)) return VALIDATION_MESSAGES.FORMAT.PASSWORD;
    return null;
  },

  passwordConfirm: (value: string, password: string): string | null => {
    if (!value) return VALIDATION_MESSAGES.REQUIRED.PASSWORD_CONFIRM;
    if (password !== value) return VALIDATION_MESSAGES.FORMAT.PASSWORD_MISMATCH;
    return null;
  },
} as const;
