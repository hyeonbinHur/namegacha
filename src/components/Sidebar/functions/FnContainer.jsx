/* eslint-disable react/prop-types */

// import * as fnAPI from '../../../utils/api/aws/functionRoutes';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import FunctionCard from './FunctionCard';
import * as functionAPI from '../../../utils/api/aws/functionRoutes.js';
import { checkLength } from '../../../utils/util/util.js';
import { isNotEmpty } from '../../../utils/util/authUtil.js';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { closeContextMenu } from '../../../store/contextMenuSlice';
import { useState } from 'react';
export default function FunctionContainer({
    functions,
    page,
    componentIsFunctionAdd,
    handleContextMenu,
}) {
    const [newFunctionName, setNewFunctionName] = useState('');
    /**Http requests */
    const queryClient = useQueryClient();
    const { mutate: mutateAddFunction } = useMutation({
        mutationFn: ({ pageId, functionName, functionExp }) => {
            return functionAPI.createFunction(
                pageId,
                functionName,
                functionExp
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries('getCertainProjects');
        },
    });
    /**Reducer functions */
    const dispatch = useDispatch();
    const handleAddFunctionKeyDown = (e) => {
        if (e.key === 'Enter') {
            const empty = isNotEmpty(newFunctionName);
            const max = checkLength(newFunctionName, 50);
            if (!empty) {
                toast.error('Function name should not be empty.');
                return;
            } else if (!max) {
                toast.error('Function name must be under 30 characters.');
                return;
            } else if (max && empty) {
                mutateAddFunction({
                    pageId: page.pageId,
                    functionExp: '',
                    functionName: newFunctionName,
                });
                dispatch(closeContextMenu());
            }
        } else if (e.key === 'Escape') {
            setNewFunctionName('');
            dispatch(closeContextMenu());
        }
    };

    return (
        <div className="side-item--identifier">
            <span className="heading-quaternary">Functions</span>
            {componentIsFunctionAdd && (
                <input
                    className="side-item__input__identifier input-basic"
                    value={newFunctionName}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => setNewFunctionName(e.target.value)}
                    onKeyDown={(e) => handleAddFunctionKeyDown(e)}
                />
            )}
            {functions.length > 0 ? (
                <ul className="ul">
                    {functions.map((fn) => (
                        <li key={fn.functionId} className="li">
                            <FunctionCard fnction={fn} page={page} />
                        </li>
                    ))}
                </ul>
            ) : (
                !componentIsFunctionAdd && (
                    <div
                        className="side-item--no-identifier"
                        onContextMenu={(e) => handleContextMenu(e)}
                    >
                        <BiDotsVerticalRounded />
                    </div>
                )
            )}
        </div>
    );
}
