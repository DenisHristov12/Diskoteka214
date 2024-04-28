import { useForm } from 'react-hook-form';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';
import { useCreateEvent } from './useCreateEvent';
import { useEditEvent } from './useEditEvent';

function CreateEventForm({ eventToEdit = {} }) {
  const { id: editId, ...editValues } = eventToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;

  const { isCreating, createEvent } = useCreateEvent();

  const { isEditing, editEvent } = useEditEvent();

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    if (isEditSession) {
      editEvent(
        { newEventData: { ...data, image }, id: editId },
        {
          onSuccess: () => reset(),
        }
      );
    } else {
      createEvent(
        { ...data, image },
        {
          onSuccess: () => reset(),
        }
      );
    }

    // console.log(data);
  }

  function onError(errors) {
    // console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label='Event date' error={errors?.date?.message}>
        <Input
          type='date'
          id='date'
          disabled={isWorking}
          {...register('date', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label='Entrance' error={errors?.entrance?.message}>
        <Input
          type='number'
          id='entrance'
          disabled={isWorking}
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
          disabled={isWorking}
          {...register('musicType', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label='Alchohol type' error={errors?.alchoholType?.message}>
        <Input
          type='text'
          id='alchoholType'
          disabled={isWorking}
          {...register('alchoholType', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label='Promotions' error={errors?.promotions?.message}>
        <Input
          type='text'
          id='promotions'
          disabled={isWorking}
          {...register('promotions', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label='Description' error={errors?.description?.message}>
        <Textarea
          type='text'
          id='description'
          disabled={isWorking}
          defaultValue=''
          {...register('description', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label='Event poster'>
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
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? 'Edit event' : 'Add event'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateEventForm;
