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
  // Pagination
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));
  const {
    isLoading,
    data: { bookings, count } = {}, // destructuring the bookings an count and providing a fallback until the fetch is done.
    error,
  } = useQuery({
    queryKey: ["bookings", filterObject, sortBy, currentPage],
    queryFn: () => getBookings({ filter: filterObject, sortBy, currentPage }),
  });
  return { isLoading, bookings, error, count };
}
