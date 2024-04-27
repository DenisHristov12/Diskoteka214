import supabase from './supabase';

export async function getEvents() {
  const { data, error } = await supabase.from('events').select('*');

  if (error) {
    console.error(error);
    throw new Error('Events could not be loaded');
  }

  return data;
}

export async function createEvent(newEvent) {
  const { data, error } = await supabase.from('events').insert([newEvent]);

  if (error) {
    console.error(error);
    throw new Error('Events could not be created');
  }

  return data;
}

export async function deleteEvent(id) {
  const { data, error } = await supabase.from('events').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Event could not be deleted');
  }

  return data;
}
