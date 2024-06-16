import styled from 'styled-components';
import { useEventsAfterToday } from '../features/events/useEventsAfterToday';
import Spinner from './Spinner';
import UpcomingEvent from './UpcomingEvent';
import Heading from './Heading';
import Pagination from './Pagination';
import { PAGE_SIZE_EVENTS } from '../utils/constants';
import { respondToMobile, respondToMobileSmall } from '../styles/mediaQueries';

const Layout = styled.div`
  margin-top: 6.4rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  padding: 2.4rem 9.6rem;

  ${respondToMobile(`margin-top: 6.4rem;

  padding: 2rem 6.4rem;
  `)}

  ${respondToMobileSmall(`margin-top: 3.6rem;
  gap: 1.4rem;

  padding: 2rem 4.8rem;
  `)}
`;

function UpcomingEvents() {
  const { isLoading, eventsAfterToday, count } = useEventsAfterToday();

  if (isLoading) {
    return <Spinner />;
  }

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
