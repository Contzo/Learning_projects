import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/contstants";

export function useBookings() {
  const queryClient = useQueryClient();
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
  // query
  const {
    isLoading,
    data: { bookings, count } = {}, // destructuring the bookings an count and providing a fallback until the fetch is done.
    error,
  } = useQuery({
    queryKey: ["bookings", filterObject, sortBy, currentPage],
    queryFn: () => getBookings({ filter: filterObject, sortBy, currentPage }),
  });

  // Prefetch
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (currentPage < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterObject, sortBy, currentPage + 1],
      queryFn: () =>
        getBookings({
          filter: filterObject,
          sortBy,
          currentPage: currentPage + 1,
        }),
    });
  }
  if (currentPage > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterObject, sortBy, currentPage - 1],
      queryFn: () =>
        getBookings({
          filter: filterObject,
          sortBy,
          currentPage: currentPage - 1,
        }),
    });
  }
  return { isLoading, bookings, error, count };
}
