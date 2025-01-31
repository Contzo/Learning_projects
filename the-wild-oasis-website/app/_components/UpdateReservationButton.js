"use client";

import { useFormStatus } from "react-dom";

export default function UpdateReservationButton() {
  const { pending: isPending } = useFormStatus();
  return (
    <div className="flex justify-end items-center gap-6">
      <button
        disabled={isPending}
        className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      >
        {isPending ? "Loading..." : "Update reservation"}
      </button>
    </div>
  );
}
