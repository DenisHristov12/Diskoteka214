import supabase, { supabaseUrl } from './supabase';

export async function signUp({ fullName, email, password }) {
  // const { data, error } = await supabase.auth.signUp({
  //   email,
  //   password,
  //   options: {
  //     data: { fullName, avatar: '' },
  //   },
  // });

  const { data, error } = await supabase
    .from('users')
    .insert([{ email, password, fullName, avatar: '', role: 2 }])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  console.log(data);
  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase
    .from('users')
    .select('*, roles(roleName)')
    .eq('email', email)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  if (data.password !== password) {
    throw new Error('Passwords not matching!');
  }

  return data;
}

export async function getCurrentUser() {
  const userData = JSON.parse(localStorage.getItem('user'));

  return userData;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

export async function updateCurrentUser({ password, fullName, avatar, user }) {
  // 1. Update password OR fullName

  let query = supabase.from('users');

  if (password) {
    console.log(password);
    query = query
      .update({ ...user, password })
      .eq('id', user.id)
      .select();
  }

  if (fullName) {
    query = query
      .update({ ...user, fullName })
      .eq('id', user.id)
      .select();
  }

  const { data, error } = await query.select().single();

  console.log(data);

  if (error) {
    throw new Error(error.message);
  }

  console.log(avatar);

  if (!avatar) {
    return data;
  }

  // 2. Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from('avatars')
    .upload(fileName, avatar);

  if (storageError) {
    throw new Error(storageError.message);
  }

  // 3. Update avatar in the user
  // const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
  //   avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
  // });

  const { data: updatedUser, error: error2 } = await supabase
    .from('users')
    .update({
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    })
    .eq('avatar', user.avatar)
    .select();

  if (error2) {
    throw new Error(error2.message);
  }

  return updatedUser;
}
