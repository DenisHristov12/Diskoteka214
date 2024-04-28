import { useState } from 'react';
import styled from 'styled-components';

import { useDeleteEvent } from '. /useDeleteEvent';
import Button from '../../ui/Button';
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
  const [showForm, setShowForm] = useState(false);

  const { isDeleting, deleteEvent } = useDeleteEvent();

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
            onClick={() => deleteEvent(event.id)}
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
