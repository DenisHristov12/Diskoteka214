import supabase from './supabase';

export async function getReservators() {
  const { data, error } = await supabase.from('reservators').select('*');

  if (error) {
    console.error(error);
    throw new Error('Reservators could not be loaded');
  }

  return data;
}

export async function getReservator() {
  const reservatorData = JSON.parse(localStorage.getItem('reservator'));

  return reservatorData;
}

export async function createReservator(obj) {
  // console.log(obj.id);

  const { data, error } = await supabase
    .from('reservators')
    .insert([obj])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Reservator could not be created');
  }

  console.log(data);

  return data;
}
