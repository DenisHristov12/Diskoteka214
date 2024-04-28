import styled from 'styled-components';

import Button from '../../ui/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteEvent } from '../../services/apiEvents';
import toast from 'react-hot-toast';
import { useState } from 'react';
import CreateEventForm from './CreateEventForm';

const Poster = styled.div`
  height: 53vh;
  padding: 0.6rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  box-shadow: var(--shadow-md);
  /* background-color: red; */
`;

const Img = styled.img`
  height: auto;
  width: 100%;
`;

const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

function EventPoster({ event }) {
  const queryClient = useQueryClient();

  const [showForm, setShowForm] = useState(false);

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      toast.success('Event has been deleted succesfully!');

      queryClient.invalidateQueries({
        queryKey: ['events'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return (
    <>
      <Poster>
        <Img src={event.image} alt='Poster' />

        <ButtonBox>
          <Button size='fullWidth'>Details</Button>
          <Button size='fullWidth' onClick={() => setShowForm((show) => !show)}>
            Edit
          </Button>
          <Button
            size='fullWidth'
            variation='danger'
            onClick={() => mutate(event.id)}
            disabled={isDeleting}>
            Delete
          </Button>
        </ButtonBox>
      </Poster>
      {showForm && <CreateEventForm eventToEdit={event} />}
    </>
  );
}

export default EventPoster;
