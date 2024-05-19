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
          { value: 1, label: 'Admins' },
          { value: 2, label: 'Users' },
        ]}
      />

      <SortBy
        options={[
          {
            value: 'created_at-desc',
            label: 'Sort by created date (recent first)',
          },
          {
            value: 'created_at-asc',
            label: 'Sort by created date (earlier first)',
          },
          {
            value: 'fullName-desc',
            label: 'Sort by name (Z-A)',
          },
          {
            value: 'fullName-asc',
            label: 'Sort by name (A-Z)',
          },
        ]}
      />
    </TableOperations>
  );
}

export default UserTableOperations;
