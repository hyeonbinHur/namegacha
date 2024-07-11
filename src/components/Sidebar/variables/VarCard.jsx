/* eslint-disable react/prop-types */
import * as varAPI from '../../../utils/api/aws/variableRoutes.js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import * as contextUtil from '../../../utils/util/contextUtils.js';
import {
    openContextMenu,
    closeContextMenu,
} from '../../../store/contextMenuSlice.js';
import ContextMenu from '../../ContextMenu/ContextMenu.jsx';
import { checkLength } from '../../../utils/util/util.js';
import { isNotEmpty } from '../../../utils/util/authUtil.js';
import { toast } from 'react-toastify';
export default function VarCard({ variable, page }) {
    const [newVariableName, setNewVariableName] = useState(
        variable.variableName
    );
    const item = {
        ...variable,
        ...page,
    };
    /* redux variables */
    const sliceTarget = useSelector((state) => state.currentContextMenu.target);
    const sliceIsOpen = useSelector((state) => state.currentContextMenu.isOpen);
    const sliceIsEdit = useSelector((state) => state.currentContextMenu.isEdit);
    /*component variables */
    const componentIsThis = contextUtil.isContextVerity(
        sliceTarget,
        variable.variableName,
        variable.variableId
    );
    const componentIsContextOpen = contextUtil.isContextOpen(
        componentIsThis,
        sliceIsOpen
    );
    const componentIsEdit = contextUtil.checkIsRename(
        componentIsThis,
        sliceIsEdit
    );

    /**Http request */
    const queryClient = useQueryClient();
    const { mutate: mutateUpdateVariable } = useMutation({
        mutationFn: ({ variableName, variableExp, variableId }) => {
            return varAPI.updateVariable(variableId, variableName, variableExp);
        },
        onSuccess: () => {
            queryClient.invalidateQueries('getCertainProjects');
        },
    });

    /* Reducer & Basic functions */
    const dispatch = useDispatch();
    const handleContextMenuOpen = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(
            openContextMenu({
                x: e.clientX,
                y: e.clientY,
                name: variable.variableName,
                id: variable.variableId,
            })
        );
    };
    const handleKeyDownEditVariable = (e) => {
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
                mutateUpdateVariable({
                    variableName: newVariableName,
                    variabeExp: variable.variableExp,
                    variableId: variable.variableId,
                });
                dispatch(closeContextMenu());
            }
        } else if (e.key === 'Escape') {
            dispatch(closeContextMenu());
            setNewVariableName(variable.variableName);
        }
    };
    return (
        <div>
            <section onContextMenu={(e) => handleContextMenuOpen(e)}>
                {componentIsEdit ? (
                    <input
                        className="side-item__input__identifier input-basic"
                        value={newVariableName}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => setNewVariableName(e.target.value)}
                        onKeyDown={(e) => handleKeyDownEditVariable(e)}
                    />
                ) : (
                    <div className="side-item--identifier__name">
                        {variable.variableName}
                    </div>
                )}
            </section>

            <section>
                {componentIsContextOpen && (
                    <ContextMenu type={'variable'} item={item} />
                )}
            </section>
        </div>
    );
}
