import styled from 'styled-components';
import { useUser } from '../features/authentication/useUser';
import AddUser from '../features/users/AddUser';
import UserTableOperations from '../features/users/UserTableOperations';
import UsersTable from '../features/users/UsersTable';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import useWidth from '../hooks/useWidth';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 2.4rem;
`;

function Users() {
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
        <Heading as='h1'>All users</Heading>

        {width > 500 && (
          <Container>
            <UserTableOperations />
            {isAdmin && <AddUser />}
          </Container>
        )}

        {width < 500 && isAdmin && <AddUser />}
      </Row>

      {width < 500 && (
        <Row>
          <Container>
            <UserTableOperations />
          </Container>
        </Row>
      )}

      <UsersTable />
    </>
  );
}

export default Users;
