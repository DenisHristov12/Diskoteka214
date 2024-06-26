import styled from 'styled-components';
import { useRecentBookings } from './useRecentBookings';
import Spinner from '../../ui/Spinner';
import Stats from './Stats';
import { useRecentStays } from './useRecentStays';
import { useEvents } from '../events/useEvents';
import SalesChart from './SalesChart';
import TodayActivity from '../check-in-out/TodayActivity';
import GuestsChart from './GuestsChart';
import {
  respondToLandscapeTablets,
  respondToMobile,
  respondToSmallLaptop,
} from '../../styles/mediaQueries';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;

  ${respondToSmallLaptop(`

    grid-template-rows: auto 32rem auto;
  `)}

  ${respondToLandscapeTablets(`
    grid-template-columns: 1fr 1fr ;

    grid-template-rows: auto auto 46rem auto;
  `)}

  ${respondToMobile(`
    grid-template-columns: 1fr ;

    grid-template-rows: auto auto auto auto 34rem 44rem auto;
  `)}
`;

function DashboardLayout() {
  const { bookings, isLoading } = useRecentBookings();
  const { confirmedStays, isLoading: isLoading2, numDays } = useRecentStays();

  const { events, isLoading: isLoading3 } = useEvents();

  if (isLoading || isLoading2 || isLoading3) {
    return <Spinner />;
  }

  const eventsCapacity = events.reduce((acc, cur) => acc + cur.capacity, 0);

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        eventsCapacity={eventsCapacity}
      />
      <TodayActivity />
      <GuestsChart bookings={bookings} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
