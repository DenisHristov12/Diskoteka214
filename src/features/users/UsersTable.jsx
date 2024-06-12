import Empty from '../../ui/Empty';
import Menus from '../../ui/Menus';
import Pagination from '../../ui/Pagination';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import { PAGE_SIZE } from '../../utils/constants';
import UserRow from './UserRow';
import { useUsers } from './useUsers';

function UsersTable() {
  const { usersData, isLoading, count } = useUsers();

  if (isLoading) {
    return <Spinner />;
  }

  if (!usersData?.length) {
    return <Empty resourceName={'users'} />;
  }

  return (
    <Menus>
      <Table columns='0.8fr 1fr 1.2fr 0.4fr 1.2rem'>
        <Table.Header>
          <div>Avatar</div>
          <div>User</div>
          <div>Created</div>
          <div>Role</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={usersData}
          render={(usersData) => (
            <UserRow key={usersData.id} user={usersData} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} pageSize={PAGE_SIZE} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default UsersTable;
