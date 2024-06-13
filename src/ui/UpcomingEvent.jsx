import styled from 'styled-components';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { useReservators } from '../features/events/useReservators';
import { useUser } from '../features/authentication/useUser';
import Spinner from './Spinner';

const EventContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr 1.5fr 1fr 1fr 0.8fr 1fr;
  gap: 4rem;
  /* width: 10rem; */

  margin-bottom: 6.4rem;

  align-items: center;
  justify-items: start;
  /* background-color: blue; */

  & button {
    /* margin-left: 10rem; */
    position: relative;
    &::before {
      content: '';
      position: absolute;
      top: -5.3rem;
      left: -3rem;
      background-color: transparent;
      width: 1px;
      height: 15rem;
      background-color: var(--color-grey-200);
    }
  }
`;

const Image = styled.img`
  height: 15rem;
  width: auto;
`;

const DataContainer = styled.div`
  height: 15rem;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  justify-content: flex-start;

  /* background-color: red; */
`;

const Heading = styled.span`
  margin-bottom: 1.2rem;
  font-size: 2rem;
  font-weight: 600;
  text-transform: capitalize;
`;
const Date = styled.div`
  font-size: 1.6rem;
  font-weight: 500;
  text-transform: capitalize;
`;
const Entrance = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
`;

const Span = styled.span`
  font-size: 1.6rem;
  font-weight: 600;
`;

const DataBox = styled.div`
  font-size: 1.4rem;
  display: flex;
  flex-direction: column;
  /* justify-items: center; */
  gap: 0.4rem;

  /* background-color: red; */
`;

function UpcomingEvent({ event }) {
  const {
    id: eventId,
    image,
    name,
    date,
    entrance,
    musicType,
    alchoholType,
    promotions,
    description,
    capacity,
  } = event;

  const { reservators, isLoading: isLoadingReservators } = useReservators();

  const { user, isAdmin, isUser } = useUser();

  const navigate = useNavigate();

  if (isLoadingReservators) {
    return <Spinner />;
  }

  const isReservator = reservators.some(
    (res) =>
      res.fullName === user?.fullName &&
      res.number === user?.number &&
      res.eventId === eventId
  );

  return (
    <EventContainer>
      <Image src={image} />
      <DataContainer>
        <Heading>{name}</Heading>
        <DataBox>
          <Date>
            <Span>Date: </Span>
            {date}
          </Date>
          <Entrance>
            <Span>Entrance: </Span> {entrance}
          </Entrance>
        </DataBox>
      </DataContainer>
      <DataContainer>
        <Heading>For you</Heading>
        <DataBox>
          <div>
            <Span>Music: </Span>
            {musicType}
          </div>
          <div>
            <Span>Alchohol: </Span>
            {alchoholType}
          </div>
        </DataBox>
      </DataContainer>
      <DataContainer>
        <Heading>Promotions</Heading>
        <DataBox>{promotions ? promotions : 'No promotions available'}</DataBox>
      </DataContainer>
      <DataContainer>
        <Heading>Description</Heading>
        <DataBox>{description}</DataBox>
      </DataContainer>
      <DataContainer>
        <Heading>Left</Heading>
        <DataBox>
          <div>{capacity} places</div>
        </DataBox>
      </DataContainer>

      {!isReservator ? (
        <Button
          onClick={() => navigate(isUser ? `/events/${eventId}` : '/login')}>
          Reserve
        </Button>
      ) : (
        <Button disabled='true' variation='secondary'>
          Reserved
        </Button>
      )}
    </EventContainer>
  );
}

export default UpcomingEvent;
