import { useForm } from 'react-hook-form';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';
import { useCreateEvent } from './useCreateEvent';
import { useEditEvent } from './useEditEvent';
import { useQueryClient } from '@tanstack/react-query';
import useWidth from '../../hooks/useWidth';
import FormRowVertical from '../../ui/FormRowVertical';

function CreateEventForm({ eventToEdit = {}, onCloseModal }) {
  const queryClient = useQueryClient();
  const { id: editId, ...editValues } = eventToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const width = useWidth();

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
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
            queryClient.invalidateQueries({
              queryKey: ['event'],
            });
          },
        }
      );
    } else {
      createEvent(
        { ...data, image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? 'modal' : 'regular'}>
      {width > 1050 ? (
        <FormRow label='Event name' error={errors?.name?.message}>
          <Input
            type='text'
            id='name'
            disabled={isWorking}
            {...register('name', {
              required: 'This field is required',
            })}
          />
        </FormRow>
      ) : (
        <FormRowVertical label='Event name' error={errors?.name?.message}>
          <Input
            type='text'
            id='name'
            disabled={isWorking}
            {...register('name', {
              required: 'This field is required',
            })}
          />
        </FormRowVertical>
      )}

      {width > 1050 ? (
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
      ) : (
        <FormRowVertical label='Event date' error={errors?.date?.message}>
          <Input
            type='date'
            id='date'
            disabled={isWorking}
            {...register('date', {
              required: 'This field is required',
            })}
          />
        </FormRowVertical>
      )}

      {width > 1050 ? (
        <FormRow label='Entrance' error={errors?.entrance?.message}>
          <Input
            type='number'
            id='entrance'
            disabled={isWorking}
            {...register('entrance', {
              required: 'This field is required',
              validate: (value) =>
                value >= 0 || 'Entrance must be 0 or greater!',
            })}
          />
        </FormRow>
      ) : (
        <FormRowVertical label='Entrance' error={errors?.entrance?.message}>
          <Input
            type='number'
            id='entrance'
            disabled={isWorking}
            {...register('entrance', {
              required: 'This field is required',
              validate: (value) =>
                value >= 0 || 'Entrance must be 0 or greater!',
            })}
          />
        </FormRowVertical>
      )}

      {width > 1050 ? (
        <FormRow label='Music type' error={errors?.musicType?.message}>
          <Input
            type='text'
            id='musicType'
            disabled={isWorking}
            {...register('musicType', {
              required: 'This field is required',
            })}
          />
        </FormRow>
      ) : (
        <FormRowVertical label='Music type' error={errors?.musicType?.message}>
          <Input
            type='text'
            id='musicType'
            disabled={isWorking}
            {...register('musicType', {
              required: 'This field is required',
            })}
          />
        </FormRowVertical>
      )}

      {width > 1050 ? (
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
      ) : (
        <FormRowVertical
          label='Alchohol type'
          error={errors?.alchoholType?.message}>
          <Input
            type='text'
            id='alchoholType'
            disabled={isWorking}
            {...register('alchoholType', {
              required: 'This field is required',
            })}
          />
        </FormRowVertical>
      )}

      {width > 1050 ? (
        <FormRow label='Promotions' error={errors?.promotions?.message}>
          <Input
            type='text'
            id='promotions'
            disabled={isWorking}
            {...register('promotions', {
              // required: 'This field is required',
            })}
          />
        </FormRow>
      ) : (
        <FormRowVertical label='Promotions' error={errors?.promotions?.message}>
          <Input
            type='text'
            id='promotions'
            disabled={isWorking}
            {...register('promotions', {
              // required: 'This field is required',
            })}
          />
        </FormRowVertical>
      )}

      {width > 1050 ? (
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
      ) : (
        <FormRowVertical
          label='Description'
          error={errors?.description?.message}>
          <Textarea
            type='text'
            id='description'
            disabled={isWorking}
            defaultValue=''
            {...register('description', {
              required: 'This field is required',
            })}
          />
        </FormRowVertical>
      )}

      {width > 1050 ? (
        <FormRow label='Capacity' error={errors?.capacity?.message}>
          <Input
            type='number'
            id='capacity'
            disabled={isWorking}
            {...register('capacity', {
              required: 'This field is required',
            })}
          />
        </FormRow>
      ) : (
        <FormRowVertical label='Capacity' error={errors?.capacity?.message}>
          <Input
            type='number'
            id='capacity'
            disabled={isWorking}
            {...register('capacity', {
              required: 'This field is required',
            })}
          />
        </FormRowVertical>
      )}

      {width > 1050 ? (
        <FormRow label='Event poster'>
          <FileInput
            id='image'
            accept='image/*'
            {...register('image', {
              required: isEditSession ? false : 'This field is required',
            })}
          />
        </FormRow>
      ) : (
        <FormRowVertical label='Event poster'>
          <FileInput
            id='image'
            accept='image/*'
            {...register('image', {
              required: isEditSession ? false : 'This field is required',
            })}
          />
        </FormRowVertical>
      )}

      {width > 1050 ? (
        <FormRow>
          <Button
            variation='secondary'
            type='reset'
            onClick={() => onCloseModal?.()}>
            Cancel
          </Button>
          <Button disabled={isWorking}>
            {isEditSession ? 'Edit event' : 'Add event'}
          </Button>
        </FormRow>
      ) : (
        <FormRowVertical>
          <Button
            variation='secondary'
            type='reset'
            onClick={() => onCloseModal?.()}>
            Cancel
          </Button>
          <Button disabled={isWorking}>
            {isEditSession ? 'Edit event' : 'Add event'}
          </Button>
        </FormRowVertical>
      )}
    </Form>
  );
}

export default CreateEventForm;
