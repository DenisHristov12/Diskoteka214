import styled from 'styled-components';

import Spinner from '../../ui/Spinner';
import EventPoster from './EventPoster';
import { useEvents } from './useEvents';

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
