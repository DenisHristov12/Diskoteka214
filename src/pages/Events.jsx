import Row from '../ui/Row';
import Heading from '../ui/Heading';
import Button from '../ui/Button';
import EventBoard from '../features/events/EventBoard';
import { useState } from 'react';
import CreateEventForm from '../features/events/CreateEventForm';

function Events() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>All Events</Heading>
        <p>Filter / Sort</p>
      </Row>

      <Row type='horizontal'>
        <EventBoard />
      </Row>
      <Button onClick={() => setShowForm((show) => !show)}>
        Add new event
      </Button>

      {showForm && <CreateEventForm />}
    </>
  );
}

export default Events;
