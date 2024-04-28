import supabase, { supabaseUrl } from './supabase';

export async function getEvents() {
  const { data, error } = await supabase.from('events').select('*');

  if (error) {
    console.error(error);
    throw new Error('Events could not be loaded');
  }

  return data;
}

export async function createEvent(newEvent) {
  // https://ehkzfbcnwcykcbdhupaa.supabase.co/storage/v1/object/public/event-images/Diskoteka214.com.png

  const imageName = `${Math.random()}-${newEvent.image.name}`.replaceAll(
    '/',
    ''
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/event-images/${imageName}`;

  const { data, error } = await supabase
    .from('events')
    .insert([{ ...newEvent, image: imagePath }]);

  if (error) {
    console.error(error);
    throw new Error('Events could not be created');
  }

  const { error: storageError } = await supabase.storage
    .from('event-images')
    .upload(imageName, newEvent.image);

  if (storageError) {
    await supabase.from('events').delete().eq('id', data.id);

    console.error(storageError);
    throw new Error(
      'Image could not be uploaded and the event was not created'
    );
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
