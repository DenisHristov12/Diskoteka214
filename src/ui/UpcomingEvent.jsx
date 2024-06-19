import styled, { css } from 'styled-components';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { useReservators } from '../features/events/useReservators';
import { useUser } from '../features/authentication/useUser';
import Spinner from './Spinner';
import {
  respondToMobile,
  respondToMobileSmall,
  respondToSmallLaptop,
} from '../styles/mediaQueries';
import useWidth from '../hooks/useWidth';

const EventContainer = styled.div`
  display: grid;

  grid-template-columns: ${(props) =>
    props.mobile
      ? '1fr 1fr'
      : props.tablet
      ? '1fr 1fr 1fr 1fr'
      : '1fr 1.5fr 1.6fr 1.2fr 1fr 0.8fr 1fr;'};

  gap: 4rem;

  margin-bottom: 6.4rem;

  align-items: center;
  justify-items: start;

  ${respondToMobileSmall(`

  margin-bottom: 3.6rem;
        `)}

  & button {
    position: relative;
    &::before {
      content: '';
      position: absolute;
      top: -5.3rem;
      left: -3rem;
      background-color: transparent;
      width: 1px;
      height: 18rem;
      background-color: var(--color-grey-200);

      ${respondToSmallLaptop(`height: 15rem;`)}
      ${respondToMobile(`height: 12rem;
      top: -4rem;
        `)}
      ${respondToMobileSmall(`
      top: -3.2rem;
      height: 9rem;
      left: -2.5rem;
        `)}
    }
  }
`;

const Image = styled.img`
  height: 15rem;
  width: auto;

  ${respondToSmallLaptop(`height: 12rem;`)}
  ${respondToMobileSmall(`height: 9rem;`)}
`;

const DataContainer = styled.div`
  height: 15rem;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  justify-content: flex-start;

  ${(props) =>
    props.tablet || props.mobile
      ? css`
          display: none;
        `
      : css`
          display: flex;
        `}

  ${respondToSmallLaptop(`
  height: 12rem;
  gap: 3.6rem;
  `)}
`;

const Heading = styled.span`
  margin-bottom: 1.2rem;
  font-size: 2rem;
  font-weight: 600;
  text-transform: capitalize;

  ${respondToSmallLaptop(`font-size: 1.4rem;`)}
`;

const Span = styled.span`
  font-size: 1.6rem;
  font-weight: 600;

  ${respondToSmallLaptop(`font-size: 1.4rem;`)}
`;

const SpanSmall = styled.span`
  font-size: 1.4rem;

  ${respondToSmallLaptop(`font-size: 1.2rem;`)}
`;

const DataBox = styled.div`
  font-size: 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
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

  const { user, isUser } = useUser();

  const navigate = useNavigate();

  const width = useWidth();

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
    <EventContainer tablet={width <= 768} mobile={width <= 426}>
      <Image src={image} />
      <DataContainer mobile={width <= 426}>
        <Heading>{name}</Heading>
        <DataBox>
          <div>
            <Span>Date: </Span>
            <SpanSmall>{date}</SpanSmall>
          </div>

          <div>
            <Span>Entrance: </Span>
            <SpanSmall>{entrance !== 0 ? entrance + ' lv.' : 'Free'}</SpanSmall>
          </div>
        </DataBox>
      </DataContainer>
      <DataContainer tablet={width <= 768}>
        <Heading>For you</Heading>
        <DataBox>
          <div>
            <Span>Music: </Span>
            <SpanSmall>{musicType}</SpanSmall>
          </div>
          <div>
            <Span>Alchohol: </Span>
            <SpanSmall>{alchoholType}</SpanSmall>
          </div>
        </DataBox>
      </DataContainer>
      <DataContainer tablet={width <= 768}>
        <Heading>Promotions</Heading>
        <DataBox>
          {promotions ? (
            <SpanSmall>{promotions}</SpanSmall>
          ) : (
            <SpanSmall>No promotions available</SpanSmall>
          )}
        </DataBox>
      </DataContainer>
      <DataContainer tablet={width <= 768}>
        <Heading>Description</Heading>
        <DataBox>
          <SpanSmall>{description}</SpanSmall>
        </DataBox>
      </DataContainer>
      <DataContainer mobile={width <= 426}>
        <Heading>Left</Heading>
        <DataBox>
          <div>
            <Span>{capacity} </Span>
            <SpanSmall>places</SpanSmall>
          </div>
        </DataBox>
      </DataContainer>

      {!isReservator ? (
        <Button
          onClick={() => navigate(isUser ? `/events/${eventId}` : '/login')}>
          Details
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
