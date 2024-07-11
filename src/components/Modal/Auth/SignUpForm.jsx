/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useMutation } from '@tanstack/react-query';
import { signUpUser } from '../../../utils/api/aws/authRoutes';
import { useState } from 'react';
import * as authUtil from '../../../utils/util/authUtil';
import { toast } from 'react-toastify';
import { checkPendingStatus } from '../../../utils/util/util';
import Spinner from '../../../assets/svgs/loading.svg';

export default function SignUpForm({ toSignIn }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [isConflict, setIsConflict] = useState(false);

    /**http request */
    const { mutate: mutateSignUp, status: isSignUpStatus } = useMutation({
        mutationFn: ({ userId, userPassword }) => {
            return signUpUser(userId, userPassword);
        },
        onSuccess: (response) => {
            console.log(response);
            if (response.status === 409) {
                setIsConflict(true);
            } else if (response.status === 200) {
                setIsConflict(false);
                toSignIn();
            } else {
                setIsConflict(false);
                toast.error('Unexpected error has been occured.');
            }
        },
    });
    /**basic functions */

    const isLoading = checkPendingStatus([isSignUpStatus]);

    const componentSignUp = () => {
        if (
            authUtil.isNotEmpty(username) &&
            authUtil.isNotEmpty(password) &&
            authUtil.isNotEmpty(passwordCheck)
        ) {
            if (!emailIsValid && !passwordIsValid && !passCheckIsValid) {
                mutateSignUp({ userId: username, userPassword: password });
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
    };

    const emailIsValid =
        authUtil.isNotEmpty(username) && !authUtil.checkIdValidation(username);

    const passwordIsValid =
        authUtil.isNotEmpty(password) &&
        !authUtil.checkPasswordValidation(password);

    const passCheckIsValid =
        authUtil.isNotEmpty(passwordCheck) &&
        !authUtil.checkIsPasswordMatch(password, passwordCheck);

    return (
        <div>
            {isLoading ? (
                <img src={Spinner} className="sign-in-loading loading-sub" />
            ) : (
                <form className="sign-in-form">
                    <div className="item-horizontal-center">
                        <div className="auth-heading-container item-horizontal-center">
                            <h2 className="heading-secondary">
                                Sign Up to Name Gacha
                            </h2>

                            <h3 className="heading-tertiary">
                                Let's join to generate name!
                            </h3>
                        </div>
                        <input
                            className="sign-in-form--input"
                            type="text"
                            id="username"
                            name="username"
                            required
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {emailIsValid ? (
                            <label className="sign-in-form--label label__invalid ">
                                username must be longer than 5 letters
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
                            id="password"
                            name="password"
                            required
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {passwordIsValid ? (
                            <label className="sign-in-form--label label__invalid">
                                Password must be longer than 7 letters
                            </label>
                        ) : (
                            <label className="sign-in-form--label label__valid">
                                Password
                            </label>
                        )}
                        <input
                            className="sign-in-form--input"
                            type="password"
                            id="passwordCheck"
                            name="passwordCheck"
                            required
                            placeholder="Check your password"
                            value={passwordCheck}
                            onChange={(e) => setPasswordCheck(e.target.value)}
                        />
                        {passCheckIsValid ? (
                            <label className="sign-in-form--label label__invalid">
                                Passwords are not match!
                            </label>
                        ) : (
                            <label className="sign-in-form--label label__valid">
                                Password Check
                            </label>
                        )}
                        {isConflict && (
                            <div className="sign-in-form--conflict">
                                user id conflict
                            </div>
                        )}
                        <button
                            className="sign-in-form--btn__submit btn-round"
                            onClick={() => componentSignUp()}
                            type="button"
                        >
                            Sign up
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
