export interface SignupFormData {
  // Step 1 데이터
  name: string;
  birthDate: string;
  email: string;
  gender: string;
  address: string;
  job: string;

  // Step 2 데이터
  id: string;
  password: string;
  passwordConfirm: string;
  agreements: {
    termsOfService: boolean; // 이용약관 (필수)
    privacyPolicy: boolean; // 개인정보 수집 및 이용 동의 (필수)
    marketing: boolean; // 이메일 및 채팅 정보 수신 동의 (선택)
  };
}

export interface SignupErrors {
  name?: string;
  birthDate?: string;
  email?: string;
  gender?: string;
  address?: string;
  id?: string;
  password?: string;
  passwordConfirm?: string;
  agreements?: {
    termsOfService?: string; // 이용약관 에러 메시지
    privacyPolicy?: string; // 개인정보 동의 에러 메시지
    marketing?: string; // 마케팅 동의 에러 메시지 (필요한 경우)
  };
}
