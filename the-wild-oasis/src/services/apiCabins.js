import supabase from "./supabase";

// get all the cabins
export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error("Cabins could not be loaded");
    throw new Error("Could not load cabins");
  }
  return cabins;
}
