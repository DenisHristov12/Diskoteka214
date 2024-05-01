import BookingRow from './BookingRow';
import Table from '../../ui/Table';
import { useBookings } from './useBookings';
import Menus from '../../ui/Menus';
import Pagination from '../../ui/Pagination';
import Empty from '../../ui/Empty';
import Spinner from '../../ui/Spinner';

function BookingTable() {
  const { bookings, isLoading } = useBookings();

  if (isLoading) {
    return <Spinner />;
  }

  if (!bookings.length) {
    return <Empty resourceName={'bookings'} />;
  }

  return (
    <Menus>
      <Table columns='1fr 1fr 1fr 1fr 1fr 1fr 3.2rem'>
        <Table.Header>
          <div>Event</div>
          <div>Reservator</div>
          <div>Date</div>
          <div>Status</div>
          <div>People</div>
          <div>Number</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

        {/* <Table.Footer>
          <Pagination count={count} />
        </Table.Footer> */}
      </Table>
    </Menus>
  );
}

export default BookingTable;
