/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import { addChild, editItSelf } from '../../store/contextMenuSlice';
import * as functionAPI from '../../utils/api/aws/functionRoutes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function FunctionContextMenu({ item }) {
    /**Http Request */
    const queryClient = useQueryClient();
    const { mutate: mutateDeleteFunction } = useMutation({
        mutationFn: ({ functionId }) => {
            return functionAPI.deleteFunction(functionId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries('getCertainProjects');
        },
    });
    /**Reucer & Basic functions */
    const dispatch = useDispatch();

    const startRename = (e) => {
        console.log(item.functionName);
        console.log(item.functionId);
        e.preventDefault();
        e.stopPropagation();
        dispatch(editItSelf({ name: item.functionName, id: item.functionId }));
    };

    const startAddFunction = (e) => {
        dispatch(
            addChild({
                addType: 'function',
                name: item.pageName,
                id: item.pageId,
            })
        );
        e.stopPropagation();
    };

    return (
        <div>
            <div className="heading-quaternary">Function</div>

            <button className="context--menu" onClick={(e) => startRename(e)}>
                Rename
            </button>
            <button
                className="context--menu"
                onClick={(e) => startAddFunction(e)}
            >
                New Functcion
            </button>
            <button
                className="context--menu"
                onClick={() =>
                    mutateDeleteFunction({ functionId: item.functionId })
                }
            >
                Delete
            </button>
        </div>
    );
}
