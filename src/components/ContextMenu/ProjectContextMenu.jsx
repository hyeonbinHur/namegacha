/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import { addChild, editItSelf } from '../../store/contextMenuSlice';
import * as projectAPI from '../../utils/api/aws/projectRoutes';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function ProjectContextMenu({ item }) {
    /**Http Request */
    const queryClient = useQueryClient();
    const { mutate: deleteProject } = useMutation({
        mutationFn: ({ projectId }) => {
            return projectAPI.deleteProject(projectId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries('getCertainProjects');
        },
    });
    /**Reducer & Basic functions */
    const dispatch = useDispatch();
    const startRename = (e) => {
        dispatch(editItSelf({ name: item.projectName, id: item.projectId }));
        e.stopPropagation();
    };
    const startAddChild = (e) => {
        dispatch(
            addChild({
                addType: 'page',
                name: item.projectName,
                id: item.projectId,
            })
        );
        e.stopPropagation();
    };

    return (
        <>
            <div className="heading-quaternary">Project</div>
            <button className="context--menu" onClick={(e) => startRename(e)}>
                Rename
            </button>
            <button className="context--menu" onClick={(e) => startAddChild(e)}>
                New Page
            </button>
            <button
                className="context--menu"
                onClick={() => deleteProject({ projectId: item.projectId })}
            >
                Delete Project
            </button>
            {/* <div>Share</div> */}
        </>
    );
}
