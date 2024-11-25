import supabase from "./supabase";

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
