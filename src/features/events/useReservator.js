import { useQuery } from '@tanstack/react-query';
import { getReservator } from '../../services/apiReservators';

export function useReservator() {
  const { isLoading, data: reservator } = useQuery({
    queryKey: ['reservator'],
    queryFn: getReservator,
  });

  return { isLoading, reservator };
}
