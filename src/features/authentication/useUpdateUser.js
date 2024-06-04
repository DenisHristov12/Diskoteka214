import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updateCurrentUser } from '../../services/apiAuth';
import { useUser } from './useUser';

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: (userData) => {
      const newUser = {
        ...user,
        fullName: userData.fullName,
        password: userData.password,
        avatar: userData.avatar,
      };

      // console.log(userData);

      localStorage.setItem('user', JSON.stringify(newUser));
      toast.success('User account successfully updated');
      queryClient.setQueryData(['user'], newUser);
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
    onError: (err) => {
      console.log(err.message);
      toast.error(err.message);
    },
  });

  return { updateUser, isUpdating };
}
