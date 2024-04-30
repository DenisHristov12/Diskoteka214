import styled from 'styled-components';

import Spinner from '../../ui/Spinner';
import EventPoster from './EventPoster';
import { useEvents } from './useEvents';
import { useSearchParams } from 'react-router-dom';

const GridContainer = styled.div`
  width: 100%;
  margin-top: 6.4rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);

  column-gap: 1.2rem;

  /* background-color: red; */
`;

function EventBoard() {
  const { isLoading, events } = useEvents();
  const [searchParams] = useSearchParams();

  if (isLoading) {
    return <Spinner />;
  }

  const filteredEntrance = searchParams.get('entrance') || 'all';
  const filteredPromotions = searchParams.get('promotions') || 'all';
  // const all = searchParams.get('events');

  let filteredEvents;

  if (filteredEntrance === 'all' || filteredPromotions === 'all') {
    filteredEvents = events;
  }

  if (filteredEntrance === 'free-entrance') {
    filteredEvents = events.filter((event) => event.entrance === 0);
  }

  if (filteredEntrance === 'paid-entrance') {
    filteredEvents = events.filter((event) => event.entrance > 0);
  }

  if (filteredPromotions === 'no-promotions') {
    filteredEvents = events.filter((event) => event.promotions === '');
  }

  if (filteredPromotions === 'promotions') {
    filteredEvents = events.filter((event) => event.promotions !== '');
  }

  return (
    <GridContainer>
      {filteredEvents?.map((event) => (
        <EventPoster event={event} key={event.id} />
      ))}
    </GridContainer>
  );
}

export default EventBoard;
