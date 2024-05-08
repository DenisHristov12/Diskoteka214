import supabase, { supabaseUrl } from './supabase';

export async function getEvents() {
  const { data, error } = await supabase.from('events').select('*');

  if (error) {
    console.error(error);
    throw new Error('Events could not be loaded');
  }

  return data;
}

export async function getEvent(id) {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Event not found');
  }

  return data;
}

export async function createEditEvent(newEvent, id) {
  //   console.log(newEvent);
  const hasImagePath = newEvent.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newEvent.image.name}`.replaceAll(
    '/',
    ''
  );
  const imagePath = hasImagePath
    ? newEvent.image
    : `${supabaseUrl}/storage/v1/object/public/event-images/${imageName}`;

  let query = supabase.from('events');

  if (!id) {
    query = query.insert([{ ...newEvent, image: imagePath }]);
  }

  if (id) {
    query = query
      .update({ ...newEvent, image: imagePath })
      .eq('id', id)
      .select();
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Events could not be created');
  }

  if (hasImagePath) {
    return data;
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
