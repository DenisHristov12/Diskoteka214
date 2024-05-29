import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import Stat from './Stat';
import { formatCurrency } from '../../utils/helpers';

function Stats({ bookings, confirmedStays, numDays, eventsCapacity }) {
  const numBookings = bookings.length;
  // console.log(bookings);

  const sales = bookings.reduce((acc, cur) => acc + cur.events.entrance, 0);

  const checkins = confirmedStays.length;

  console.log(confirmedStays);

  const occupation =
    (confirmedStays.reduce((acc, cur) => acc + cur.reservators.peopleNum, 0) /
      eventsCapacity) *
    100;

  console.log(occupation);

  return (
    <>
      <Stat
        title='Bookings'
        color='blue'
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title='Sales'
        color='green'
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title='Check ins'
        color='indigo'
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title='Occupancy rate'
        color='yellow'
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation) + '%'}
      />
    </>
  );
}

export default Stats;
