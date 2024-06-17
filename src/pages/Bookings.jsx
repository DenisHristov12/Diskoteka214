import { useUser } from '../features/authentication/useUser';
import BookingTable from '../features/bookings/BookingTable';
import BookingTableOperations from '../features/bookings/BookingTableOperations';
import useWidth from '../hooks/useWidth';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

function Bookings() {
  const { isAdmin } = useUser();

  const width = useWidth();

  if (!isAdmin) {
    return (
      <Heading as='h1'>You have no permissions to open that page!</Heading>
    );
  }

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>All bookings</Heading>
        {width > 500 && <BookingTableOperations />}
      </Row>

      {width < 500 && (
        <Row>
          <BookingTableOperations />
        </Row>
      )}

      <BookingTable />
    </>
  );
}

export default Bookings;
