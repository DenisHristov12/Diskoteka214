import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      localStorage.setItem('user', JSON.stringify(user));
      toast.success('You have succesfully loged in!');
      queryClient.setQueryData(['user'], { user });
      user.role === 1
        ? navigate('/dashboard', { replace: true })
        : navigate('/home', { replace: true });
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
    onError: (err) => {
      toast.error('Provided email or password are incorrect!');
      console.log('ERROR', err);
    },
  });

  return { login, isLoading };
}
