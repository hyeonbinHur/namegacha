import { GrAdd } from 'react-icons/gr';
import { BiX } from 'react-icons/bi';
import { BiCheck } from 'react-icons/bi';
import { MdModeEditOutline } from 'react-icons/md';
import { RiDeleteBin5Fill } from 'react-icons/ri';

/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as detailUtil from '../../../utils/util/contextUtils';
import * as detailReducers from '../../../store/detailPageSlice';
import Spinner from '../../../assets/svgs/loading.svg';

export default function DetailForm({
    componentTarget, // id, exp, type, name
    type, // Add or Edit
    apiAction, // update, add api  function
    startAction, // start edit or start add
    deleteAction, // if type is Edit, delete function is required
    from,
    isLoading,
}) {
    const [newName, setNewName] = useState('');
    const [newExp, setNewExp] = useState('');
    const nameInputRef = useRef(null);
    const expInputRef = useRef(null);

    /**redux variable */
    const sliceTarget = useSelector((state) => state.detailPageSlice.target);
    const sliceFlag = useSelector(
        (state) => state.detailPageSlice[`is${type}`]
    );

    const componentIsTargetMatch = detailUtil.isDetailVerify(
        sliceTarget,
        componentTarget
    );

    const componentFlag = detailUtil[`checkIs${type}`](
        componentIsTargetMatch,
        sliceFlag
    );

    useEffect(() => {
        if (expInputRef.current) {
            const scrollHeight = expInputRef.current.scrollHeight;
            expInputRef.current.style.height = 'auto';
            expInputRef.current.style.minHeight = '6rem';
            expInputRef.current.style.height = `${scrollHeight}px`;
        }
    }, [newExp, componentTarget.exp, componentFlag]);

    useEffect(() => {
        if (type === 'Edit') {
            setNewName(componentTarget.name);
            setNewExp(componentTarget.exp);
        }
    }, [componentTarget, type]);

    /**Reducers */
    const dispatch = useDispatch();
    const cancelActions = () => {
        if (type === 'Edit') {
            setNewName(componentTarget.name);
            setNewExp(componentTarget.exp);
        } else {
            setNewName('');
            setNewExp('');
        }
        dispatch(detailReducers.setClear());
    };
    const handleKeyDown = (e) => {
        const input = e.target;
        if (input.name === 'name') {
            if (e.key === 'Escape') {
                cancelActions();
            } else if (e.key === 'Enter') {
                expInputRef.current.focus();
            } else if (e.key === 'Tab') {
                e.preventDefault();
                expInputRef.current.focus();
            }
        } else {
            if (e.key === 'Escape') {
                cancelActions();
            } else if (e.key === 'Enter') {
                apiAction();
            } else if (e.key === 'Tab') {
                e.preventDefault();
                nameInputRef.current.focus();
            }
        }
    };

    const startButtonAction = () => {
        apiAction(newName, newExp);
        cancelActions();
    };
    return (
        <div className={`detail-${from}`}>
            {componentFlag ? (
                <div className={`detail-${from}--edit`}>
                    <input
                        className={`detail-${from}--edit__name input-basic`}
                        type="text"
                        name="name"
                        value={newName}
                        ref={nameInputRef}
                        onChange={(e) => setNewName(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e)}
                    />
                    <textarea
                        className={`detail-${from}--edit__exp input-basic`}
                        type="text"
                        name="exp"
                        value={newExp}
                        ref={expInputRef}
                        onChange={(e) => setNewExp(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e)}
                    />
                    <div className={`detail-${from}--basic__features__edit`}>
                        <button
                            onClick={() => startButtonAction()}
                            className={`detail-${from}--basic__edit`}
                        >
                            <BiCheck
                                className={`detail-${from}--basic__icon`}
                            />
                            Save
                        </button>
                        <button
                            onClick={() => cancelActions()}
                            className={`detail-${from}--basic__del`}
                        >
                            <BiX className={`detail-${from}--basic__icon__x`} />
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div className={`detail-${from}--basic`}>
                    {type === 'Edit' ? (
                        <div className={`detail-${from}--basic__container`}>
                            <div className={`detail-${from}--basic__name`}>
                                {componentTarget.name}
                                <div>{isLoading}</div>
                            </div>
                            <div className={`detail-${from}--basic__exp`}>
                                {componentTarget.exp}
                            </div>
                            {isLoading ? (
                                <div
                                    className={`detail-${from}--basic__features`}
                                >
                                    <img
                                        src={Spinner}
                                        alt="loading spinner"
                                        className={`detail-${from}--loading`}
                                    />
                                </div>
                            ) : (
                                <div
                                    className={`detail-${from}--basic__features`}
                                >
                                    <button
                                        onClick={() => startAction()}
                                        className={`detail-${from}--basic__edit`}
                                    >
                                        <MdModeEditOutline
                                            className={`detail-${from}--basic__icon`}
                                        />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() =>
                                            deleteAction(componentTarget.id)
                                        }
                                        className={`detail-${from}--basic__del`}
                                    >
                                        <RiDeleteBin5Fill
                                            className={`detail-${from}--basic__icon`}
                                        />
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : isLoading ? (
                        <img
                            src={Spinner}
                            alt="loading spinner"
                            className={`detail-idf--container__loading`}
                        />
                    ) : (
                        <button
                            onClick={() => startAction()}
                            className={`detail-${from}--insert`}
                        >
                            <GrAdd className={`detail-${from}--insert__icon`} />{' '}
                            Insert
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

// component target
