/* eslint-disable react/prop-types */
import { GrAdd } from 'react-icons/gr';
import { MdModeEditOutline } from 'react-icons/md';
import { BiCheck } from 'react-icons/bi';
import { BiX } from 'react-icons/bi';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editAiMessageName } from '../../../../store/threadSlice';
import * as aiUtil from '../../../../utils/util/contextUtils';
import { clearIsEdit, setIsEdit } from '../../../../store/aiMessageEditSlice';

import { checkLength } from '../../../../utils/util/util';
import { isNotEmpty } from '../../../../utils/util/authUtil.js';
import { toast } from 'react-toastify';

export default function NameCard({ names, selectNewItem, arrayIndex }) {
    return (
        <div className="message--ai__name-container">
            <ul className="message--ai__name__ul">
                {names.map((name, index) => (
                    <li className="message--ai__name__li" key={index}>
                        <NameCardUnit
                            name={name}
                            selectNewItem={selectNewItem}
                            nameIndex={index}
                            arrayIndex={arrayIndex}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

const NameCardUnit = ({ name, selectNewItem, arrayIndex, nameIndex }) => {
    const [newName, setNewName] = useState(name);
    const dispatch = useDispatch();
    /**redux variable */
    const sliceTarget = useSelector((state) => state.aiMessageEditSlice.target);
    const sliceIsEdit = useSelector((state) => state.aiMessageEditSlice.isEdit);
    /**component variable */
    const componentTarget = {
        type: 'name',
        arrayIndex: arrayIndex,
        nameIndex: nameIndex,
    };

    const componentIsTargetMatch = aiUtil.isAiMessageVerify(
        sliceTarget,
        componentTarget
    );

    const componentIsEdit = aiUtil.checkIsEdit(
        componentIsTargetMatch,
        sliceIsEdit
    );
    /**Reducer & Basic functions */
    const startEditNameInSlice = () => {
        const empty = isNotEmpty(newName);
        const max = checkLength(newName, 50);
        if (!empty) {
            toast.error('Name should not be empty.');
            return;
        } else if (!max) {
            toast.error('Name must be under 300 characters.');
            return;
        } else if (max && empty) {
            dispatch(
                editAiMessageName({
                    arrayIndex: arrayIndex,
                    nameIndex: nameIndex,
                    newName: newName,
                })
            );
            dispatch(clearIsEdit());
        }
    };
    const startEditInComponent = () => {
        dispatch(setIsEdit({ target: componentTarget }));
    };
    const cancelEditName = () => {
        setNewName(name);
        dispatch(clearIsEdit());
    };
    return (
        <div>
            {componentIsEdit ? (
                <div className="ai-name">
                    <div className="ai-name--header">
                        <BiCheck
                            onClick={() => startEditNameInSlice()}
                            className="ai-name--icon__check"
                        />
                        <BiX
                            onClick={() => cancelEditName()}
                            className="ai-name--icon__x"
                        />
                    </div>
                    <div className="ai-name--content">
                        <input
                            className="ai-name--content__input input-basic"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                        />
                    </div>
                </div>
            ) : (
                <div className="ai-name">
                    <div className="ai-name--header">
                        <GrAdd
                            onClick={() => selectNewItem(newName)}
                            className="ai-name--icon__add"
                        />
                        <MdModeEditOutline
                            onClick={() => startEditInComponent()}
                            className="ai-name--icon__edit"
                        />
                    </div>
                    <div className="ai-name--content">
                        <span className="ai-name--content__basic">
                            {newName}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};
