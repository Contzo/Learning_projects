import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function getCurrentUser() {
  // extract the data about the the current session (JWT and user) from the local storage of the browser.
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  // get the data from Supabase again, instead of using the one from the local storage, because it might become corrupt and we want to make sure that we have the correct use from DB
  const { data, error } = await supabase.auth.getUser(); // get the user from the DB again for the current session.

  if (error) throw new Error(error.message);
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1. Update the password or the full name
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);
  if (!avatar) return data;
  // 2. Upload the avatar Image
  const fileName = `avatar-${data.user.id}-${Math.random()}`; // create unique name for the file
  const { error: fileUploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar); // upload  the new avatar image to the store.
  if (fileUploadError) throw new Error(fileUploadError.message);
  // 3. Update the avatar in the user row
  const { data: updatedAvatarUser, error: updateAvatarError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });
  if (updateAvatarError) throw new Error(updateAvatarError.message);
  return updatedAvatarUser;
}
