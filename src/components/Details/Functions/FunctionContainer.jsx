/* eslint-disable react/prop-types */
import FunctionCard from './FunctionCard';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFunction } from '../../../utils/api/aws/functionRoutes';
import { useDispatch } from 'react-redux';
import * as detailReducers from '../../../store/detailPageSlice';
import DetailForm from '../Common/DetailForm';
import { checkPendingStatus } from '../../../utils/util/util';
import { checkLength } from '../../../utils/util/util';
import { isNotEmpty } from '../../../utils/util/authUtil';
import { toast } from 'react-toastify';

export default function FunctionContainer({ functions, pageId }) {
    const componentTarget = {
        type: 'functionContainer',
        id: 'functionContainerId',
        name: 'functionContainerName',
        exp: '',
    };
    /**Http request */
    const queryClient = useQueryClient();
    const { mutate: mutateAddFunction, status: isAddFunctionStatus } =
        useMutation({
            mutationFn: ({ functionName, functionExp, pageId }) => {
                return createFunction(pageId, functionName, functionExp);
            },
            onSuccess: () => {
                queryClient.invalidateQueries('getCertainProjects');
            },
        });

    /**basic functions */
    const addNewFunction = (newName, newExp) => {
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
            mutateAddFunction({
                functionName: newName,
                pageId: pageId,
                functionExp: newExp,
            });
        }
    };
    const dispatch = useDispatch();
    const startAdd = () => {
        dispatch(detailReducers.setClear());
        dispatch(detailReducers.setIsAdd({ target: componentTarget }));
    };
    const isLoading = checkPendingStatus([isAddFunctionStatus]);

    return (
        <div className="detail-idf--main">
            <header className="detail-idf--header">
                <DetailForm
                    componentTarget={componentTarget}
                    type={'Add'}
                    apiAction={addNewFunction}
                    startAction={startAdd}
                    from="idf"
                    isLoading={isLoading}
                />
            </header>

            <ul className="item-ul detail-idf--content">
                {functions.map((f) => (
                    <li key={f.functionId} className="item-li">
                        <FunctionCard fn={f} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
