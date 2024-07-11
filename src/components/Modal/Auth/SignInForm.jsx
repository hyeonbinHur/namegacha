/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useMutation } from '@tanstack/react-query';
import { signInUser } from '../../../utils/api/aws/authRoutes';
import { useState } from 'react';
import * as authUtil from '../../../utils/util/authUtil';
import { useAuthContext } from '../../../hooks/useAuth';
import Spinner from '../../../assets/svgs/loading.svg';
import { checkPendingStatus } from '../../../utils/util/util';
import { toast } from 'react-toastify';
export default function SignInForm({ close }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { dispatch } = useAuthContext();
    const [isIdWrong, setIsIdWrong] = useState(false);
    const [isPasswordWrong, setIsPasswordWrong] = useState(false);

    /**http request */

    const { mutate: mutateSigIn, status: isSignInStatus } = useMutation({
        mutationFn: async ({ userId, userPassword }) => {
            return await signInUser(userId, userPassword);
        },
        onSuccess: (responseData) => {
            console.log(responseData);
            if (responseData.status === 200) {
                dispatch({ type: 'SIGN-IN', payload: responseData.userObject });
                setIsIdWrong(false);
                setIsPasswordWrong(false);
                close();
            } else if (responseData.status === 404) {
                setIsIdWrong(true);
                setIsPasswordWrong(false);
            } else if (responseData.status === 401) {
                setIsIdWrong(false);
                setIsPasswordWrong(true);
            } else {
                toast.error('Unexpected error has been occured.');
            }
        },
    });

    /**basic functions */
    const isLoading = checkPendingStatus([isSignInStatus]);

    const componentSignIn = () => {
        if (authUtil.isNotEmpty(username) && authUtil.isNotEmpty(password)) {
            if (!emailIsValid && !passwordIsValid) {
                mutateSigIn({ userId: username, userPassword: password });
            } else {
                toast.error(
                    'Please check the requirements for each field and try again.'
                );
            }
        } else {
            toast.error(
                'Please complete all required fields before submitting.'
            );
        }
        console.log('sign in ');
    };

    const emailIsValid =
        authUtil.isNotEmpty(username) && !authUtil.checkIdValidation(username);
    const passwordIsValid =
        authUtil.isNotEmpty(password) &&
        !authUtil.checkPasswordValidation(password);

    return (
        <div>
            {isLoading ? (
                <img src={Spinner} className="sign-in-loading loading-sub" />
            ) : (
                <form className="sign-in-form">
                    <div className="item-horizontal-center">
                        <div className="auth-heading-container item-horizontal-center">
                            <h2 className="heading-secondary">
                                Sign In to Name Gacha
                            </h2>
                            <h3 className="heading-tertiary">
                                Let's join to generate name!
                            </h3>
                        </div>
                        {isIdWrong && <div>id wrong </div>}
                        {isPasswordWrong && <div>password wrong </div>}
                        <input
                            className="sign-in-form--input"
                            type="text"
                            name="username"
                            required
                            id="username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {emailIsValid ? (
                            <label className="sign-in-form--label label__invalid">
                                Username must be longer than 5 letters
                            </label>
                        ) : (
                            <label
                                className="sign-in-form--label label__valid"
                                htmlFor="username"
                            >
                                Username
                            </label>
                        )}
                        <input
                            className="sign-in-form--input"
                            type="password"
                            name="password"
                            required
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {passwordIsValid ? (
                            <label className="sign-in-form--label label__invalid">
                                Password must be longer than 7 letters
                            </label>
                        ) : (
                            <label
                                htmlFor="password"
                                className="sign-in-form--label label__valid"
                            >
                                Password
                            </label>
                        )}
                        <button
                            className="sign-in-form--btn__submit btn-round"
                            type="button"
                            onClick={() => componentSignIn()}
                            name="Submit"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
