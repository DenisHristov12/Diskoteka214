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
import CreateBookingForm from '../features/bookings/CreateBookingForm';

const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 12.8rem;
  /* align-content: space-between; */
  /* background-color: red; */
`;

const DataBox = styled.div`
  /* margin-left: 6.4rem; */
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  /* background-color: red; */
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  /* padding: 2.4rem 4rem; */
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Image = styled.img`
  height: auto;
  width: 100%;

  justify-self: center;
  align-self: center;

  /* background-color: red; */
`;

const Section = styled.section`
  padding: 3.2rem 4rem;

  font-size: 1.8rem;

  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  gap: 2.4rem;
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
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

function Event() {
  const { event, isLoading } = useEvent();
  const { deleteEvent, isLoading: isDeleting } = useDeleteEvent();

  const { isAdmin, isUser } = useUser();
  // console.log(isAdmin);
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isLoading) {
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
  } = event;

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
        <DataBox>
          <Section>
            <SectionDiv>
              <p>What you will listen during the event</p>
              <span>{musicType}</span>
            </SectionDiv>
            <SectionDiv>
              <p>What you will drink during the event</p>
              <span>{alchoholType}</span>
            </SectionDiv>
            <SectionDiv>
              <p>Promotions available for the event</p>
              <span>
                {promotions !== ''
                  ? promotions
                  : 'No promotions available for this event!'}
              </span>
            </SectionDiv>
            <SectionDiv>
              <p>Event description</p>
              <span>{description}</span>
            </SectionDiv>
            <SectionDiv>
              <p>Entrance</p>
              <span>{entrance} lv.</span>
            </SectionDiv>
          </Section>

          <ButtonGroup isEvent='true'>
            <Modal>
              {isUser && (
                <>
                  <Modal.Open opens='reserve'>
                    <Button isEvent='true'>Reserve</Button>
                  </Modal.Open>
                  <Modal.Window name='reserve'>
                    <CreateBookingForm />
                  </Modal.Window>
                </>
              )}

              {isAdmin && (
                <>
                  <Modal.Open opens='edit'>
                    <Button isEvent='true'>Edit</Button>
                  </Modal.Open>
                  <Modal.Window name='edit'>
                    <CreateEventForm eventToEdit={event} />
                  </Modal.Window>

                  <Modal.Open opens='delete'>
                    <Button variation='danger' isEvent='true'>
                      Delete
                    </Button>
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

            <Button isEvent='true' variation='secondary' onClick={moveBack}>
              Back
            </Button>

            {isAdmin && (
              <Footer>
                <p>
                  Created {format(new Date(created_at), 'EEE, MMM dd yyyy, p')}
                </p>
              </Footer>
            )}
          </ButtonGroup>
        </DataBox>

        <Image src={image} alt='event poster' />
      </Container>
    </>
  );
}

export default Event;
