import styled from 'styled-components';
import { useEventsAfterToday } from '../features/events/useEventsAfterToday';
import Spinner from './Spinner';
import UpcomingEvent from './UpcomingEvent';
import Heading from './Heading';

const Layout = styled.div`
  margin-top: 4.8rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  padding: 2.4rem 4.8rem;
  /* background-color: red; */
`;

function UpcomingEvents() {
  const { isLoading, eventsAfterToday } = useEventsAfterToday();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Layout>
      {eventsAfterToday.map((event) => (
        <UpcomingEvent event={event} />
      ))}
    </Layout>
  );
}

export default UpcomingEvents;
