import styled from 'styled-components';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEvent } from '../../services/apiEvents';
import toast from 'react-hot-toast';
import FormRow from '../../ui/FormRow';

function CreateEventForm() {
  const { register, handleSubmit, reset, formState } = useForm();

  const { errors } = formState;

  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate } = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      toast.success('New event successfully created!');

      queryClient.invalidateQueries({ queryKey: ['events'] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    mutate({ ...data, image: data.image[0] });

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
            required: 'This field is required',
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

      <FormRow label='Event poster'>
        <FileInput
          id='image'
          accept='image/*'
          {...register('image', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isCreating}>Add event</Button>
      </FormRow>
    </Form>
  );
}

export default CreateEventForm;
