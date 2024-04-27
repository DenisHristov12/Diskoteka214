import styled from 'styled-components';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { useForm } from 'react-hook-form';

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateEventForm() {
  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor='date'>Event date</Label>
        <Input type='date' id='date' {...register('date')} />
      </FormRow>

      <FormRow>
        <Label htmlFor='entrance'>Entrance (lv.)</Label>
        <Input type='number' id='entrance' {...register('entrance')} />
      </FormRow>

      <FormRow>
        <Label htmlFor='musicType'>Music type</Label>
        <Input type='text' id='musicType' {...register('musicType')} />
      </FormRow>

      <FormRow>
        <Label htmlFor='alchoholType'>Alchohol type</Label>
        <Input type='text' id='alchoholType' {...register('alchoholType')} />
      </FormRow>

      <FormRow>
        <Label htmlFor='promotions'>Promotions</Label>
        <Input type='text' id='promotions' {...register('promotions')} />
      </FormRow>

      <FormRow>
        <Label htmlFor='description'>Description</Label>
        <Textarea
          type='text'
          id='description'
          defaultValue=''
          {...register('description')}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor='image'>Event poster</Label>
        <FileInput id='image' accept='image/*' />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button>Add event</Button>
      </FormRow>
    </Form>
  );
}

export default CreateEventForm;
