import { useForm } from 'react-hook-form';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';
import { useCreateBooking } from './useCreateBooking';

function CreateBookingForm({ onCloseModal }) {
  const { register, handleSubmit, reset, formState } = useForm();

  const { errors } = formState;

  const { isCreating, createBooking } = useCreateBooking();

  function onSubmit(data) {
    createBooking(
      { data },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      }
    );

    // console.log(data);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? 'modal' : 'regular'}>
      <FormRow label='Event name' error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          disabled={isCreating}
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label='Event date' error={errors?.date?.message}>
        <Input
          type='date'
          id='date'
          disabled={isCreating}
          {...register('date', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label='Entrance' error={errors?.entrance?.message}>
        <Input
          type='number'
          id='entrance'
          disabled={isCreating}
          {...register('entrance', {
            required: 'This field is required',
            validate: (value) => value >= 0 || 'Entrance must be 0 or greater!',
          })}
        />
      </FormRow>

      <FormRow label='Music tyoe' error={errors?.musicType?.message}>
        <Input
          type='text'
          id='musicType'
          disabled={isCreating}
          {...register('musicType', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label='Alchohol type' error={errors?.alchoholType?.message}>
        <Input
          type='text'
          id='alchoholType'
          disabled={isCreating}
          {...register('alchoholType', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label='Promotions' error={errors?.promotions?.message}>
        <Input
          type='text'
          id='promotions'
          disabled={isCreating}
          {...register('promotions', {
            // required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label='Description' error={errors?.description?.message}>
        <Textarea
          type='text'
          id='description'
          disabled={isCreating}
          defaultValue=''
          {...register('description', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      {/* <FormRow label='Event poster'></FormRow> */}

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation='secondary'
          type='reset'
          onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button disabled={isCreating}>Add event</Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
