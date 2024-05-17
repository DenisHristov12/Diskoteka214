import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUsers } from '../../services/apiUsers';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

// export async function useUsers() {
//   //   const queryClient = useQueryClient();
//   //   const [searchParams] = useSearchParams();

//   //FILTER
//   //   const filterValue = searchParams.get('status');
//   //   const filter =
//   //     !filterValue || filterValue === 'all'
//   //       ? null
//   //       : { field: 'status', value: filterValue, method: 'eq' };

//   // SORT
//   //   const sortByRaw = searchParams.get('sortBy') || 'date-desc';
//   //   const [field, direction] = sortByRaw.split('-');
//   //   const sortBy = { field, direction };

//   // // PAGINATION
//   //   const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

//   // QUERY
//   const {
//     isLoading,
//     data: usersData, //{ data: users, count } = {},
//     error,
//   } = useQuery({
//     queryKey: ['usersData'],
//     queryFn: getUsers,
//   });

//   // PRE-FETCHING
//   //   const pageCount = Math.ceil(count / PAGE_SIZE);

//   //   if (page < pageCount)
//   //     queryClient.prefetchQuery({
//   //       queryKey: ['users', filter, sortBy, page + 1],
//   //       queryFn: () => getUsers({ filter, sortBy, page: page + 1 }),
//   //     });

//   //   if (page > 1)
//   //     queryClient.prefetchQuery({
//   //       queryKey: ['users', filter, sortBy, page - 1],
//   //       queryFn: () => getUsers({ filter, sortBy, page: page - 1 }),
//   //     });

//   return { isLoading, error, usersData };
// }

export function useUsers() {
  const {
    isLoading,
    data: usersData,
    error,
  } = useQuery({
    queryKey: ['usersData'],
    queryFn: getUsers,
  });

  return { isLoading, error, usersData };
}
