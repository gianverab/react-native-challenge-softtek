import { useRef, useState, useCallback } from 'react';
import client from '../services/apiClient';
import { Plan } from '../types';
import { useAppContext } from '../context/AppContext';

type UsePlansReturn = {
  plans: Plan[];
  loading: boolean;
  error: string | null;
  fetchPlansOnce: () => Promise<Plan[] | null>;
  hasFetched: boolean;
};

export function usePlans(): UsePlansReturn {
  const { state } = useAppContext();
  const isForSomeoneElse = state.option === 'someone';

  const cacheRef = useRef<Plan[] | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasFetched, setHasFetched] = useState(false);

  const applyDiscount = (rawPlans: Plan[]): Plan[] => {
    return rawPlans.map(plan => {
      const basePrice = plan.price;
      const finalPrice = isForSomeoneElse
        ? parseFloat((basePrice * 0.95).toFixed(2))
        : basePrice;

      return {
        ...plan,
        finalPrice,
      };
    });
  };

  const fetchPlansOnce = useCallback(async () => {
    if (cacheRef.current) {
      const withFinalPrice = applyDiscount(cacheRef.current);
      setPlans(withFinalPrice);
      setHasFetched(true);
      return withFinalPrice;
    }

    setLoading(true);
    setError(null);

    try {
      const resp = await client.get('/plans.json');
      const list: Plan[] = resp.data?.list ?? [];

      cacheRef.current = list;

      const withFinalPrice = applyDiscount(list);

      setPlans(withFinalPrice);
      setHasFetched(true);

      return withFinalPrice;
    } catch (err) {
      console.warn('usePlans fetch error', err);
      setError('No se pudieron obtener los planes');
      return null;
    } finally {
      setLoading(false);
    }
  }, [isForSomeoneElse]);

  return {
    plans,
    loading,
    error,
    fetchPlansOnce,
    hasFetched,
  };
}
