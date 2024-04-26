import supabase from './supabase';

export async function getEvents() {
  const { data, error } = await supabase.from('events').select('*');

  if (error) {
    console.error(error);
    throw new Error('Events could not be loaded');
  }

  return data;
}
