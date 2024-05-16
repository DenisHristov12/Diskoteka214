import { useQuery } from '@tanstack/react-query';
import { getReservators } from '../../services/apiReservators';

export function useReservators() {
  const {
    isLoading,
    data: reservators,
    error,
  } = useQuery({
    queryKey: ['reservators'],
    queryFn: getReservators,
  });

  return { isLoading, error, reservators };
}
