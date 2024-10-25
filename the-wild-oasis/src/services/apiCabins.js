import supabase, { supabaseUrl } from "./supabase";

// get all the cabins
export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error("Cabins could not be loaded");
    throw new Error("Could not load cabins");
  }
  return cabins;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) throw new Error("Cabin could not be deleted");
}

export async function createCabin(newCabinObject) {
  const imageName = `${Math.random()} -${newCabinObject.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  // https://qhpezdlwwttucouzzkmy.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg?t=2024-10-19T18%3A45%3A31.888Z
  // 1 Create the cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabinObject, image: imagePath }])
    .select();
  if (error) throw new Error("Cabin could not be created");

  // 2. Upload a new file if the cabin row was created
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabinObject.image);
  // delete the cabin row if the image was not uploaded successfully
  if (storageError) {
    deleteCabin(data.id);
    console.error(storageError);
    throw new Error("Could not upload cabin delete the row");
  }
  return data;
}
