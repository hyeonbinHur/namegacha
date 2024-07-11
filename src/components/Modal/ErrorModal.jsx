import { BiMessageAltError } from 'react-icons/bi';
/* eslint-disable react/prop-types */
import { forwardRef, useImperativeHandle } from 'react';
import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearError } from '../../store/errorSlice';
import { createPortal } from 'react-dom';
import { CgClose } from 'react-icons/cg';

const ErrorModal = forwardRef(function ErrorModal(props, ref) {
    const modal = useRef(null);
    const sliceErrorCode = useSelector((state) => state.errorSlice.errorCode);
    const sliceErrorMessage = useSelector(
        (state) => state.errorSlice.errorMessage
    );
    const dispatch = useDispatch();
    useImperativeHandle(ref, () => {
        return {
            open: () => {
                modal.current.showModal();
            },
            close: () => {
                dispatch(clearError());
                modal.current.close();
            },
        };
    });

    return createPortal(
        <div>
            <dialog ref={modal} className="modal error-modal">
                <div className="close-box">
                    <CgClose
                        className="close-box--close"
                        onClick={() => ref.current.close()}
                    />
                </div>
                <BiMessageAltError className="error-modal--icon" />
                <div className="error-modal--code">{sliceErrorCode}</div>
                <div className="error-modal--message">{sliceErrorMessage}</div>
                <div className="error-modal--paragraph">
                    Uh oh, an unexpected error has occurred. Please refresh the
                    page and try again!
                </div>
                <button
                    className="error-modal--button"
                    onClick={() => ref.current.close()}
                >
                    Dismiss
                </button>
            </dialog>
        </div>,
        document.getElementById('modal')
    );
});

export default ErrorModal;
