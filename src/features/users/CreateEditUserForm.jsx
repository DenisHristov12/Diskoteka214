import { useForm } from 'react-hook-form';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import FormRow from '../../ui/FormRow';
import { useCreateUser } from './useCreateUser';
import { useEditUser } from './useEditUser';
import Select from '../../ui/Select';
import { useUsers } from './useUsers';
import toast from 'react-hot-toast';

function CreateEditUserForm({ userToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = userToEdit;

  const { usersData } = useUsers();

  // console.log(editValues);
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;

  const { isCreating, createUser } = useCreateUser();

  const { isEditing, editUser } = useEditUser();

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    // console.log(Number(data.role));
    // const avatarEdit = data.avatar;

    const isEmailUsed = usersData.some((user) => user.email === data.email);

    const avatar =
      typeof data.avatar === 'string' ? data.avatar : data.avatar[0];

    const newUser = isEditSession
      ? { role: data.role, fullName: data.fullName, avatar }
      : {
          email: data.email,
          password: data.password,
          fullName: data.fullName,
          role: Number(data.role),
          avatar,
        };

    if (isEditSession) {
      editUser(
        { newUserData: newUser, id: editId },
        {
          onSuccess: (data) => {
            onCloseModal?.();
          },
        }
      );
    } else {
      if (isEmailUsed) {
        toast.error('There alredy exists user with that email!');
      }

      createUser(newUser, {
        onSuccess: (data) => {
          console.log(data);
          onCloseModal?.();
        },
      });
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

      <FormRow label='User role' error={errors?.role?.message}>
        <Select
          options={[
            {
              value: '1',
              label: 'Admin',
            },
            {
              value: '2',
              label: 'Default user',
            },
          ]}
          id='role'
          type='white'
          // value={choice}
          // onChange={(e) => setChoice(e.target.value)}
          {...register('role')}
        />
      </FormRow>

      <FormRow label='Avatar'>
        <FileInput
          id='avatar'
          accept='image/*'
          {...register('avatar', { required: 'This field is required' })}
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
