import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams] = useSearchParams();
  // Filter
  const filterStatus = searchParams.get("status");
  const filterObject =
    !filterStatus || filterStatus === "all"
      ? null
      : { field: "status", value: filterStatus };
  // Sorting
  const sortByRaw = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings", filterObject, sortBy],
    queryFn: () => getBookings({ filter: filterObject, sortBy }),
  });
  return { isLoading, bookings, error };
}
