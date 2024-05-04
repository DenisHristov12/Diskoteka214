import { useMutation } from '@tanstack/react-query';
import { signUp as signUpApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useSignup() {
  const navigate = useNavigate();

  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: signUpApi,
    onSuccess: (user) => {
      // console.log(user);
      //Please verify the new account from the user's email address.
      toast.success('Account succesfully created! ');
      navigate('/login', { replace: true });
    },
  });

  return { signUp, isLoading };
}
