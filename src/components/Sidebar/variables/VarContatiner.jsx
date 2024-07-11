/* eslint-disable react/prop-types */
import { BiDotsVerticalRounded } from 'react-icons/bi';
import VarCard from './VarCard.jsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as varAPI from '../../../utils/api/aws/variableRoutes.js';
import { useState } from 'react';
import { checkLength } from '../../../utils/util/util.js';
import { isNotEmpty } from '../../../utils/util/authUtil.js';
import { toast } from 'react-toastify';
import { closeContextMenu } from '../../../store/contextMenuSlice';
import { useDispatch } from 'react-redux';

export default function VarContainer({
    variables,
    page,
    componentIsVariableAdd,
    handleContextMenu,
}) {
    const [newVariableName, setNewVariableName] = useState('');
    /**Http  request */
    const queryClient = useQueryClient();
    const { mutate: mutateAddVariable } = useMutation({
        mutationFn: ({ variableName, variableExp, pageId }) => {
            return varAPI.createVariable(pageId, variableName, variableExp);
        },
        onSuccess: () => {
            queryClient.invalidateQueries('getCertainProjects');
        },
    });
    /** Reducer and Basic functions*/
    const dispatch = useDispatch();
    const handleAddVariableKeyDown = (e) => {
        if (e.key === 'Enter') {
            const empty = isNotEmpty(newVariableName);
            const max = checkLength(newVariableName, 50);
            if (!empty) {
                toast.error('Variable name should not be empty.');
                return;
            } else if (!max) {
                toast.error('Variable name must be under 30 characters.');
                return;
            } else if (max && empty) {
                mutateAddVariable({
                    pageId: page.pageId,
                    variableExp: '',
                    variableName: newVariableName,
                });
                dispatch(closeContextMenu());
                setNewVariableName('');
            }
        } else if (e.key === 'Escape') {
            setNewVariableName('');
            dispatch(closeContextMenu());
        }
    };

    return (
        <div className="side-item--identifier">
            <span className="heading-quaternary">Variables</span>
            {componentIsVariableAdd && (
                <input
                    className="side-item__input__identifier input-basic"
                    onClick={(e) => e.stopPropagation()}
                    value={newVariableName}
                    onChange={(e) => setNewVariableName(e.target.value)}
                    onKeyDown={(e) => handleAddVariableKeyDown(e)}
                />
            )}
            {variables.length > 0 ? (
                <ul className="ul">
                    {variables.map((variable) => (
                        <li key={variable.variableId} className="li">
                            <VarCard variable={variable} page={page} />
                        </li>
                    ))}
                </ul>
            ) : (
                !componentIsVariableAdd && (
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
