import Menus from '../../ui/Menus';
import Pagination from '../../ui/Pagination';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import UserRow from './UserRow';
import { useUsers } from './useUsers';

function UsersTable() {
  const { usersData, isLoading } = useUsers();

  if (isLoading) {
    return <Spinner />;
  }

  console.log(usersData);

  return (
    <Menus>
      <Table columns='0.8fr 1fr 1fr 1.2rem'>
        <Table.Header>
          <div>Avatar</div>
          <div>User</div>
          <div>Role</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={usersData}
          render={(userData) => (
            <UserRow key={userData.id} userData={userData} />
          )}
        />

        <Table.Footer>{/* <Pagination count={count} /> */}</Table.Footer>
      </Table>
    </Menus>
  );
}

export default UsersTable;
