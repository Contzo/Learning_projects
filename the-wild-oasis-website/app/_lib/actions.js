"use server";

import { auth, signIn, signOut } from "./auth";

export async function signInAction() {
  let googleProvider = null;
  try {
    // Fetch the list of available providers
    const response = await fetch("http://localhost:3000/api/auth/providers", {
      cache: "no-store", // Ensure you get the latest providers list
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch providers: ${response.status}`);
    }

    const providers = await response.json();

    // Convert the providers object to an array and find the Google providerlet providers = null
    const providerArray = Object.values(providers);
    googleProvider = providerArray.find((provider) => provider.id === "google");

    if (!googleProvider) {
      throw new Error("Google provider not found");
    }

    // Use the provider dynamically
  } catch (error) {
    console.error("Error during sign-in:", error);
    throw new Error("Sign-in failed");
  }
  await signIn(googleProvider.id, { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateProfile(formData) {
  // Firs we need to make sure that the user is authenticated
  const session = await auth();
  if (!session) {
    throw new Error("Not authenticated");
  }
  const nationalID = formData.get("nationalID"); // get the national ID from the form data
  const [nationality, countryFlag] = formData.get("nationality").split("%"); // get the nationality  and country flag from the form data

  // provide a regex test to validate the national ID as alphanumeric string between 6 and 12 characters
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    throw new Error("Invalid national ID");
  }

  const updateData = { nationality, countryFlag, nationalID };
}
