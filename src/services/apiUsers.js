import { PAGE_SIZE } from '../utils/constants';
import supabase, { supabaseUrl } from './supabase';

export async function getUsers({ filter, sortBy, page }) {
  let query = supabase.from('users').select('*, roles(*)', {
    count: 'exact',
  });

  // // FILTER
  if (filter) {
    query = query[filter.method || 'eq'](filter.field, filter.value);
  }

  // // SORT
  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === 'asc',
    });
  }

  // // PAGINATION
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  console.log(data);

  if (error) {
    console.error(error);
    throw new Error('Users could not be loaded');
  }

  return { data, count };
}

export async function getUser(id) {
  const { data, error } = await supabase
    .from('users')
    .select('*, roles(*)')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    throw new Error('User not found');
  }

  return data;
}

export async function createEditUser(newUser, id) {
  const hasImagePath = newUser.avatar?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newUser.avatar.name}`.replaceAll(
    '/',
    ''
  );
  const imagePath = hasImagePath
    ? newUser.avatar
    : `${supabaseUrl}/storage/v1/object/public/avatars/${imageName}`;

  let query = supabase.from('users');

  if (!id) {
    if (!newUser.avatar) {
      query = query.insert([{ ...newUser, avatar: 'default-user.jpg' }]);
    }
    query = query.insert([{ ...newUser, avatar: imagePath }]);
  }

  if (id) {
    query = query
      .update({ ...newUser, avatar: imagePath })
      .eq('id', id)
      .select();
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('User could not be created');
  }

  if (hasImagePath) {
    return data;
  }

  const { error: storageError } = await supabase.storage
    .from('avatars')
    .upload(imageName, newUser.avatar);

  if (storageError) {
    console.error(storageError);
    throw new Error('Image could not be uploaded');
  }

  return data;
}

export async function deleteUser(id) {
  const { data, error } = await supabase.from('users').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('User could not be deleted');
  }

  return data;
}
