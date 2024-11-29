import { useMutation } from "@tanstack/react-query";
import { signup as signupAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupAPI,
    onSuccess: (newUser) => {
      toast.success(
        "Account successfully created! Please verify the the account"
      );
    },
  });
  return { signup, isLoading };
}
