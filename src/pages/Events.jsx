import EventBoard from '../features/events/EventBoard';
import AddEvent from '../features/events/AddEvent';
import Row from '../ui/Row';
import Heading from '../ui/Heading';
import styled from 'styled-components';
import EventFilterSort from '../features/events/EventFilterSort';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 2.4rem;
`;

function Events() {
  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>All Events</Heading>
        <Container>
          <EventFilterSort />
          <AddEvent />
        </Container>
      </Row>

      <Row type='horizontal'>
        <EventBoard />
      </Row>
    </>
  );
}

export default Events;
