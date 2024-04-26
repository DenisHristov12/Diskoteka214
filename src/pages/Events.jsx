import Row from '../ui/Row';
import Heading from '../ui/Heading';
import EventBoard from '../features/events/EventBoard';

function Events() {
  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>All Events</Heading>
        <p>Filter / Sort</p>
      </Row>

      <Row type='horizontal'>
        <EventBoard />
      </Row>
    </>
  );
}

export default Events;
