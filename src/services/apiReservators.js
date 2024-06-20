import supabase from './supabase';

export async function getReservators() {
  const { data, error } = await supabase.from('reservators').select('*');

  if (error) {
    console.error(error);
    throw new Error('Reservators could not be loaded');
  }

  return data;
}

export async function createReservator(obj) {
  const { data, error } = await supabase
    .from('reservators')
    .insert([obj])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Reservator could not be created');
  }

  return data;
}
