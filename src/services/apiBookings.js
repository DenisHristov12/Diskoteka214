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
    .insert([obj])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be created');
  }

  console.log(data);

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

export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, reservators(peopleNum), events(entrance)')
    .gte('created_at', date)
    .lte('created_at', getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data;
}

export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, reservators(*)')
    .gte('date', date)
    .lte('date', getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data;
}

export async function getStaysTodayActivity() {
  const queryDate = new Date().toISOString();

  const { data, error } = await supabase
    .from('bookings')
    .select('*, reservators(*)')
    .or(`and(status.eq.unconfirmed),and(status.eq.checked-in)`)
    .gte('date', queryDate)
    .lte('date', getToday({ end: true }))
    .order('created_at');

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }
  return data;
}
