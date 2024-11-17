import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/contstants";

export function useCabins() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));
  const {
    isLoading,
    data: { cabins, count } = {},
    error,
  } = useQuery({
    queryKey: ["cabins", currentPage],
    queryFn: () => getCabins(currentPage),
  });

  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (currentPage < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["cabins", currentPage + 1],
      queryFn: () => getCabins(currentPage + 1),
    });
  }
  if (currentPage > 1) {
    queryClient.prefetchQuery({
      queryKey: ["cabins", currentPage - 1],
      queryFn: () => getCabins(currentPage - 1),
    });
  }
  return { isLoading, cabins, error, count };
}
