import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { AppState, FormDataHome, User, Plan } from '../types';

type Action =
  | { type: 'SET_FORM_DATA'; payload: FormDataHome }
  | { type: 'SET_API_USER'; payload: User }
  | { type: 'SET_SELECTED_PLAN'; payload: Plan & { finalPrice?: number } }
  | { type: 'SET_FOR_WHO'; payload: 'me' | 'someone' }
  | { type: 'RESET' };

const initialState: AppState = {
  formData: null,
  apiUser: null,
  selectedPlan: null,
  forWho: null,
};

const ctx = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_FORM_DATA':
      return { ...state, formData: action.payload };
    case 'SET_API_USER':
      return { ...state, apiUser: action.payload };
    case 'SET_SELECTED_PLAN':
      return { ...state, selectedPlan: action.payload };
    case 'SET_FOR_WHO':
      return { ...state, forWho: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <ctx.Provider value={{ state, dispatch }}>{children}</ctx.Provider>;
};

export const useAppContext = () => useContext(ctx);
