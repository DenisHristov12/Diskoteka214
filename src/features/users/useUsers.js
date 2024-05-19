import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUsers } from '../../services/apiUsers';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

export function useUsers() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  //FILTER
  const filterValue = searchParams.get('role');
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'role', value: filterValue, method: 'eq' };

  // SORT
  const sortByRaw = searchParams.get('sortBy') || 'created_at-desc';
  const [field, direction] = sortByRaw.split('-');
  const sortBy = { field, direction };

  // // PAGINATION
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  // QUERY
  const {
    isLoading,
    data: { data: usersData, count } = {},
    error,
  } = useQuery({
    queryKey: ['usersData', filter, sortBy, page],
    queryFn: () => getUsers({ filter, sortBy, page }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['usersData', filter, sortBy, page + 1],
      queryFn: () => getUsers({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['usersData', filter, sortBy, page - 1],
      queryFn: () => getUsers({ filter, sortBy, page: page - 1 }),
    });

  return { isLoading, error, usersData, count };
}
