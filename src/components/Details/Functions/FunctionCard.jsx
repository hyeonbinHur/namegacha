/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as functionAPI from '../../../utils/api/aws/functionRoutes';
import { useDispatch } from 'react-redux';
import * as detailReducers from '../../../store/detailPageSlice';
import DetailForm from '../Common/DetailForm';
import { checkPendingStatus } from '../../../utils/util/util';

import { checkLength } from '../../../utils/util/util';
import { isNotEmpty } from '../../../utils/util/authUtil';
import { toast } from 'react-toastify';

export default function FunctionCard({ fn }) {
    const componentTarget = {
        type: 'function',
        name: fn.functionName,
        id: fn.functionId,
        exp: fn.functionExp,
    };

    /**Http request */
    const queryClient = useQueryClient();
    const { mutate: mutateUpdateFunction, status: isUpdateFunctionStatus } =
        useMutation({
            mutationFn: ({ functionId, functionName, functionExp }) => {
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
    const { mutate: mutateDeleteFunction, status: isDeleteFunctionStatus } =
        useMutation({
            mutationFn: ({ functionId }) => {
                return functionAPI.deleteFunction(functionId);
            },
            onSuccess: () => {
                queryClient.invalidateQueries('getCertainProjects');
            },
        });

    /**Reducer & Basic function */
    const dispatch = useDispatch();
    const editFunction = (newName, newExp) => {
        const emptyName = isNotEmpty(newName);
        const maxName = checkLength(newName, 50);
        const emptyExp = isNotEmpty(newExp);
        const maxExp = checkLength(newExp, 300);

        if (!emptyName) {
            toast.error('Function name should not be empty.');
            return;
        } else if (!maxName) {
            toast.error('Function name must be under 30 characters.');
            return;
        } else if (!emptyExp) {
            toast.error('Function definition hould not be empty.');
            return;
        } else if (!maxExp) {
            toast.error('Function definition must be under 300 characters.');
            return;
        } else if (emptyName && maxName && emptyExp && maxExp) {
            mutateUpdateFunction({
                functionId: fn.functionId,
                functionName: newName,
                functionExp: newExp,
            });
        }
    };
    const deleteFunction = (itemId) => {
        mutateDeleteFunction({ functionId: itemId });
    };

    const startEdit = () => {
        dispatch(detailReducers.setClear());
        dispatch(detailReducers.setIsEdit({ target: componentTarget }));
    };
    const isLoading = checkPendingStatus([
        isUpdateFunctionStatus,
        isDeleteFunctionStatus,
    ]);

    return (
        <DetailForm
            componentTarget={componentTarget}
            type={'Edit'}
            apiAction={editFunction}
            startAction={startEdit}
            deleteAction={deleteFunction}
            from="idf"
            isLoading={isLoading}
        />
    );
}
