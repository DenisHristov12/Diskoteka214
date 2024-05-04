import supabase, { supabaseUrl } from './supabase';

export async function signUp({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { fullName, avatar: '' },
    },
  });

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

export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1. Update password OR fullName
  let updateData;

  if (password) {
    updateData = { password };
  }

  if (fullName) {
    updateData = { data: { fullName } };
  }

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) {
    throw new Error(error.message);
  }

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
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) {
    throw new Error(error2.message);
  }

  return updatedUser;
}
