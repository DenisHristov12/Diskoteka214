import { useForm } from 'react-hook-form';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import FormRow from '../../ui/FormRow';
import { useCreateUser } from './useCreateUser';
import { useEditUser } from './useEditUser';
import Select from '../../ui/Select';
import { useState } from 'react';

function CreateEditUserForm({ userToEdit = {}, onCloseModal }) {
  const [choice, setChoice] = useState(2);

  const { id: editId, ...editValues } = userToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;

  const { isCreating, createUser } = useCreateUser();

  const { isEditing, editUser } = useEditUser();

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const avatar =
      typeof data.avatar === 'string' ? data.avatar : data.avatar[0];

    if (isEditSession) {
      editUser(
        { newUserData: { ...data, avatar }, id: editId },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createUser(
        { ...data, avatar },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }

    console.log(data);
  }

  function onError(errors) {
    // console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? 'modal' : 'regular'}>
      <FormRow label='User full name' error={errors?.fullName?.message}>
        <Input
          type='text'
          id='fullName'
          disabled={isWorking}
          {...register('fullName', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      {!isEditSession && (
        <FormRow label='User email' error={errors?.email?.message}>
          <Input
            type='email'
            id='email'
            disabled={isWorking}
            {...register('email', {
              required: 'This field is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Please provide a valid email address',
              },
            })}
          />
        </FormRow>
      )}

      {!isEditSession && (
        <FormRow label='Password' error={errors?.password?.message}>
          <Input
            type='password'
            id='password'
            disabled={isWorking}
            {...register('password', {
              required: 'This field is required',
              minLength: {
                value: 8,
                message: 'Password needs a minimum of 8 characters',
              },
            })}
          />
        </FormRow>
      )}

      {!isEditSession && (
        <FormRow
          label='Repeat password'
          error={errors?.passwordConfirm?.message}>
          <Input
            type='password'
            id='passwordConfirm'
            disabled={isWorking}
            {...register('passwordConfirm', {
              required: 'This field is required',
              validate: (value) =>
                value === getValues().password || 'Passwords need to match',
            })}
          />
        </FormRow>
      )}

      <FormRow label='User role' error={errors?.alchoholType?.message}>
        {/* <Input
          type='text'
          id='alchoholType'
          disabled={isWorking}
          {...register('alchoholType', {
            required: 'This field is required',
          })}
        /> */}
        <Select
          options={[
            {
              value: 1,
              label: 'Admin',
            },
            {
              value: 2,
              label: 'Default user',
            },
          ]}
          type='white'
          value={choice}
          onChange={(e) => setChoice(e.target.value)}
        />
      </FormRow>

      <FormRow label='Avatar'>
        <FileInput
          id='image'
          accept='image/*'
          {...register('image', {
            required: isEditSession ? false : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation='secondary'
          type='reset'
          onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? 'Edit user' : 'Add user'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateEditUserForm;
