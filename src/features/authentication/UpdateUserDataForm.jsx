import { useUser } from '../authentication/useUser';
import { useState } from 'react';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useUpdateUser } from './useUpdateUser';
import useWidth from '../../hooks/useWidth';
import FormRowVertical from '../../ui/FormRowVertical';

function UpdateUserDataForm() {
  const { user } = useUser();
  const { fullName: currentFullName, email } = user;

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  const { updateUser, isUpdating } = useUpdateUser();

  const width = useWidth();

  function handleSubmit(e) {
    e.preventDefault();

    if (!fullName) {
      return;
    }

    updateUser(
      { fullName, avatar, user },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  }

  function handleCancel() {
    setFullName(currentFullName);
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      {width > 430 ? (
        <FormRow label='Email address'>
          <Input value={email} disabled />
        </FormRow>
      ) : (
        <FormRowVertical label='Email address'>
          <Input value={email} disabled />
        </FormRowVertical>
      )}

      {width > 430 ? (
        <FormRow label='Full name'>
          <Input
            type='text'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={isUpdating}
            id='fullName'
          />
        </FormRow>
      ) : (
        <FormRowVertical label='Full name'>
          <Input
            type='text'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={isUpdating}
            id='fullName'
          />
        </FormRowVertical>
      )}

      {width > 430 ? (
        <FormRow label='Avatar image'>
          <FileInput
            disabled={isUpdating}
            id='avatar'
            accept='image/*'
            onChange={(e) => setAvatar(e.target.files[0])}
          />
        </FormRow>
      ) : (
        <FormRowVertical label='Avatar image'>
          <FileInput
            disabled={isUpdating}
            id='avatar'
            accept='image/*'
            onChange={(e) => setAvatar(e.target.files[0])}
          />
        </FormRowVertical>
      )}

      <FormRow>
        <Button onClick={handleCancel} type='reset' variation='secondary'>
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
