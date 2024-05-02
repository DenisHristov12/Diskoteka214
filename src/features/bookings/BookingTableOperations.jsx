import SortBy from '../../ui/SortBy';
import Filter from '../../ui/Filter';
import TableOperations from '../../ui/TableOperations';

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField='status'
        options={[
          { value: 'all', label: 'All' },
          { value: 'checked-out', label: 'Checked out' },
          { value: 'checked-in', label: 'Checked in' },
          { value: 'unconfirmed', label: 'Unconfirmed' },
        ]}
      />

      <SortBy
        options={[
          { value: 'date-desc', label: 'Sort by date (recent first)' },
          { value: 'date-asc', label: 'Sort by date (earlier first)' },
          // {
          //   value: 'peopleNum-desc',
          //   label: 'Sort by people number (most first)',
          // },
          // {
          //   value: 'peopleNum-asc',
          //   label: 'Sort by people number (less first)',
          // },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
