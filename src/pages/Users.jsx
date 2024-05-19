import styled from 'styled-components';
import { useUser } from '../features/authentication/useUser';
import AddUser from '../features/users/AddUser';
import UserTableOperations from '../features/users/UserTableOperations';
import UsersTable from '../features/users/UsersTable';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 2.4rem;
`;

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
        <Container>
          <UserTableOperations />
          {isAdmin && <AddUser />}
        </Container>
      </Row>

      <UsersTable />
    </>
  );
}

export default Users;
