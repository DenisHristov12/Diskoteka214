import { useQuery } from '@tanstack/react-query';
import { getEventsAfterToday } from '../../services/apiEvents';

export function useEventsAfterToday() {
  const { isLoading, data: eventsAfterToday } = useQuery({
    queryFn: () => getEventsAfterToday(),
    queryKey: ['eventsAfterToday'],
  });

  return { isLoading, eventsAfterToday };
}
