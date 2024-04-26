import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { getEvents } from '../../services/apiEvents';
import Spinner from '../../ui/Spinner';
import EventPoster from './EventPoster';

const GridContainer = styled.div`
  width: 100%;
  margin-top: 6.4rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);

  column-gap: 1.2rem;

  /* background-color: red; */
`;

function EventBoard() {
  const {
    isLoading,
    data: events,
    error,
  } = useQuery({
    queryKey: ['events'],
    queryFn: getEvents,
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <GridContainer>
      {events.map((event) => (
        <EventPoster event={event} key={event.id} />
      ))}
    </GridContainer>
  );
}

export default EventBoard;
