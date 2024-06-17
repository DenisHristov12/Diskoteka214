import styled, { css } from 'styled-components';

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
import { useNavigate } from 'react-router-dom';
import { useUser } from '../authentication/useUser';
import { isBefore } from 'date-fns/isBefore';
import {
  respondToLandscapeTablets,
  respondToMobile,
  respondToMobileSmall,
  respondToSmallLaptop,
} from '../../styles/mediaQueries';

const userTypes = {
  user: css`
    height: 60vh;

    ${respondToSmallLaptop(`height: 40vh;`)}
    ${respondToLandscapeTablets(`height: 30vh;`)}
    ${respondToMobile(`height: 35vh;`)}
    ${respondToMobileSmall(`height: 25vh;`)}
  `,
  admin: css`
    height: 75vh;

    ${respondToLandscapeTablets(`height: 55vh;`)}
    ${respondToMobileSmall(`height: 45vh;`)}
  `,
};

const Poster = styled.div`
  height: 75vh;
  padding: 0.6rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  box-shadow: var(--shadow-md);
  /* background-color: red; */

  filter: ${({ grayScale }) => (grayScale ? 'grayscale(100%)' : 'none')};

  ${(props) => userTypes[props.user]}
`;

Poster.defaultProps = {
  user: 'user',
};

const Img = styled.img`
  height: auto;
  width: 100%;

  /* filter: ${({ grayScale }) => (grayScale ? 'grayscale(100%)' : 'none')}; */
`;

const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

function EventPoster({ event }) {
  const navigate = useNavigate();

  const { isDeleting, deleteEvent } = useDeleteEvent();

  const { isCreating, createEvent } = useCreateEvent();

  const {
    id: eventId,
    name,
    date,
    entrance,
    musicType,
    alchoholType,
    promotions,
    description,
    image,
    capacity,
  } = event;

  function handleDuplicate() {
    createEvent({
      name,
      date,
      entrance,
      musicType,
      alchoholType,
      promotions,
      description,
      image,
      capacity,
    });
  }

  const { user, isAdmin } = useUser();

  const role = user?.roles?.roleName;

  const today = new Date();

  const isBeforeToday = isBefore(date, today);

  return (
    <Poster grayScale={isBeforeToday} user={role}>
      <Img grayScale={isBeforeToday} src={image} alt='Poster' />

      <ButtonBox>
        <Button size='fullWidth' onClick={() => navigate(`/events/${eventId}`)}>
          {/* <HiInformationCircle /> */}
          Details
        </Button>
        {isAdmin && (
          <>
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

              <Modal.Open opens='delete'>
                <Button size='fullWidth' variation='danger'>
                  {/* <HiTrash /> */}
                  Delete
                </Button>
              </Modal.Open>
              <Modal.Window name='delete'>
                <ConfirmDelete
                  resourceName='event'
                  disabled={isDeleting}
                  onConfirm={() => deleteEvent(eventId)}
                />
              </Modal.Window>
            </Modal>
          </>
        )}
      </ButtonBox>
    </Poster>
  );
}

export default EventPoster;
