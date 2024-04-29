import styled from 'styled-components';

import { useDeleteEvent } from './useDeleteEvent';
import Button from '../../ui/Button';
import CreateEventForm from './CreateEventForm';
import {
  HiInformationCircle,
  HiPencil,
  HiSquare2Stack,
  HiTrash,
} from 'react-icons/hi2';
import { useCreateEvent } from './useCreateEvent';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';

const Poster = styled.div`
  height: 65vh;
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
  const { isDeleting, deleteEvent } = useDeleteEvent();

  const { isCreating, createEvent } = useCreateEvent();

  const {
    id: eventId,
    date,
    entrance,
    musicType,
    alchoholType,
    promotions,
    description,
    image,
  } = event;

  function handleDuplicate() {
    createEvent({
      date,
      entrance,
      musicType,
      alchoholType,
      promotions,
      description,
      image,
    });
  }

  return (
    <Poster>
      <Img src={image} alt='Poster' />

      <ButtonBox>
        <Button size='fullWidth'>
          {/* <HiInformationCircle /> */}
          Details
        </Button>
        <Button
          size='fullWidth'
          disabled={isCreating}
          onClick={handleDuplicate}>
          {/* <HiSquare2Stack /> */}
          Duplicate
        </Button>

        <Modal>
          <Modal.Open opens='edit'>
            <Button size='fullWidth'>
              {/* <HiPencil /> */}
              Edit
            </Button>
          </Modal.Open>
          <Modal.Window name='edit'>
            <CreateEventForm eventToEdit={event} />
          </Modal.Window>

          <Modal.Open>
            <Button size='fullWidth' variation='danger'>
              {/* <HiTrash /> */}
              Delete
            </Button>
          </Modal.Open>
          <Modal.Window>
            <ConfirmDelete
              resourceName='event'
              disabled={isDeleting}
              onConfirm={() => deleteEvent(eventId)}
            />
          </Modal.Window>
        </Modal>
      </ButtonBox>
    </Poster>
  );
}

export default EventPoster;
