import styled from 'styled-components';
import { useRecentBookings } from './useRecentBookings';
import Spinner from '../../ui/Spinner';
import Stats from './Stats';
import { useRecentStays } from './useRecentStays';
import { useEvents } from '../events/useEvents';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, isLoading } = useRecentBookings();
  const {
    stays,
    confirmedStays,
    isLoading: isLoading2,
    numDays,
  } = useRecentStays();

  const { events, isLoading: isLoading3 } = useEvents();

  if (isLoading || isLoading2 || isLoading3) {
    return <Spinner />;
  }

  const eventsCapacity = events.reduce((acc, cur) => acc + cur.capacity, 0);

  console.log(eventsCapacity);

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        eventsCapacity={eventsCapacity}
      />
      <div>Today's activity</div>
      <div>Chart stay durations</div>
      <div>Chart sales</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
