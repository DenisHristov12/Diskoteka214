import styled from 'styled-components';

import Spinner from '../../ui/Spinner';
import EventPoster from './EventPoster';
import { useEvents } from './useEvents';
import { useSearchParams } from 'react-router-dom';
import Empty from '../../ui/Empty';
import { useUser } from '../authentication/useUser';
import { useEventsAfterTodayNoPagination } from './useEventsAfterTodayNoPagination';
import { respondToMobile } from '../../styles/mediaQueries';

const GridContainer = styled.div`
  width: 100%;
  margin-top: 6.4rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);

  column-gap: 1.2rem;
  row-gap: 4.8rem;

  ${respondToMobile(`grid-template-columns: repeat(2, 1fr);
  column-gap: 2.4rem;
  
  `)}
`;

function EventBoard() {
  const { isLoading, events: adminEvents } = useEvents();
  const { isLoading: isLoading2, eventsAfterTodayNoPagination } =
    useEventsAfterTodayNoPagination();

  const { isAdmin } = useUser();

  const [searchParams] = useSearchParams();

  if (isLoading || isLoading2) {
    return <Spinner />;
  }

  if (!adminEvents.length || !eventsAfterTodayNoPagination.length) {
    return <Empty resourceName={'events'} />;
  }

  const events = isAdmin ? adminEvents : eventsAfterTodayNoPagination;

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
