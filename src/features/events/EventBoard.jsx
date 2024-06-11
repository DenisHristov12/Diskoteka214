import styled from 'styled-components';

import Spinner from '../../ui/Spinner';
import EventPoster from './EventPoster';
import { useEvents } from './useEvents';
import { useSearchParams } from 'react-router-dom';
import Empty from '../../ui/Empty';

const GridContainer = styled.div`
  width: 100%;
  margin-top: 6.4rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);

  column-gap: 1.2rem;
  row-gap: 4.8rem;

  /* background-color: red; */
`;

function EventBoard() {
  const { isLoading, events } = useEvents();
  const [searchParams] = useSearchParams();

  if (isLoading) {
    return <Spinner />;
  }

  if (!events.length) {
    return <Empty resourceName={'events'} />;
  }

  //FILTER
  const filteredEntrance = searchParams.get('entrance') || 'all';
  const filteredPromotions = searchParams.get('promotions') || 'all';

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

  //SORT
  const sortBy = searchParams.get('sortBy') || 'date-asc';

  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;
  const sortedEvents = filteredEvents.sort((a, b) => {
    if (field === 'date') {
      return (new Date(b[field]) - new Date(a[field])) * modifier;
    } else {
      return (a[field] - b[field]) * modifier;
    }
  });
  return (
    <GridContainer>
      {sortedEvents?.map((event) => (
        <EventPoster event={event} key={event.id} />
      ))}
    </GridContainer>
  );
}

export default EventBoard;
