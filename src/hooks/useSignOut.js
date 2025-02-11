import { useAuthContext } from './useAuthContext';
import { signOutUser } from "../utils/api/axios/authApi";
import { useMutation } from '@tanstack/react-query';

export const useSignOut = () => {
  const { dispatch } = useAuthContext();

  const {
    mutate: mutateSignOutUser,
    isSuccess,
    isLoading,
  } = useMutation({
    mutationFn: () => {
      return signOutUser();
    },
    onSuccess: () => {
      dispatch({ type: "SIGN-OUT" });
    },
  });

  return { mutateSignOutUser, isSuccess, isLoading };
};
