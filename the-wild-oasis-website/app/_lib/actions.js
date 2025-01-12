"use server";

import { signIn } from "./auth";

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
