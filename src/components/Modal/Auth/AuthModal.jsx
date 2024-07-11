import { CgClose } from 'react-icons/cg';
import { forwardRef, useRef, useImperativeHandle, useState } from 'react';
import { createPortal } from 'react-dom';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import blackLogo from '../../../assets/logo/black-logo.png';
const AuthModal = forwardRef(function AuthModal(props, ref) {
    const modal = useRef(null);
    const [isSignIn, setIsSignIn] = useState(true);

    useImperativeHandle(ref, () => {
        return {
            open: () => {
                modal.current.showModal();
            },
            close: () => {
                modal.current.close();
            },
        };
    });
    /* need to implemente cancel sign in & sign up action */
    const toggleForm = () => {
        setIsSignIn((prev) => !prev);
    };

    return createPortal(
        <div>
            <dialog ref={modal} className="modal auth-modal">
                <div className="close-box item-between">
                    <img src={blackLogo} className="close-box--logo" />
                    <CgClose
                        className="close-box--close"
                        onClick={() => ref.current.close()}
                    />
                </div>

                <section className="auth-section">
                    {isSignIn ? (
                        <SignInForm
                            close={() => ref.current && ref.current.close()}
                        />
                    ) : (
                        <SignUpForm toSignIn={toggleForm} />
                    )}
                </section>

                <section className="auth-section-sub">
                    {isSignIn ? (
                        <div className="auth-section-sub--content">
                            <h3 className="heading-secondary auth-section-sub--content__heading">
                                Hi, There!
                            </h3>

                            <p className="auth-section-sub--content__content">
                                Creaate your Id and generate your name!
                            </p>
                            <button
                                className="auth-section-sub--content__btn btn-round"
                                onClick={() => setIsSignIn(false)}
                            >
                                Sign up
                            </button>
                        </div>
                    ) : (
                        <div className="auth-section-sub--content">
                            <h3 className="heading-tertiary auth-section-sub--content__heading">
                                Welcome! Sign in and join
                            </h3>
                            <p className="auth-section-sub--content__content">
                                Enter your details and join to Name Gacha!
                            </p>
                            <button
                                className="auth-section-sub--content__btn btn-round"
                                onClick={() => setIsSignIn(true)}
                            >
                                Sign In
                            </button>
                        </div>
                    )}
                </section>
            </dialog>
        </div>,
        document.getElementById('modal')
    );
});

export default AuthModal;
