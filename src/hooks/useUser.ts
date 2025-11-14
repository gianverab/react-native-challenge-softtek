import { useEffect, useState } from 'react';
import client from '../services/apiClient';
import { User } from '../types';
import { useAppContext } from '../context/AppContext';

export function useUser() {
  const { state, dispatch } = useAppContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let canceled = false;

    async function fetchUser() {
      setLoading(true);
      try {
        const resp = await client.get('/user.json');
        if (canceled) return;
        const data: User = resp.data;
        dispatch({ type: 'SET_API_USER', payload: data });
      } catch (err) {
        console.warn('Error fetching user', err);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
    return () => {
      canceled = true;
    };
  }, [dispatch]);

  return {
    user: state.apiUser,
    loading,
  };
}
