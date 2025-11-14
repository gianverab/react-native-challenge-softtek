import { useState, useCallback } from 'react';
import client from '../services/apiClient';
import { Plan } from '../types';
import { calcAge } from '../utils/index';

export function usePlans() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPlans = useCallback(async (userBirthDay: string) => {
    setLoading(true);
    try {
      const resp = await client.get('/plans.json');
      const list = resp.data?.list ?? [];
      const age = calcAge(userBirthDay);
      const filtered = list.filter((p: Plan) => age <= p.age);
      setPlans(filtered);
    } finally {
      setLoading(false);
    }
  }, []);

  return { plans, loading, fetchPlans };
}
