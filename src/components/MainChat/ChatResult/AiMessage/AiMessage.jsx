/* eslint-disable react/prop-types */
import ExpCard from './ExpCard';
import NameCard from './NameCard';
import { useDispatch } from 'react-redux';
import { openIdentifierModal } from '../../../../store/identifiyerModal';

export default function AiMessage({ message, arrayIndex }) {
    const name = message.Names;
    const exp = message.Exp;
    const dispatch = useDispatch();
    const selectNewItem = (name) => {
        dispatch(openIdentifierModal({ name: name, exp: exp }));
    };
    return (
        <div className="message--ai">
            <NameCard
                names={name}
                selectNewItem={selectNewItem}
                arrayIndex={arrayIndex}
            />
            <div className="message--ai__exp-container">
                <ExpCard exp={exp} arrayIndex={arrayIndex} />
            </div>
        </div>
    );
}
