/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as pageAPI from '../../../utils/api/aws/pageRoutes';
import { deleteVariablesInPage } from '../../../utils/api/aws/variableRoutes';
import { deleteFunctionsInPage } from '../../../utils/api/aws/functionRoutes';
import * as detailReducers from '../../../store/detailPageSlice';
import { useDispatch } from 'react-redux';
import DetailForm from '../Common/DetailForm';
import { checkPendingStatus } from '../../../utils/util/util';
import { checkLength } from '../../../utils/util/util';
import { isNotEmpty } from '../../../utils/util/authUtil';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function DetailTest({ page }) {
    /**component variable */
    const componentTarget = {
        type: 'page',
        name: page.pageName,
        id: page.pageId,
        exp: page.pageExp,
    };
    /** http request */
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate: mutateUpdatePage, status: isUpdatePageStatus } =
        useMutation({
            mutationFn: ({ pageName, pageExp, pageId }) => {
                console.log('Updating page...');
                return pageAPI.updatePage(pageId, pageName, pageExp);
            },
            onSuccess: () => {
                queryClient.invalidateQueries('getCertainProjects');
            },
        });

    const { mutate: mutateDeletePage, status: isDeletePageStatus } =
        useMutation({
            mutationFn: ({ pageId }) => pageAPI.deletePage(pageId),
            onSuccess: () => {
                queryClient.invalidateQueries('getCertainProjects');
                navigate('/');
            },
        });

    const {
        mutateAsync: mutateDeleteVariable,
        status: isDeleteVariableStatus,
    } = useMutation({
        mutationFn: ({ pageId }) => deleteVariablesInPage(pageId),
    });
    const {
        mutateAsync: mutateDeleteFunction,
        status: isDeleteFunctionStatus,
    } = useMutation({
        mutationFn: ({ pageId }) => deleteFunctionsInPage(pageId),
    });

    /**Dispatches &  functions */
    const dispatch = useDispatch();
    const handleSaveEdit = (newName, newExp) => {
        const emptyName = isNotEmpty(newName);
        const maxName = checkLength(newName, 50);
        const emptyExp = isNotEmpty(newExp);
        const maxExp = checkLength(newExp, 300);

        if (!emptyName) {
            toast.error('Page name should not be empty.');
            return;
        } else if (!maxName) {
            toast.error('Page name must be under 30 characters.');
            return;
        } else if (!emptyExp) {
            toast.error('Page definition hould not be empty.');
            return;
        } else if (!maxExp) {
            toast.error('Page definition must be under 300 characters.');
            return;
        } else if (emptyName && maxName && emptyExp && maxExp) {
            mutateUpdatePage({
                pageId: page.pageId,
                pageName: newName,
                pageExp: newExp,
            });
            dispatch(detailReducers.setClear());
        }
    };

    const handleDeletePage = async () => {
        if (page.variables.length > 0) {
            await mutateDeleteVariable({ pageId: page.pageId });
        }
        if (page.functions.length > 0) {
            await mutateDeleteFunction({ pageId: page.pageId });
        }
        mutateDeletePage({ pageId: page.pageId });
    };

    const startEdit = () => {
        dispatch(detailReducers.setIsEdit({ target: componentTarget }));
    };

    const isLoading = checkPendingStatus([
        isUpdatePageStatus,
        isDeletePageStatus,
        isDeleteFunctionStatus,
        isDeleteVariableStatus,
    ]);

    return (
        <DetailForm
            componentTarget={componentTarget}
            type="Edit"
            apiAction={handleSaveEdit}
            startAction={startEdit}
            deleteAction={handleDeletePage}
            from="page"
            isLoading={isLoading}
        />
    );
}
