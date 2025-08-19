import { useSignupStore } from '@/store/useSignupStore';
import Button from '@/components/common/Button';
import { getMaxBirthDate, getMinBirthDate } from '@/utils/date';
import SignupLayout, {
  formStyle,
  inputGroupStyle,
  labelStyle,
  requiredStyle,
  optionalStyle,
  inputStyle,
  dateInputStyle,
  selectStyle,
  errorMessageStyle,
  buttonStyle,
} from '@/components/common/SignupLayout';

const Step1 = () => {
  const { formData, updateFormData, setStep, errors, validateStep } = useSignupStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep()) {
      setStep(2);
    }
  };

  return (
    <SignupLayout step={1} title='오셜과 함께 당신의 여정을 시작하세요.'>
      <form onSubmit={handleSubmit} css={formStyle} noValidate>
        <div css={inputGroupStyle}>
          <label css={labelStyle}>
            이름 <span css={requiredStyle}>*</span>
          </label>
          <input
            type='text'
            value={formData.name}
            onChange={(e) => updateFormData({ name: e.target.value })}
            placeholder='이름을 입력해주세요.'
            css={inputStyle}
          />
          {errors.name && <span css={errorMessageStyle}>{errors.name}</span>}
        </div>

        <div css={inputGroupStyle}>
          <label css={labelStyle}>
            생년월일 <span css={requiredStyle}>*</span>
          </label>
          <input
            type='date'
            value={formData.birthDate}
            onChange={(e) => updateFormData({ birthDate: e.target.value })}
            min={getMinBirthDate()}
            max={getMaxBirthDate()}
            css={[inputStyle, dateInputStyle]}
          />
          {errors.birthDate && <span css={errorMessageStyle}>{errors.birthDate}</span>}
        </div>

        <div css={inputGroupStyle}>
          <label css={labelStyle}>
            이메일 <span css={requiredStyle}>*</span>
          </label>
          <input
            type='email'
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            placeholder='이메일을 입력해주세요.'
            css={inputStyle}
          />
          {errors.email && <span css={errorMessageStyle}>{errors.email}</span>}
        </div>

        <div css={inputGroupStyle}>
          <label css={labelStyle}>
            성별 <span css={requiredStyle}>*</span>
          </label>
          <select
            value={formData.gender}
            onChange={(e) => updateFormData({ gender: e.target.value })}
            css={selectStyle}
          >
            <option value=''>성별을 선택해주세요.</option>
            <option value='male'>남성</option>
            <option value='female'>여성</option>
          </select>
          {errors.gender && <span css={errorMessageStyle}>{errors.gender}</span>}
        </div>

        <div css={inputGroupStyle}>
          <label css={labelStyle}>
            주소지(활동지역) <span css={requiredStyle}>*</span>
          </label>
          <input
            type='text'
            value={formData.address}
            onChange={(e) => updateFormData({ address: e.target.value })}
            placeholder='주소지(활동지역)을 입력해주세요.'
            css={inputStyle}
          />
          {errors.address && <span css={errorMessageStyle}>{errors.address}</span>}
        </div>

        <div css={inputGroupStyle}>
          <label css={labelStyle}>
            직업 <span css={optionalStyle}>(선택)</span>
          </label>
          <input
            type='text'
            value={formData.job}
            onChange={(e) => updateFormData({ job: e.target.value })}
            placeholder='직업을 입력해주세요.'
            css={inputStyle}
          />
        </div>

        <Button type='submit' size='large' fullWidth css={buttonStyle}>
          다음
        </Button>
      </form>
    </SignupLayout>
  );
};

export default Step1;
