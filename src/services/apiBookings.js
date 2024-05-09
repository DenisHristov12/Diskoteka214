import { PAGE_SIZE } from '../utils/constants';
import { getToday } from '../utils/helpers';
import supabase from './supabase';

export async function getBookings({ filter, sortBy, page }) {
  let query = supabase
    .from('bookings')
    .select('id, date, status, events(name), reservators(*)', {
      count: 'exact',
    });

  // FILTER
  if (filter) {
    query = query[filter.method || 'eq'](filter.field, filter.value);
  }

  // SORT
  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === 'asc',
    });
  }

  // PAGINATION
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error('Bookings could not be loaded');
  }

  return { data, count };
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, events(*), reservators(*)')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking not found');
  }

  return data;
}

export async function createBooking(obj) {
  const { data, error } = await supabase
    .from('bookings')
    .insert([{ obj }])
    .select();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be created');
  }

  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from('bookings')
    .update(obj)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }

  return data;
}

export async function deleteBooking(id) {
  const { data, error } = await supabase.from('bookings').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }

  return data;
}

// export async function getBookingsAfterDate(date) {
//   const { data, error } = await supabase
//     .from('bookings')
//     .select('created_at, totalPrice, extrasPrice')
//     .gte('created_at', date)
//     .lte('created_at', getToday({ end: true }));

//   if (error) {
//     console.error(error);
//     throw new Error('Bookings could not get loaded');
//   }

//   return data;
// }

// export async function getStaysAfterDate(date) {
//   const { data, error } = await supabase
//     .from('bookings')
//     .select('*, reservators(fullName)')
//     .gte('date', date)
//     .lte('date', getToday());

//   if (error) {
//     console.error(error);
//     throw new Error('Bookings could not get loaded');
//   }

//   return data;
// }

// export async function getStaysTodayActivity() {
//   const { data, error } = await supabase
//     .from('bookings')
//     .select('*, reservators(fullName, peopleNum, number)')
//     .or(
//       `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
//     )
//     .order('created_at');

//   if (error) {
//     console.error(error);
//     throw new Error('Bookings could not get loaded');
//   }
//   return data;
// }
