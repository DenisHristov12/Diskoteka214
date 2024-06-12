import { useQuery } from '@tanstack/react-query';
import { getEventsAfterToday } from '../../services/apiEvents';

export function useEventsAfterTodayNoPagination() {
  const { isLoading, data: { data: eventsAfterTodayNoPagination } = {} } =
    useQuery({
      queryFn: () => getEventsAfterToday({ page: 0 }),
      queryKey: ['eventsAfterTodayNoPagination'],
    });

  return { isLoading, eventsAfterTodayNoPagination };
}
