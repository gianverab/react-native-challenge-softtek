export type ApiUser = {
  name: string;
  lastName: string;
  birthDay: string;
};

export type FormDataHome = {
  documentNumber: string;
  phone: string;
};

export type Plan = {
  name: string;
  price: number;
  description: string[];
  age: number;
};

export type AppState = {
  formData: FormDataHome | null;
  apiUser: ApiUser | null;
  selectedPlan: (Plan & { finalPrice?: number }) | null;
  forWho: 'me' | 'someone' | null;
};
