import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      toast.success("User successfully edited");
      queryClient.invalidateQueries({ queryKey: ["user"] }); // invalidate the cabins state
      // re-fetch it and then re-render to Cabin component
    },
    onError: (error) => toast.error(error.message),
  });
  return { updateUser, isUpdating };
}
