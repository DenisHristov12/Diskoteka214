import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';
import TableOperations from '../../ui/TableOperations';

function EventFilterSort() {
  return (
    <TableOperations>
      <Filter
        filterField={['all', 'entrance', 'promotions']}
        options={[
          { value: 'all', label: 'All' },
          { value: 'free-entrance', label: 'Free' },
          { value: 'paid-entrance', label: 'Paid' },
          { value: 'promotions', label: 'Promo' },
          { value: 'no-promotions', label: 'No promo' },
        ]}
      />
      <SortBy
        options={[
          { value: 'date-asc', label: 'Sort by date (newest)' },
          { value: 'date-desc', label: 'Sort by date (oldest)' },
          {
            value: 'entrance-asc',
            label: 'Sort by entrance (most cheap)',
          },
          {
            value: 'entrance-desc',
            label: 'Sort by entrance (most expensive)',
          },
        ]}
      />
    </TableOperations>
  );
}

export default EventFilterSort;
