import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createReservator as apiCreateReservator } from '../../services/apiReservators';

export function useCreateReservator() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createReservator } = useMutation({
    mutationFn: apiCreateReservator,
    onSuccess: () => {
      toast.success('New reservator successfully created!');
      queryClient.invalidateQueries({
        queryKey: ['reservators'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createReservator };
}
