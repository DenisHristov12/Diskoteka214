import Filter from '../../ui/Filter';
import TableOperations from '../../ui/TableOperations';

function EventFilterSort() {
  return (
    <TableOperations>
      <Filter
        filterField={['all', 'entrance', 'promotions']}
        options={[
          { value: 'all', label: 'All' },
          { value: 'free-entrance', label: 'Free entrance' },
          { value: 'paid-entrance', label: 'Paid entrance' },
          { value: 'promotions', label: 'Promotions' },
          { value: 'no-promotions', label: 'No promotions' },
        ]}
      />
    </TableOperations>
  );
}

export default EventFilterSort;
