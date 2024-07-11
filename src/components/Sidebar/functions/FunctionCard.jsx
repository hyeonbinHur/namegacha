/* eslint-disable react/prop-types */

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    openContextMenu,
    closeContextMenu,
} from '../../../store/contextMenuSlice';
import * as contextUtils from '../../../utils/util/contextUtils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as functionAPI from '../../../utils/api/aws/functionRoutes';
import ContextMenu from '../../ContextMenu/ContextMenu';
import { checkLength } from '../../../utils/util/util.js';
import { isNotEmpty } from '../../../utils/util/authUtil.js';
import { toast } from 'react-toastify';

export default function FunctionCard({ fnction, page }) {
    const [newFunctionName, setNewFunctionName] = useState(
        fnction.functionName
    );
    const item = {
        ...fnction,
        ...page,
    };
    /* redux variable*/
    const sliceTarget = useSelector((state) => state.currentContextMenu.target);
    const sliceIsOpen = useSelector((state) => state.currentContextMenu.isOpen);
    const sliceIsEdit = useSelector((state) => state.currentContextMenu.isEdit);
    /* component variable */
    const componentIsThis = contextUtils.isContextVerity(
        sliceTarget,
        fnction.functionName,
        fnction.functionId
    );
    const componentIsContextOpen = contextUtils.isContextOpen(
        componentIsThis,
        sliceIsOpen
    );
    const componentIsEdit = contextUtils.checkIsRename(
        componentIsThis,
        sliceIsEdit
    );

    /** HTTP request */
    const queryClient = useQueryClient();
    const { mutate: mutateUpdateFunction } = useMutation({
        mutationFn: ({ functionName, functionId, functionExp }) => {
            return functionAPI.updateFunction(
                functionId,
                functionName,
                functionExp
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries('getCertainProjects');
        },
    });

    /* Reducer & Basic functions*/
    const dispatch = useDispatch();
    const handleOpenContextMenu = (e) => {
        dispatch(
            openContextMenu({
                x: e.clientX,
                y: e.clientY,
                name: fnction.functionName,
                id: fnction.functionId,
            })
        );
        e.stopPropagation();
        e.preventDefault();
    };
    const handleKeyDownEditName = (e) => {
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
                mutateUpdateFunction({
                    functionId: fnction.functionId,
                    functionExp: '',
                    functionName: newFunctionName,
                });
                dispatch(closeContextMenu());
            }
        } else if (e.key === 'Escape') {
            dispatch(closeContextMenu());
            setNewFunctionName(fnction.functionName);
        }
    };

    return (
        <div>
            <section onContextMenu={(e) => handleOpenContextMenu(e)}>
                {componentIsEdit ? (
                    <input
                        className="side-item__input__identifier input-basic"
                        onClick={(e) => e.stopPropagation()}
                        value={newFunctionName}
                        onKeyDown={(e) => handleKeyDownEditName(e)}
                        onChange={(e) => setNewFunctionName(e.target.value)}
                    />
                ) : (
                    <div className="side-item--identifier__name">
                        {fnction.functionName}
                    </div>
                )}
            </section>
            <section>
                {componentIsContextOpen && (
                    <ContextMenu type={'function'} item={item} />
                )}
            </section>
        </div>
    );
}
