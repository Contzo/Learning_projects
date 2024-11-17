import { PAGE_SIZE } from "../utils/contstants";
import supabase, { supabaseUrl } from "./supabase";

// get all the cabins
export async function getCabins(currentPage) {
  let query = supabase.from("cabins").select("*", { count: "exact" });
  // Pagination
  if (currentPage) {
    // calculate the range
    const from = (currentPage - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }
  const { data: cabins, error, count } = await query;

  if (error) {
    console.error("Cabins could not be loaded");
    throw new Error("Could not load cabins");
  }
  return { cabins, count };
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) throw new Error("Cabin could not be deleted");
}

export async function createEditCabin(newCabinObject, id) {
  const hasImagePath =
    typeof newCabinObject.image === "string" &&
    newCabinObject.image.startsWith(supabaseUrl);
  let imageName;
  let imagePath;
  if (hasImagePath) {
    imagePath = newCabinObject.image;
  } else {
    imageName = `${Math.random()}-${newCabinObject.image.name}`.replaceAll(
      "/",
      ""
    );
    // https://qhpezdlwwttucouzzkmy.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg?t=2024-10-19T18%3A45%3A31.888Z
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  }
  // 1 Create /edit the cabin
  let query = supabase.from("cabins"); // crate a query object
  // A) Create
  if (!id) {
    query = query.insert([{ ...newCabinObject, image: imagePath }]); // append an insert request to the query object
  }
  // B) Edit
  if (id) {
    query = query.update({ ...newCabinObject, image: imagePath }).eq("id", id);
  }
  // append an update request
  const { data, error } = await query.select().single(); // fetch the resulted query request
  if (error) throw new Error("Cabin could not be created");

  // 2. Upload new image only if a new file is provided
  if (!hasImagePath) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabinObject.image);
    if (storageError) {
      deleteCabin(data.id);
      console.error(storageError);
      throw new Error("Could not upload cabin image, deleted the row");
    }
  }
  return data;
}
