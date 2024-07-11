import ChatBox from './ChatBox/ChatBox';
import ChatResult from './ChatResult/ChatResult';
import IdentifierModal from '../Modal/IdentifierModal';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuthContext } from '../../hooks/useAuthContext';
import { chageGlobalThreadType } from '../../store/threadSlice';
import AuthModal from '../Modal/Auth/AuthModal.jsx';

export default function MainChat() {
    const [selectedOption, setSelectedOption] = useState('variable');
    const identifierModal = useRef(null);
    const authModal = useRef(null);

    const { user } = useAuthContext();
    const dispatch = useDispatch();
    const sliceIdentifierIsOpen = useSelector(
        (state) => state.identifierModalSlice.isOpen
    );

    useEffect(() => {
        if (sliceIdentifierIsOpen) {
            if (user) {
                identifierModal.current.open();
            } else {
                authModal.current.open();
                identifierModal.current.close();
            }
        } else {
            identifierModal.current.close();
        }
    }, [sliceIdentifierIsOpen, user]);

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedOption(value);
        if (value === 'variable') {
            dispatch(chageGlobalThreadType({ globaltype: 'variable' }));
        } else if (value === 'function') {
            dispatch(chageGlobalThreadType({ globaltype: 'function' }));
        }
    };

    return (
        <div className="chat">
            <div className="chat--header">
                <input
                    type="radio"
                    id="variable"
                    name="global-thread"
                    value="variable"
                    checked={selectedOption === 'variable'}
                    onChange={handleChange}
                    className="btn-radio chat--header__radio-variable__btn"
                />
                <label
                    htmlFor="variable"
                    className="chat--header__radio-variable__label"
                >
                    Variable
                </label>
                <input
                    type="radio"
                    id="function"
                    name="global-thread"
                    value="function"
                    checked={selectedOption === 'function'}
                    onChange={handleChange}
                    className="btn-radio chat--header__radio-function__btn"
                />
                <label
                    htmlFor="function"
                    className="chat--header__radio-function__label"
                >
                    Function
                </label>
            </div>

            <div className="chat--result">
                <ChatResult />
            </div>

            <div className="chat--box">
                <ChatBox />
            </div>
            <IdentifierModal ref={identifierModal} user={user} />
            <AuthModal ref={authModal} />
        </div>
    );
}
