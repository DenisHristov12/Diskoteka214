import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useUser } from '../authentication/useUser';
import { useCreateBooking } from '../bookings/useCreateBooking';
import { useEvent } from './useEvent';
import { useCreateReservator } from './useCreateReservator';
import { useReservators } from './useReservators';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FormRow from '../../ui/FormRow';
import Spinner from '../../ui/Spinner';

function ReserveForm({ onCloseModal }) {
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, formState } = useForm();

  const { errors } = formState;

  const { event, isLoading } = useEvent();
  const { reservators, isLoading: isLoadingReservators } = useReservators();

  const { user } = useUser();

  const { isCreating, createBooking } = useCreateBooking();

  const { isCreating: isReserving, createReservator } = useCreateReservator();

  const isWorking = isCreating || isReserving;

  const { fullName } = user;

  const { id: eventId, date } = event;

  if (isLoadingReservators || isLoading) {
    return <Spinner />;
  }

  const reservator = reservators.find(
    (res) => res.fullName === fullName && res.eventId === eventId
  );

  //   console.log(reservator);

  function onSubmit(data) {
    const newReservator = {
      ...data,
      fullName,
      eventId,
    };

    // console.log(newReservator);
    createReservator(newReservator);
    onCreateBooking();
  }

  function onCreateBooking() {
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
        queryClient.invalidateQueries({ queryKey: ['reservators'] });
      },
    });
    // console.log(newBooking);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? 'modal' : 'regular'}>
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

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation='secondary'
          type='reset'
          onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button disabled={isWorking}>Reserve</Button>
      </FormRow>
    </Form>
  );
}

export default ReserveForm;
