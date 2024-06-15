import styled from 'styled-components';
import { useEventsAfterToday } from '../features/events/useEventsAfterToday';
import Spinner from './Spinner';
import UpcomingEvent from './UpcomingEvent';
import Heading from './Heading';
import Pagination from './Pagination';
import { PAGE_SIZE_EVENTS } from '../utils/constants';

const Layout = styled.div`
  margin-top: 6.4rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  padding: 2.4rem 9.6rem;

  /* background-color: red; */
`;

function UpcomingEvents() {
  const { isLoading, eventsAfterToday, count } = useEventsAfterToday();

  if (isLoading) {
    return <Spinner />;
  }

  // console.log(eventsAfterToday);

  return (
    <Layout>
      {eventsAfterToday.map((event) => (
        <UpcomingEvent event={event} key={event.id} />
      ))}
      <Pagination count={count} pageSize={PAGE_SIZE_EVENTS} />
    </Layout>
  );
}

export default UpcomingEvents;
