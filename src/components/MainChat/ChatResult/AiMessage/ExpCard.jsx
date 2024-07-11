import { MdModeEditOutline } from 'react-icons/md';
import { BiCheck } from 'react-icons/bi';
import { BiX } from 'react-icons/bi';

import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editAiMessageExp } from '../../../../store/threadSlice';
import { clearIsEdit, setIsEdit } from '../../../../store/aiMessageEditSlice';
import * as aiUtil from '../../../../utils/util/contextUtils';
import { checkLength } from '../../../../utils/util/util';
import { isNotEmpty } from '../../../../utils/util/authUtil.js';
import { toast } from 'react-toastify';
/* eslint-disable react/prop-types */
export default function ExpCard({ exp, arrayIndex }) {
    const [newExp, setNewExp] = useState(exp);
    const expInputRef = useRef(null);

    useEffect(() => {
        if (expInputRef.current) {
            expInputRef.current.style.height = 'auto';
            expInputRef.current.style.height = `${expInputRef.current.scrollHeight}px`;
        }
    }, [newExp]);
    /**slice variables */
    const sliceTarget = useSelector((state) => state.aiMessageEditSlice.target);
    const sliceIsEdit = useSelector((state) => state.aiMessageEditSlice.isEdit);
    /**component variables */
    const componentTarget = {
        type: 'exp',
        arrayIndex: arrayIndex,
        nameIndex: null,
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
    const dispatch = useDispatch();
    const startEditExpInSlice = () => {
        const empty = isNotEmpty(newExp);
        const max = checkLength(newExp, 50);
        if (!empty) {
            toast.error('Definition should not be empty.');
            return;
        } else if (!max) {
            toast.error('Definition must be under 300 characters.');
            return;
        } else if (max && empty) {
            dispatch(
                editAiMessageExp({ arrayIndex: arrayIndex, newExp: newExp })
            );
            dispatch(clearIsEdit());
        }
    };
    const startEditExpInComponent = () => {
        dispatch(setIsEdit({ target: componentTarget }));
    };
    const cancelEditExp = () => {
        setNewExp(exp);
        dispatch(clearIsEdit());
    };
    return (
        <div>
            {componentIsEdit ? (
                <div className="message--ai__exp-content">
                    <textarea
                        value={newExp}
                        className="ai-exp--content__input input-basic"
                        onChange={(e) => setNewExp(e.target.value)}
                        ref={expInputRef}
                    />
                    <div>
                        <BiCheck
                            onClick={() => startEditExpInSlice()}
                            className="ai-exp--icon__check"
                        />
                        <BiX
                            onClick={() => cancelEditExp()}
                            className="ai-exp--icon__x"
                        />
                    </div>
                </div>
            ) : (
                <div className="message--ai__exp-content">
                    <span className="ai-exp--exp">{newExp}</span>

                    <MdModeEditOutline
                        onClick={() => startEditExpInComponent()}
                        className="ai-exp--icon__edit"
                    />
                </div>
            )}
        </div>
    );
}
