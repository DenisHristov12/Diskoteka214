import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signUp as signUpApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useSignup() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: signUpApi,
    onSuccess: (user) => {
      // console.log(user[0]);
      //Please verify the new account from the user's email address.
      localStorage.setItem('user', JSON.stringify(user[0]));
      queryClient.setQueryData(['user'], { user });
      toast.success('Account succesfully created! ');
      navigate('/home', { replace: true });
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
  });

  return { signUp, isLoading };
}
