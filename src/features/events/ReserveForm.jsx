import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useUser } from '../authentication/useUser';
import { useCreateBooking } from '../bookings/useCreateBooking';
import { useEvent } from './useEvent';
import { useCreateReservator } from './useCreateReservator';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FormRow from '../../ui/FormRow';
import Spinner from '../../ui/Spinner';
import toast from 'react-hot-toast';
import { useEditEvent } from './useEditEvent';
import useWidth from '../../hooks/useWidth';
import FormRowVertical from '../../ui/FormRowVertical';
import styled from 'styled-components';
import { respondToMobile } from '../../styles/mediaQueries';

const Container = styled.div`
  margin-top: 2.4rem;
  display: flex;
  gap: 2rem;

  justify-content: flex-end;

  ${respondToMobile(`justify-content: center;`)}
`;

function ReserveForm({ onCloseModal }) {
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, formState } = useForm();

  const width = useWidth();

  const { errors } = formState;

  const { event, isLoading } = useEvent();

  const { isEditing, editEvent } = useEditEvent();

  const { user } = useUser();

  const { isCreating, createBooking } = useCreateBooking();

  const { isCreating: isReserving, createReservator } = useCreateReservator();

  const isWorking = isCreating || isReserving;

  const { fullName } = user;

  const { id: eventId, date, capacity, image } = event;

  if (isLoading || isEditing) {
    return <Spinner />;
  }

  function onSubmit(data) {
    if (data.peopleNum > capacity) {
      toast.error('Exceeding event capacity!');
    } else {
      const newCapacity = capacity - data.peopleNum;

      const newEvent = {
        ...event,
        capacity: newCapacity,
      };

      editEvent(
        {
          newEventData: { ...newEvent, image },
          id: eventId,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['event'] });
          },
        }
      );

      const newReservator = {
        ...data,
        fullName,
        eventId,
      };

      createReservator(newReservator, {
        onSuccess: (reservator) => {
          const newBooking = {
            date,
            status: 'unconfirmed',
            isPaid: false,
            reservatorId: reservator?.id,
            eventId,
          };

          createBooking(newBooking, {
            onSuccess: (data) => {
              reset();
              onCloseModal?.();
              queryClient.invalidateQueries({
                queryKey: ['reservators'],
              });
            },
          });
        },
      });
    }
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? 'modal' : 'regular'}>
      {width > 900 ? (
        <FormRow label='Members' error={errors?.peopleNum?.message}>
          <Input
            type='number'
            id='peopleNum'
            disabled={isWorking}
            {...register('peopleNum', {
              required: 'This field is required',
            })}
          />
        </FormRow>
      ) : (
        <FormRowVertical
          responsive={width < 770}
          label='Members'
          error={errors?.peopleNum?.message}>
          <Input
            type='number'
            id='peopleNum'
            disabled={isWorking}
            {...register('peopleNum', {
              required: 'This field is required',
            })}
          />
        </FormRowVertical>
      )}

      {width > 900 ? (
        <FormRow label='Phone number' error={errors?.number?.message}>
          <Input
            type='tel'
            id='number'
            disabled={isWorking}
            {...register('number', {
              required: 'This field is required',
              pattern: {
                value: /^(?:\+359|0)\d{9}$/,
                message: 'Please provide a valid phone number',
              },
            })}
          />
        </FormRow>
      ) : (
        <FormRowVertical
          responsive={width < 770}
          label='Phone number'
          error={errors?.number?.message}>
          <Input
            type='tel'
            id='number'
            disabled={isWorking}
            {...register('number', {
              required: 'This field is required',
              pattern: {
                value: /^(?:\+359|0)\d{9}$/,
                message: 'Please provide a valid phone number',
              },
            })}
          />
        </FormRowVertical>
      )}

      {width > 900 ? (
        <FormRow>
          <Button
            variation='secondary'
            type='reset'
            onClick={() => onCloseModal?.()}>
            Cancel
          </Button>
          <Button disabled={isWorking}>Reserve</Button>
        </FormRow>
      ) : (
        <Container>
          <Button
            variation='secondary'
            type='reset'
            onClick={() => onCloseModal?.()}>
            Cancel
          </Button>
          <Button disabled={isWorking}>Reserve</Button>
        </Container>
      )}
    </Form>
  );
}

export default ReserveForm;
