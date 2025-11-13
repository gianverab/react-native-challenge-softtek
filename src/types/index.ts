export type User = {
  name: string;
  lastName: string;
  birthDay: string;
};

export type FormDataHome = {
  dni: string;
  phone: string;
  acceptedTerms: boolean;
};

export type Plan = {
  name: string;
  price: number;
  description: string[];
  age: number;
};

export type AppState = {
  formData: FormDataHome | null;
  apiUser: User | null;
  selectedPlan: (Plan & { finalPrice?: number }) | null;
  forWho: 'me' | 'someone' | null;
};
