import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';
import TableOperations from '../../ui/TableOperations';

function UserTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField='role'
        options={[
          { value: 'all', label: 'All' },
          { value: 'admin', label: 'Admins' },
          { value: 'user', label: 'Users' },
        ]}
      />

      <SortBy
        options={[
          {
            value: 'created-desc',
            label: 'Sort by created date (recent first)',
          },
          {
            value: 'created-asc',
            label: 'Sort by created date (earlier first)',
          },
          {
            value: 'name-desc',
            label: 'Sort by name (Z-A)',
          },
          {
            value: 'name-asc',
            label: 'Sort by name (A-Z)',
          },
        ]}
      />
    </TableOperations>
  );
}

export default UserTableOperations;
