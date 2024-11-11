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
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings", filterObject],
    queryFn: () => getBookings({ filter: filterObject }),
  });
  return { isLoading, bookings, error };
}
