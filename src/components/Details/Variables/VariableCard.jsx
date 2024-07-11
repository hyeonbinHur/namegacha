import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as variableAPI from '../../../utils/api/aws/variableRoutes';
import { useDispatch } from 'react-redux';
import * as detailReducers from '../../../store/detailPageSlice';
import DetailForm from '../Common/DetailForm';
import { checkPendingStatus } from '../../../utils/util/util';

import { checkLength } from '../../../utils/util/util';
import { isNotEmpty } from '../../../utils/util/authUtil';
import { toast } from 'react-toastify';

/* eslint-disable react/prop-types */
export default function VariableCard({ variable }) {
    const componentTarget = {
        type: 'variable',
        name: variable.variableName,
        id: variable.variableId,
        exp: variable.variableExp,
    };
    /**Http request */
    const queryClient = useQueryClient();
    const { mutate: mutateUpdateVariable, status: isUpdateVariableStatus } =
        useMutation({
            mutationFn: ({ variableId, variableName, variableExp }) => {
                return variableAPI.updateVariable(
                    variableId,
                    variableName,
                    variableExp
                );
            },
            onSuccess: () => {
                queryClient.invalidateQueries('getCertainProjects');
            },
        });

    const { mutate: mutateDeleteVariable, status: isDeleteVariableStatus } =
        useMutation({
            mutationFn: ({ variableId }) => {
                return variableAPI.deleteVariable(variableId);
            },
            onSuccess: () => {
                queryClient.invalidateQueries('getCertainProjects');
            },
        });

    /**Reducer & Basic functions */
    const editVariable = (newName, newExp) => {
        const emptyName = isNotEmpty(newName);
        const maxName = checkLength(newName, 50);
        const emptyExp = isNotEmpty(newExp);
        const maxExp = checkLength(newExp, 300);

        if (!emptyName) {
            toast.error('Variable name should not be empty.');
            return;
        } else if (!maxName) {
            toast.error('Variable name must be under 30 characters.');
            return;
        } else if (!emptyExp) {
            toast.error('Variable definition hould not be empty.');
            return;
        } else if (!maxExp) {
            toast.error('Variable definition must be under 300 characters.');
            return;
        } else if (emptyName && maxName && emptyExp && maxExp) {
            mutateUpdateVariable({
                variableId: variable.variableId,
                variableName: newName,
                variableExp: newExp,
            });
        }
    };
    const deleteVariable = (itemId) => {
        mutateDeleteVariable({ variableId: itemId });
    };
    const dispatch = useDispatch();
    const startEdit = () => {
        dispatch(detailReducers.setClear());
        dispatch(detailReducers.setIsEdit({ target: componentTarget }));
    };

    const isLoading = checkPendingStatus([
        isUpdateVariableStatus,
        isDeleteVariableStatus,
    ]);

    return (
        <DetailForm
            componentTarget={componentTarget}
            type={'Edit'}
            apiAction={editVariable}
            startAction={startEdit}
            deleteAction={deleteVariable}
            from="idf"
            isLoading={isLoading}
        />
    );
}
