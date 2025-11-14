import { useCallback, useEffect, useMemo, useState } from 'react';
import { Plan } from '../types';
import { calcAge } from '../utils/index';
import { useDebouncedValue } from './useDebouncedValue';
import { usePlans } from './usePlans';
import { useAppContext } from '../context/AppContext';

type UsePlanFilterReturn = {
  option: 'me' | 'someone' | null;
  setOption: (o: 'me' | 'someone' | null) => void;
  relativeAge: string;
  setRelativeAge: (v: string) => void;
  filteredPlans: Plan[];
  loadingPlans: boolean;
  pageIndex: number;
  goNext: () => void;
  goPrev: () => void;
  setPageIndex: (i: number) => void;
  totalPages: number;
};

export function usePlanFilter() {
  const { state, dispatch } = useAppContext();
  const {
    plans: cachedPlans,
    loading: loadingPlansGlobal,
    fetchPlansOnce,
    hasFetched,
  } = usePlans();
  const [option, setOptionLocal] = useState<'me' | 'someone' | null>(
    state.option ?? null,
  );
  const [relativeAge, setRelativeAgeLocal] = useState<string>('');
  const debouncedAge = useDebouncedValue<string>(relativeAge, 600);

  const [filteredPlans, setFilteredPlans] = useState<Plan[]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [loadingPlans, setLoadingPlans] = useState(false);

  const setOption = useCallback(
    (o: 'me' | 'someone' | null) => {
      setOptionLocal(o);
      dispatch({ type: 'SET_OPTION', payload: o as 'me' | 'someone' });
      setRelativeAgeLocal('');
      setFilteredPlans([]);
      setPageIndex(0);
    },
    [dispatch],
  );

  const ensurePlansAndFilter = useCallback(
    async (filterAge?: number) => {
      setLoadingPlans(true);
      try {
        if (!hasFetched) {
          const fetched = await fetchPlansOnce();
          if (!fetched) {
            setFilteredPlans([]);
            setLoadingPlans(false);
            return;
          }
        }

        const source = cachedPlans ?? [];
        if (filterAge == null) {
          const userAge = calcAge(state.apiUser?.birthDay);
          const list = source.filter(p => userAge <= p.age);
          setFilteredPlans(list);
        } else {
          const list = source.filter(p => filterAge <= p.age);
          setFilteredPlans(list);
        }
      } catch (err) {
        console.warn('ensurePlansAndFilter error', err);
        setFilteredPlans([]);
      } finally {
        setLoadingPlans(false);
      }
    },
    [cachedPlans, fetchPlansOnce, hasFetched, state.apiUser],
  );

  useEffect(() => {
    if (option === 'me') {
      if (!state.apiUser) return;

      ensurePlansAndFilter(undefined);
    }
  }, [option, state.apiUser, ensurePlansAndFilter]);

  useEffect(() => {
    if (option === 'someone') {
      const v = debouncedAge;
      if (!v) {
        setFilteredPlans([]);
        return;
      }
      const n = Number(v);
      if (isNaN(n)) {
        setFilteredPlans([]);
        return;
      }

      if (n > 90) {
        setFilteredPlans([]);
        return;
      }

      ensurePlansAndFilter(n);
    }
  }, [debouncedAge, option, ensurePlansAndFilter]);

  const goNext = useCallback(() => setPageIndex(p => p + 1), []);
  const goPrev = useCallback(() => setPageIndex(p => Math.max(0, p - 1)), []);

  return {
    option,
    setOption,
    relativeAge,
    setRelativeAge: setRelativeAgeLocal,
    filteredPlans,
    loadingPlans: loadingPlans || loadingPlansGlobal,
    pageIndex,
    setPageIndex,
    goNext,
    goPrev,
    totalPages: filteredPlans.length,
  } as UsePlanFilterReturn;
}
