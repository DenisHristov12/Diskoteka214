import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import Input from '../../ui/Input';
import { useSignup } from './useSignup';
import { useUser } from './useUser';
import { useUsers } from '../users/useUsers';
import toast from 'react-hot-toast';
import FormRowVertical from '../../ui/FormRowVertical';
import { StyledNavLink } from '../../ui/Link';
import { StyledDiv } from '../../ui/LoginRegisterParagraph';

function SignupForm() {
  const { signUp, isLoading } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  const { isUser } = useUser();

  const { usersData } = useUsers();

  function onSubmit({ fullName, email, password }) {
    const isEmailUsed = usersData.some((user) => user.email === email);

    if (isEmailUsed) {
      toast.error('There alredy exists user with that email!');
    } else {
      signUp(
        { fullName, email, password },
        {
          onSettled: () => reset(),
        }
      );
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRowVertical label='Full name' error={errors?.fullName?.message}>
        <Input
          type='text'
          id='fullName'
          disabled={isLoading || isUser}
          {...register('fullName', { required: 'This field is required' })}
        />
      </FormRowVertical>

      <FormRowVertical label='Email address' error={errors?.email?.message}>
        <Input
          type='email'
          id='email'
          disabled={isLoading || isUser}
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please provide a valid email address',
            },
          })}
        />
      </FormRowVertical>

      <FormRowVertical
        label='Password (min 8 characters)'
        error={errors?.password?.message}>
        <Input
          type='password'
          id='password'
          disabled={isLoading || isUser}
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'Password needs a minimum of 8 characters',
            },
          })}
        />
      </FormRowVertical>

      <FormRowVertical
        label='Repeat password'
        error={errors?.passwordConfirm?.message}>
        <Input
          type='password'
          id='passwordConfirm'
          disabled={isLoading || isUser}
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (value) =>
              value === getValues().password || 'Passwords need to match',
          })}
        />
      </FormRowVertical>

      <FormRowVertical>
        <StyledDiv>
          Already registered?{' '}
          <StyledNavLink
            logReg
            style={{
              color: 'blue',
            }}
            to='/login'>
            Log in
          </StyledNavLink>
        </StyledDiv>
        <Button disabled={isLoading || isUser}>Register</Button>
        <Button
          variation='secondary'
          type='reset'
          disabled={isLoading || isUser}
          onClick={reset}>
          Cancel
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default SignupForm;
