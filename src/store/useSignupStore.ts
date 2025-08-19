import { create } from 'zustand';
import { SignupFormData, SignupErrors } from '../types/signup.types';
import { validateField, VALIDATION_MESSAGES } from '@/utils/validation';

const initialFormData: SignupFormData = {
  name: '',
  birthDate: '',
  email: '',
  gender: '',
  address: '',
  job: '',
  id: '',
  password: '',
  passwordConfirm: '',
  agreements: {
    termsOfService: false,
    privacyPolicy: false,
    marketing: false,
  },
};

// --- Validation Logic ---
const validateStep1 = (formData: SignupFormData): SignupErrors => {
  const newErrors: SignupErrors = {};

  if (!formData.name.trim()) {
    newErrors.name = VALIDATION_MESSAGES.REQUIRED.NAME;
  }
  if (!formData.birthDate.trim()) {
    newErrors.birthDate = VALIDATION_MESSAGES.REQUIRED.BIRTH_DATE;
  }

  const emailError = validateField.email(formData.email);
  if (emailError) {
    newErrors.email = emailError;
  }

  if (!formData.gender) {
    newErrors.gender = VALIDATION_MESSAGES.REQUIRED.GENDER;
  }
  if (!formData.address.trim()) {
    newErrors.address = VALIDATION_MESSAGES.REQUIRED.ADDRESS;
  }

  return newErrors;
};

const validateStep2 = (formData: SignupFormData): SignupErrors => {
  const newErrors: SignupErrors = {};

  const idError = validateField.id(formData.id);
  if (idError) {
    newErrors.id = idError;
  }

  const passwordError = validateField.password(formData.password);
  if (passwordError) {
    newErrors.password = passwordError;
  }

  const passwordConfirmError = validateField.passwordConfirm(
    formData.passwordConfirm,
    formData.password
  );
  if (passwordConfirmError) {
    newErrors.passwordConfirm = passwordConfirmError;
  }

  if (!formData.agreements.termsOfService || !formData.agreements.privacyPolicy) {
    const agreementErrors: SignupErrors['agreements'] = {};
    if (!formData.agreements.termsOfService) {
      agreementErrors.termsOfService = VALIDATION_MESSAGES.REQUIRED.TERMS;
    }
    if (!formData.agreements.privacyPolicy) {
      agreementErrors.privacyPolicy = VALIDATION_MESSAGES.REQUIRED.TERMS;
    }
    newErrors.agreements = agreementErrors;
  }

  return newErrors;
};

// --- Store Definition ---
type State = {
  currentStep: number;
  formData: SignupFormData;
  errors: SignupErrors;
};

type Actions = {
  setStep: (step: number) => void;
  updateFormData: (data: Partial<SignupFormData>) => void;
  validateStep: () => boolean;
  resetForm: () => void;
};

export const useSignupStore = create<State & Actions>((set, get) => ({
  currentStep: 1,
  formData: initialFormData,
  errors: {},

  setStep: (step: number) => set({ currentStep: step }),

  updateFormData: (data: Partial<SignupFormData>) =>
    set((state) => {
      const updatedErrors = { ...state.errors };

      Object.keys(data).forEach((key) => {
        const field = key as keyof SignupErrors;
        if (field in updatedErrors) {
          delete updatedErrors[field];
        }
      });

      if (data.agreements && updatedErrors.agreements) {
        const agreementData = data.agreements;
        const agreementErrors = { ...updatedErrors.agreements };

        Object.keys(agreementData).forEach((key) => {
          const agreementField = key as keyof typeof agreementErrors;
          if (agreementField in agreementErrors) {
            delete agreementErrors[agreementField];
          }
        });

        if (Object.keys(agreementErrors).length === 0) {
          delete updatedErrors.agreements;
        } else {
          updatedErrors.agreements = agreementErrors;
        }
      }

      return {
        formData: { ...state.formData, ...data },
        errors: updatedErrors,
      };
    }),

  validateStep: () => {
    const { currentStep, formData } = get();
    const errors = currentStep === 1 ? validateStep1(formData) : validateStep2(formData);
    set({ errors });
    return Object.keys(errors).length === 0;
  },

  resetForm: () => set({ currentStep: 1, formData: initialFormData, errors: {} }),
}));
