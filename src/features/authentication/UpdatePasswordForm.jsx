import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useUpdateUser } from './useUpdateUser';
import { useUser } from './useUser';
import useWidth from '../../hooks/useWidth';
import FormRowVertical from '../../ui/FormRowVertical';

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { user } = useUser();

  const { updateUser, isUpdating } = useUpdateUser();

  const width = useWidth();

  function onSubmit(obj) {
    const password = obj.password;
    updateUser({ password, user }, { onSuccess: () => reset() });
  }

  function handleReset() {
    reset();
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {width > 430 ? (
        <FormRow
          label='Password (min 8 characters)'
          error={errors?.password?.message}>
          <Input
            type='password'
            id='password'
            autoComplete='current-password'
            disabled={isUpdating}
            {...register('password', {
              required: 'This field is required',
              minLength: {
                value: 8,
                message: 'Password needs a minimum of 8 characters',
              },
            })}
          />
        </FormRow>
      ) : (
        <FormRowVertical
          label='Password (min 8 characters)'
          error={errors?.password?.message}>
          <Input
            type='password'
            id='password'
            autoComplete='current-password'
            disabled={isUpdating}
            {...register('password', {
              required: 'This field is required',
              minLength: {
                value: 8,
                message: 'Password needs a minimum of 8 characters',
              },
            })}
          />
        </FormRowVertical>
      )}

      {width > 430 ? (
        <FormRow
          label='Confirm password'
          error={errors?.passwordConfirm?.message}>
          <Input
            type='password'
            autoComplete='new-password'
            id='passwordConfirm'
            disabled={isUpdating}
            {...register('passwordConfirm', {
              required: 'This field is required',
              validate: (value) =>
                getValues().password === value || 'Passwords need to match',
            })}
          />
        </FormRow>
      ) : (
        <FormRowVertical
          label='Confirm password'
          error={errors?.passwordConfirm?.message}>
          <Input
            type='password'
            autoComplete='new-password'
            id='passwordConfirm'
            disabled={isUpdating}
            {...register('passwordConfirm', {
              required: 'This field is required',
              validate: (value) =>
                getValues().password === value || 'Passwords need to match',
            })}
          />
        </FormRowVertical>
      )}

      <FormRow>
        <Button onClick={handleReset} type='reset' variation='secondary'>
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update password</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
