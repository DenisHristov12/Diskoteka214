import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getEventsAfterToday } from '../../services/apiEvents';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE_EVENTS } from '../../utils/constants';

export function useEventsAfterToday() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  const { isLoading, data: { data: eventsAfterToday, count } = {} } = useQuery({
    queryFn: () => getEventsAfterToday({ page }),
    queryKey: ['eventsAfterToday', page],
  });

  const pageCount = Math.ceil(count / PAGE_SIZE_EVENTS);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['eventsAfterToday', page + 1],
      queryFn: () => getEventsAfterToday({ page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['eventsAfterToday', page - 1],
      queryFn: () => getEventsAfterToday({ page: page - 1 }),
    });

  return { isLoading, eventsAfterToday, count };
}
