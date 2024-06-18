import BookingRow from './BookingRow';
import Table from '../../ui/Table';
import { useBookings } from './useBookings';
import Menus from '../../ui/Menus';
import Pagination from '../../ui/Pagination';
import Empty from '../../ui/Empty';
import Spinner from '../../ui/Spinner';
import { PAGE_SIZE } from '../../utils/constants';
import useWidth from '../../hooks/useWidth';

function BookingTable() {
  const { bookings, isLoading, count } = useBookings();

  const width = useWidth();

  if (isLoading) {
    return <Spinner />;
  }

  if (!bookings.length) {
    return <Empty resourceName={'bookings'} />;
  }

  return (
    <Menus>
      <Table
        columns={
          width > 430
            ? '0.8fr 1.4fr 1fr 1.2fr 0.4fr 1.2rem'
            : width > 325
            ? '0.6fr 1fr 1fr 1rem'
            : '1fr 1fr 1rem'
        }>
        <Table.Header>
          {width > 325 && <div>Event</div>}
          <div>Reservator</div>
          {width > 430 && <div>Date</div>}
          <div>Status</div>
          {width > 430 && <div>People</div>}
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} pageSize={PAGE_SIZE} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
