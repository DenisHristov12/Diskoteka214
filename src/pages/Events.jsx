import EventBoard from '../features/events/EventBoard';
import AddEvent from '../features/events/AddEvent';
import Row from '../ui/Row';
import Heading from '../ui/Heading';
import styled from 'styled-components';
import EventFilterSort from '../features/events/EventFilterSort';
import { useUser } from '../features/authentication/useUser';
import useWidth from '../hooks/useWidth';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 2.4rem;
`;

function Events() {
  const { isAdmin } = useUser();

  const width = useWidth();

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>All Events</Heading>

        {width > 500 && (
          <Container>
            <EventFilterSort />
            {isAdmin && <AddEvent />}
          </Container>
        )}

        {width < 500 && isAdmin && <AddEvent />}
      </Row>

      {width < 500 && (
        <Row>
          <Container>
            <EventFilterSort />
          </Container>
        </Row>
      )}

      <Row type='horizontal'>
        <EventBoard />
      </Row>
    </>
  );
}

export default Events;
