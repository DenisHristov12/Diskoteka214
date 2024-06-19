import styled from 'styled-components';
import { useEventsAfterToday } from '../features/events/useEventsAfterToday';
import Spinner from './Spinner';
import UpcomingEvent from './UpcomingEvent';
import Heading from './Heading';
import { respondToMobile, respondToMobileSmall } from '../styles/mediaQueries';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

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

const HeadingContainer = styled.div`
  margin: 9.6rem auto 0;
`;

const StyledSpan = styled.span`
  margin: 2.4rem auto;
`;

function UpcomingEvents() {
  const { isLoading, eventsAfterToday } = useEventsAfterToday();

  const navigate = useNavigate();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <HeadingContainer>
        <Heading as='h1'>See some of our upcoming events</Heading>
      </HeadingContainer>
      <Layout>
        {eventsAfterToday.map((event) => (
          <UpcomingEvent event={event} key={event.id} />
        ))}

        <StyledSpan>
          <Button onClick={() => navigate('/events')} size='medium'>
            See all upcoming events
          </Button>
        </StyledSpan>
      </Layout>
    </>
  );
}

export default UpcomingEvents;
