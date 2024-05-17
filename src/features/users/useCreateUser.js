import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createEditUser } from '../../services/apiUsers';

export function useCreateEvent() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createUser } = useMutation({
    mutationFn: createEditUser,
    onSuccess: () => {
      toast.success('New user successfully created!');

      queryClient.invalidateQueries({ queryKey: ['usersData'] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createUser };
}
