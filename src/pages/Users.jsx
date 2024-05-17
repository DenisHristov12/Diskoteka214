import { useUser } from '../features/authentication/useUser';
import UserTableOperations from '../features/users/UserTableOperations';
import UsersTable from '../features/users/UsersTable';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

function Users() {
  const { isAdmin } = useUser();

  if (!isAdmin) {
    return (
      <Heading as='h1'>You have no permissions to open that page!</Heading>
    );
  }

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>All users</Heading>
        <UserTableOperations />
      </Row>

      <UsersTable />
    </>
  );
}

export default Users;
