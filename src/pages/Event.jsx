import styled from 'styled-components';
import { useEvent } from '../features/events/useEvent';
import { useMoveBack } from '../hooks/useMoveBack';
import { useNavigate } from 'react-router-dom';
import { useDeleteEvent } from '../features/events/useDeleteEvent';
import Spinner from '../ui/Spinner';
import Empty from '../ui/Empty';
import ButtonGroup from '../ui/ButtonGroup';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import ConfirmDelete from '../ui/ConfirmDelete';
import { format, isToday } from 'date-fns';
import { formatDistanceFromNow } from '../utils/helpers';
import CreateEventForm from '../features/events/CreateEventForm';
import { useUser } from '../features/authentication/useUser';

import ReserveForm from '../features/events/ReserveForm';

import { useReservators } from '../features/events/useReservators';
import {
  respondToLandscapeTablets,
  respondToMobile,
  respondToMobileSmall,
  respondToSmallLaptop,
} from '../styles/mediaQueries';
import useWidth from '../hooks/useWidth';

const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 12.8rem;

  ${respondToLandscapeTablets(`
    gap: 2.4rem;

    grid-template-columns: 2fr 1.5fr;
  `)}

  ${respondToMobile(`
    grid-template-columns: 1fr;

    justify-content: center;
  `)}
`;

const DataBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  ${respondToLandscapeTablets(`
    gap: 1.6rem;
  `)}

  ${respondToMobile(`
    gap: 1.4rem;
  `)}
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${respondToLandscapeTablets(`
    padding: 1.6rem 3.6rem;
  `)}

  ${respondToMobile(`
    padding: 1.2rem 3rem;

    font-size: 1.4rem;
  `)}

  ${respondToMobileSmall(`
    padding: 1rem 1.4rem;

    font-size: 1rem;
  `)}
`;

const Image = styled.img`
  height: auto;
  width: 100%;

  justify-self: center;
  align-self: center;

  ${respondToMobile(`width: 90%;`)}
`;

const Section = styled.section`
  padding: 3.2rem 4rem;

  font-size: 1.8rem;

  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  ${respondToLandscapeTablets(`
    padding: 2.4rem 3rem;

    gap: 2rem;

     font-size: 1.6rem;
  `)}

  ${respondToMobile(`
    gap: 1.4rem;

    font-size: 1.4rem;

    padding: 2rem 2.4rem;
  `)}

  ${respondToMobileSmall(`
    gap: 1.2rem;

    font-size: 1.2rem;

    padding: 1.4rem 2rem;
  `)}
`;

const SectionDiv = styled.div`
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 2.4rem;

  background-color: var(--color-green-100);

  & p {
    font-weight: 600;
  }

  ${respondToLandscapeTablets(`
     padding: 2rem;
  `)}

  ${respondToMobile(`
     padding: 1.6rem;
  `)}

  ${respondToMobileSmall(`
     padding: 1.2rem;

     height: 4.5rem;
  `)}
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;

  display: flex;
  justify-content: center;

  ${respondToMobileSmall(`
    padding: 1rem 2.4rem;
  font-size: 1rem;
  `)}
`;

function Event() {
  const { event, isLoading } = useEvent();
  const { deleteEvent, isLoading: isDeleting } = useDeleteEvent();
  const { reservators, isLoading: isLoadingReservators } = useReservators();

  const { user, isAdmin, isUser } = useUser();
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  const width = useWidth();

  if (isLoading || isLoadingReservators) {
    return <Spinner />;
  }

  if (!event) {
    return <Empty resource='event' />;
  }

  const {
    id: eventId,
    created_at,
    date,
    name,
    entrance,
    musicType,
    alchoholType,
    promotions,
    description,
    image,
    capacity,
  } = event;

  const isReservator = reservators.some(
    (res) =>
      res.fullName === user.fullName &&
      res.number === user.number &&
      res.eventId === eventId
  );

  return (
    <>
      <Header>
        <p>{name}</p>
        <p>
          {format(new Date(date), 'EEE, MMM dd yyyy')} (
          {isToday(new Date(date)) ? 'Today' : formatDistanceFromNow(date)})
        </p>
      </Header>
      <Container>
        {width < 430 && <Image src={image} alt='event poster' />}
        <DataBox>
          <Section>
            <SectionDiv>
              <p>Music</p>
              <span>{musicType}</span>
            </SectionDiv>
            <SectionDiv>
              <p>Alchohol</p>
              <span>{alchoholType}</span>
            </SectionDiv>
            <SectionDiv>
              <p>Promotions</p>
              <span>{promotions !== '' ? promotions : 'None'}</span>
            </SectionDiv>
            {description && (
              <SectionDiv>
                <p>Description</p>
                <span>{description}</span>
              </SectionDiv>
            )}
            <SectionDiv>
              <p>Entrance</p>
              <span>{`${entrance !== 0 ? entrance + ' lv.' : 'free'}`}</span>
            </SectionDiv>

            <SectionDiv>
              <p>Places left</p>
              <span>{capacity}</span>
            </SectionDiv>
          </Section>

          <ButtonGroup>
            <Modal>
              {isUser && !isReservator ? (
                <>
                  <Modal.Open opens='reserve'>
                    <Button>Reserve</Button>
                  </Modal.Open>
                  <Modal.Window name='reserve'>
                    <ReserveForm />
                  </Modal.Window>
                </>
              ) : (
                <Button disabled='true' variation='secondary'>
                  Reserved
                </Button>
              )}

              {isAdmin && (
                <>
                  <Modal.Open opens='edit'>
                    <Button>Edit</Button>
                  </Modal.Open>
                  <Modal.Window name='edit'>
                    <CreateEventForm eventToEdit={event} />
                  </Modal.Window>

                  <Modal.Open opens='delete'>
                    <Button variation='danger'>Delete</Button>
                  </Modal.Open>

                  <Modal.Window name='delete'>
                    <ConfirmDelete
                      resourceName='booking'
                      disabled={isDeleting}
                      onConfirm={() =>
                        deleteEvent(eventId, {
                          onSettled: () => navigate(-1),
                        })
                      }
                    />
                  </Modal.Window>
                </>
              )}
            </Modal>

            <Button variation='secondary' onClick={moveBack}>
              Back
            </Button>
          </ButtonGroup>

          {isAdmin && (
            <Footer>
              <p>
                Created {format(new Date(created_at), 'EEE, MMM dd yyyy, p')}
              </p>
            </Footer>
          )}
        </DataBox>

        {width > 430 && <Image src={image} alt='event poster' />}
      </Container>
    </>
  );
}

export default Event;
