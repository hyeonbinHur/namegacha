import { useAuthContext } from './useAuthContext';
import { signInUser } from '../utils/api/aws/authRoutes';
import { useMutation } from '@tanstack/react-query';

export const useSignIn = () => {
    const { dispatch } = useAuthContext();

    const {
        mutate: mutateSignInUser,
        isSuccess,
        isLoading,
    } = useMutation({
        mutationFn: ({ username, password }) => {
            return signInUser(username, password);
        },
        onSuccess: (responseData) => {
            dispatch({ type: 'SIGN-IN', payload: responseData });
        },
    });

    return { mutateSignInUser, isSuccess, isLoading };
};
