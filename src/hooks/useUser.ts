import { useEffect, useState } from 'react';
import client from '../services/apiClient';
import { User } from '../types';
import { useAppContext } from '../context/AppContext';

export function useUser() {
  const { state, dispatch } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let canceled = false;
    async function fetchUser() {
      if (state.apiUser) return;
      setLoading(true);
      setError(null);
      try {
        const resp = await client.get<User>('/user.json');
        if (canceled) return;
        const data = resp.data;
        dispatch({ type: 'SET_API_USER', payload: data });
      } catch (err) {
        console.warn('useUser fetch error', err);
        setError('No se pudo obtener el usuario');
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
    return () => {
      canceled = true;
    };
  }, [dispatch, state.apiUser]);

  return {
    user: state.apiUser,
    loading,
    error,
  };
}
