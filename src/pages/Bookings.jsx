import { useUser } from '../features/authentication/useUser';
import BookingTable from '../features/bookings/BookingTable';
import BookingTableOperations from '../features/bookings/BookingTableOperations';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

function Bookings() {
  const { user } = useUser();

  const isAdmin = user?.roles?.roleName === 'admin';

  if (!isAdmin) {
    return (
      <Heading as='h1'>You have no permissions to open that page!</Heading>
    );
  }

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>All bookings</Heading>
        <BookingTableOperations />
      </Row>

      <BookingTable />
    </>
  );
}

export default Bookings;
